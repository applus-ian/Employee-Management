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
            'job_position_id' => $this->job_position_id,
            'employee_id' => $this->employee_id,
            'country_assign' => new CountryAssignResource($this->whenLoaded('countryAssign')),
            'office_assign' => new OfficeAssignResource($this->whenLoaded('officeAssign')),
            'team_assign' => new TeamAssignResource($this->whenLoaded('teamAssign')),
            'department_assign' => new DepartmentAssignResource($this->whenLoaded('departmentAssign')),

        ];
    }
}
