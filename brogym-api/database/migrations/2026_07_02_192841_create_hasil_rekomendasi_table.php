<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hasil_rekomendasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('konsultasi_id')->constrained('konsultasi')->onDelete('cascade');
            $table->foreignId('rule_id')->constrained('rules')->onDelete('cascade');
            
            // Program latihan dari recommendation_detail
            $table->string('training_code', 20)->nullable();
            $table->string('meal_code', 20)->nullable();
            
            $table->decimal('cf_value', 5, 4);
            $table->decimal('persentase', 5, 2);
            $table->text('catatan_penyakit')->nullable();
            $table->timestamps();

            // Foreign keys ke training_programs dan meal_plans
            $table->foreign('training_code')
                  ->references('code')
                  ->on('training_programs')
                  ->onDelete('set null');
                  
            $table->foreign('meal_code')
                  ->references('code')
                  ->on('meal_plans')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hasil_rekomendasi');
    }
};