<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\PenyakitRequest;
use App\Models\Penyakit;

class PenyakitController extends Controller
{
    public function index()
    {
        return Penyakit::orderBy('kode')->get();
    }

    public function store(PenyakitRequest $request)
    {
        return Penyakit::create(
            $request->validated()
        );
    }

    public function show(Penyakit $penyakit)
    {
        return $penyakit;
    }

    public function update(
        PenyakitRequest $request,
        Penyakit $penyakit
    )
    {
        $penyakit->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Berhasil'
        ]);
    }

    public function destroy(Penyakit $penyakit)
    {
        $penyakit->delete();

        return response()->json([
            'message' => 'Berhasil'
        ]);
    }
}