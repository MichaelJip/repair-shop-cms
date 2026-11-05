<?php

namespace App\Models;

use Database\Factories\CustomersFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customers extends Model
{
    /** @use HasFactory<CustomersFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'phone',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicles::class, 'customer_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Bookings::class, 'customer_id');
    }
}
