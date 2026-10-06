<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('penyakit', function (Blueprint $table) {
            // Ubah kolom catatan_penyesuaian agar bisa null
            $table->text('catatan_penyesuaian')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('penyakit', function (Blueprint $table) {
            $table->text('catatan_penyesuaian')->nullable(false)->change();
        });
    }
};