<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecommendationDetail extends Model
{
    use HasFactory;

    protected $table = 'recommendation_details';

    protected $fillable = [
        'recommendation_code',
        'meal_code',
        'training_code',
    ];

    public function recommendation()
    {
        return $this->belongsTo(Recommendation::class, 'recommendation_code', 'code');
    }

    public function mealPlan()
    {
        return $this->belongsTo(MealPlan::class, 'meal_code', 'code');
    }

    public function trainingProgram()
    {
        return $this->belongsTo(TrainingProgram::class, 'training_code', 'code');
    }
}