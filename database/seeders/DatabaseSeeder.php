<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@gudang.com',
            'password' => Hash::make('password123'),
            'phone_number' => '081234567890',
            'role' => 'admin',
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Staf Operasional',
            'email' => 'staf@gudang.com',
            'password' => Hash::make('password123'),
            'phone_number' => '089876543210',
            'role' => 'staff',
            'is_active' => true,
        ]);
    }
}
