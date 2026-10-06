<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fact_cf', function (Blueprint $table) {
            $table->id();
            $table->string('fact_code', 20);
            $table->decimal('cf_value', 5, 4)->default(0);
            $table->timestamps();

            $table->foreign('fact_code')
                  ->references('code')
                  ->on('facts')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fact_cf');
    }
};                                                                                                                  