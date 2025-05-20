<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationAssignmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'job_position_id' => new JobPositionResource($this->whenLoaded('jobPosition')),
            'employee_id' => new EmployeeResource($this->whenLoaded('employee')),
            'country_assign' => new CountryAssignResource($this->whenLoaded('countryAssign')),
            'office_assign' => new OfficeAssignResource($this->whenLoaded('officeAssign')),
            'team_assign' => new TeamAssignResource($this->whenLoaded('teamAssign')),
            'department_assign' => new DepartmentAssignResource($this->whenLoaded('departmentAssign')),
        ];
    }
}
