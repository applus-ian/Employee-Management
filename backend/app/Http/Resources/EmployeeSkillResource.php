<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Vinkla\Hashids\Facades\Hashids;

class EmployeeSkillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'employee_id' => Hashids::encode($this->employee_id),
            'skill' => new SkillResource($this->whenLoaded('skill')),
            'years_of_experience' => $this->years_of_experience,
        ];
    }
}
