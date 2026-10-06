<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facts', function (Blueprint $table) {
            $table->string('code', 20)->primary();
            $table->string('fact_name', 100);
            $table->text('condition_codes')->nullable(); // Kondisi pembentuk fakta (contoh: K1,K4,K6,K8)
            $table->text('description')->nullable();      // Deskripsi fakta
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facts');
    }
};