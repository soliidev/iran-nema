<?php

namespace App\Repositories;

use App\Models\Place;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PlaceRepository
{
    public function getAll(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        return Place::query()
            ->with(['category', 'province', 'primaryImage'])
            ->when(isset($filters['category_id']), fn($q) => $q->where('category_id', $filters['category_id']))
            ->when(isset($filters['province_id']), fn($q) => $q->where('province_id', $filters['province_id']))
            ->when(isset($filters['search']), fn($q) => $q->where(function($query) use ($filters) {
                $query->where('title', 'like', "%{$filters['search']}%")
                    ->orWhere('description', 'like', "%{$filters['search']}%");
            }))
            ->latest()
            ->paginate($perPage);
    }

    public function findById(int $id, array $relations = []): ?Place
    {
        return Place::with($relations)->find($id);
    }

    public function findByCode(string $code, array $relations = []): ?Place
    {
        return Place::with($relations)->where('code', $code)->first();
    }

    public function getByCategory(int $categoryId, int $perPage = 15): LengthAwarePaginator
    {
        return Place::with(['category', 'province', 'primaryImage'])
            ->where('category_id', $categoryId)
            ->latest()
            ->paginate($perPage);
    }

    public function getByProvince(int $provinceId, int $perPage = 15): LengthAwarePaginator
    {
        return Place::with(['category', 'province', 'primaryImage'])
            ->where('province_id', $provinceId)
            ->latest()
            ->paginate($perPage);
    }

    public function search(string $query, int $perPage = 15): LengthAwarePaginator
    {
        return $this->getAll(['search' => $query], $perPage);
    }

    public function create(array $data): Place
    {
        return Place::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $place = $this->findById($id);
        if (!$place) return false;
        return $place->update($data);
    }

    public function delete(int $id): bool
    {
        $place = $this->findById($id);
        if (!$place) return false;
        return $place->delete();
    }

    public function getRelated(int $placeId, int $limit = 5): LengthAwarePaginator
    {
        $place = $this->findById($placeId);
        if (!$place) {
            return new \Illuminate\Pagination\LengthAwarePaginator([], 0, $limit);
        }

        return Place::with(['category', 'province', 'primaryImage'])
            ->where('category_id', $place->category_id)
            ->where('id', '!=', $placeId)
            ->inRandomOrder()
            ->paginate($limit);
    }

    public function getStatistics(): array
    {
        return [
            'total_places' => Place::count(),
            'provinces_count' => \App\Models\Province::count(),
            'categories_count' => \App\Models\Category::count(),
        ];
    }
}
