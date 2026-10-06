<?php

namespace App\Services;

use App\Models\Konsultasi;
use App\Models\ConsultationDetail;
use App\Models\RuleDetail;
use App\Models\Rule;
use App\Models\Fact;
use App\Models\FactCf;
use Illuminate\Support\Facades\Log;

class CertaintyFactorService
{
    /**
     * Hitung CF dengan metode CF Klasik
     * CF = user_cf × cf_expert, lalu dikombinasikan
     */
    public function calculate(int $konsultasiId, string $factCode): ?array
    {
        try {
            $userConditions = ConsultationDetail::where('consultations_id', $konsultasiId)
                ->with('condition')
                ->get();

            if ($userConditions->isEmpty()) {
                Log::warning('Tidak ada kondisi user untuk konsultasi ID: ' . $konsultasiId);
                return null;
            }

            $fact = Fact::with('cf')->where('code', $factCode)->first();

            if (!$fact) {
                Log::warning('Fakta tidak ditemukan: ' . $factCode);
                return null;
            }

            // Ambil rule detail berdasarkan fact_code
            $ruleDetails = RuleDetail::whereHas('rule', function ($query) use ($factCode) {
                $query->where('fact_code', $factCode);
            })->get();

            if ($ruleDetails->isEmpty()) {
                Log::warning('Tidak ada RuleDetail untuk fact_code: ' . $factCode);
                return null;
            }

            $combinedCf = 0;
            $cfDetails = [];
            $hasValidCf = false;

            foreach ($userConditions as $condition) {
                $ruleDetail = $ruleDetails->firstWhere('condition_code', $condition->condition_code);
                
                // ===== PERBAIKAN: Jika tidak ada cf_expert, gunakan 0.8 sebagai default (bisa diubah) =====
                if (!$ruleDetail || $ruleDetail->cf_expert === null) {
                    Log::warning('CF Expert tidak ditemukan untuk kondisi: ' . $condition->condition_code . ', menggunakan default 0.8');
                    $cfExpert = 0.8; // default
                } else {
                    $cfExpert = $ruleDetail->cf_expert;
                }
                
                $currentCf = $condition->user_cf * $cfExpert;
                
                $cfDetails[] = [
                    'condition_code' => $condition->condition_code,
                    'condition_name' => $condition->condition?->nama,
                    'user_cf' => $condition->user_cf,
                    'cf_expert' => $cfExpert,
                    'cf_condition' => $currentCf,
                ];

                if ($combinedCf == 0) {
                    $combinedCf = $currentCf;
                } else {
                    $combinedCf = $combinedCf + $currentCf * (1 - $combinedCf);
                }
                
                $hasValidCf = true;
            }

            if (!$hasValidCf || $combinedCf == 0) {
                Log::warning('Tidak ada CF yang valid untuk fact_code: ' . $factCode);
                // ===== PERBAIKAN: Kembalikan CF dari fact_cf jika ada =====
                $cfFromFact = $fact->cf?->cf_value ?? 0.5;
                return [
                    'cf' => $cfFromFact,
                    'persentase' => round($cfFromFact * 100, 2),
                    'fact' => $fact,
                    'details' => [],
                ];
            }

            $cfTotal = max(0, min($combinedCf, 1.0));

            Log::info('CF Calculation:', [
                'fact_code' => $factCode,
                'combined_cf' => $combinedCf,
                'cf_total' => $cfTotal,
                'persentase' => round($cfTotal * 100, 2)
            ]);

            return [
                'cf' => $cfTotal,
                'persentase' => round($cfTotal * 100, 2),
                'fact' => $fact,
                'details' => $cfDetails,
            ];

        } catch (\Exception $e) {
            Log::error('Error calculate CF: ' . $e->getMessage());
            return null;
        }
    }

    public function calculateMultiple(int $konsultasiId, array $factCodes): array
    {
        $results = [];

        foreach ($factCodes as $factCode) {
            $result = $this->calculate($konsultasiId, $factCode);
            if ($result) {
                $results[] = $result;
            }
        }

        usort($results, fn($a, $b) => $b['cf'] <=> $a['cf']);

        return $results;
    }

