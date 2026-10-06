<?php

namespace App\Services;

use App\Models\Penyakit;
use App\Models\ConsultationDetail;
use Illuminate\Support\Facades\Log;

class RecommendationService
{
    public function __construct(
        private ForwardChainingService $forwardChaining,
        private CertaintyFactorService $certaintyFactor,
        private PenyakitAdjustmentService $penyakitAdjustment
    ) {
    }

    /**
     * Proses rekomendasi dengan 2 tahap:
     * Tahap 1: Kondisi → Fakta
     * Tahap 2: Fakta + Tujuan → Rekomendasi
     */
    public function process(array $kondisiFakta, int $tujuanId, array $penyakitIds): ?array
    {
        // ============================================================
        // TAHAP 1: Kondisi → Fakta
        // ============================================================
        $matchedFacts = $this->forwardChaining->processTahap1($kondisiFakta);

        Log::info('Matched Facts count: ' . count($matchedFacts));

        if (empty($matchedFacts)) {
            return null;
        }

        // Ambil kode fakta yang cocok
        $factCodes = array_column($matchedFacts, 'fact_code');

        // ============================================================
        // TAHAP 2: Fakta + Tujuan → Rekomendasi
        // ============================================================
        $recommendations = $this->forwardChaining->processTahap2($matchedFacts, $tujuanId);

        Log::info('Recommendations count: ' . count($recommendations));

        if (empty($recommendations)) {
            return null;
        }

        // ============================================================
        // HITUNG CF UNTUK SETIAP REKOMENDASI
        // ============================================================
        $results = [];
        foreach ($recommendations as $rec) {
            // Hitung CF berdasarkan fakta
            $cfResult = $this->certaintyFactor->calculate(
                0, // konsultasi_id belum ada, pakai default
                $rec['fact']->code
            );

            $results[] = [
                'recommendation' => $rec['recommendation'],
                'rule' => $rec['rule'],
                'fact' => $rec['fact'],
                'cf_value' => $cfResult['cf'] ?? 0.5,
                'persentase' => $cfResult['persentase'] ?? 50,
            ];
        }

        // Urutkan berdasarkan CF tertinggi
        usort($results, fn($a, $b) => $b['cf_value'] <=> $a['cf_value']);

        // ============================================================
        // AMBIL CATATAN PENYAKIT
        // ============================================================
        $catatan = [];
        $penyakit = Penyakit::whereIn('id', $penyakitIds)->get();
        foreach ($penyakit as $p) {
            if (!empty($p->catatan_penyesuaian)) {
                $catatan[] = $p->catatan_penyesuaian;
            }
        }

        return [
            'matched_facts' => $matchedFacts,
            'recommendations' => $results,
            'catatan_penyakit' => $catatan,
        ];
    }

    /**
     * Proses rekomendasi (backward compatibility - untuk yang masih pakai method lama)
     */
    public function processOld(array $fakta, array $penyakitIds): ?array
    {
        // 1. Cari rule yang cocok
        $matchedRules = $this->forwardChaining->process($fakta);

        Log::info('Matched Rules count: ' . count($matchedRules));

        if (empty($matchedRules)) {
            return null;
        }

        // 2. Kumpulkan semua rekomendasi dari rule yang cocok
        $allRekomendasi = [];
        foreach ($matchedRules as $match) {
            $rule = $match['rule'];
            
            $cfValue = $rule->cf?->cf_value ?? 0.5;
            $program = $rule->programLatihan;
            $polaMakan = $rule->polaMakan;
            
            if ($program && $polaMakan) {
                $allRekomendasi[] = [
                    'rule_id' => $rule->id,
                    'program_latihan' => $program,
                    'pola_makan' => $polaMakan,
                    'cf_value' => $cfValue,
                    'persentase' => round($cfValue * 100, 2),
                ];
            }
        }

        if (empty($allRekomendasi)) {
            return null;
        }

        usort($allRekomendasi, fn($a, $b) => $b['cf_value'] <=> $a['cf_value']);
        $topRekomendasi = array_slice($allRekomendasi, 0, 3);

        $catatan = [];
        $penyakit = Penyakit::whereIn('id', $penyakitIds)->get();
        foreach ($penyakit as $p) {
            if (!empty($p->catatan_penyesuaian)) {
                $catatan[] = $p->catatan_penyesuaian;
            }
        }

        return [
            'rekomendasi' => $topRekomendasi,
            'catatan_penyakit' => $catatan,
        ];
    }
}