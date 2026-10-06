<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rule;

class RuleSeeder extends Seeder
{
    public function run(): void
    {
        $rules = [
            // ================================================================
            // TAHAP 1: Penentuan Fakta (Kondisi → Fakta)
            // ================================================================
            // 1-3: Risiko Obesitas
            ['kode_rule' => 'R1', 'nama_rule' => 'Risiko Obesitas Pemula', 'fact_code' => 'F1', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R2', 'nama_rule' => 'Risiko Obesitas Menengah', 'fact_code' => 'F2', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R3', 'nama_rule' => 'Risiko Obesitas Lanjutan', 'fact_code' => 'F3', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 4-6: Overweight Aktif
            ['kode_rule' => 'R4', 'nama_rule' => 'Overweight Aktif Pemula', 'fact_code' => 'F4', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R5', 'nama_rule' => 'Overweight Aktif Menengah', 'fact_code' => 'F5', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R6', 'nama_rule' => 'Overweight Aktif Lanjutan', 'fact_code' => 'F6', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 7-9: Overweight Terkontrol
            ['kode_rule' => 'R7', 'nama_rule' => 'Overweight Terkontrol Pemula', 'fact_code' => 'F7', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R8', 'nama_rule' => 'Overweight Terkontrol Menengah', 'fact_code' => 'F8', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R9', 'nama_rule' => 'Overweight Terkontrol Lanjutan', 'fact_code' => 'F9', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 10-12: Kondisi Fisik Prima
            ['kode_rule' => 'R10', 'nama_rule' => 'Kondisi Fisik Prima Pemula', 'fact_code' => 'F10', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R11', 'nama_rule' => 'Kondisi Fisik Prima Menengah', 'fact_code' => 'F11', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R12', 'nama_rule' => 'Kondisi Fisik Prima Lanjutan', 'fact_code' => 'F12', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 13-15: Kondisi Normal Pasif
            ['kode_rule' => 'R13', 'nama_rule' => 'Kondisi Normal Pasif Pemula', 'fact_code' => 'F13', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R14', 'nama_rule' => 'Kondisi Normal Pasif Menengah', 'fact_code' => 'F14', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R15', 'nama_rule' => 'Kondisi Normal Pasif Lanjutan', 'fact_code' => 'F15', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 16-18: Massa Otot Rendah
            ['kode_rule' => 'R16', 'nama_rule' => 'Massa Otot Rendah Pemula', 'fact_code' => 'F16', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R17', 'nama_rule' => 'Massa Otot Rendah Menengah', 'fact_code' => 'F17', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R18', 'nama_rule' => 'Massa Otot Rendah Lanjutan', 'fact_code' => 'F18', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 19-21: Defisit Nutrisi Aktif
            ['kode_rule' => 'R19', 'nama_rule' => 'Defisit Nutrisi Aktif Pemula', 'fact_code' => 'F19', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R20', 'nama_rule' => 'Defisit Nutrisi Aktif Menengah', 'fact_code' => 'F20', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R21', 'nama_rule' => 'Defisit Nutrisi Aktif Lanjutan', 'fact_code' => 'F21', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 22-24: Massa Tubuh Stabil
            ['kode_rule' => 'R22', 'nama_rule' => 'Massa Tubuh Stabil Pemula', 'fact_code' => 'F22', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R23', 'nama_rule' => 'Massa Tubuh Stabil Menengah', 'fact_code' => 'F23', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R24', 'nama_rule' => 'Massa Tubuh Stabil Lanjutan', 'fact_code' => 'F24', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // 25-27: Pola Hidup Tidak Sehat
            ['kode_rule' => 'R25', 'nama_rule' => 'Pola Hidup Tidak Sehat Pemula', 'fact_code' => 'F25', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R26', 'nama_rule' => 'Pola Hidup Tidak Sehat Menengah', 'fact_code' => 'F26', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],
            ['kode_rule' => 'R27', 'nama_rule' => 'Pola Hidup Tidak Sehat Lanjutan', 'fact_code' => 'F27', 'tujuan_id' => null, 'recommendation_code' => null, 'status' => 1],

            // ================================================================
            // TAHAP 2: Penentuan Rekomendasi (Fakta + Tujuan → Rekomendasi)
            // ================================================================
            // 28-30: F1-F3 + T1 → R1
            ['kode_rule' => 'R28', 'nama_rule' => 'F1 + T1 → R1', 'fact_code' => 'F1', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R29', 'nama_rule' => 'F2 + T1 → R1', 'fact_code' => 'F2', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R30', 'nama_rule' => 'F3 + T1 → R1', 'fact_code' => 'F3', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],

            // 31-36: F4-F6 + T1 → R1, F4-F6 + T4 → R4
            ['kode_rule' => 'R31', 'nama_rule' => 'F4 + T1 → R1', 'fact_code' => 'F4', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R32', 'nama_rule' => 'F4 + T4 → R4', 'fact_code' => 'F4', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R33', 'nama_rule' => 'F5 + T1 → R1', 'fact_code' => 'F5', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R34', 'nama_rule' => 'F5 + T4 → R4', 'fact_code' => 'F5', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R35', 'nama_rule' => 'F6 + T1 → R1', 'fact_code' => 'F6', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R36', 'nama_rule' => 'F6 + T4 → R4', 'fact_code' => 'F6', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],

            // 37-45: F7-F9 + T1 → R1, + T3 → R3, + T4 → R4
            ['kode_rule' => 'R37', 'nama_rule' => 'F7 + T1 → R1', 'fact_code' => 'F7', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R38', 'nama_rule' => 'F7 + T3 → R3', 'fact_code' => 'F7', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R39', 'nama_rule' => 'F7 + T4 → R4', 'fact_code' => 'F7', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R40', 'nama_rule' => 'F8 + T1 → R1', 'fact_code' => 'F8', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R41', 'nama_rule' => 'F8 + T3 → R3', 'fact_code' => 'F8', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R42', 'nama_rule' => 'F8 + T4 → R4', 'fact_code' => 'F8', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R43', 'nama_rule' => 'F9 + T1 → R1', 'fact_code' => 'F9', 'tujuan_id' => 1, 'recommendation_code' => 'R1', 'status' => 1],
            ['kode_rule' => 'R44', 'nama_rule' => 'F9 + T3 → R3', 'fact_code' => 'F9', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R45', 'nama_rule' => 'F9 + T4 → R4', 'fact_code' => 'F9', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],

            // 46-54: F10-F12 + T2 → R6, + T3 → R3, + T4 → R4
            ['kode_rule' => 'R46', 'nama_rule' => 'F10 + T2 → R6', 'fact_code' => 'F10', 'tujuan_id' => 2, 'recommendation_code' => 'R6', 'status' => 1],
            ['kode_rule' => 'R47', 'nama_rule' => 'F10 + T3 → R3', 'fact_code' => 'F10', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R48', 'nama_rule' => 'F10 + T4 → R4', 'fact_code' => 'F10', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R49', 'nama_rule' => 'F11 + T2 → R6', 'fact_code' => 'F11', 'tujuan_id' => 2, 'recommendation_code' => 'R6', 'status' => 1],
            ['kode_rule' => 'R50', 'nama_rule' => 'F11 + T3 → R3', 'fact_code' => 'F11', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R51', 'nama_rule' => 'F11 + T4 → R4', 'fact_code' => 'F11', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R52', 'nama_rule' => 'F12 + T2 → R6', 'fact_code' => 'F12', 'tujuan_id' => 2, 'recommendation_code' => 'R6', 'status' => 1],
            ['kode_rule' => 'R53', 'nama_rule' => 'F12 + T3 → R3', 'fact_code' => 'F12', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R54', 'nama_rule' => 'F12 + T4 → R4', 'fact_code' => 'F12', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],

            // 55-57: F13-F15 + T3 → R3
            ['kode_rule' => 'R55', 'nama_rule' => 'F13 + T3 → R3', 'fact_code' => 'F13', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R56', 'nama_rule' => 'F14 + T3 → R3', 'fact_code' => 'F14', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R57', 'nama_rule' => 'F15 + T3 → R3', 'fact_code' => 'F15', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],

            // 58-59: F16-F17 + T2 → R2
            ['kode_rule' => 'R58', 'nama_rule' => 'F16 + T2 → R2', 'fact_code' => 'F16', 'tujuan_id' => 2, 'recommendation_code' => 'R2', 'status' => 1],
            ['kode_rule' => 'R59', 'nama_rule' => 'F17 + T2 → R2', 'fact_code' => 'F17', 'tujuan_id' => 2, 'recommendation_code' => 'R2', 'status' => 1],

            // 60: F18 + T2 → R6
            ['kode_rule' => 'R60', 'nama_rule' => 'F18 + T2 → R6', 'fact_code' => 'F18', 'tujuan_id' => 2, 'recommendation_code' => 'R6', 'status' => 1],

            // 61-66: F19-F21 + T1 → R7, + T2 → R2/R6
            ['kode_rule' => 'R61', 'nama_rule' => 'F19 + T1 → R7', 'fact_code' => 'F19', 'tujuan_id' => 1, 'recommendation_code' => 'R7', 'status' => 1],
            ['kode_rule' => 'R62', 'nama_rule' => 'F19 + T2 → R2', 'fact_code' => 'F19', 'tujuan_id' => 2, 'recommendation_code' => 'R2', 'status' => 1],
            ['kode_rule' => 'R63', 'nama_rule' => 'F20 + T1 → R7', 'fact_code' => 'F20', 'tujuan_id' => 1, 'recommendation_code' => 'R7', 'status' => 1],
            ['kode_rule' => 'R64', 'nama_rule' => 'F20 + T2 → R2', 'fact_code' => 'F20', 'tujuan_id' => 2, 'recommendation_code' => 'R2', 'status' => 1],
            ['kode_rule' => 'R65', 'nama_rule' => 'F21 + T1 → R7', 'fact_code' => 'F21', 'tujuan_id' => 1, 'recommendation_code' => 'R7', 'status' => 1],
            ['kode_rule' => 'R66', 'nama_rule' => 'F21 + T2 → R6', 'fact_code' => 'F21', 'tujuan_id' => 2, 'recommendation_code' => 'R6', 'status' => 1],

            // 67-75: F22-F24 + T2 → R2/R6, + T3 → R3, + T4 → R4
            ['kode_rule' => 'R67', 'nama_rule' => 'F22 + T2 → R2', 'fact_code' => 'F22', 'tujuan_id' => 2, 'recommendation_code' => 'R2', 'status' => 1],
            ['kode_rule' => 'R68', 'nama_rule' => 'F22 + T3 → R3', 'fact_code' => 'F22', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R69', 'nama_rule' => 'F22 + T4 → R4', 'fact_code' => 'F22', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R70', 'nama_rule' => 'F23 + T2 → R6', 'fact_code' => 'F23', 'tujuan_id' => 2, 'recommendation_code' => 'R6', 'status' => 1],
            ['kode_rule' => 'R71', 'nama_rule' => 'F23 + T3 → R3', 'fact_code' => 'F23', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R72', 'nama_rule' => 'F23 + T4 → R4', 'fact_code' => 'F23', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],
            ['kode_rule' => 'R73', 'nama_rule' => 'F24 + T2 → R6', 'fact_code' => 'F24', 'tujuan_id' => 2, 'recommendation_code' => 'R6', 'status' => 1],
            ['kode_rule' => 'R74', 'nama_rule' => 'F24 + T3 → R3', 'fact_code' => 'F24', 'tujuan_id' => 3, 'recommendation_code' => 'R3', 'status' => 1],
            ['kode_rule' => 'R75', 'nama_rule' => 'F24 + T4 → R4', 'fact_code' => 'F24', 'tujuan_id' => 4, 'recommendation_code' => 'R4', 'status' => 1],

            // 76-78: F25-F27 → R7 (tanpa tujuan)
            ['kode_rule' => 'R76', 'nama_rule' => 'F25 → R7', 'fact_code' => 'F25', 'tujuan_id' => null, 'recommendation_code' => 'R7', 'status' => 1],
            ['kode_rule' => 'R77', 'nama_rule' => 'F26 → R7', 'fact_code' => 'F26', 'tujuan_id' => null, 'recommendation_code' => 'R7', 'status' => 1],
            ['kode_rule' => 'R78', 'nama_rule' => 'F27 → R7', 'fact_code' => 'F27', 'tujuan_id' => null, 'recommendation_code' => 'R7', 'status' => 1],
        ];

        foreach ($rules as $rule) {
            Rule::updateOrCreate(
                ['kode_rule' => $rule['kode_rule']],
                $rule
            );
        }
    }
}