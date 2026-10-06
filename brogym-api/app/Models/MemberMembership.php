<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MemberMembership extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'package_id',
        'start_date',
        'end_date',
        'status'
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date'
        ];
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function package()
    {
        return $this->belongsTo(MembershipPackage::class);
    }

    public function isActive(): bool
    {
        return Carbon::today()
            ->lte($this->end_date);
    }
}