<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recommendation;

class RecommendationSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['code' => 'R1', 'recommendation_name' => 'Program Fat Loss', 'description' => 'Program penurunan berat badan dengan kombinasi cardio dan defisit kalori'],
            ['code' => 'R2', 'recommendation_name' => 'Program Muscle Gain', 'description' => 'Program penambahan massa otot dengan strength training dan surplus kalori'],
            ['code' => 'R3', 'recommendation_name' => 'Program Maintenance', 'description' => 'Program menjaga kebugaran dengan latihan moderat dan nutrisi seimbang'],
            ['code' => 'R4', 'recommendation_name' => 'Program Body Shaping', 'description' => 'Program pembentukan tubuh dengan latihan intensif dan nutrisi tinggi protein'],
            ['code' => 'R5', 'recommendation_name' => 'Endurance Training', 'description' => 'Program latihan ketahanan dan daya tahan tubuh'],
            ['code' => 'R6', 'recommendation_name' => 'Strength Training', 'description' => 'Program latihan kekuatan dengan beban progresif'],
            ['code' => 'R7', 'recommendation_name' => 'Perbaikan Pola Makan', 'description' => 'Program perbaikan pola makan dan kebiasaan hidup sehat'],
        ];

        foreach ($data as $item) {
            Recommendation::updateOrCreate(
                ['code' => $item['code']],
                $item
            );
        }
    }
}