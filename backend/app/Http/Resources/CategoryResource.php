<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'title' => $this->title,
            'description' => $this->description,
            'icon' => $this->icon,
            'places_count' => $this->whenCounted('places'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
