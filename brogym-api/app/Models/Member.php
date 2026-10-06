<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone',
        'gender',
        'birth_date',
        'height',
        'weight',
        'bmi'
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'height' => 'float',
            'weight' => 'float',
            'bmi' => 'float'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function memberships()
    {
        return $this->hasMany(MemberMembership::class);
    }

    public function konsultasi()
    {
        return $this->hasMany(Konsultasi::class);
    }
}