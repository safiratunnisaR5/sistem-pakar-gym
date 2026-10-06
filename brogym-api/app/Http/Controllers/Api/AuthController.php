<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Role;
use App\Models\Member;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $memberRole = Role::where(
            'name',
            'Member'
        )->first();

        $user = User::create([

            'role_id' => $memberRole->id,

            'name' => $request->name,

            'email' => $request->email,

            'password' => Hash::make(
                $request->password
            ),
        ]);

        Member::create([

            'user_id' => $user->id,

            'phone' => $request->phone,

            'gender' => $request->gender,

            'birth_date' => $request->birth_date,
        ]);

        $token = $user->createToken(
            'member-token'
        )->plainTextToken;

        return response()->json([
            'message' => 'Register berhasil',
            'token' => $token,
            'user' => $user
        ],201);
    }

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {

            return response()->json([
                'message' => 'Email atau Password salah'
            ],401);
        }

        $user = User::with('role')
            ->where('email',$request->email)
            ->first();

        $token = $user
            ->createToken('auth-token')
            ->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function me(Request $request)
    {
        return response()->json(
            $request->user()->load([
                'role',
                'member'
            ])
        );
    }

    public function logout(Request $request)
    {
        $request
            ->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            'message' => 'Logout berhasil'
        ]);
    }
}