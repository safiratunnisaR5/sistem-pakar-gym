<?php

namespace Database\Seeders;

use App\Models\Penyakit;
use Illuminate\Database\Seeder;

class PenyakitSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'kode' => 'P1',
                'nama' => 'Hipertensi',
                'catatan_penyesuaian' =>
                'Hindari latihan intensitas tinggi'
            ],

            [
                'kode' => 'P2',
                'nama' => 'Diabetes',
                'catatan_penyesuaian' =>
                'Gunakan pola makan rendah gula'
            ],

            [
                'kode' => 'P3',
                'nama' => 'Asam Lambung',
                'catatan_penyesuaian' =>
                'Hindari puasa ekstrem'
            ],

            [
                'kode' => 'P4',
                'nama' => 'Cedera Lutut',
                'catatan_penyesuaian' =>
                'Hindari jumping dan squat berat'
            ],

            [
                'kode' => 'P5',
                'nama' => 'Asma',
                'catatan_penyesuaian' =>
                'Lakukan cardio bertahap'
            ],

            [
                'kode' => 'P6',
                'nama' => 'Kolesterol Tinggi',
                'catatan_penyesuaian' =>
                'Kurangi lemak jenuh'
            ],

            [
                'kode' => 'P7',
                'nama' => 'Penyakit Jantung',
                'catatan_penyesuaian' =>
                'Hindari latihan ekstrem'
            ],

            [
                'kode' => 'P8',
                'nama' => 'Osteoporosis',
                'catatan_penyesuaian' =>
                'Latihan beban ringan'
            ],

            [
                'kode' => 'P9',
                'nama' => 'Low Back Pain',
                'catatan_penyesuaian' =>
                'Hindari deadlift berat'
            ],

            [
                'kode' => 'P10',
                'nama' => 'Arthritis',
                'catatan_penyesuaian' =>
                'Gunakan latihan low impact'
            ],

            [
                'kode' => 'P11',
                'nama' => 'Cedera Bahu',
                'catatan_penyesuaian' =>
                'Batasi overhead press'
            ],

            [
                'kode' => 'P12',
                'nama' => 'Insomnia',
                'catatan_penyesuaian' =>
                'Tambahkan edukasi sleep hygiene'
            ],

            [
                'kode' => 'P13',
                'nama' => 'Anemia',
                'catatan_penyesuaian' =>
                'Perbanyak makanan kaya zat besi'
            ],

            [
                'kode' => 'P14',
                'nama' => 'Tidak Ada Penyakit',
                'catatan_penyesuaian' =>
                'Tidak memerlukan penyesuaian'
            ],
        ];

        foreach ($data as $item) {
            Penyakit::updateOrCreate(
                ['kode' => $item['kode']],
                $item
            );
        }
    }
}