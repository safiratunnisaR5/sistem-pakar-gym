<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HasilRekomendasi extends Model
{
    use HasFactory;

    protected $table = 'hasil_rekomendasi';

    protected $fillable = [
        'konsultasi_id',
        'rule_id',
        'training_code',
        'meal_code',
        'cf_value',
        'persentase',
        'catatan_penyakit',
    ];

    protected $casts = [
        'cf_value' => 'float',
        'persentase' => 'float',
    ];

    public function konsultasi()
    {
        return $this->belongsTo(Konsultasi::class);
    }

    public function rule()
    {
        return $this->belongsTo(Rule::class);
    }

    public function trainingProgram()
    {
        return $this->belongsTo(TrainingProgram::class, 'training_code', 'code');
    }

    public function mealPlan()
    {
        return $this->belongsTo(MealPlan::class, 'meal_code', 'code');
    }
}