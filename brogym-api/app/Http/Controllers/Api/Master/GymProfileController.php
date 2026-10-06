<?php

namespace App\Http\Controllers\Api\Master;

use App\Models\GymProfile;

use App\Http\Controllers\Controller;
use App\Http\Requests\GymProfileRequest;

class GymProfileController extends Controller
{
    public function show()
    {
        return GymProfile::first();
    }

    public function update(
        GymProfileRequest $request
    )
    {
        $profile = GymProfile::first();

        if (!$profile) {
            $profile = GymProfile::create(
                $request->validated()
            );
        } else {
            $profile->update(
                $request->validated()
            );
        }

        return response()->json([
            'message' => 'Profil berhasil diperbarui'
        ]);
    }
}