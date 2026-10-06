<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MealPlan extends Model
{
    use HasFactory;

    protected $table = 'meal_plans';

    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'meal_name',
        'description',
        'calories',
    ];

    public function recommendationDetails()
    {
        return $this->hasMany(RecommendationDetail::class, 'meal_code', 'code');
    }
}