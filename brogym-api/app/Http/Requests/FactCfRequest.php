<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FactCfRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fact_code' => 'required|string|exists:facts,code|unique:fact_cf,fact_code,' . $this->route('fact_cf'),
            'cf_value' => 'required|numeric|min:0|max:1',
        ];
    }

    public function messages(): array
    {
        return [
            'fact_code.required' => 'Kode fakta harus dipilih',
            'fact_code.exists' => 'Kode fakta tidak valid',
            'fact_code.unique' => 'Fakta ini sudah memiliki nilai CF',
            'cf_value.required' => 'Nilai CF harus diisi',
            'cf_value.min' => 'Nilai CF minimal 0',
            'cf_value.max' => 'Nilai CF maksimal 1',
        ];
    }
}