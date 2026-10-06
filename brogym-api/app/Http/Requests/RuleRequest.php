<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RuleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rule = $this->route('rule');
        
        return [
            // Rule yang sudah ada tidak bisa diubah kode_rule-nya
            'kode_rule' => 'required|string|max:20|unique:rules,kode_rule,' . ($rule ? $rule->id : ''),
            'nama_rule' => 'required|string|max:100',
            'fact_code' => 'nullable|string|exists:facts,code',
            'tujuan_id' => 'nullable|exists:tujuan,id',
            'recommendation_code' => 'nullable|string|exists:recommendations,code',
            'status' => 'required|boolean',
            'kondisi_ids' => 'required|array|min:1',
            'kondisi_ids.*' => 'exists:kondisi,kode',
            'cf_expert' => 'nullable|numeric|min:0|max:1',
        ];
    }

    public function messages(): array
    {
        return [
            'kode_rule.required' => 'Kode rule harus diisi',
            'kode_rule.unique' => 'Kode rule sudah digunakan',
            'nama_rule.required' => 'Nama rule harus diisi',
            'fact_code.exists' => 'Kode fakta tidak valid',
            'tujuan_id.exists' => 'Tujuan tidak valid',
            'recommendation_code.exists' => 'Kode rekomendasi tidak valid',
            'kondisi_ids.required' => 'Minimal 1 kondisi harus dipilih',
            'kondisi_ids.min' => 'Minimal 1 kondisi harus dipilih',
            'cf_expert.min' => 'Nilai CF Expert minimal 0',
            'cf_expert.max' => 'Nilai CF Expert maksimal 1',
        ];
    }
}