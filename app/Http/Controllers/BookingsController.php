<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingsRequest;
use App\Http\Requests\UpdateBookingsRequest;
use App\Models\Bookings;
use App\Models\Customers;
use App\Models\Promos;
use App\Models\User;
use App\Models\Vehicles;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bookings = Bookings::query()
            ->with('customer:id,name')
            ->with('mechanic:id,name')
            ->with('promo:id,code')
            ->with('vehicle:id,vehicle_model_id,plate_number', 'vehicle.vehicleModel:id,brand')
            ->when($request->search, fn ($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->when($request->mechanic_id, fn ($q, $mechanicId) => $q->where('mechanic_id', $mechanicId))
            ->when($request->customer_id, fn ($q, $customerId) => $q->where('customer_id', $customerId))
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'filters' => $request->only('search', 'mechanic_id', 'customer_id'),
            'mechanics' => User::query()
                ->whereHas('role', fn ($q) => $q->where('name', 'mechanic'))
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
            'customers' => Customers::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Bookings/Create', $this->formOptions());
    }

    /**
     * Dropdown options shared by the create and edit forms.
     *
     * @return array<string, Collection>
     */
    private function formOptions(): array
    {
        return [
            'mechanics' => User::query()
                ->whereHas('role', fn ($q) => $q->where('name', 'mechanic'))
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
            'customers' => Customers::query()
                ->select('id', 'name')
                ->orderBy('name')
                ->get(),
            'promos' => Promos::query()
                ->select('id', 'code')
                ->orderBy('code')
                ->get(),
            'vehicles' => Vehicles::query()
                ->with('vehicleModel:id,brand')
                ->select('id', 'vehicle_model_id', 'plate_number')
                ->orderBy('plate_number')
                ->get(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingsRequest $request)
    {
        $validated = $request->validated();
        $validated['queue_number'] = $this->nextQueueNumber($validated['booking_date']);

        Bookings::create($validated);

        return redirect()->route('bookings.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Bookings $booking)
    {
        return Inertia::render('Bookings/Show', [
            'booking' => $booking->load([
                'customer:id,name',
                'mechanic:id,name',
                'promo:id,code',
                'vehicle:id,vehicle_model_id,plate_number',
                'vehicle.vehicleModel:id,brand',
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookings $booking)
    {
        return Inertia::render('Bookings/Edit', [
            'booking' => $booking,
            ...$this->formOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingsRequest $request, Bookings $booking)
    {
        $validated = $request->validated();

        if ($booking->booking_date->toDateString() !== $validated['booking_date']) {
            $validated['queue_number'] = $this->nextQueueNumber($validated['booking_date']);
        }

        $booking->update($validated);

        return redirect()->route('bookings.index');
    }

    /**
     * Next free queue number for the given booking date.
     */
    private function nextQueueNumber(string $bookingDate): int
    {
        return Bookings::query()
            ->whereDate('booking_date', $bookingDate)
            ->max('queue_number') + 1;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Bookings $booking)
    {
        $booking->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Booking deleted successfully']);
        }

        return back()->with('success', 'Booking deleted successfully');
    }
}
