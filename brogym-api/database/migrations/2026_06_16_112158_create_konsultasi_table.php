<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('konsultasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('members')->onDelete('cascade');
            $table->timestamp('tanggal');
            $table->decimal('tinggi_badan', 5, 2);
            $table->decimal('berat_badan', 5, 2);
            $table->decimal('bmi', 5, 2);
            $table->enum('aktivitas_olahraga', ['jarang', 'sering']);
            $table->enum('pola_makan_harian', ['tidak_teratur', 'sehat']);
            $table->enum('level_latihan', ['pemula', 'menengah', 'lanjutan']);
            $table->unsignedBigInteger('tujuan_id')->nullable();
            $table->decimal('cf_result', 5, 4)->nullable();
            $table->timestamps();

            $table->foreign('tujuan_id')->references('id')->on('tujuan')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('konsultasi');
    }
};