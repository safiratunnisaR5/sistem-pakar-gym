<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GymProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' => 'required',

            'address' => 'required',

            'phone' => 'required',

            'email' => 'required|email',

            'operational_hours' => 'required',

            'description' => 'nullable'
        ];
    }
}