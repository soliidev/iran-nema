<?php

namespace App\Repositories;

use App\Models\Favorite;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FavoriteRepository
{
    public function getByUser(int $userId, int $perPage = 15): LengthAwarePaginator
    {
        return Favorite::where('user_id', $userId)
            ->with('place.category', 'place.province', 'place.primaryImage')
            ->latest()
            ->paginate($perPage);
    }

    public function exists(int $userId, int $placeId): bool
    {
        return Favorite::where('user_id', $userId)
            ->where('place_id', $placeId)
            ->exists();
    }

    public function create(int $userId, int $placeId): Favorite
    {
        return Favorite::create([
            'user_id' => $userId,
            'place_id' => $placeId,
        ]);
    }

    public function delete(int $userId, int $placeId): bool
    {
        return Favorite::where('user_id', $userId)
            ->where('place_id', $placeId)
            ->delete() > 0;
    }

    public function countByPlace(int $placeId): int
    {
        return Favorite::where('place_id', $placeId)->count();
    }
}
