<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_memberships', function (Blueprint $table) {

            $table->id();

            $table->foreignId('member_id')
                ->constrained('members')
                ->cascadeOnDelete();

            $table->foreignId('package_id')
                ->constrained('membership_packages');

            $table->date('start_date');

            $table->date('end_date');

            $table->enum('status',[
                'aktif',
                'kadaluarsa'
            ]);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('member_memberships');
    }
};