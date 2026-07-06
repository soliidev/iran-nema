<?php

namespace App\Repositories;

use App\Models\PlaceImage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PlaceImageRepository
{
    public function getByPlace(int $placeId): LengthAwarePaginator
    {
        return PlaceImage::where('place_id', $placeId)->paginate(20);
    }

    public function findById(int $id): ?PlaceImage
    {
        return PlaceImage::find($id);
    }

    public function getPrimary(int $placeId): ?PlaceImage
    {
        return PlaceImage::where('place_id', $placeId)
            ->where('is_primary', true)
            ->first();
    }

    public function create(array $data): PlaceImage
    {
        return PlaceImage::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $image = $this->findById($id);
        if (!$image) return false;
        return $image->update($data);
    }

    public function delete(int $id): bool
    {
        $image = $this->findById($id);
        if (!$image) return false;
        return $image->delete();
    }

    public function setPrimary(int $placeId, int $imageId): bool
    {
        PlaceImage::where('place_id', $placeId)
            ->where('is_primary', true)
            ->update(['is_primary' => false]);

        return PlaceImage::where('id', $imageId)
            ->where('place_id', $placeId)
            ->update(['is_primary' => true]) > 0;
    }
}
