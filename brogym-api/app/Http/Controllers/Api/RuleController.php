<?php

namespace App\Http\Controllers\Api;

use App\Models\Rule;
use App\Models\RuleDetail;
use App\Models\Tujuan;
use App\Models\Fact;
use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\RuleRequest;

class RuleController extends Controller
{
    public function index()
    {
        $rules = Rule::with([
            'details.condition',
            'fact',
            'tujuan',
            'recommendation'
        ])
        ->latest()
        ->get();

        return response()->json($rules);
    }

    public function store(RuleRequest $request)
{
    DB::beginTransaction();

    try {
        $rule = Rule::create([
            'kode_rule' => $request->kode_rule,
            'nama_rule' => $request->nama_rule,
            'fact_code' => $request->fact_code,
            'tujuan_id' => $request->tujuan_id,
            'recommendation_code' => $request->recommendation_code,
            'status' => $request->status,
        ]);

        // ===== SIMPAN CONDITION_CODE (STRING) =====
        foreach ($request->kondisi_ids as $kondisiKode) {
            RuleDetail::create([
                'rule_code' => $rule->kode_rule,
                'condition_code' => $kondisiKode,  // <-- KIRIM KODE
                'cf_expert' => $request->cf_expert ?? 0.8,
            ]);
        }

        DB::commit();

        return response()->json([
            'message' => 'Rule berhasil dibuat',
            'data' => $rule->load(['details.condition', 'fact', 'tujuan', 'recommendation'])
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'message' => $e->getMessage()
        ], 500);
    }
}

    public function show(Rule $rule)
    {
        return response()->json(
            $rule->load([
                'details.condition',
                'fact',
                'tujuan',
                'recommendation'
            ])
        );
    }

    public function update(RuleRequest $request, Rule $rule)
{
    DB::beginTransaction();

    try {
        $rule->update([
            'nama_rule' => $request->nama_rule,
            'fact_code' => $request->fact_code,
            'tujuan_id' => $request->tujuan_id,
            'recommendation_code' => $request->recommendation_code,
            'status' => $request->status,
        ]);

        // ===== SIMPAN CONDITION_CODE (STRING) =====
        RuleDetail::where('rule_code', $rule->kode_rule)->delete();

        foreach ($request->kondisi_ids as $kondisiKode) {
            RuleDetail::create([
                'rule_code' => $rule->kode_rule,
                'condition_code' => $kondisiKode,  // <-- KIRIM KODE
                'cf_expert' => $request->cf_expert ?? 0.8,
            ]);
        }

        DB::commit();

        return response()->json([
            'message' => 'Rule berhasil diperbarui'
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'message' => $e->getMessage()
        ], 500);
    }
}

    public function destroy(Rule $rule)
    {
        DB::beginTransaction();

        try {
            RuleDetail::where('rule_code', $rule->kode_rule)->delete();
            $rule->delete();

            DB::commit();

            return response()->json([
                'message' => 'Rule berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // ===== GET RULES BY FACT =====
    public function getByFact($factCode)
    {
        $rules = Rule::with(['details.condition', 'tujuan', 'recommendation'])
            ->where('fact_code', $factCode)
            ->get();

        return response()->json($rules);
    }

    // ===== GET RULES BY GOAL =====
    public function getByGoal($tujuanId)
    {
        $rules = Rule::with(['details.condition', 'fact', 'recommendation'])
            ->where('tujuan_id', $tujuanId)
            ->get();

        return response()->json($rules);
    }

    // ===== GET TAHAP 1 RULES (Kondisi → Fakta) =====
    public function getTahap1()
    {
        $rules = Rule::with(['details.condition', 'fact'])
            ->whereNull('tujuan_id')
            ->whereNull('recommendation_code')
            ->get();

        return response()->json($rules);
    }

    // ===== GET TAHAP 2 RULES (Fakta + Tujuan → Rekomendasi) =====
    public function getTahap2()
    {
        $rules = Rule::with(['fact', 'tujuan', 'recommendation'])
            ->whereNotNull('tujuan_id')
            ->whereNotNull('recommendation_code')
            ->get();

        return response()->json($rules);
    }
}