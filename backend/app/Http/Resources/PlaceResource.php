<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'province_id' => $this->province_id,
            'code' => $this->code,
            'title' => $this->title,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'description' => $this->description,
            'rating' => $this->rating,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'province' => new ProvinceResource($this->whenLoaded('province')),
            'primary_image' => new PlaceImageResource($this->whenLoaded('primaryImage')),
            'images' => PlaceImageResource::collection($this->whenLoaded('images')),
            'virtual_tour_images' => VirtualTourImageResource::collection($this->whenLoaded('virtualTourImages')),
            'favorites_count' => $this->whenCounted('favorites'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
