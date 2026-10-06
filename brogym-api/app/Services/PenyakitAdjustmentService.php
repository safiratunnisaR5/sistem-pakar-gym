<?php

namespace App\Services;

use App\Models\Penyakit;

class PenyakitAdjustmentService
{
    public function adjust(
        array $hasil,
        array $penyakitIds
    ): array
    {
        $catatan = [];

        $penyakit =
        Penyakit::whereIn(
            'id',
            $penyakitIds
        )->get();

        foreach ($penyakit as $item) {

            if (
                !empty(
                    $item->catatan_penyesuaian
                )
            ) {
                $catatan[] =
                $item->catatan_penyesuaian;
            }
        }

        $hasil['catatan_penyakit']
            = $catatan;

        return $hasil;
    }
}