<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KonsultasiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $tujuanData = $this->tujuan ? [
            'id'   => $this->tujuan->id,
            'kode' => $this->tujuan->kode,
            'nama' => $this->tujuan->nama,
        ] : null;

        $data = [
            'id'          => $this->id,
            'tanggal'     => $this->tanggal,
            'tinggi_badan'=> $this->tinggi_badan,
            'berat_badan' => $this->berat_badan,
            'bmi'         => $this->bmi,
            'cf_result'   => $this->cf_result,
            'tujuan'      => $tujuanData,
        ];

        // ============================================================
        // CONSULTATION DETAILS
        // ============================================================
        if ($this->relationLoaded('consultationDetails') && $this->consultationDetails) {
            $data['consultation_details'] = $this->consultationDetails->map(function ($item) {
                return [
                    'id' => $item->id,
                    'condition_code' => $item->condition_code,
                    'condition_name' => $item->condition?->nama ?? $item->condition_code,
                    'user_cf' => (float) $item->user_cf,
                ];
            })->toArray();
        } else {
            $data['consultation_details'] = [];
        }

        // ============================================================
        // HASIL REKOMENDASI - FIELD BARU: training_program & meal_plan
        // ============================================================
        if ($this->relationLoaded('hasil') && $this->hasil && $this->hasil->count() > 0) {
            $data['hasil'] = $this->hasil->map(function ($item) {
                // ===== AMBIL DATA DARI TRAINING PROGRAM =====
                $trainingProgram = $item->trainingProgram;
                $mealPlan = $item->mealPlan;

                return [
                    'rule_id'   => $item->rule_id,
                    'rule_nama' => $item->rule?->nama_rule ?? 'Rule',
                    'cf_value'  => $item->cf_value,
                    'persentase'=> $item->persentase,
                    // ===== FIELD BARU =====
                    'training_program' => $trainingProgram ? [
                        'id'            => $trainingProgram->id,
                        'code'          => $trainingProgram->code,
                        'name'          => $trainingProgram->training_name,
                        'description'   => $trainingProgram->description,
                    ] : null,
                    'meal_plan' => $mealPlan ? [
                        'id'            => $mealPlan->id,
                        'code'          => $mealPlan->code,
                        'name'          => $mealPlan->meal_name,
                        'description'   => $mealPlan->description,
                        'calories'      => $mealPlan->calories,
                    ] : null,
                ];
            })->toArray();

            $data['catatan_penyakit'] = $this->hasil->first()?->catatan_penyakit;
            $data['total_rekomendasi'] = $this->hasil->count();
        } else {
            $data['hasil'] = [];
            $data['catatan_penyakit'] = null;
            $data['total_rekomendasi'] = 0;
        }

        return $data;
    }
}