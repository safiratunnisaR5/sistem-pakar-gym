<?php

namespace App\Http\Controllers\Api\Master;

use App\Models\MembershipPackage;

use App\Http\Controllers\Controller;
use App\Http\Requests\MembershipPackageRequest;

class MembershipPackageController extends Controller
{
    public function index()
    {
        return MembershipPackage::latest()->get();
    }

    public function store(
        MembershipPackageRequest $request
    )
    {
        $data = MembershipPackage::create(
            $request->validated()
        );

        return response()->json($data,201);
    }

    public function show(
        MembershipPackage $membershipPackage
    )
    {
        return $membershipPackage;
    }

    public function update(
        MembershipPackageRequest $request,
        MembershipPackage $membershipPackage
    )
    {
        $membershipPackage->update(
            $request->validated()
        );

        return response()->json([
            'message'=>'Berhasil diperbarui'
        ]);
    }

    public function destroy(
        MembershipPackage $membershipPackage
    )
    {
        $membershipPackage->delete();

        return response()->json([
            'message'=>'Berhasil dihapus'
        ]);
    }
}