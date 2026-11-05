<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promos extends Model
{
    /** @use HasFactory<\Database\Factories\PromosFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'discount_type',
        'value',
        'stock'
    ];
}
