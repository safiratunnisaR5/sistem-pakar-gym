<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // ===== MASTER DATA =====
            RoleSeeder::class,
            AdminSeeder::class,

            // ===== DATA DASAR =====
            KondisiSeeder::class,      // K1-K10
            TujuanSeeder::class,       // T1-T4
            PenyakitSeeder::class,     // P1-P14

            // ===== FAKTA & CF =====
            FactSeeder::class,         // F1-F27
            FactCfSeeder::class,       // CF untuk F1-F27

            // ===== PROGRAM & POLA MAKAN =====
            TrainingProgramSeeder::class, // RL1-RL6
            MealPlanSeeder::class,        // M1-M5

            // ===== REKOMENDASI =====
            RecommendationSeeder::class,          // R1-R7
            RecommendationDetailSeeder::class,   // Relasi R→RL & M

            // ===== RULES =====
            RuleSeeder::class,
            RuleDetailSeeder::class,

            // ===== MEMBERSHIP =====
            MembershipPackageSeeder::class,
        ]);
    }
}