<?php

namespace Database\Factories;

use App\Models\Bookings;
use App\Models\Customers;
use App\Models\Promos;
use App\Models\User;
use App\Models\Vehicles;
use App\StatusType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Bookings>
 */
class BookingsFactory extends Factory
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
            'vehicle_id' => Vehicles::factory(),
            'mechanic_id' => User::factory(),
            'promo_id' => Promos::factory(),
            'booking_date' => $this->faker->date(),
            'queue_number' => $this->faker->randomDigitNotNull(),
            'status' => $this->faker->randomElement(StatusType::cases())->value,
        ];
    }
}
