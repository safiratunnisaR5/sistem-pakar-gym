<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TujuanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kode' => 'required',
            'nama' => 'required',
        ];
    }
}