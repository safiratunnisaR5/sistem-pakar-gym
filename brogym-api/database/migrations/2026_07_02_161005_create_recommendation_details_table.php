<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recommendation_details', function (Blueprint $table) {
            $table->id();
            $table->string('recommendation_code', 20);
            $table->string('meal_code', 20)->nullable();
            $table->string('training_code', 20)->nullable();
            $table->timestamps();

            $table->foreign('recommendation_code')
                  ->references('code')
                  ->on('recommendations')
                  ->onDelete('cascade');
            
            $table->foreign('meal_code')
                  ->references('code')
                  ->on('meal_plans')
                  ->onDelete('set null');
            
            $table->foreign('training_code')
                  ->references('code')
                  ->on('training_programs')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recommendation_details');
    }
};