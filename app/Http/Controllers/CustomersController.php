<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomersRequest;
use App\Http\Requests\UpdateCustomersRequest;
use App\Models\Customers;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $customers = Customers::query()
            ->with('user:id,name')
            ->when($request->search, fn ($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customers/Create', [
            'users' => User::query()
                ->whereDoesntHave('customer')
                ->whereHas('role', fn ($q) => $q->where('name', 'customer'))
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomersRequest $request)
    {
        $validated = $request->validated();

        Customers::create($validated);

        return redirect()->route('customers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customers $customers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customers $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
            'users' => User::query()
                ->where(function ($query) use ($customer) {
                    $query->whereDoesntHave('customer')
                        ->orWhere('id', $customer->user_id);
                })
                ->whereHas('role', fn ($q) => $q->where('name', 'customer'))
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomersRequest $request, Customers $customer)
    {
        $validated = $request->validated();

        $customer->update($validated);

        return redirect()->route('customers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Customers $customer)
    {
        $customer->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Customer deleted successfully']);
        }

        return back()->with('success', 'Customer deleted successfully');
    }
}
