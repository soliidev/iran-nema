<?php

namespace App\Repositories;

use App\Models\Place;
use Illuminate\Support\Facades\DB;

class PlaceRepository
{
    public function getAll(array $filters = [], int $perPage = 15): \Illuminate\Database\Eloquent\Collection
    {
        return $this->baseQuery($filters)
            ->with(['category', 'province'])
            ->latest()
            ->paginate($perPage)
            ->getCollection();
    }

    public function findById(int $id, array $relations = []): ?Place
    {
        $query = $this->baseQuery();
        
        if (!empty($relations)) {
            $query->with($relations);
        }
        
        return $query->find($id);
    }

    public function findByCode(string $code, array $relations = []): ?Place
    {
        $query = $this->baseQuery();
        
        if (!empty($relations)) {
            $query->with($relations);
        }
        
        return $query->where('code', $code)->first();
    }

    public function getByCategory(int $categoryId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->baseQuery(['category_id' => $categoryId])
            ->latest()
            ->paginate($perPage);
    }

    public function getByProvince(int $provinceId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->baseQuery(['province_id' => $provinceId])
            ->latest()
            ->paginate($perPage);
    }

    public function search(string $query, int $perPage = 15): LengthAwarePaginator
    {
        return $this->baseQuery(['search' => $query], $perPage);
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

        return $this->baseQuery([
            'category_id' => $place->category_id,
            'exclude_id' => $placeId,
        ])
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

    private function baseQuery(array $filters = [], int $perPage = 15): \Illuminate\Database\Eloquent\Builder
    {
        $query = Place::query()
            ->select([
                'places.*',
                'categories.title as category_title',
                'categories.code as category_code',
                'categories.icon as category_icon',
                'provinces.name as province_name',
                'provinces.code as province_code',
                'primary_images.image_path as primary_image_path',
                'primary_images.alt_text as primary_image_alt',
            ])
            ->leftJoin('categories', 'places.category_id', '=', 'categories.id')
            ->leftJoin('provinces', 'places.province_id', '=', 'provinces.id')
            ->leftJoin('place_images as primary_images', function ($join) {
                $join->on('places.id', '=', 'primary_images.place_id')
                     ->where('primary_images.is_primary', true);
            })
            ->with(['primaryImage', 'virtualTourImages']);

        if (isset($filters['category_id'])) {
            $query->where('places.category_id', $filters['category_id']);
        }

        if (isset($filters['province_id'])) {
            $query->where('places.province_id', $filters['province_id']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('places.title', 'like', "%{$filters['search']}%")
                    ->orWhere('places.description', 'like', "%{$filters['search']}%");
            });
        }

        if (isset($filters['exclude_id'])) {
            $query->where('places.id', '!=', $filters['exclude_id']);
        }

        return $query;
    }
}