<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Kondisi extends Model
{
    use HasFactory;

    protected $table = 'kondisi';

    protected $fillable = [
        'kode',
        'nama'
    ];

    public function consultationDetails()
    {
        return $this->hasMany(ConsultationDetail::class, 'condition_code', 'kode');
    }

    public function ruleDetails()
    {
        return $this->hasMany(RuleDetail::class, 'condition_code', 'kode');
    }
}