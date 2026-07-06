<?php

namespace App\Services;

use App\Models\Favorite;
use App\Repositories\FavoriteRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FavoriteService
{
    public function __construct(
        private readonly FavoriteRepository $favoriteRepository
    ) {}

    public function getByUser(int $userId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->favoriteRepository->getByUser($userId, $perPage);
    }

    public function exists(int $userId, int $placeId): bool
    {
        return $this->favoriteRepository->exists($userId, $placeId);
    }

    public function toggle(int $userId, int $placeId): array
    {
        if ($this->favoriteRepository->exists($userId, $placeId)) {
            $this->favoriteRepository->delete($userId, $placeId);
            return ['favorited' => false, 'message' => 'Removed from favorites'];
        }

        $this->favoriteRepository->create($userId, $placeId);
        return ['favorited' => true, 'message' => 'Added to favorites'];
    }

    public function countByPlace(int $placeId): int
    {
        return $this->favoriteRepository->countByPlace($placeId);
    }
}
