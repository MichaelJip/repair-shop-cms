<?php

namespace App\Models;

use Database\Factories\VehiclesModelsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VehiclesModels extends Model
{
    /** @use HasFactory<VehiclesModelsFactory> */
    use HasFactory;

    protected $fillable = [
        'brand',
        'type',
    ];

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicles::class, 'vehicle_model_id');
    }
}
