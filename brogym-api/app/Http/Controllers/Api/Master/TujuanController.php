<?php

namespace App\Http\Controllers\Api\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\TujuanRequest;
use App\Models\Tujuan;

class TujuanController extends Controller
{
    public function index()
    {
        return Tujuan::orderBy('kode')->get();
    }

    public function store(TujuanRequest $request)
    {
        return Tujuan::create(
            $request->validated()
        );
    }

    public function show(Tujuan $tujuan)
    {
        return $tujuan;
    }

    public function update(
        TujuanRequest $request,
        Tujuan $tujuan
    )
    {
        $tujuan->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Berhasil'
        ]);
    }

    public function destroy(Tujuan $tujuan)
    {
        $tujuan->delete();

        return response()->json([
            'message' => 'Berhasil'
        ]);
    }
}