<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehiclesRequest;
use App\Http\Requests\UpdateVehiclesRequest;
use App\Models\Customers;
use App\Models\Vehicles;
use App\Models\VehiclesModels;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vehicles = Vehicles::query()
            ->with('customer:id,name')
            ->with('vehicleModel:id,brand')
            ->when($request->search, fn($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Vehicles/Create', [
            'customers' => Customers::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
            'vehicleModels' => VehiclesModels::query()
                ->select('id', 'brand')
                ->orderBy('brand')
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehiclesRequest $request)
    {
        $validated = $request->validated();

        Vehicles::create($validated);

        return redirect()->route('vehicles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicles $vehicles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicles $vehicle)
    {
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle,
            'customers' => Customers::query()
                ->where(function ($query) use ($vehicle) {
                    $query->whereDoesntHave('vehicle')
                        ->orWhere('id', $vehicle->customer_id);
                })
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
            'vehicleModels' => VehiclesModels::query()
                ->where(function ($query) use ($vehicle) {
                    $query->whereDoesntHave('vehicle')
                        ->orWhere('id', $vehicle->vehicle_model_id);
                })
                ->select('id', 'brand')
                ->orderBy('brand')
                ->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehiclesRequest $request, Vehicles $vehicle)
    {
        $validated = $request->validated();

        $vehicle->update($validated);

        return redirect()->route('vehicles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Vehicles $vehicle)
    {
        $vehicle->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Vehicle deleted successfully']);
        }

        return back()->with('success', 'Vehicle deleted successfully');
    }
}
