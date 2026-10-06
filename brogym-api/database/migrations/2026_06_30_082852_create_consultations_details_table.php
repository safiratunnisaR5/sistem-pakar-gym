<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('consultations_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('consultations_id');
            $table->string('condition_code', 20);
            $table->decimal('user_cf', 5, 4)->default(1.00);
            $table->timestamps();

            $table->foreign('consultations_id')
                  ->references('id')
                  ->on('konsultasi')
                  ->onDelete('cascade');
            
            $table->foreign('condition_code')
                  ->references('kode')
                  ->on('kondisi')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('consultations_details');
    }
};