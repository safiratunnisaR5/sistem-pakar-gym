<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->id();
            $table->string('kode_rule', 20)->unique();
            $table->string('nama_rule', 100);
            $table->string('fact_code', 20)->nullable();
            $table->unsignedBigInteger('tujuan_id')->nullable();
            $table->string('recommendation_code', 20)->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();

            $table->foreign('fact_code')
                  ->references('code')
                  ->on('facts')
                  ->onDelete('set null');

            $table->foreign('tujuan_id')
                  ->references('id')
                  ->on('tujuan')
                  ->onDelete('set null');

            $table->foreign('recommendation_code')
                  ->references('code')
                  ->on('recommendations')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rules');
    }
};