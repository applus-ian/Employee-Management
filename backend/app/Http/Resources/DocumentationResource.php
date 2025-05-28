<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentationResource extends JsonResource
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
            'employee_id' => $this->employee_id,
            'name' => $this->name,
            'description' => $this->description,
            'file_url' => $this->file_url,
            'document_type' => [
                'id' => $this->documentType?->id,
                'name' => $this->documentType?->name,
            ],
            'upload_date' => $this->upload_date,
            'expiry_date' => $this->expiry_date,
        ];
    }
}
