<?php

namespace App\Services;

use App\Models\Rule;
use App\Models\RuleDetail;
use App\Models\Fact;
use App\Models\Recommendation;
use Illuminate\Support\Facades\Log;

class ForwardChainingService
{
    /**
     * TAHAP 1: Kondisi → Fakta
     * Mencari fakta yang cocok berdasarkan kondisi user (K1-K10)
     */
    public function processTahap1(array $kondisiFakta): array
    {
        $matchedFacts = [];

        // Ambil semua rule tahap 1 (yang tidak punya tujuan_id dan recommendation_code)
        $rules = Rule::with(['details.condition', 'fact'])
            ->whereNull('tujuan_id')
            ->whereNull('recommendation_code')
            ->where('status', true)
            ->get();

        Log::info('Total Rule Tahap 1: ' . $rules->count());
        Log::info('Kondisi Fakta: ', $kondisiFakta);

        foreach ($rules as $rule) {
            // Ambil semua kondisi yang dibutuhkan oleh rule
            $conditions = $rule->details->pluck('condition_code')->toArray();
            
            // Cek apakah semua kondisi rule ada di fakta user
            $isMatch = empty(array_diff($conditions, $kondisiFakta));

            if ($isMatch && $rule->fact) {
                $matchedFacts[] = [
                    'fact_code' => $rule->fact->code,
                    'fact_name' => $rule->fact->fact_name,
                    'rule' => $rule,
                    'cf_expert' => $rule->details->avg('cf_expert') ?? 0.8,
                ];
            }
        }

        Log::info('Total Fakta cocok: ' . count($matchedFacts));

        return $matchedFacts;
    }

    /**
     * TAHAP 2: Fakta + Tujuan → Rekomendasi
     * Mencari rekomendasi berdasarkan fakta yang terpilih dan tujuan user
     */
    public function processTahap2(array $matchedFacts, int $tujuanId): array
    {
        $recommendations = [];

        // Ambil kode fakta yang cocok
        $factCodes = array_column($matchedFacts, 'fact_code');

        if (empty($factCodes)) {
            return [];
        }

        // ===== TAMBAHKAN EAGER LOADING UNTUK recommendation.details.trainingProgram & mealPlan =====
        $rules = Rule::with([
            'fact',
            'tujuan',
            'recommendation.details.trainingProgram',  // <-- TAMBAHKAN
            'recommendation.details.mealPlan'          // <-- TAMBAHKAN
        ])
        ->whereIn('fact_code', $factCodes)
        ->where('tujuan_id', $tujuanId)
        ->whereNotNull('recommendation_code')
        ->where('status', true)
        ->get();

        Log::info('Total Rule Tahap 2: ' . $rules->count());

        foreach ($rules as $rule) {
            if ($rule->recommendation) {
                // Cari CF dari fakta yang cocok
                $factCf = 0;
                foreach ($matchedFacts as $fact) {
                    if ($fact['fact_code'] === $rule->fact_code) {
                        $factCf = $fact['cf_expert'] ?? 0.8;
                        break;
                    }
                }

                $recommendations[] = [
                    'rule' => $rule,
                    'recommendation' => $rule->recommendation,
                    'fact' => $rule->fact,
                    'cf_expert' => $factCf,
                ];
            }
        }

        // Urutkan berdasarkan CF tertinggi
        usort($recommendations, fn($a, $b) => $b['cf_expert'] <=> $a['cf_expert']);

        Log::info('Total Rekomendasi cocok: ' . count($recommendations));

        return $recommendations;
    }

    /**
     * Proses lengkap 2 tahap (untuk backward compatibility)
     */
    public function process(array $fakta): array
    {
        $matchedRules = [];

        $rules = Rule::with(['details.condition'])
            ->where('status', true)
            ->get();

        foreach ($rules as $rule) {
            $conditions = $rule->details->pluck('condition_code')->toArray();
            $isMatch = empty(array_diff($conditions, $fakta));

            if ($isMatch) {
                $matchedRules[] = [
                    'rule' => $rule,
                    'conditions' => $conditions,
                ];
            }
        }

        return $matchedRules;
    }
}