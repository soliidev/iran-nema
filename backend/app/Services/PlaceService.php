<?php

namespace App\Services;

use App\Models\Place;
use App\Repositories\PlaceRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PlaceService
{
    public function __construct(
        private readonly PlaceRepository $placeRepository
    ) {}

    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return $this->placeRepository->getAll($filters, $perPage);
    }

    public function findById(int $id, array $relations = []): ?Place
    {
        return $this->placeRepository->findById($id, $relations);
    }

    public function findByCode(string $code, array $relations = []): ?Place
    {
        return $this->placeRepository->findByCode($code, $relations);
    }

    public function getByCategory(int $categoryId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->placeRepository->getByCategory($categoryId, $perPage);
    }

    public function getByProvince(int $provinceId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->placeRepository->getByProvince($provinceId, $perPage);
    }

    public function search(string $query, int $perPage = 15): LengthAwarePaginator
    {
        return $this->placeRepository->search($query, $perPage);
    }

    public function create(array $data): Place
    {
        return $this->placeRepository->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->placeRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->placeRepository->delete($id);
    }

    public function getRelated(int $placeId, int $limit = 5): LengthAwarePaginator
    {
        return $this->placeRepository->getRelated($placeId, $limit);
    }

    public function getStatistics(): array
    {
        return $this->placeRepository->getStatistics();
    }
}
