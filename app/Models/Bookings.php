<?php

namespace App\Models;

use App\StatusType;
use Database\Factories\BookingsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookings extends Model
{
    /** @use HasFactory<BookingsFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'booking_date' => 'date:Y-m-d',
            'status' => StatusType::class,
        ];
    }

    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'mechanic_id',
        'promo_id',
        'booking_date',
        'queue_number',
        'status',
    ];

    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customers::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicles::class);
    }

    public function promo(): BelongsTo
    {
        return $this->belongsTo(Promos::class);
    }
}
