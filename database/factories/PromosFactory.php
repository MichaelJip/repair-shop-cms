<?php

namespace Database\Factories;

use App\Models\Promos;
use App\PromoType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Promos>
 */
class PromosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->unique()->bothify('PROMO-####')),
            'discount_type' => $this->faker->randomElement(PromoType::cases())->value,
            'value' => $this->faker->numberBetween(0, 100),
            'stock' => $this->faker->numberBetween(5, 10)
        ];
    }
}
