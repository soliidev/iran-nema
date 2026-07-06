<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'username' => 'solii',
            'email' => 'abolfazl.soltani313131@gmail.com',
            'email_verified_at' => now(),
            'password' => 'password',
            'is_admin' => true,
        ]);
    }
}
