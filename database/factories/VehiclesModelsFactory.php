<?php

namespace Database\Factories;

use App\Models\VehiclesModels;
use App\VehicleType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VehiclesModels>
 */
class VehiclesModelsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand' => $this->faker->randomElement(['Honda', 'Yamaha', 'Suzuki', 'BYD', 'Toyota', "Wuling"]),
            'type' => $this->faker->randomElement(VehicleType::cases())->value,
        ];
    }

    public function car(): static
    {
        return $this->state(fn() => ['type' => VehicleType::Car->value]);
    }

    public function motorcycle(): static
    {
        return $this->state(fn() => ['type' => VehicleType::Motorcycle->value]);
    }
}
