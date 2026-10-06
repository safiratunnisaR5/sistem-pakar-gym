<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Member</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; }
        .subtitle { font-size: 14px; color: #666; }
        .section { margin-bottom: 15px; }
        .label { font-weight: bold; }
        .footer { text-align: center; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #666; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Laporan Member</div>
        <div class="subtitle">BroGym Fitness Center</div>
    </div>

    <div class="section">
        <p><span class="label">Nama:</span> {{ $member->user->name }}</p>
        <p><span class="label">Email:</span> {{ $member->user->email }}</p>
        <p><span class="label">Telepon:</span> {{ $member->phone }}</p>
        <p><span class="label">Gender:</span> {{ $member->gender == 'L' ? 'Laki-laki' : 'Perempuan' }}</p>
        <p><span class="label">Tanggal Lahir:</span> {{ $member->birth_date ? \Carbon\Carbon::parse($member->birth_date)->format('d F Y') : '-' }}</p>
        <p><span class="label">Bergabung:</span> {{ $member->created_at->format('d F Y') }}</p>
    </div>

    <div class="section">
        <h3>Riwayat Konsultasi ({{ $member->konsultasi->count() }})</h3>
        @if($member->konsultasi->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>BMI</th>
                    <th>Tujuan</th>
                    <th>Program</th>
                    <th>Persentase</th>
                </tr>
            </thead>
            <tbody>
                @foreach($member->konsultasi as $k)
                @php
                    $firstResult = $k->hasil->first();
                @endphp
                <tr>
                    <td>{{ \Carbon\Carbon::parse($k->tanggal)->format('d/m/Y') }}</td>
                    <td>{{ $k->bmi }}</td>
                    <td>{{ $k->tujuan->nama ?? '-' }}</td>
                    <td>{{ $firstResult?->trainingProgram?->training_name ?? '-' }}</td>
                    <td>{{ $firstResult?->persentase ?? 0 }}%</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @else
        <p>Belum ada konsultasi.</p>
        @endif
    </div>

    <div class="footer">
        Dicetak pada: {{ now()->format('d F Y H:i:s') }}
    </div>
</body>
</html>