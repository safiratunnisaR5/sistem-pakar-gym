<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RuleDetail extends Model
{
    use HasFactory;

    protected $table = 'rule_details';

    protected $fillable = [
        'rule_code',
        'condition_code',
        'cf_expert',
    ];

    protected $casts = [
        'cf_expert' => 'float',
    ];

    public function rule()
    {
        return $this->belongsTo(Rule::class, 'rule_code', 'kode_rule');
    }

    public function condition()
    {
        return $this->belongsTo(Kondisi::class, 'condition_code', 'kode');
    }
}