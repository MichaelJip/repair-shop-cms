<?php

namespace App\Http\Requests;

use App\StatusType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => ['nullable', 'integer', 'exists:customers,id'],
            'vehicle_id' => ['nullable', 'integer', 'exists:vehicles,id'],
            'mechanic_id' => ['nullable', 'integer', 'exists:users,id'],
            'promo_id' => ['nullable', 'integer', 'exists:promos,id'],
            'booking_date' => ['required', 'date', 'after_or_equal:today'],
            'status' => ['required', 'string', Rule::enum(StatusType::class)],
        ];
    }
}
