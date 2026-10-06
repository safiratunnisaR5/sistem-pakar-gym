<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('penyakit', function (Blueprint $table) {
            // Ubah panjang kolom kode menjadi 50 karakter
            $table->string('kode', 50)->change();
        });
    }

    public function down(): void
    {
        Schema::table('penyakit', function (Blueprint $table) {
            $table->string('kode', 10)->change();
        });
    }
};  