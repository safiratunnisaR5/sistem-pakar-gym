<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fact extends Model
{
    use HasFactory;

    protected $table = 'facts';

    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'fact_name',
        'condition_codes',
        'description',
    ];

    public function rules()
    {
        return $this->hasMany(Rule::class, 'fact_code', 'code');
    }

    public function cf()
    {
        return $this->hasOne(FactCf::class, 'fact_code', 'code');
    }
}