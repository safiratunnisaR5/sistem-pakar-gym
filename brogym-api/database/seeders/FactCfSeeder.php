<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FactCf;

class FactCfSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // ================================================================
            // 1) Fakta Obesitas
            // ================================================================
            ['fact_code' => 'F1', 'cf_value' => 0.9], // Risiko Obesitas Tinggi Pemula
            ['fact_code' => 'F2', 'cf_value' => 0.9], // Risiko Obesitas Tinggi Menengah
            ['fact_code' => 'F3', 'cf_value' => 0.9], // Risiko Obesitas Tinggi Lanjutan

            // ================================================================
            // 2) Fakta Overweight Aktif
            // ================================================================
            ['fact_code' => 'F4', 'cf_value' => 0.9], // Overweight Aktif Pemula
            ['fact_code' => 'F5', 'cf_value' => 0.9], // Overweight Aktif Menengah
            ['fact_code' => 'F6', 'cf_value' => 0.9], // Overweight Aktif Lanjutan

            // ================================================================
            // 3) Fakta Overweight Terkontrol
            // ================================================================
            ['fact_code' => 'F7', 'cf_value' => 0.8], // Overweight Terkontrol Pemula
            ['fact_code' => 'F8', 'cf_value' => 0.8], // Overweight Terkontrol Menengah
            ['fact_code' => 'F9', 'cf_value' => 0.8], // Overweight Terkontrol Lanjutan

            // ================================================================
            // 4) Fakta Kondisi Fisik Prima
            // ================================================================
            ['fact_code' => 'F10', 'cf_value' => 0.9], // Kondisi Fisik Prima Pemula
            ['fact_code' => 'F11', 'cf_value' => 0.9], // Kondisi Fisik Prima Menengah
            ['fact_code' => 'F12', 'cf_value' => 0.9], // Kondisi Fisik Prima Lanjutan

            // ================================================================
            // 5) Fakta Kondisi Normal Pasif
            // ================================================================
            ['fact_code' => 'F13', 'cf_value' => 0.8], // Kondisi Normal Pasif Pemula
            ['fact_code' => 'F14', 'cf_value' => 0.8], // Kondisi Normal Pasif Menengah
            ['fact_code' => 'F15', 'cf_value' => 0.8], // Kondisi Normal Pasif Lanjutan

            // ================================================================
            // 6) Fakta Defisit Massa Otot Rendah
            // ================================================================
            ['fact_code' => 'F16', 'cf_value' => 0.9], // Defisit Massa Tubuh Pemula
            ['fact_code' => 'F17', 'cf_value' => 0.9], // Defisit Massa Tubuh Menengah
            ['fact_code' => 'F18', 'cf_value' => 0.9], // Defisit Massa Tubuh Lanjutan

            // ================================================================
            // 7) Fakta Defisit Nutrisi Aktif
            // ================================================================
            ['fact_code' => 'F19', 'cf_value' => 0.9], // Defisit Nutrisi Aktif Pemula
            ['fact_code' => 'F20', 'cf_value' => 0.9], // Defisit Nutrisi Aktif Menengah
            ['fact_code' => 'F21', 'cf_value' => 0.9], // Defisit Nutrisi Aktif Lanjutan

            // ================================================================
            // 8) Fakta Massa Tubuh Stabil
            // ================================================================
            ['fact_code' => 'F22', 'cf_value' => 0.9], // Massa Tubuh Stabil Pemula
            ['fact_code' => 'F23', 'cf_value' => 0.9], // Massa Tubuh Stabil Menengah
            ['fact_code' => 'F24', 'cf_value' => 0.9], // Massa Tubuh Stabil Lanjutan

            // ================================================================
            // 9) Fakta Pola Hidup Tidak Sehat
            // ================================================================
            ['fact_code' => 'F25', 'cf_value' => 0.9], // Pola Hidup Tidak Sehat Pemula
            ['fact_code' => 'F26', 'cf_value' => 0.9], // Pola Hidup Tidak Sehat Menengah
            ['fact_code' => 'F27', 'cf_value' => 0.9], // Pola Hidup Tidak Sehat Lanjutan
        ];

        foreach ($data as $item) {
            FactCf::updateOrCreate(
                ['fact_code' => $item['fact_code']],
                ['cf_value' => $item['cf_value']]
            );
        }
    }
}