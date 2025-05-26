<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJobPositionRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255', Rule::unique('job_positions', 'title')->ignore($this->route('job_position'))]
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Job position title is required.',
            'title.string' => 'Job position title must be a valid string.',
            'title.max' => 'Job position title must not exceed 255 characters.',
            'title.unique' => 'This job position title already exists.',
        ];
    }
}
