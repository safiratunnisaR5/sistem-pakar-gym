<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Rule;
use App\Models\Member;
use App\Models\Tujuan;
use App\Models\Konsultasi;
use App\Models\Fact;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function admin(): JsonResponse
    {
        $totalMembers = Member::count();
        $totalConsultations = Konsultasi::count();
        $todayConsultations = Konsultasi::whereDate('tanggal', Carbon::today())->count();
        $activeRules = Rule::where('status', true)->count();
        $totalRules = Rule::count();
        $totalFacts = Fact::count();

        $recentMembers = Member::with('user')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn($m) => [
                'id'    => $m->id,
                'name'  => $m->user->name ?? 'N/A',
                'email' => $m->user->email ?? 'N/A',
                'phone' => $m->phone,
            ]);

        $recentConsultations = Konsultasi::with(['member.user', 'tujuan'])
            ->latest('tanggal')
            ->limit(5)
            ->get()
            ->map(function ($k) {
                return [
                    'id'         => $k->id,
                    'member'     => $k->member->user->name ?? 'N/A',
                    'tanggal'    => $k->tanggal,
                    'tujuan'     => $k->tujuan->nama ?? 'N/A',
                    'bmi'        => $k->bmi,
                    'cf_result'  => $k->cf_result,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'stats' => [
                    'total_members'        => $totalMembers,
                    'total_consultations'  => $totalConsultations,
                    'today_consultations'  => $todayConsultations,
                    'active_rules'         => $activeRules,
                    'total_rules'          => $totalRules,
                    'total_facts'          => $totalFacts,
                ],
                'recent_members'      => $recentMembers,
                'recent_consultations'=> $recentConsultations,
            ]
        ]);
    }

    public function member(): JsonResponse
    {
        $user = Auth::user();
        $member = $user->member;

        if (!$member) {
            return response()->json(['message' => 'Member tidak ditemukan'], 404);
        }

        $totalKonsultasi = Konsultasi::where('member_id', $member->id)->count();

        $activeMembership = $member->memberships()
            ->with('package')
            ->where('end_date', '>=', Carbon::today())
            ->first();

        $recentKonsultasi = Konsultasi::where('member_id', $member->id)
            ->with('tujuan')
            ->latest('tanggal')
            ->limit(5)
            ->get()
            ->map(function ($k) {
                return [
                    'id'      => $k->id,
                    'tanggal' => $k->tanggal,
                    'tujuan'  => $k->tujuan->nama ?? 'N/A',
                    'bmi'     => $k->bmi,
                    'cf_result' => $k->cf_result,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'member' => [
                    'id'    => $member->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                    'phone' => $member->phone,
                ],
                'stats' => [
                    'total_konsultasi'   => $totalKonsultasi,
                    'membership_aktif'   => $activeMembership ? true : false,
                    'membership_package' => $activeMembership ? $activeMembership->package->name : null,
                    'membership_expiry'  => $activeMembership ? $activeMembership->end_date : null,
                ],
                'recent_konsultasi' => $recentKonsultasi,
            ]
        ]);
    }
}