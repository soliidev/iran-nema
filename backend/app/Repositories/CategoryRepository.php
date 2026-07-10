<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository
{
    public function getAll(array $filters = []): Collection
    {
        return Category::query()
            ->when(isset($filters['search']), fn($q) => $q->where('title', 'like', "%{$filters['search']}%"))
            ->get();
    }

    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }

    public function findByCode(string $code): ?Category
    {
        return Category::where('code', $code)->first();
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $category = $this->findById($id);
        if (!$category) return false;
        return $category->update($data);
    }

    public function delete(int $id): bool
    {
        $category = $this->findById($id);
        if (!$category) return false;
        return $category->delete();
    }
}
