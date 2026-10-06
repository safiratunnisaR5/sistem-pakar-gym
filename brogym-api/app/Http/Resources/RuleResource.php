<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RuleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kode_rule' => $this->kode_rule,
            'nama_rule' => $this->nama_rule,
            'status' => $this->status,
            
            // Relasi ke Fact
            'fact' => $this->fact ? [
                'code' => $this->fact->code,
                'name' => $this->fact->fact_name,
                'condition_codes' => $this->fact->condition_codes,
            ] : null,
            
            // Relasi ke Tujuan
            'tujuan' => $this->tujuan ? [
                'id' => $this->tujuan->id,
                'kode' => $this->tujuan->kode,
                'nama' => $this->tujuan->nama,
            ] : null,
            
            // Relasi ke Recommendation
            'recommendation' => $this->recommendation ? [
                'code' => $this->recommendation->code,
                'name' => $this->recommendation->recommendation_name,
                'description' => $this->recommendation->description,
            ] : null,
            
            // Detail kondisi pembentuk fakta
            'details' => $this->details->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'condition_code' => $detail->condition_code,
                    'condition_name' => $detail->condition?->nama,
                    'cf_expert' => $detail->cf_expert,
                ];
            }),
            
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}