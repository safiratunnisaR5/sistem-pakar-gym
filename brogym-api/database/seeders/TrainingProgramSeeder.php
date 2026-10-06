<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingProgram;

class TrainingProgramSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['code' => 'RL1', 'training_name' => 'Fat Loss Training', 'description' => 'Latihan kardio dan pembakaran lemak untuk menurunkan berat badan'],
            ['code' => 'RL2', 'training_name' => 'Muscle Gain Training', 'description' => 'Latihan kekuatan dan hipertrofi untuk menambah massa otot'],
            ['code' => 'RL3', 'training_name' => 'Maintenance Training', 'description' => 'Latihan menjaga kebugaran dengan intensitas moderat'],
            ['code' => 'RL4', 'training_name' => 'Body Shaping', 'description' => 'Latihan pembentukan tubuh dan definisi otot'],
            ['code' => 'RL5', 'training_name' => 'Endurance Training', 'description' => 'Latihan ketahanan dan daya tahan tubuh'],
            ['code' => 'RL6', 'training_name' => 'Strength Training', 'description' => 'Latihan kekuatan dengan beban progresif'],
        ];

        foreach ($data as $item) {
            TrainingProgram::updateOrCreate(
                ['code' => $item['code']],
                $item
            );
        }
    }
}