<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('konsultasi_kondisi', function (Blueprint $table) {

            $table->id();

            $table->foreignId('konsultasi_id')
                ->constrained('konsultasi')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('kondisi_id')
                ->constrained('kondisi')
                ->restrictOnDelete()
                ->cascadeOnUpdate();
            $table->decimal('user_cf', 5, 4)->default(1.00);
            $table->timestamps();

            $table->unique([
                'konsultasi_id',
                'kondisi_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('konsultasi_kondisi');
    }
};