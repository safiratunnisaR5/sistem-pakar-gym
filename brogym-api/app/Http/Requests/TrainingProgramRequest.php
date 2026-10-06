<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainingProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $training = $this->route('training_program');
        
        return [
            'code' => 'required|string|max:20|unique:training_programs,code,' . ($training ? $training->code : ''),
            'training_name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Kode training program harus diisi',
            'code.unique' => 'Kode training program sudah digunakan',
            'training_name.required' => 'Nama training program harus diisi',
        ];
    }
}