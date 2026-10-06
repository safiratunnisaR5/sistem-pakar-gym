<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tujuan extends Model
{
    use HasFactory;

    protected $table = 'tujuan';

    protected $fillable = [
        'kode',
        'nama'
    ];

    public function konsultasi()
    {
        return $this->hasMany(Konsultasi::class);
    }

    public function rules()
    {
        return $this->hasMany(Rule::class);
    }
}