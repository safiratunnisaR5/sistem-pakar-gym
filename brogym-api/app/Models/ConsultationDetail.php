<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ConsultationDetail extends Model
{
    use HasFactory;

    protected $table = 'consultations_details';

    protected $fillable = [
        'consultations_id',
        'condition_code',
        'user_cf',
    ];

    protected function casts(): array
    {
        return [
            'user_cf' => 'float',
        ];
    }

    public function consultation()
    {
        return $this->belongsTo(Konsultasi::class, 'consultations_id');
    }

    public function condition()
    {
        return $this->belongsTo(Kondisi::class, 'condition_code', 'kode');
    }
}