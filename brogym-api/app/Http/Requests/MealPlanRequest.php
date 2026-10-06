<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MealPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $meal = $this->route('meal_plan');
        
        return [
            'code' => 'required|string|max:20|unique:meal_plans,code,' . ($meal ? $meal->code : ''),
            'meal_name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'calories' => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Kode meal plan harus diisi',
            'code.unique' => 'Kode meal plan sudah digunakan',
            'meal_name.required' => 'Nama meal plan harus diisi',
            'calories.min' => 'Kalori tidak boleh negatif',
        ];
    }
}