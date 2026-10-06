<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Konsultasi extends Model
{
    use HasFactory;

    protected $table = 'konsultasi';

    protected $fillable = [
        'member_id',
        'tanggal',
        'tinggi_badan',
        'berat_badan',
        'bmi',
        'aktivitas_olahraga',
        'pola_makan_harian',
        'level_latihan',
        'tujuan_id',
        'cf_result',
    ];

    protected $casts = [
        'tanggal' => 'datetime',
        'tinggi_badan' => 'float',
        'berat_badan' => 'float',
        'bmi' => 'float',
        'cf_result' => 'float',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function tujuan()
    {
        return $this->belongsTo(Tujuan::class);
    }

    public function kondisi()
    {
        return $this->hasMany(KonsultasiKondisi::class);
    }

    public function penyakit()
    {
        return $this->hasMany(KonsultasiPenyakit::class);
    }

    public function consultationDetails()
    {
        return $this->hasMany(ConsultationDetail::class, 'consultations_id');
    }

    public function hasil()
    {
        return $this->hasMany(HasilRekomendasi::class);
    }
}