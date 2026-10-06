<?php

namespace App\Http\Controllers\Api;

use App\Models\Fact;
use App\Models\FactCf;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FactController extends Controller
{
    public function index()
    {
        $facts = Fact::with('cf')->orderBy('code')->get();
        return response()->json($facts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:20|unique:facts,code',
            'fact_name' => 'required|string|max:100',
            'condition_codes' => 'nullable|string',
            'description' => 'nullable|string',
            'cf_value' => 'nullable|numeric|min:0|max:1',
        ]);

        DB::beginTransaction();

        try {
            $fact = Fact::create([
                'code' => $request->code,
                'fact_name' => $request->fact_name,
                'condition_codes' => $request->condition_codes,
                'description' => $request->description,
            ]);

            if ($request->has('cf_value')) {
                FactCf::create([
                    'fact_code' => $fact->code,
                    'cf_value' => $request->cf_value,
                ]);
            }

            DB::commit();
            return response()->json($fact->load('cf'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal membuat fakta'], 500);
        }
    }

    public function show($code)
    {
        $fact = Fact::with('cf')->where('code', $code)->firstOrFail();
        return response()->json($fact);
    }

    public function update(Request $request, $code)
    {
        $fact = Fact::where('code', $code)->firstOrFail();

        $request->validate([
            'fact_name' => 'required|string|max:100',
            'condition_codes' => 'nullable|string',
            'description' => 'nullable|string',
            'cf_value' => 'nullable|numeric|min:0|max:1',
        ]);

        DB::beginTransaction();

        try {
            $fact->update([
                'fact_name' => $request->fact_name,
                'condition_codes' => $request->condition_codes,
                'description' => $request->description,
            ]);

            if ($request->has('cf_value')) {
                FactCf::updateOrCreate(
                    ['fact_code' => $fact->code],
                    ['cf_value' => $request->cf_value]
                );
            }

            DB::commit();
            return response()->json($fact->load('cf'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal mengupdate fakta'], 500);
        }
    }

    public function destroy($code)
    {
        $fact = Fact::where('code', $code)->firstOrFail();

        DB::beginTransaction();

        try {
            $fact->cf()->delete();
            $fact->delete();
            DB::commit();
            return response()->json(['message' => 'Fakta berhasil dihapus']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menghapus fakta'], 500);
        }
    }
}