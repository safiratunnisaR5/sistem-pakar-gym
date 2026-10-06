<?php

namespace App\Http\Controllers\Api;

use App\Models\Konsultasi;
use App\Models\Member;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PdfController extends Controller
{
    /**
     * Generate PDF detail konsultasi (untuk member)
     */
    public function memberKonsultasi($id)
    {
        $member = Auth::user()->member;
        $konsultasi = Konsultasi::with([
            'member.user',
            'tujuan',
            'consultationDetails.condition',
            'hasil.trainingProgram',
            'hasil.mealPlan',
            'hasil.rule'
        ])->where('member_id', $member->id)->findOrFail($id);

        $pdf = Pdf::loadView('pdf.konsultasi-detail', compact('konsultasi'));
        return $pdf->download("konsultasi-{$id}.pdf");
    }

    /**
     * Generate PDF riwayat konsultasi (untuk member)
     */
    public function memberRiwayat()
    {
        $member = Auth::user()->member;
        $konsultasis = Konsultasi::with([
            'tujuan',
            'hasil.trainingProgram',
            'hasil.mealPlan'
        ])
        ->where('member_id', $member->id)
        ->latest()
        ->get();

        $pdf = Pdf::loadView('pdf.riwayat', compact('konsultasis'));
        return $pdf->download("riwayat-konsultasi.pdf");
    }

    /**
     * Admin: Generate PDF konsultasi
     */
    public function konsultasi($id)
    {
        $konsultasi = Konsultasi::with([
            'member.user',
            'tujuan',
            'consultationDetails.condition',
            'hasil.trainingProgram',
            'hasil.mealPlan',
            'hasil.rule'
        ])->findOrFail($id);

        $pdf = Pdf::loadView('pdf.konsultasi', compact('konsultasi'));
        return $pdf->download("konsultasi-{$id}.pdf");
    }

    /**
     * Admin: Generate PDF member
     */
    public function member($id)
    {
        $member = Member::with([
            'user',
            'konsultasi.tujuan',
            'konsultasi.hasil.trainingProgram',
            'konsultasi.hasil.mealPlan'
        ])->findOrFail($id);
        
        $pdf = Pdf::loadView('pdf.member', compact('member'));
        return $pdf->download("member-{$id}.pdf");
    }

    /**
     * Admin: Generate PDF summary
     */
    public function summary(Request $request)
    {
        $startDate = $request->start_date ?? now()->startOfMonth();
        $endDate = $request->end_date ?? now()->endOfMonth();

        $totalKonsultasi = Konsultasi::whereBetween('tanggal', [$startDate, $endDate])->count();
        $totalMembers = Member::count();
        $activeRules = \App\Models\Rule::where('status', 1)->count();
        $recentConsultations = Konsultasi::with('member.user', 'tujuan')
            ->whereBetween('tanggal', [$startDate, $endDate])
            ->latest()
            ->limit(10)
            ->get();

        $pdf = Pdf::loadView('pdf.summary', compact(
            'startDate', 'endDate', 'totalKonsultasi', 'totalMembers', 'activeRules', 'recentConsultations'
        ));
        return $pdf->download("laporan-summary.pdf");
    }
}