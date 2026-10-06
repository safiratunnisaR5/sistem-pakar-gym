<?php

namespace Database\Seeders;

use App\Models\Kondisi;
use Illuminate\Database\Seeder;

class KondisiSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            ['kode'=>'K1','nama'=>'Berat Badan Berlebih'],
            ['kode'=>'K2','nama'=>'Berat Badan Normal'],
            ['kode'=>'K3','nama'=>'Berat Badan Kurang'],

            ['kode'=>'K4','nama'=>'Jarang Berolahraga'],
            ['kode'=>'K5','nama'=>'Sering Berolahraga'],

            ['kode'=>'K6','nama'=>'Pola Makan Tidak Teratur'],
            ['kode'=>'K7','nama'=>'Pola Makan Sehat'],

            ['kode'=>'K8','nama'=>'Pemula'],
            ['kode'=>'K9','nama'=>'Menengah'],
            ['kode'=>'K10','nama'=>'Lanjutan'],
        ];

        foreach ($data as $item) {
            Kondisi::updateOrCreate(
                ['kode' => $item['kode']],
                $item
            );
        }
    }
}