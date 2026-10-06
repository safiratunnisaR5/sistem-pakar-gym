<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rule_details', function (Blueprint $table) {
            $table->id();
            $table->string('rule_code', 20);
            $table->string('condition_code', 20);
            $table->decimal('cf_expert', 5, 4)->default(0.8);
            $table->timestamps();

            $table->foreign('rule_code')
                  ->references('kode_rule')
                  ->on('rules')
                  ->onDelete('cascade');

            $table->foreign('condition_code')
                  ->references('kode')
                  ->on('kondisi')
                  ->onDelete('cascade');

            // Composite unique: satu rule tidak boleh punya kondisi duplikat
            $table->unique(['rule_code', 'condition_code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rule_details');
    }
};