<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Member;
use App\Models\MemberMembership;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\MembershipPackage;
use Illuminate\Support\Facades\DB;

class MembershipController extends Controller
{
    /**
     * Daftar semua membership (admin)
     */
    public function index(Request $request)
    {
        $query = MemberMembership::with(['member.user', 'package']);

        if ($request->filled('member_id')) {
            $query->where('member_id', $request->member_id);
        }

        if ($request->filled('status')) {
            if ($request->status === 'aktif') {
                $query->where('status', 'aktif');
            } elseif ($request->status === 'kadaluarsa') {
                $query->where('status', 'kadaluarsa');
            }
        }

        $memberships = $query->latest()->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data'    => $memberships->items(),
            'pagination' => [
                'current_page' => $memberships->currentPage(),
                'last_page'    => $memberships->lastPage(),
                'per_page'     => $memberships->perPage(),
                'total'        => $memberships->total(),
            ]
        ]);
    }

    /**
     * Aktivasi membership baru untuk member
     */
    public function store(Request $request)
    {
        $request->validate([
            'member_id'   => 'required|exists:members,id',
            'package_id'  => 'required|exists:membership_packages,id',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after:start_date',
        ]);

        $member = Member::find($request->member_id);

        // Nonaktifkan membership aktif lainnya
        MemberMembership::where('member_id', $member->id)
            ->where('status', 'aktif')
            ->update(['status' => 'kadaluarsa']);

        $membership = MemberMembership::create([
            'member_id'  => $request->member_id,
            'package_id' => $request->package_id,
            'start_date' => $request->start_date,
            'end_date'   => $request->end_date,
            'status'     => 'aktif',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Membership berhasil diaktifkan',
            'data'    => $membership->load(['member.user', 'package']),
        ], 201);
    }

    /**
     * Detail membership
     */
    public function show(MemberMembership $membership)
    {
        return response()->json([
            'success' => true,
            'data'    => $membership->load(['member.user', 'package'])
        ]);
    }

    /**
     * Perpanjang membership
     */
    public function update(Request $request, MemberMembership $membership)
    {
        $request->validate([
            'end_date'   => 'required|date|after:today',
            'package_id' => 'sometimes|exists:membership_packages,id',
        ]);

        $membership->update([
            'end_date'   => $request->end_date,
            'package_id' => $request->package_id ?? $membership->package_id,
            'status'     => 'aktif',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Membership berhasil diperpanjang',
            'data'    => $membership->fresh()->load(['member.user', 'package'])
        ]);
    }

    /**
     * Nonaktifkan membership (soft delete / ubah status menjadi kadaluarsa)
     */
    public function destroy(MemberMembership $membership)
    {
        $membership->update(['status' => 'kadaluarsa']);

        return response()->json([
            'success' => true,
            'message' => 'Membership dinonaktifkan'
        ]);
    }

    /**
     * Cek membership member yang sedang login
     */
    public function myMembership()
    {
        $member = auth()->user()->member;

        if (!$member) {
            return response()->json(['message' => 'Member tidak ditemukan'], 404);
        }

        $active = $member->memberships()
            ->with('package')
            ->where('status', 'aktif')
            ->first();

        $history = $member->memberships()
            ->with('package')
            ->where('status', 'kadaluarsa')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'active'  => $active,
                'history' => $history,
            ]
        ]);
    }
}