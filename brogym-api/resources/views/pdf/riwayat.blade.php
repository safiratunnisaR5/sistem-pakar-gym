<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Riwayat Konsultasi</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; }
        .subtitle { font-size: 14px; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .footer { text-align: center; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Riwayat Konsultasi</div>
        <div class="subtitle">BroGym Fitness Center</div>
        <p>Member: {{ Auth::user()->name }}</p>
    </div>

    @if($konsultasis->count() > 0)
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>BMI</th>
                <th>Tujuan</th>
                <th>Program</th>
                <th>Persentase</th>
            </tr>
        </thead>
        <tbody>
            @foreach($konsultasis as $k)
            @php
                $firstResult = $k->hasil->first();
                $programName = $firstResult?->trainingProgram?->training_name ?? '-';
                $persentase = $firstResult?->persentase ?? 0;
            @endphp
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ \Carbon\Carbon::parse($k->tanggal)->format('d/m/Y') }}</td>
                <td>{{ $k->bmi }}</td>
                <td>{{ $k->tujuan->nama ?? '-' }}</td>
                <td>{{ $programName }}</td>
                <td>{{ $persentase }}%</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @else
    <p>Belum ada konsultasi.</p>
    @endif

    <div class="footer">
        Dicetak pada: {{ now()->format('d F Y H:i:s') }}
    </div>
</body>
</html>