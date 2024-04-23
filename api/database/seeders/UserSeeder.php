<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $username = ['joko', 'yadi', 'purwo', 'yudi'];
        $username = ['gilar', 'cahya', 'iman', 'satria'];
        foreach ($username as $val) {

            User::create([
                'username' => $val,
                'password' => Hash::make('password'),
                'role_id' => 2,
            ]);
        }
    }
}
