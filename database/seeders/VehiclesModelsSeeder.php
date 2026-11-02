<?php

namespace Database\Seeders;

use App\Models\VehiclesModels;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehiclesModelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VehiclesModels::factory(5)->create();
    }
}
