<?php

namespace App\Models;

use Database\Factories\VehiclesFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicles extends Model
{
    /** @use HasFactory<VehiclesFactory> */
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'vehicle_model_id',
        'plate_number',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customers::class);
    }

    public function vehicleModel(): BelongsTo
    {
        return $this->belongsTo(VehiclesModels::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Bookings::class, 'vehicle_id');
    }
}
