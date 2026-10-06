<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KonsultasiPenyakit extends Model
{
    use HasFactory;

    protected $table = 'konsultasi_penyakit';

    protected $fillable = [
        'konsultasi_id',
        'penyakit_id'
    ];

    public function konsultasi()
    {
        return $this->belongsTo(Konsultasi::class);
    }

    public function penyakit()
    {
        return $this->belongsTo(Penyakit::class);
    }
}