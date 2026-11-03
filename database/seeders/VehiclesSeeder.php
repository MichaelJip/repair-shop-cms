<?php

namespace Database\Seeders;

use App\Models\Customers;
use App\Models\Vehicles;
use App\Models\VehiclesModels;
use Illuminate\Database\Seeder;

class VehiclesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vehicleModelIds = VehiclesModels::pluck('id');

        Customers::all()->each(function (Customers $customer) use ($vehicleModelIds) {
            Vehicles::factory(fake()->numberBetween(1, 2))->create([
                'customer_id' => $customer->id,
                'vehicle_model_id' => $vehicleModelIds->random(),
            ]);
        });
    }
}
