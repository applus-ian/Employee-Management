<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmploymentStatusHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'status_set' => $this->status_set,
            'effective_date' => $this->effective_date,
            'remarks' => $this->remarks,
            'created_at' => $this->created_at,
            'changed_by' => $this->changed_by,
            'changed_by_employee_id' => $this->changed_by_employee_id,
        ];
    }
}
