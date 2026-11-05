<?php

namespace App\Http\Controllers;

use App\Models\Promos;
use App\Http\Requests\StorePromosRequest;
use App\Http\Requests\UpdatePromosRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $promos = Promos::query()
            ->when($request->search, fn($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Promos/Index', [
            'promos' => $promos,
            'filters' => $request->only('search')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Promos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromosRequest $request)
    {
        $validated = $request->validated();

        Promos::create($validated);

        return redirect()->route('promos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promos $promos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promos $promo)
    {
        return Inertia::render('Promos/Edit', [
            'promo' => $promo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePromosRequest $request, Promos $promo)
    {
        $validated = $request->validated();

        $promo->update($validated);

        return redirect()->route('promos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Promos $promo)
    {
        $promo->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Promo deleted successfully']);
        }

        return back()->with('success', 'Promo deleted successfully');
    }
}
