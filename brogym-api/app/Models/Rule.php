<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rule extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_rule',
        'nama_rule',
        'fact_code',
        'tujuan_id',
        'recommendation_code',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function fact()
    {
        return $this->belongsTo(Fact::class, 'fact_code', 'code');
    }

    public function tujuan()
    {
        return $this->belongsTo(Tujuan::class);
    }

    public function recommendation()
    {
        return $this->belongsTo(Recommendation::class, 'recommendation_code', 'code');
    }

    public function details()
    {
        return $this->hasMany(RuleDetail::class, 'rule_code', 'kode_rule');
    }
}