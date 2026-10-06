<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\MembershipController;
use App\Http\Controllers\Api\KonsultasiController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\PdfController;
use App\Http\Controllers\Api\RuleController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\FactController;
use App\Http\Controllers\Api\FactCfController;

use App\Http\Controllers\Api\Master\GymProfileController;
use App\Http\Controllers\Api\Master\MembershipPackageController;
use App\Http\Controllers\Api\Master\KondisiController;
use App\Http\Controllers\Api\Master\TujuanController;
use App\Http\Controllers\Api\Master\PenyakitController;
use App\Http\Controllers\Api\Master\MealPlanController;
use App\Http\Controllers\Api\Master\TrainingProgramController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ============================================================
// PUBLIC ROUTES (tanpa auth)
// ============================================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// ============================================================
// ROUTES YANG MEMBUTUHKAN AUTH SANCTUM
// ============================================================
Route::middleware('auth:sanctum')->group(function () {

    // ============================================================
    // AUTH
    // ============================================================
    Route::get('/me',      [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // ============================================================
    // DASHBOARD
    // ============================================================
    Route::get('/admin/dashboard',   [DashboardController::class, 'admin'])->middleware('role:Admin');
    Route::get('/member/dashboard',  [DashboardController::class, 'member'])->middleware('role:Member');

    // ============================================================
    // MASTER DATA (PUBLIC untuk Member & Admin)
    // ============================================================
    Route::get('/tujuan', [TujuanController::class, 'index']);
    Route::get('/penyakit', [PenyakitController::class, 'index']);
    Route::get('/kondisi', [KondisiController::class, 'index']);
    Route::get('/facts', [FactController::class, 'index']);
    Route::get('/facts/{code}', [FactController::class, 'show']);
    Route::get('/recommendations', [RecommendationController::class, 'index']);
    Route::get('/recommendations/{code}', [RecommendationController::class, 'show']);

    // ============================================================
    // KONSULTASI (Member)
    // ============================================================
    Route::post('/konsultasi', [KonsultasiController::class, 'store'])->middleware('role:Member');
    Route::get('/history', [HistoryController::class, 'index'])->middleware('role:Member');
    Route::get('/history/{id}', [HistoryController::class, 'show'])->middleware('role:Member');
    Route::get('/history/latest', [HistoryController::class, 'latest'])->middleware('role:Member');

    // ============================================================
    // MEMBERSHIP (Member)
    // ============================================================
    Route::get('/my-membership', [MembershipController::class, 'myMembership'])->middleware('role:Member');

    // ============================================================
    // PROFILE (Member)
    // ============================================================
    Route::put('/member/profile', [MemberController::class, 'updateProfile'])->middleware('role:Member');

    // ============================================================
    // PDF (Member)
    // ============================================================
    Route::prefix('member/pdf')->middleware('role:Member')->group(function () {
        Route::get('konsultasi/{id}', [PdfController::class, 'memberKonsultasi']);
        Route::get('riwayat', [PdfController::class, 'memberRiwayat']);
    });

    // ============================================================
    // ROUTE ADMIN (dengan middleware role:Admin)
    // ============================================================
    Route::prefix('admin')->middleware('role:Admin')->group(function () {

        // ============================================================
        // MEMBER CRUD
        // ============================================================
        Route::apiResource('members', MemberController::class);

        // ============================================================
        // MEMBERSHIP CRUD
        // ============================================================
        Route::apiResource('memberships', MembershipController::class);

        // ============================================================
        // PDF (Admin)
        // ============================================================
        Route::prefix('pdf')->group(function () {
            Route::get('konsultasi/{id}', [PdfController::class, 'konsultasi']);
            Route::get('member/{id}',     [PdfController::class, 'member']);
            Route::get('summary',         [PdfController::class, 'summary']);
        });

        // ============================================================
        // ACTIVITY LOG
        // ============================================================
        Route::prefix('activity-logs')->group(function () {
            Route::get('/',          [ActivityLogController::class, 'index']);
            Route::get('/{id}',      [ActivityLogController::class, 'show']);
            Route::delete('/{id}',   [ActivityLogController::class, 'destroy']);
        });

        // ============================================================
        // MASTER DATA (di dalam prefix 'master')
        // ============================================================
        Route::prefix('master')->group(function () {

            // Gym Profile
            Route::get('gym-profile',        [GymProfileController::class, 'show']);
            Route::put('gym-profile',        [GymProfileController::class, 'update']);

            // Membership Package
            Route::apiResource('packages',   MembershipPackageController::class);

            // Kondisi
            Route::apiResource('kondisi',    KondisiController::class);

            // Tujuan
            Route::apiResource('tujuan',     TujuanController::class);

            // Penyakit
            Route::apiResource('penyakit',   PenyakitController::class);

            // Meal Plan (ganti Pola Makan)
            Route::apiResource('meal-plans', MealPlanController::class);

            // Training Program (ganti Program Latihan)
            Route::apiResource('training-programs', TrainingProgramController::class);

            // Facts (CRUD Admin)
            Route::post('/facts', [FactController::class, 'store']);
            Route::put('/facts/{code}', [FactController::class, 'update']);
            Route::delete('/facts/{code}', [FactController::class, 'destroy']);

            // Fact CF (CRUD Admin)
            Route::prefix('fact-cf')->group(function () {
                Route::get('/', [FactCfController::class, 'index']);
                Route::get('/{id}', [FactCfController::class, 'show']);
                Route::get('/by-fact/{factCode}', [FactCfController::class, 'getByFact']);
                Route::post('/', [FactCfController::class, 'store']);
                Route::put('/{id}', [FactCfController::class, 'update']);
                Route::delete('/{id}', [FactCfController::class, 'destroy']);
            });
        });

        // ============================================================
        // RULES
        // ============================================================
        Route::prefix('rules')->group(function () {
            Route::get('/',          [RuleController::class, 'index']);
            Route::post('/',         [RuleController::class, 'store']);
            Route::get('/{rule}',    [RuleController::class, 'show']);
            Route::put('/{rule}',    [RuleController::class, 'update']);
            Route::delete('/{rule}', [RuleController::class, 'destroy']);
            
            // Filter rules
            Route::get('/by-fact/{factCode}', [RuleController::class, 'getByFact']);
            Route::get('/by-goal/{tujuanId}', [RuleController::class, 'getByGoal']);
            Route::get('/tahap1', [RuleController::class, 'getTahap1']);
            Route::get('/tahap2', [RuleController::class, 'getTahap2']);
        });

        // ============================================================
        // KONSULTASI (Admin)
        // ============================================================
        Route::prefix('konsultasi')->group(function () {
            Route::get('/', [KonsultasiController::class, 'indexAdmin']);
            Route::delete('/{konsultasi}', [KonsultasiController::class, 'destroy']);
        });

        // ============================================================
        // RECOMMENDATIONS (Admin)
        // ============================================================
        Route::prefix('recommendations')->group(function () {
            Route::get('/', [RecommendationController::class, 'index']);      // <-- TAMBAHKAN
            Route::get('/{code}', [RecommendationController::class, 'show']); // <-- TAMBAHKAN
            Route::post('/', [RecommendationController::class, 'store']);
            Route::put('/{code}', [RecommendationController::class, 'update']);
            Route::delete('/{code}', [RecommendationController::class, 'destroy']);
        });

    }); // end admin group

}); // end auth:sanctum group