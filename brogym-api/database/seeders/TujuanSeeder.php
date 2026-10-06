<?php

namespace Database\Seeders;

use App\Models\Tujuan;
use Illuminate\Database\Seeder;

class TujuanSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'kode' => 'T1',
                'nama' => 'Menurunkan Berat Badan'
            ],

            [
                'kode' => 'T2',
                'nama' => 'Menambah Massa Otot'
            ],

            [
                'kode' => 'T3',
                'nama' => 'Menjaga Kebugaran'
            ],

            [
                'kode' => 'T4',
                'nama' => 'Membentuk Tubuh'
            ],
        ];

        foreach ($data as $item) {
            Tujuan::updateOrCreate(
                ['kode' => $item['kode']],
                $item
            );
        }
    }
}