<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Vinkla\Hashids\Facades\Hashids;

class EmployeeProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => Hashids::encode($this->employee->id),
            'profile' => $this->employee->profile_pic_url ?? null,
            'full_name' => $this->employee->first_name. ' ' .$this->employee->last_name,
            'job_position' => $this->employee->jobPosition->title,
            'department' => $this->employee->locationAssignment->departmentAssign->name ?? null,
            'project_role_id' => $this->project_role_id,
        ];
    }
}
