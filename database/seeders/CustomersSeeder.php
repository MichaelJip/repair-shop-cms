<?php

namespace Database\Seeders;

use App\Models\Customers;
use App\Models\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class CustomersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customerRole = Roles::where('name', 'customer')->firstOrFail();

        User::where('role_id', $customerRole->id)->each(function (User $user) {
            Customers::factory()->create([
                'user_id' => $user->id,
                'name' => $user->name,
            ]);
        });
    }
}
