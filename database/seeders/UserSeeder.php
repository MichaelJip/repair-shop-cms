<?php

namespace Database\Seeders;

use App\Models\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Roles::where('name', 'admin')->firstOrFail();
        $customerRole = Roles::where('name', 'customer')->firstOrFail();

        User::factory(10)->create([
            'role_id' => $customerRole->id,
        ]);

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'role_id' => $adminRole->id,
            'password' => Hash::make('password'),
        ]);
    }
}
