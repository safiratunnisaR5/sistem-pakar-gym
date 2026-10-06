<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Konsultasi</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; }
        .subtitle { font-size: 14px; color: #666; }
        .section { margin-bottom: 15px; }
        .label { font-weight: bold; }
        .rekomendasi { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
        .footer { text-align: center; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #666; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Laporan Konsultasi</div>
        <div class="subtitle">BroGym Fitness Center</div>
    </div>

    <div class="section">
        <p><span class="label">Member:</span> {{ $konsultasi->member->user->name }}</p>
        <p><span class="label">Tanggal:</span> {{ \Carbon\Carbon::parse($konsultasi->tanggal)->format('d F Y') }}</p>
        <p><span class="label">BMI:</span> {{ $konsultasi->bmi }}</p>
        <p><span class="label">Tujuan:</span> {{ $konsultasi->tujuan->nama ?? '-' }}</p>
    </div>

    <div class="section">
        <h3>Rekomendasi ({{ $konsultasi->hasil->count() }})</h3>
        @foreach($konsultasi->hasil as $item)
        <div class="rekomendasi">
            <p><strong>{{ $item->rule->nama_rule ?? 'Rule' }}</strong></p>
            <p>CF: {{ $item->cf_value }} ({{ $item->persentase }}%)</p>
            <table>
                <tr>
                    <th>Program Latihan</th>
                    <th>Pola Makan</th>
                </tr>
                <tr>
                    <td>
                        <strong>{{ $item->trainingProgram->training_name ?? '-' }}</strong><br>
                        {{ $item->trainingProgram->description ?? '' }}
                    </td>
                    <td>
                        <strong>{{ $item->mealPlan->meal_name ?? '-' }}</strong><br>
                        {{ $item->mealPlan->description ?? '' }}<br>
                        Kalori: {{ $item->mealPlan->calories ?? '-' }}
                    </td>
                </tr>
            </table>
        </div>
        @endforeach
    </div>

    @if($konsultasi->hasil->first()?->catatan_penyakit)
    <div class="section" style="background-color: #fff3cd; padding: 10px; border-radius: 5px;">
        <p><strong>Catatan Penyakit:</strong></p>
        <p>{{ $konsultasi->hasil->first()->catatan_penyakit }}</p>
    </div>
    @endif

    <div class="footer">
        Dicetak pada: {{ now()->format('d F Y H:i:s') }}
    </div>
</body>
</html>