<?php

use App\Http\Controllers\BookingsController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\PromosController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VehiclesController;
use App\Http\Controllers\VehiclesModelsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/', 'dashboard')->name('home');
    Route::resource('roles', RolesController::class);
    Route::resource('users', UsersController::class)->except('show');
    Route::resource('vehiclesModel', VehiclesModelsController::class);
    Route::resource('customers', CustomersController::class);
    Route::resource('vehicles', VehiclesController::class);
    Route::resource('promos', PromosController::class);
    Route::resource('bookings', BookingsController::class);
});

require __DIR__.'/settings.php';
