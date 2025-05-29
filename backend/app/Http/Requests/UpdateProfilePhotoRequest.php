<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfilePhotoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'photoPath' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'photoPath.required' => 'Photo path is required.',
            'photoPath.string' => 'Photo path must be a string.',
            'photoPath.max' => 'Photo path must not exceed 255 characters.',
        ];
    }
}
