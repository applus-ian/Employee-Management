<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Vinkla\Hashids\Facades\Hashids;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => Hashids::encode($this->id),
            'email' => $this->email,
            'employee' => new EmployeeResource($this->whenLoaded('employee')), // Include employee data
            'roles' => RoleResource::collection($this->whenLoaded('roles')),
        ];
    }
}
