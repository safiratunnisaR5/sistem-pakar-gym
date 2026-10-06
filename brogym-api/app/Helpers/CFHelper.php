<?php

namespace App\Helpers;

use App\Services\CertaintyFactorService;

class CFHelper
{
    public static function calculate(array $matchedRules): ?array
    {
        return app(CertaintyFactorService::class)->calculate($matchedRules);
    }

    public static function calculateMultiple(int $konsultasiId, array $factCodes): array
    {
        return app(CertaintyFactorService::class)->calculateMultiple($konsultasiId, $factCodes);
    }
}