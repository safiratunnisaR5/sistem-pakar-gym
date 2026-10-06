<?php

namespace App\Helpers;

use App\Services\BMIService;

class BMIHelper
{
    public static function calculate(float $berat, float $tinggi): float
    {
        return app(BMIService::class)->calculate($berat, $tinggi);
    }

    public static function kategori(float $bmi): string
    {
        return app(BMIService::class)->kategori($bmi);
    }
}