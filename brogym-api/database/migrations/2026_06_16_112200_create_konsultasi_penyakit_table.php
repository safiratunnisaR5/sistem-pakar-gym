<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('konsultasi_penyakit', function (Blueprint $table) {

            $table->id();

            $table->foreignId('konsultasi_id')
                ->constrained('konsultasi')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('penyakit_id')
                ->constrained('penyakit')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();

            $table->unique([
                'konsultasi_id',
                'penyakit_id'
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('konsultasi_penyakit');
    }
};