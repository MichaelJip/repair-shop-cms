<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRolesRequest;
use App\Http\Requests\UpdateRolesRequest;
use App\Models\Roles;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = Roles::query()
            ->when($request->search, fn($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Roles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRolesRequest $request)
    {
        $validated = $request->validated();

        Roles::create($validated);

        return redirect()->route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Roles $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Roles $role)
    {
        return Inertia::render('Roles/Edit', [
            'role' => $role,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRolesRequest $request, Roles $role)
    {
        $validated = $request->validated();

        $role->update($validated);

        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Roles $role)
    {
        $role->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Role deleted successfully']);
        }

        return back()->with('success', 'Role deleted successfully');
    }
}
