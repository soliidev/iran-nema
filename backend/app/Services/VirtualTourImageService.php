<?php

namespace App\Services;

use App\Models\VirtualTourImage;
use App\Repositories\VirtualTourImageRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class VirtualTourImageService
{
    public function __construct(
        private readonly VirtualTourImageRepository $virtualTourImageRepository
    ) {}

    public function getByPlace(int $placeId): LengthAwarePaginator
    {
        return $this->virtualTourImageRepository->getByPlace($placeId);
    }

    public function findById(int $id): ?VirtualTourImage
    {
        return $this->virtualTourImageRepository->findById($id);
    }

    public function create(array $data): VirtualTourImage
    {
        return $this->virtualTourImageRepository->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->virtualTourImageRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->virtualTourImageRepository->delete($id);
    }
}
