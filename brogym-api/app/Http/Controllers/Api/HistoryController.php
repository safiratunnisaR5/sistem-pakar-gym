<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Konsultasi;
use App\Models\Tujuan;
use App\Models\Kondisi;
use App\Models\Penyakit;
use App\Models\Fact;
use App\Models\TrainingProgram;
use App\Models\MealPlan;
use App\Models\Recommendation;
use App\Models\HasilRekomendasi;
use App\Models\RecommendationDetail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\KonsultasiResource;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $member = auth()->user()->member;

        $histories = Konsultasi::with([
            'tujuan',
            'consultationDetails.condition',
            'hasil.trainingProgram',
            'hasil.mealPlan',
            'hasil.rule',
        ])
        ->where('member_id', $member->id)
        ->latest()
        ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => KonsultasiResource::collection($histories),
            'pagination' => [
                'current_page' => $histories->currentPage(),
                'last_page'    => $histories->lastPage(),
                'per_page'     => $histories->perPage(),
                'total'        => $histories->total(),
            ]
        ]);
    }

    public function show($id)
    {
        try {
            $member = auth()->user()->member;
            
            $konsultasi = Konsultasi::with([
                'tujuan',
                'consultationDetails.condition',
                'hasil.trainingProgram',
                'hasil.mealPlan',
                'hasil.rule',
            ])
            ->where('member_id', $member->id)
            ->findOrFail($id);
            Log::info('HISTORY SHOW RAW DATA', [
    'konsultasi_id' => $konsultasi->id,
    'hasil_raw' => $konsultasi->hasil->toArray(),
]);
foreach ($konsultasi->hasil as $h) {
    Log::info('HASIL CHECK', [
        'rule_id' => $h->rule_id,
        'training_code' => $h->training_code ?? null,
        'meal_code' => $h->meal_code ?? null,
        'training_loaded' => $h->trainingProgram,
        'meal_loaded' => $h->mealPlan,
    ]);
}
            return response()->json([
                'success' => true,
                'data' => new KonsultasiResource($konsultasi)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function latest()
    {
        $member = auth()->user()->member;

        $konsultasi = Konsultasi::with([
            'tujuan',
            'consultationDetails.condition',
            'hasil.trainingProgram',
            'hasil.mealPlan',
            'hasil.rule',
        ])
        ->where('member_id', $member->id)
        ->latest()
        ->first();

        if (!$konsultasi) {
            return response()->json(['message' => 'Belum ada konsultasi'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new KonsultasiResource($konsultasi)
        ]);
    }
}