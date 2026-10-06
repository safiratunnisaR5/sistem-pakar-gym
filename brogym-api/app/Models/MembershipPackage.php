<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MembershipPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'duration_days'
    ];

    public function memberships()
    {
        return $this->hasMany(MemberMembership::class,'package_id');
    }
}