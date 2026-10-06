<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $fact = $this->route('fact');
        
        return [
            'code' => 'required|string|max:20|unique:facts,code,' . ($fact ? $fact->code : ''),
            'fact_name' => 'required|string|max:100',
            'condition_codes' => 'nullable|string',
            'description' => 'nullable|string',
            'cf_value' => 'nullable|numeric|min:0|max:1',
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Kode fakta harus diisi',
            'code.unique' => 'Kode fakta sudah digunakan',
            'fact_name.required' => 'Nama fakta harus diisi',
            'cf_value.min' => 'Nilai CF minimal 0',
            'cf_value.max' => 'Nilai CF maksimal 1',
        ];
    }
}