    public function getTopRecommendations(int $konsultasiId, array $factCodes, int $limit = 3): ?array
    {
        $results = $this->calculateMultiple($konsultasiId, $factCodes);

        if (empty($results)) {
            return null;
        }

        return array_slice($results, 0, $limit);
    }

    /**
     * ===== PERBAIKAN UTAMA: Hitung CF berdasarkan rule yang cocok =====
     */
    public function calculateByRule(int $konsultasiId, int $ruleId): ?array
    {
        try {
            // 1. Ambil kondisi user
            $userConditions = ConsultationDetail::where('consultations_id', $konsultasiId)
                ->with('condition')
                ->get();

            if ($userConditions->isEmpty()) {
                Log::warning('Tidak ada kondisi user untuk konsultasi ID: ' . $konsultasiId);
                return null;
            }

            // 2. Ambil rule dengan details dan cf_expert
            $rule = Rule::with(['details.condition'])->find($ruleId);

            if (!$rule) {
                Log::warning('Rule tidak ditemukan: ' . $ruleId);
                return null;
            }

            Log::info('Rule ditemukan:', [
                'rule_id' => $ruleId,
                'rule_code' => $rule->kode_rule,
                'details_count' => $rule->details->count()
            ]);

            // 3. Hitung CF per kondisi
            $combinedCf = 0;
            $cfDetails = [];
            $allConditionsMatch = true;
            $hasValidCf = false;

            foreach ($rule->details as $detail) {
                // Cari kondisi user yang sesuai
                $userCondition = $userConditions->firstWhere('condition_code', $detail->condition_code);

                if (!$userCondition) {
                    Log::warning('Kondisi user tidak ditemukan untuk: ' . $detail->condition_code);
                    $allConditionsMatch = false;
                    break;
                }

                // ===== PERBAIKAN: Gunakan default 0.8 jika cf_expert null =====
                $cfExpert = $detail->cf_expert ?? 0.8;
                
                $currentCf = $userCondition->user_cf * $cfExpert;
                
                Log::info('CF per kondisi:', [
                    'condition_code' => $detail->condition_code,
                    'user_cf' => $userCondition->user_cf,
                    'cf_expert' => $cfExpert,
                    'cf_condition' => $currentCf
                ]);
                
                $cfDetails[] = [
                    'condition_code' => $detail->condition_code,
                    'condition_name' => $detail->condition?->nama,
                    'user_cf' => $userCondition->user_cf,
                    'cf_expert' => $cfExpert,
                    'cf_condition' => $currentCf,
                ];

                // Kombinasikan CF
                if ($combinedCf == 0) {
                    $combinedCf = $currentCf;
                } else {
                    $combinedCf = $combinedCf + $currentCf * (1 - $combinedCf);
                }
                
                $hasValidCf = true;
            }

            if (!$allConditionsMatch) {
                Log::warning('Tidak semua kondisi cocok untuk rule: ' . $ruleId);
                return null;
            }

            if (!$hasValidCf) {
                Log::warning('Tidak ada CF yang valid untuk rule: ' . $ruleId);
                return null;
            }

            // Validasi
            $cfTotal = max(0, min($combinedCf, 1.0));

            Log::info('CF By Rule Result:', [
                'rule_id' => $ruleId,
                'rule_code' => $rule->kode_rule,
                'combined_cf' => $combinedCf,
                'cf_total' => $cfTotal,
                'persentase' => round($cfTotal * 100, 2)
            ]);

            return [
                'cf' => $cfTotal,
                'persentase' => round($cfTotal * 100, 2),
                'rule' => $rule,
                'details' => $cfDetails,
            ];

        } catch (\Exception $e) {
            Log::error('Error calculate CF by rule: ' . $e->getMessage());
            return null;
        }
    }

    private function combineCF(array $cfs): float
    {
        if (empty($cfs)) {
            return 0;
        }

        $result = $cfs[0];

        for ($i = 1; $i < count($cfs); $i++) {
            $result = $result + $cfs[$i] * (1 - $result);
        }

        return $result;
    }
}