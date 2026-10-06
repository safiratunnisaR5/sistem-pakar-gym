<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KonsultasiKondisi extends Model
{
    use HasFactory;

    protected $table = 'konsultasi_kondisi';

    protected $fillable = [
        'konsultasi_id',
        'kondisi_id',
        'user_cf',  // <-- TAMBAHKAN
    ];

    protected $casts = [
        'user_cf' => 'float',
    ];

    public function konsultasi()
    {
        return $this->belongsTo(Konsultasi::class);
    }

    public function kondisi()
    {
        return $this->belongsTo(Kondisi::class);
    }
}