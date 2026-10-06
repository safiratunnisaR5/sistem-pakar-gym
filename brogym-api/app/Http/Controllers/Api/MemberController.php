<?php

namespace App\Http\Controllers\Api;

use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    /**
     * Daftar semua member (dengan pencarian & paginasi)
     */
    public function index(Request $request)
    {
        $query = Member::with('user');

        // Pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            })->orWhere('phone', 'like', "%{$search}%");
        }

        // Filter role (jika ingin filter admin/member, tapi default hanya member)
        // Di sini kita hanya ambil yang role-nya Member (role_id = 2, misal)
        // Tergantung seeder Anda, role 'Member' biasanya id = 2
        // Jika tidak, kita bisa filter via relasi

        $members = $query->latest()->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data'    => $members->items(),
            'pagination' => [
                'current_page' => $members->currentPage(),
                'last_page'    => $members->lastPage(),
                'per_page'     => $members->perPage(),
                'total'        => $members->total(),
            ]
        ]);
    }

    /**
     * Detail member
     */
    public function show(Member $member)
    {
        return response()->json([
            'success' => true,
            'data'    => $member->load(['user', 'memberships.package'])
        ]);
    }

    /**
     * Update member (admin)
     */
    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $member = $user->member;

        if (!$member) {
            return response()->json(['message' => 'Member tidak ditemukan'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'required|string',
            'gender' => 'required|in:L,P',
            'birth_date' => 'nullable|date',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        $member->update([
            'phone' => $request->phone,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'data' => $user->fresh()->load('member')
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validator = Validator::make($request->all(), [
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $member->user_id,
            'phone' => 'required|string',
            'gender'=> 'required|in:L,P',
            'birth_date' => 'nullable|date',
            'password' => 'nullable|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();

        try {
            // Update User
            $user = $member->user;
            $user->name  = $request->name;
            $user->email = $request->email;
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }
            $user->save();

            // Update Member
            $member->phone      = $request->phone;
            $member->gender     = $request->gender;
            $member->birth_date = $request->birth_date;
            $member->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Data member berhasil diperbarui',
                'data'    => $member->fresh()->load('user')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Hapus member (soft delete / hard delete terserah)
     * Saya sarankan soft delete, tapi karena tidak ada kolom deleted_at di User/Member,
     * kita akan hapus permanent. Atau kita bisa nonaktifkan saja.
     * Saya akan hapus User dan Member sekaligus (cascade).
     */
    public function destroy(Member $member)
    {
        DB::beginTransaction();

        try {
            $user = $member->user;

            // Hapus member dulu
            $member->delete();

            // Hapus user (cascade)
            $user->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Member berhasil dihapus'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}