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
            'profile_pic_url' => 'required|file|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'profile_pic_url.required' => 'Profile photo is required.',
            'profile_pic_url.file' => 'Uploaded file must be a valid file.',
            'profile_pic_url.image' => 'Uploaded file must be an image.',
            'profile_pic_url.mimes' => 'Allowed image types: jpeg, jpg, png.',
            'profile_pic_url.max' => 'Image must not exceed 2MB.',
        ];
    }
}
