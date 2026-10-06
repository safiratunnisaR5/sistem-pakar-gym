<?php

namespace App\Http\Controllers\Api;

use Throwable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Tujuan;
use App\Models\Kondisi;
use App\Models\Konsultasi;
use App\Models\Penyakit;
use App\Models\Fact;
use App\Models\TrainingProgram;
use App\Models\MealPlan;
use App\Models\Recommendation;
use App\Models\HasilRekomendasi;
use App\Models\RecommendationDetail;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\KonsultasiKondisi;
use App\Models\KonsultasiPenyakit;
use App\Models\ConsultationDetail;
use App\Http\Requests\KonsultasiRequest;
use App\Services\BMIService;
use App\Services\ForwardChainingService;
use App\Services\CertaintyFactorService;
use App\Services\PenyakitAdjustmentService;

class KonsultasiController extends Controller
{
    public function __construct(
        private BMIService $bmiService,
        private ForwardChainingService $forwardChaining,
        private CertaintyFactorService $certaintyFactor,
        private PenyakitAdjustmentService $penyakitAdjustment
    ) {
    }

    public function store(KonsultasiRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            Log::info('START KONSULTASI', $request->all());

            $member = auth()->user()->member;

            if (!$member) {
                return response()->json([
                    'message' => 'Data member tidak ditemukan'
                ], 404);
            }

            $bmi = $this->bmiService->calculate(
                $request->berat_badan,
                $request->tinggi_badan
            );

            Log::info('BMI: ' . $bmi);

            // Ambil tujuan
            $tujuan = Tujuan::findOrFail($request->tujuan_id);

            // Build fakta kondisi (K1-K10)
            $kondisiFakta = $this->buildKondisiFakta(
                $bmi,
                $request->aktivitas_olahraga,
                $request->pola_makan_harian,
                $request->level_latihan
            );

            Log::info('KONDISI FAKTA:', $kondisiFakta);

            // ============================================================
            // 1. SIMPAN KONSULTASI
            // ============================================================
            $konsultasi = Konsultasi::create([
                'member_id'          => $member->id,
                'tanggal'            => now(),
                'tinggi_badan'       => $request->tinggi_badan,
                'berat_badan'        => $request->berat_badan,
                'bmi'                => $bmi,
                'aktivitas_olahraga' => $request->aktivitas_olahraga,
                'pola_makan_harian'  => $request->pola_makan_harian,
                'level_latihan'      => $request->level_latihan,
                'tujuan_id'          => $request->tujuan_id,
            ]);

            Log::info('KONSULTASI TERSIMPAN ID: ' . $konsultasi->id);

            // ============================================================
            // 2. SIMPAN KONDISI KE consultations_details (DENGAN USER_CF)
            // ============================================================
            $userCfDefault = $request->user_cf ?? 1.00;

            foreach ($kondisiFakta as $kode) {
                $kondisi = Kondisi::where('kode', $kode)->first();
                if (!$kondisi) continue;

                ConsultationDetail::create([
                    'consultations_id' => $konsultasi->id,
                    'condition_code'   => $kode,
                    'user_cf'          => $userCfDefault,
                ]);
            }

            // ============================================================
            // 3. SIMPAN PENYAKIT
            // ============================================================
            $this->savePenyakit($konsultasi->id, $request->penyakit_ids ?? []);

            // ============================================================
            // 4. PROSES CUSTOM PENYAKIT
            // ============================================================
            $customPenyakit = $request->penyakit_custom ?? [];
            if (!empty($customPenyakit)) {
                foreach ($customPenyakit as $nama) {
                    $nama = trim($nama);
                    if (empty($nama)) continue;

                    $penyakit = Penyakit::firstOrCreate(
                        ['nama' => $nama],
                        [
                            'kode' => $this->generateCustomKode(),
                            'catatan_penyesuaian' => null,
                        ]
                    );

                    KonsultasiPenyakit::create([
                        'konsultasi_id' => $konsultasi->id,
                        'penyakit_id'   => $penyakit->id,
                    ]);
                }
            }

            // ============================================================
            // 5. TAHAP 1: FORWARD CHAINING - Kondisi → Fakta
            // ============================================================
            $matchedFacts = $this->forwardChaining->processTahap1($kondisiFakta);

            if (empty($matchedFacts)) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Tidak ditemukan fakta yang sesuai dengan kondisi Anda.'
                ], 422);
            }

            Log::info('FAKTA YANG COCOK:', $matchedFacts);

            // ============================================================
            // 6. TAHAP 2: CARI REKOMENDASI DARI FAKTA + TUJUAN
            // ============================================================
            $recommendations = $this->forwardChaining->processTahap2(
                $matchedFacts,
                $request->tujuan_id
            );

            if (empty($recommendations)) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Tidak ditemukan rekomendasi yang sesuai dengan fakta dan tujuan Anda.'
                ], 422);
            }

            Log::info('REKOMENDASI YANG COCOK:', $recommendations);

            // ============================================================
            // 7. HITUNG CF UNTUK SETIAP REKOMENDASI & AMBIL DETAIL
            // ============================================================
            $results = [];
            foreach ($recommendations as $rec) {
                // ===== REVISI 1: Hitung CF berdasarkan rule_id yang cocok =====
                $cfResult = $this->certaintyFactor->calculateByRule(
                    $konsultasi->id,
                    $rec['rule']->id  // <-- PAKAI RULE_ID, BUKAN FACT_CODE
                );

                // ===== AMBIL DETAIL REKOMENDASI DARI TABEL recommendation_details =====
                $detail = RecommendationDetail::where('recommendation_code', $rec['recommendation']->code)->first();
                
                // AMBIL TRAINING CODE DAN MEAL CODE
                $trainingCode = $detail?->training_code;
                $mealCode = $detail?->meal_code;
                
                // AMBIL OBJECT TRAINING PROGRAM DAN MEAL PLAN
                $trainingProgram = null;
                $mealPlan = null;
                
                if ($trainingCode) {
                    $trainingProgram = TrainingProgram::where('code', $trainingCode)->first();
                }
                if ($mealCode) {
                    $mealPlan = MealPlan::where('code', $mealCode)->first();
                }

                Log::info('RECOMMENDATION DETAIL QUERY:', [
                    'rec_code' => $rec['recommendation']->code,
                    'detail_found' => $detail ? 'YES' : 'NO',
                    'training_code' => $trainingCode,
                    'meal_code' => $mealCode,
                    'training_program_found' => $trainingProgram ? 'YES' : 'NO',
                    'meal_plan_found' => $mealPlan ? 'YES' : 'NO',
                ]);

                $results[] = [
                    'recommendation' => $rec['recommendation'],
                    'rule' => $rec['rule'],
                    'fact' => $rec['fact'],
                    'cf_value' => $cfResult['cf'] ?? 0,
                    'persentase' => $cfResult['persentase'] ?? 0,
                    'program_latihan' => $trainingProgram,
                    'pola_makan' => $mealPlan,
                    'training_code' => $trainingCode,
                    'meal_code' => $mealCode,
                    // Tambahkan detail CF untuk frontend
                    'cf_details' => $cfResult['details'] ?? [],
                ];
            }

            // Urutkan berdasarkan CF tertinggi
            usort($results, fn($a, $b) => $b['cf_value'] <=> $a['cf_value']);

            // ============================================================
            // 8. SIMPAN HASIL KE TABEL KONSULTASI (cf_result)
            // ============================================================
            $bestResult = $results[0] ?? null;
            if ($bestResult) {
                $konsultasi->update([
                    'cf_result' => $bestResult['cf_value']
                ]);
            }

            // ============================================================
            // 9. AMBIL CATATAN PENYAKIT
            // ============================================================
            $catatanPenyakit = [];
            $penyakits = Penyakit::whereIn('id', $request->penyakit_ids ?? [])->get();
            foreach ($penyakits as $p) {
                if (!empty($p->catatan_penyesuaian)) {
                    $catatanPenyakit[] = $p->catatan_penyesuaian;
                }
            }

            // ============================================================
            // 10. FORMAT HASIL UNTUK RESPONSE (KIRIM KE FRONTEND)
            // ============================================================
            $formattedResults = [];
            foreach ($results as $result) {
                $trainingProgram = $result['program_latihan'];
                $mealPlan = $result['pola_makan'];

                $formattedResults[] = [
                    'rule_id' => $result['rule']->id,
                    'rule_nama' => $result['rule']->nama_rule,
                    'cf_value' => $result['cf_value'],
                    'persentase' => $result['persentase'],
                    'cf_details' => $result['cf_details'] ?? [],
                    'training_program' => $trainingProgram ? [
                        'id' => $trainingProgram->id,
                        'code' => $trainingProgram->code,
                        'name' => $trainingProgram->training_name,
                        'description' => $trainingProgram->description,
                    ] : null,
                    'meal_plan' => $mealPlan ? [
                        'id' => $mealPlan->id,
                        'code' => $mealPlan->code,
                        'name' => $mealPlan->meal_name,
                        'description' => $mealPlan->description,
                        'calories' => $mealPlan->calories,
                    ] : null,
                ];
            }

            // ============================================================
            // 11. SIMPAN HASIL REKOMENDASI KE TABEL hasil_rekomendasi
            // ============================================================
            foreach ($formattedResults as $result) {
                $trainingCode = $result['training_program'] ? $result['training_program']['code'] : null;
                $mealCode = $result['meal_plan'] ? $result['meal_plan']['code'] : null;
                
                Log::info('SAVING HASIL REKOMENDASI:', [
                    'konsultasi_id' => $konsultasi->id,
                    'rule_id' => $result['rule_id'],
                    'training_code' => $trainingCode,
                    'meal_code' => $mealCode,
                    'cf_value' => $result['cf_value'],
                    'persentase' => $result['persentase'],
                ]);

                HasilRekomendasi::create([
                    'konsultasi_id' => $konsultasi->id,
                    'rule_id' => $result['rule_id'],
                    'training_code' => $trainingCode,
                    'meal_code' => $mealCode,
                    'cf_value' => $result['cf_value'],
                    'persentase' => $result['persentase'],
                    'catatan_penyakit' => !empty($catatanPenyakit) ? implode(PHP_EOL, $catatanPenyakit) : null,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Konsultasi berhasil',
                'data' => [
                    'konsultasi_id' => $konsultasi->id,
                    'bmi' => $bmi,
                    'fakta_terpilih' => $matchedFacts,
                    'hasil' => $formattedResults,
                    'catatan_penyakit' => $catatanPenyakit,
                ]
            ], 201);

        } catch (Throwable $e) {
            DB::rollBack();
            Log::error('KONSULTASI ERROR: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function buildKondisiFakta(float $bmi, string $aktivitas, string $polaMakan, string $level): array
    {
        $fakta = [];

        if ($bmi >= 25) {
            $fakta[] = 'K1';
        } elseif ($bmi >= 18.5) {
            $fakta[] = 'K2';
        } else {
            $fakta[] = 'K3';
        }

        $fakta[] = $aktivitas === 'jarang' ? 'K4' : 'K5';
        $fakta[] = $polaMakan === 'tidak_teratur' ? 'K6' : 'K7';
        $fakta[] = match ($level) {
            'pemula'   => 'K8',
            'menengah' => 'K9',
            default    => 'K10',
        };

        return $fakta;
    }

    private function savePenyakit(int $konsultasiId, array $penyakitIds): void
    {
        foreach ($penyakitIds as $id) {
            $penyakit = Penyakit::find($id);
            if (!$penyakit) continue;

            KonsultasiPenyakit::create([
                'konsultasi_id' => $konsultasiId,
                'penyakit_id'   => $id,
            ]);
        }
    }

    private function generateCustomKode(): string
    {
        $existingKodes = Penyakit::where('kode', 'REGEXP', '^P[0-9]+$')
            ->pluck('kode')
            ->map(fn($k) => (int) substr($k, 1))
            ->toArray();

        $number = 1;
        while (in_array($number, $existingKodes)) {
            $number++;
        }

        return 'P' . $number;
    }

    public function indexAdmin(Request $request)
    {
        $konsultasi = Konsultasi::with([
            'member.user',
            'tujuan',
            'consultationDetails',
            'hasil.trainingProgram',
            'hasil.mealPlan',
            'hasil.rule'
        ])
        ->latest()
        ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $konsultasi->items(),
            'pagination' => [
                'current_page' => $konsultasi->currentPage(),
                'last_page' => $konsultasi->lastPage(),
                'per_page' => $konsultasi->perPage(),
                'total' => $konsultasi->total(),
            ]
        ]);
    }

    public function destroy(Konsultasi $konsultasi)
    {
        try {
            if (!$konsultasi) {
                return response()->json(['message' => 'Konsultasi tidak ditemukan'], 404);
            }

            DB::beginTransaction();

            $konsultasi->kondisi()->delete();
            $konsultasi->penyakit()->delete();
            $konsultasi->consultationDetails()->delete();
            $konsultasi->hasil()->delete();
            $konsultasi->delete();

            DB::commit();

            return response()->json(['success' => true, 'message' => 'Konsultasi berhasil dihapus']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error delete: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Gagal hapus: ' . $e->getMessage()], 500);
        }
    }
}