<?php

namespace App\Http\Requests;

use App\PromoType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePromosRequest extends FormRequest
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
            'code' => ['required', 'string', 'max:255', Rule::unique('promos', 'code')->ignore($this->route('promo'))],
            'discount_type' => ['required', Rule::enum(PromoType::class)],
            'value' => ['required', 'numeric', 'min:0', Rule::when($this->discount_type === 'percentage', ['max:100'])],
            'stock' => ['required', 'numeric', 'min:0']
        ];
    }
}
