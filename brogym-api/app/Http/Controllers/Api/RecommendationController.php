<?php

namespace App\Http\Controllers\Api;

use App\Models\Recommendation;
use App\Http\Controllers\Controller;
use App\Http\Resources\RecommendationResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RecommendationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Recommendation::with(['details.mealPlan', 'details.trainingProgram']);

            if ($request->filled('search')) {
                $query->where('recommendation_name', 'like', '%' . $request->search . '%');
            }

            if ($request->filled('code')) {
                $query->where('code', $request->code);
            }

            if ($request->has('per_page')) {
                $recommendations = $query->paginate($request->get('per_page', 15));
                
                return response()->json([
                    'success' => true,
                    'data' => RecommendationResource::collection($recommendations),
                    'pagination' => [
                        'current_page' => $recommendations->currentPage(),
                        'last_page' => $recommendations->lastPage(),
                        'per_page' => $recommendations->perPage(),
                        'total' => $recommendations->total(),
                    ]
                ]);
            }

            $recommendations = $query->get();

            return response()->json([
                'success' => true,
                'data' => RecommendationResource::collection($recommendations),
                'total' => $recommendations->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data rekomendasi: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(string $code): JsonResponse
    {
        try {
            $recommendation = Recommendation::with([
                'details.mealPlan',
                'details.trainingProgram'
            ])->where('code', $code)->first();

            if (!$recommendation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rekomendasi dengan kode ' . $code . ' tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => new RecommendationResource($recommendation)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil detail rekomendasi: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'code' => 'required|string|max:20|unique:recommendations,code',
                'recommendation_name' => 'required|string|max:100',
                'description' => 'nullable|string',
                // ===== PERBAIKAN: Ganti 'pola_makan' → 'meal_plans' =====
                'meal_codes' => 'nullable|array',
                'meal_codes.*' => 'exists:meal_plans,code',  // <-- PERBAIKAN
                // ===== PERBAIKAN: Ganti 'program_latihan' → 'training_programs' =====
                'training_codes' => 'nullable|array',
                'training_codes.*' => 'exists:training_programs,code',  // <-- PERBAIKAN
            ]);

            $recommendation = Recommendation::create([
                'code' => $validated['code'],
                'recommendation_name' => $validated['recommendation_name'],
                'description' => $validated['description'] ?? null,
            ]);

            if (!empty($validated['meal_codes']) || !empty($validated['training_codes'])) {
                $mealCodes = $validated['meal_codes'] ?? [];
                $trainingCodes = $validated['training_codes'] ?? [];
                
                $maxCount = max(count($mealCodes), count($trainingCodes));
                
                for ($i = 0; $i < $maxCount; $i++) {
                    $mealCode = $mealCodes[$i] ?? null;
                    $trainingCode = $trainingCodes[$i] ?? null;
                    
                    if ($mealCode || $trainingCode) {
                        $recommendation->details()->create([
                            'meal_code' => $mealCode,
                            'training_code' => $trainingCode,
                        ]);
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Rekomendasi berhasil dibuat',
                'data' => new RecommendationResource($recommendation->load(['details.mealPlan', 'details.trainingProgram']))
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat rekomendasi: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, string $code): JsonResponse
    {
        try {
            $recommendation = Recommendation::where('code', $code)->first();

            if (!$recommendation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rekomendasi dengan kode ' . $code . ' tidak ditemukan'
                ], 404);
            }

            $validated = $request->validate([
                'recommendation_name' => 'sometimes|required|string|max:100',
                'description' => 'nullable|string',
                // ===== PERBAIKAN =====
                'meal_codes' => 'nullable|array',
                'meal_codes.*' => 'exists:meal_plans,code',
                'training_codes' => 'nullable|array',
                'training_codes.*' => 'exists:training_programs,code',
            ]);

            $recommendation->update([
                'recommendation_name' => $validated['recommendation_name'] ?? $recommendation->recommendation_name,
                'description' => $validated['description'] ?? $recommendation->description,
            ]);

            if (isset($validated['meal_codes']) || isset($validated['training_codes'])) {
                $recommendation->details()->delete();
                
                $mealCodes = $validated['meal_codes'] ?? [];
                $trainingCodes = $validated['training_codes'] ?? [];
                
                $maxCount = max(count($mealCodes), count($trainingCodes));
                
                for ($i = 0; $i < $maxCount; $i++) {
                    $mealCode = $mealCodes[$i] ?? null;
                    $trainingCode = $trainingCodes[$i] ?? null;
                    
                    if ($mealCode || $trainingCode) {
                        $recommendation->details()->create([
                            'meal_code' => $mealCode,
                            'training_code' => $trainingCode,
                        ]);
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Rekomendasi berhasil diperbarui',
                'data' => new RecommendationResource($recommendation->fresh()->load(['details.mealPlan', 'details.trainingProgram']))
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui rekomendasi: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(string $code): JsonResponse
    {
        try {
            $recommendation = Recommendation::where('code', $code)->first();

            if (!$recommendation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rekomendasi dengan kode ' . $code . ' tidak ditemukan'
                ], 404);
            }

            $recommendation->details()->delete();
            $recommendation->delete();

            return response()->json([
                'success' => true,
                'message' => 'Rekomendasi berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus rekomendasi: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getByGoal(string $goalCode): JsonResponse
    {
        try {
            $recommendations = Recommendation::with(['details.mealPlan', 'details.trainingProgram'])
                ->whereHas('rules', function ($query) use ($goalCode) {
                    $query->where('tujuan_id', $goalCode);
                })
                ->get();

            return response()->json([
                'success' => true,
                'data' => RecommendationResource::collection($recommendations),
                'total' => $recommendations->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil rekomendasi berdasarkan tujuan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getTopRecommendations(Request $request): JsonResponse
    {
        try {
            $limit = $request->get('limit', 5);
            
            $recommendations = Recommendation::with(['details.mealPlan', 'details.trainingProgram'])
                ->withCount('rules')
                ->orderBy('rules_count', 'desc')
                ->limit($limit)
                ->get();

            return response()->json([
                'success' => true,
                'data' => RecommendationResource::collection($recommendations),
                'total' => $recommendations->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil rekomendasi terpopuler: ' . $e->getMessage()
            ], 500);
        }
    }
}