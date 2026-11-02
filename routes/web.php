<?php

use App\Http\Controllers\RolesController;
use App\Http\Controllers\VehiclesModelsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/', 'dashboard')->name('home');
    Route::resource('roles', RolesController::class);
    Route::resource('vehiclesModel', VehiclesModelsController::class);
});

require __DIR__ . '/settings.php';
