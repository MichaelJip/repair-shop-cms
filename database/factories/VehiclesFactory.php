<?php

namespace Database\Factories;

use App\Models\Customers;
use App\Models\Vehicles;
use App\Models\VehiclesModels;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vehicles>
 */
class VehiclesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => Customers::factory(),
            'vehicle_model_id' => VehiclesModels::factory(),
            'plate_number' => $this->faker->word,
        ];
    }
}
