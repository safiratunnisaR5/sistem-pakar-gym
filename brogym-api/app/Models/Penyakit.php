<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Penyakit extends Model
{
    use HasFactory;

    protected $table = 'penyakit';

    protected $fillable = [
        'kode',
        'nama',
        'catatan_penyesuaian'
    ];

    protected $attributes = [
        'catatan_penyesuaian' => null,
    ];
    
    public function konsultasiPenyakit()
    {
        return $this->hasMany(KonsultasiPenyakit::class);
    }
}