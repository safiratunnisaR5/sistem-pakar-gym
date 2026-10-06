<?php

namespace Database\Seeders;

use App\Models\MembershipPackage;
use Illuminate\Database\Seeder;

class MembershipPackageSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            [
                'name' => 'Harian',
                'price' => 20000,
                'duration_days' => 1
            ],

            [
                'name' => 'Mingguan',
                'price' => 100000,
                'duration_days' => 7
            ],

            [
                'name' => 'Bulanan',
                'price' => 300000,
                'duration_days' => 30
            ],

            [
                'name' => 'Tahunan',
                'price' => 3000000,
                'duration_days' => 365
            ],
        ];

        foreach ($data as $item) {
            MembershipPackage::updateOrCreate(
                ['name' => $item['name']],
                $item
            );
        }
    }
}