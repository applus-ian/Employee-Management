<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ActivateUserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'user_role' => ['required', 'numeric', 'exists:roles,id'],
            'password' => [
                'required',
                'string',
                'min:8',  // Minimum length of 8 characters
                Password::min(8)->letters()->numbers()->symbols(),  // Capital letter, number, special char
                'confirmed', // Password confirmation field
            ],
            'password_confirmation' => ['required', 'string', 'min:8'],
        ];
    }
}
