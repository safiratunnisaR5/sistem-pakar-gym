<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Fact;

class FactSeeder extends Seeder
{
    public function run(): void
    {
        $facts = [
            // ================================================================
            // 1) Fakta Obesitas
            // ================================================================
            [
                'code' => 'F1',
                'fact_name' => 'Risiko Obesitas Tinggi Pemula',
                'condition_codes' => 'K1,K4,K6,K8',
                'description' => 'BMI berlebih, jarang olahraga, pola makan tidak teratur, level pemula'
            ],
            [
                'code' => 'F2',
                'fact_name' => 'Risiko Obesitas Tinggi Menengah',
                'condition_codes' => 'K1,K4,K6,K9',
                'description' => 'BMI berlebih, jarang olahraga, pola makan tidak teratur, level menengah'
            ],
            [
                'code' => 'F3',
                'fact_name' => 'Risiko Obesitas Tinggi Lanjutan',
                'condition_codes' => 'K1,K4,K6,K10',
                'description' => 'BMI berlebih, jarang olahraga, pola makan tidak teratur, level lanjutan'
            ],

            // ================================================================
            // 2) Fakta Overweight Aktif
            // ================================================================
            [
                'code' => 'F4',
                'fact_name' => 'Overweight Aktif Pemula',
                'condition_codes' => 'K1,K5,K6,K8',
                'description' => 'BMI berlebih, sering olahraga, pola makan tidak teratur, level pemula'
            ],
            [
                'code' => 'F5',
                'fact_name' => 'Overweight Aktif Menengah',
                'condition_codes' => 'K1,K5,K6,K9',
                'description' => 'BMI berlebih, sering olahraga, pola makan tidak teratur, level menengah'
            ],
            [
                'code' => 'F6',
                'fact_name' => 'Overweight Aktif Lanjutan',
                'condition_codes' => 'K1,K5,K6,K10',
                'description' => 'BMI berlebih, sering olahraga, pola makan tidak teratur, level lanjutan'
            ],

            // ================================================================
            // 3) Fakta Overweight Terkontrol
            // ================================================================
            [
                'code' => 'F7',
                'fact_name' => 'Overweight Terkontrol Pemula',
                'condition_codes' => 'K1,K5,K7,K8',
                'description' => 'BMI berlebih, sering olahraga, pola makan sehat, level pemula'
            ],
            [
                'code' => 'F8',
                'fact_name' => 'Overweight Terkontrol Menengah',
                'condition_codes' => 'K1,K5,K7,K9',
                'description' => 'BMI berlebih, sering olahraga, pola makan sehat, level menengah'
            ],
            [
                'code' => 'F9',
                'fact_name' => 'Overweight Terkontrol Lanjutan',
                'condition_codes' => 'K1,K5,K7,K10',
                'description' => 'BMI berlebih, sering olahraga, pola makan sehat, level lanjutan'
            ],

            // ================================================================
            // 4) Fakta Kondisi Fisik Prima
            // ================================================================
            [
                'code' => 'F10',
                'fact_name' => 'Kondisi Fisik Prima Pemula',
                'condition_codes' => 'K2,K5,K7,K8',
                'description' => 'BMI normal, sering olahraga, pola makan sehat, level pemula'
            ],
            [
                'code' => 'F11',
                'fact_name' => 'Kondisi Fisik Prima Menengah',
                'condition_codes' => 'K2,K5,K7,K9',
                'description' => 'BMI normal, sering olahraga, pola makan sehat, level menengah'
            ],
            [
                'code' => 'F12',
                'fact_name' => 'Kondisi Fisik Prima Lanjutan',
                'condition_codes' => 'K2,K5,K7,K10',
                'description' => 'BMI normal, sering olahraga, pola makan sehat, level lanjutan'
            ],

            // ================================================================
            // 5) Fakta Kondisi Normal Pasif
            // ================================================================
            [
                'code' => 'F13',
                'fact_name' => 'Kondisi Normal Pasif Pemula',
                'condition_codes' => 'K2,K4,K7,K8',
                'description' => 'BMI normal, jarang olahraga, pola makan sehat, level pemula'
            ],
            [
                'code' => 'F14',
                'fact_name' => 'Kondisi Normal Pasif Menengah',
                'condition_codes' => 'K2,K4,K7,K9',
                'description' => 'BMI normal, jarang olahraga, pola makan sehat, level menengah'
            ],
            [
                'code' => 'F15',
                'fact_name' => 'Kondisi Normal Pasif Lanjutan',
                'condition_codes' => 'K2,K4,K7,K10',
                'description' => 'BMI normal, jarang olahraga, pola makan sehat, level lanjutan'
            ],

            // ================================================================
            // 6) Fakta Defisit Massa Otot Rendah
            // ================================================================
            [
                'code' => 'F16',
                'fact_name' => 'Massa Otot Rendah Pemula',
                'condition_codes' => 'K3,K4,K6,K8',
                'description' => 'BMI kurang, jarang olahraga, pola makan tidak teratur, level pemula'
            ],
            [
                'code' => 'F17',
                'fact_name' => 'Massa Otot Rendah Menengah',
                'condition_codes' => 'K3,K4,K6,K9',
                'description' => 'BMI kurang, jarang olahraga, pola makan tidak teratur, level menengah'
            ],
            [
                'code' => 'F18',
                'fact_name' => 'Massa Otot Rendah Lanjutan',
                'condition_codes' => 'K3,K4,K6,K10',
                'description' => 'BMI kurang, jarang olahraga, pola makan tidak teratur, level lanjutan'
            ],

            // ================================================================
            // 7) Fakta Defisit Nutrisi Aktif
            // ================================================================
            [
                'code' => 'F19',
                'fact_name' => 'Defisit Nutrisi Aktif Pemula',
                'condition_codes' => 'K3,K5,K6,K8',
                'description' => 'BMI kurang, sering olahraga, pola makan tidak teratur, level pemula'
            ],
            [
                'code' => 'F20',
                'fact_name' => 'Defisit Nutrisi Aktif Menengah',
                'condition_codes' => 'K3,K5,K6,K9',
                'description' => 'BMI kurang, sering olahraga, pola makan tidak teratur, level menengah'
            ],
            [
                'code' => 'F21',
                'fact_name' => 'Defisit Nutrisi Aktif Lanjutan',
                'condition_codes' => 'K3,K5,K6,K10',
                'description' => 'BMI kurang, sering olahraga, pola makan tidak teratur, level lanjutan'
            ],

            // ================================================================
            // 8) Fakta Massa Tubuh Stabil
            // ================================================================
            [
                'code' => 'F22',
                'fact_name' => 'Massa Tubuh Stabil Pemula',
                'condition_codes' => 'K3,K5,K7,K8',
                'description' => 'BMI kurang, sering olahraga, pola makan sehat, level pemula'
            ],
            [
                'code' => 'F23',
                'fact_name' => 'Massa Tubuh Stabil Menengah',
                'condition_codes' => 'K3,K5,K7,K9',
                'description' => 'BMI kurang, sering olahraga, pola makan sehat, level menengah'
            ],
            [
                'code' => 'F24',
                'fact_name' => 'Massa Tubuh Stabil Lanjutan',
                'condition_codes' => 'K3,K5,K7,K10',
                'description' => 'BMI kurang, sering olahraga, pola makan sehat, level lanjutan'
            ],

            // ================================================================
            // 9) Fakta Pola Hidup Tidak Sehat
            // ================================================================
            [
                'code' => 'F25',
                'fact_name' => 'Pola Hidup Tidak Sehat Pemula',
                'condition_codes' => 'K2,K4,K6,K8',
                'description' => 'BMI normal, jarang olahraga, pola makan tidak teratur, level pemula'
            ],
            [
                'code' => 'F26',
                'fact_name' => 'Pola Hidup Tidak Sehat Menengah',
                'condition_codes' => 'K2,K4,K6,K9',
                'description' => 'BMI normal, jarang olahraga, pola makan tidak teratur, level menengah'
            ],
            [
                'code' => 'F27',
                'fact_name' => 'Pola Hidup Tidak Sehat Lanjutan',
                'condition_codes' => 'K2,K4,K6,K10',
                'description' => 'BMI normal, jarang olahraga, pola makan tidak teratur, level lanjutan'
            ],
        ];

        foreach ($facts as $fact) {
            Fact::updateOrCreate(
                ['code' => $fact['code']],
                $fact
            );
        }
    }
}