<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recommendation extends Model
{
    use HasFactory;

    protected $table = 'recommendations';

    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'recommendation_name',
        'description',
    ];

    public function details()
    {
        return $this->hasMany(RecommendationDetail::class, 'recommendation_code', 'code');
    }

    public function rules()
    {
        return $this->hasMany(Rule::class, 'recommendation_code', 'code');
    }
}