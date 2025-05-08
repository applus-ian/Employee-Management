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
            'job_position_id' => ['required', 'exists:location_assignments, job_position_id'],
            'country_assign_id' => ['required', 'exists:location_assignments, country_assign_id'],
            'office_assign_id' => ['required', 'exists:location_assignments, office_assign_id'],
            'team_assign_id' => ['required', 'exists:location_assignments, team_assign_id'],
            'department_assign_id' => ['required', 'exists:location_assignments, department_assign_id']
        ];
    }
}
