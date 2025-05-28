<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocationAssignmentRequest extends FormRequest
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
            'job_position_id' => ['required', 'exists:job_positions,id'],
            'country_assign_id' => ['nullable', 'exists:country_assigns,id'],
            'office_assign_id' => ['nullable', 'exists:office_assigns,id'],
            'team_assign_id' => ['nullable', 'exists:team_assigns,id'],
            'department_assign_id' => ['nullable', 'exists:department_assigns,id'],
            'employee_id' => ['required'],
        ];
    }
}
