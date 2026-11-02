<?php

namespace App\Http\Controllers;

use App\Models\VehiclesModels;
use App\Http\Requests\StoreVehiclesModelsRequest;
use App\Http\Requests\UpdateVehiclesModelsRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehiclesModelsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $vehiclesModels = VehiclesModels::query()
            ->when($request->search, fn($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('VehiclesModel/Index', [
            'vehiclesModels' => $vehiclesModels,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('VehiclesModel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehiclesModelsRequest $request)
    {
        $validated = $request->validated();

        VehiclesModels::create($validated);

        return redirect()->route('vehiclesModel.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(VehiclesModels $vehiclesModels)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VehiclesModels $vehiclesModel)
    {
        return Inertia::render('VehiclesModel/Edit', [
            'vehiclesModel' => $vehiclesModel,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehiclesModelsRequest $request, VehiclesModels $vehiclesModel)
    {
        $validated = $request->validated();

        $vehiclesModel->update($validated);

        return redirect()->route('vehiclesModel.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, VehiclesModels $vehiclesModel)
    {
        $vehiclesModel->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Vehicle model deleted successfully']);
        }

        return back()->with('success', 'Vehicle model deleted successfully');
    }
}
