<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RecommendationDetail;

class RecommendationDetailSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // R1 → RL1 (Fat Loss Training) + M1 (Defisit Kalori)
            ['recommendation_code' => 'R1', 'meal_code' => 'M1', 'training_code' => 'RL1'],

            // R2 → RL2 (Muscle Gain Training) + M2 (Surplus Kalori) & M4 (Tinggi Protein)
            ['recommendation_code' => 'R2', 'meal_code' => 'M2', 'training_code' => 'RL2'],
            ['recommendation_code' => 'R2', 'meal_code' => 'M4', 'training_code' => 'RL2'],

            // R3 → RL3 (Maintenance Training) + M3 (Seimbang)
            ['recommendation_code' => 'R3', 'meal_code' => 'M3', 'training_code' => 'RL3'],

            // R4 → RL4 (Body Shaping) + M3 (Seimbang) & M4 (Tinggi Protein)
            ['recommendation_code' => 'R4', 'meal_code' => 'M3', 'training_code' => 'RL4'],
            ['recommendation_code' => 'R4', 'meal_code' => 'M4', 'training_code' => 'RL4'],

            // R5 → RL5 (Endurance Training) + M3 (Seimbang)
            ['recommendation_code' => 'R5', 'meal_code' => 'M3', 'training_code' => 'RL5'],

            // R6 → RL6 (Strength Training) + M4 (Tinggi Protein)
            ['recommendation_code' => 'R6', 'meal_code' => 'M4', 'training_code' => 'RL6'],

            // R7 → M5 (Pola Makan Teratur) + Latihan intensitas ringan (RL1)
            ['recommendation_code' => 'R7', 'meal_code' => 'M5', 'training_code' => 'RL1'],
        ];

        foreach ($data as $item) {
            RecommendationDetail::updateOrCreate(
                [
                    'recommendation_code' => $item['recommendation_code'],
                    'meal_code' => $item['meal_code'],
                    'training_code' => $item['training_code'],
                ],
                $item
            );
        }
    }
}