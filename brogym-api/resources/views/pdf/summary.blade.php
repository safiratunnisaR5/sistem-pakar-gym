<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Ringkasan</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; }
        .subtitle { font-size: 14px; color: #666; }
        .section { margin-bottom: 15px; }
        .label { font-weight: bold; }
        .stat { background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
        .footer { text-align: center; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #666; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Laporan Ringkasan</div>
        <div class="subtitle">BroGym Fitness Center</div>
        <p>Periode: {{ \Carbon\Carbon::parse($startDate)->format('d F Y') }} - {{ \Carbon\Carbon::parse($endDate)->format('d F Y') }}</p>
    </div>

    <div class="section">
        <div class="stat">
            <h3>Statistik</h3>
            <p><span class="label">Total Member:</span> {{ $totalMembers }}</p>
            <p><span class="label">Total Konsultasi:</span> {{ $totalKonsultasi }}</p>
            <p><span class="label">Rule Aktif:</span> {{ $activeRules }}</p>
        </div>
    </div>

    <div class="section">
        <h3>Top Konsultasi Terbaru</h3>
        <table>
            <thead>
                <tr>
                    <th>Member</th>
                    <th>Tanggal</th>
                    <th>BMI</th>
                    <th>Tujuan</th>
                </tr>
            </thead>
            <tbody>
                @foreach($recentConsultations as $k)
                <tr>
                    <td>{{ $k->member->user->name }}</td>
                    <td>{{ \Carbon\Carbon::parse($k->tanggal)->format('d/m/Y') }}</td>
                    <td>{{ $k->bmi }}</td>
                    <td>{{ $k->tujuan->nama ?? '-' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="footer">
        Dicetak pada: {{ now()->format('d F Y H:i:s') }}
    </div>
</body>
</html>