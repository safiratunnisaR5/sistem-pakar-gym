<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MealPlan;

class MealPlanSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['code' => 'M1', 'meal_name' => 'Pola Makan Defisit Kalori', 'description' => 'Mengurangi asupan kalori untuk menurunkan berat badan', 'calories' => 1500],
            ['code' => 'M2', 'meal_name' => 'Pola Makan Surplus Kalori', 'description' => 'Menambah asupan kalori untuk menambah massa otot', 'calories' => 2500],
            ['code' => 'M3', 'meal_name' => 'Pola Makan Seimbang', 'description' => 'Nutrisi seimbang untuk menjaga kebugaran', 'calories' => 2000],
            ['code' => 'M4', 'meal_name' => 'Pola Makan Tinggi Protein', 'description' => 'Asupan protein tinggi untuk pembentukan otot', 'calories' => 2200],
            ['code' => 'M5', 'meal_name' => 'Pola Makan Teratur', 'description' => 'Pola makan teratur dengan porsi kecil dan sering', 'calories' => 1800],
        ];

        foreach ($data as $item) {
            MealPlan::updateOrCreate(
                ['code' => $item['code']],
                $item
            );
        }
    }
}