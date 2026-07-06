<?php

namespace App\Repositories;

use App\Models\VirtualTourImage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class VirtualTourImageRepository
{
    public function getByPlace(int $placeId): LengthAwarePaginator
    {
        return VirtualTourImage::where('place_id', $placeId)->paginate(20);
    }

    public function findById(int $id): ?VirtualTourImage
    {
        return VirtualTourImage::find($id);
    }

    public function create(array $data): VirtualTourImage
    {
        return VirtualTourImage::create($data);
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
}
