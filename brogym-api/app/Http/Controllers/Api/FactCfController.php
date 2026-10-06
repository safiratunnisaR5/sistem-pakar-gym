<?php

namespace App\Http\Controllers\Api;

use App\Models\FactCf;
use App\Models\Fact;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FactCfController extends Controller
{
    public function index()
    {
        $cf = FactCf::with('fact')->get();
        return response()->json($cf);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fact_code' => 'required|exists:facts,code|unique:fact_cf,fact_code',
            'cf_value' => 'required|numeric|min:0|max:1',
        ]);

        $cf = FactCf::create($request->all());
        return response()->json($cf->load('fact'), 201);
    }

    public function show($id)
    {
        $cf = FactCf::with('fact')->findOrFail($id);
        return response()->json($cf);
    }

    public function update(Request $request, $id)
    {
        $cf = FactCf::findOrFail($id);

        $request->validate([
            'cf_value' => 'required|numeric|min:0|max:1',
        ]);

        $cf->update(['cf_value' => $request->cf_value]);
        return response()->json($cf->load('fact'));
    }

    public function destroy($id)
    {
        $cf = FactCf::findOrFail($id);
        $cf->delete();
        return response()->json(['message' => 'CF berhasil dihapus']);
    }

    public function getByFact($factCode)
    {
        $cf = FactCf::with('fact')->where('fact_code', $factCode)->first();
        if (!$cf) {
            return response()->json(['message' => 'CF tidak ditemukan'], 404);
        }
        return response()->json($cf);
    }
}