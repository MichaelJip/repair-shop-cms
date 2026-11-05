<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (['admin', 'mechanic', 'customer'] as $roleName) {
            Roles::firstOrCreate(['name' => $roleName]);
        }
    }
}
