<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingProgram extends Model
{
    use HasFactory;

    protected $table = 'training_programs';

    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'training_name',
        'description',
    ];

    public function recommendationDetails()
    {
        return $this->hasMany(RecommendationDetail::class, 'training_code', 'code');
    }
}