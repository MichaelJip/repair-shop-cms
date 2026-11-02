<?php

use App\VehicleType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles_models', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->enum('type', array_column(VehicleType::cases(), 'value'))->default(VehicleType::Motorcycle->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles_models');
    }
};
