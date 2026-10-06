<?php

namespace App\Http\Controllers\Api\Master;

use App\Models\Kondisi;

use App\Http\Controllers\Controller;
use App\Http\Requests\KondisiRequest;

class KondisiController extends Controller
{
    public function index()
    {
        return Kondisi::orderBy('kode')->get();
    }

    public function store(
        KondisiRequest $request
    )
    {
        return Kondisi::create(
            $request->validated()
        );
    }

    public function show(
        Kondisi $kondisi
    )
    {
        return $kondisi;
    }

    public function update(
        KondisiRequest $request,
        Kondisi $kondisi
    )
    {
        $kondisi->update(
            $request->validated()
        );

        return response()->json([
            'message'=>'Berhasil'
        ]);
    }

    public function destroy(
        Kondisi $kondisi
    )
    {
        $kondisi->delete();

        return response()->json([
            'message'=>'Berhasil'
        ]);
    }
}