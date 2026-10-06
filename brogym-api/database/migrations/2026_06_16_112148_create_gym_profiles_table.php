<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gym_profiles', function (Blueprint $table) {

            $table->id();

            $table->string('name');
            $table->string('logo')->nullable();

            $table->text('address');

            $table->string('phone');

            $table->string('email');

            $table->string('operational_hours');

            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gym_profiles');
    }
};