<?php

namespace App\Models;

use Database\Factories\PromosFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Promos extends Model
{
    /** @use HasFactory<PromosFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'discount_type',
        'value',
        'stock',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Bookings::class, 'promo_id');
    }
}
