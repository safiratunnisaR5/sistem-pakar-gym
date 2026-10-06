<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FactCf extends Model
{
    use HasFactory;

    protected $table = 'fact_cf';

    protected $fillable = [
        'fact_code',
        'cf_value',
    ];

    protected $casts = [
        'cf_value' => 'float',
    ];

    public function fact()
    {
        return $this->belongsTo(Fact::class, 'fact_code', 'code');
    }
}