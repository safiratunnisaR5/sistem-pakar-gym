<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'Admin')->first();

        User::updateOrCreate(
            [
                'email' => 'admin@brogym.com'
            ],
            [
                'role_id' => $adminRole->id,
                'name' => 'Administrator',
                'password' => Hash::make('admin123')
            ]
        );
    }
}