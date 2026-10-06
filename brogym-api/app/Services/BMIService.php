<?php

namespace App\Services;

class BMIService
{
    public function calculate(
        float $berat,
        float $tinggi
    ): float
    {
        $tinggiMeter = $tinggi / 100;

        return round(
            $berat /
            ($tinggiMeter * $tinggiMeter),
            2
        );
    }

    public function kategori(
        float $bmi
    ): string
    {
        if ($bmi >= 25) {
            return 'K1';
        }

        if ($bmi >= 18.5) {
            return 'K2';
        }

        return 'K3';
    }
}