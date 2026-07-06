<?php

namespace App\Services;

use App\Models\PlaceImage;
use App\Repositories\PlaceImageRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PlaceImageService
{
    public function __construct(
        private readonly PlaceImageRepository $placeImageRepository
    ) {}

    public function getByPlace(int $placeId): LengthAwarePaginator
    {
        return $this->placeImageRepository->getByPlace($placeId);
    }

    public function findById(int $id): ?PlaceImage
    {
        return $this->placeImageRepository->findById($id);
    }

    public function getPrimary(int $placeId): ?PlaceImage
    {
        return $this->placeImageRepository->getPrimary($placeId);
    }

    public function create(array $data): PlaceImage
    {
        return $this->placeImageRepository->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->placeImageRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->placeImageRepository->delete($id);
    }

    public function setPrimary(int $placeId, int $imageId): bool
    {
        return $this->placeImageRepository->setPrimary($placeId, $imageId);
    }
}
