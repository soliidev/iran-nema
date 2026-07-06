<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFavoriteRequest;
use App\Http\Resources\FavoriteResource;
use App\Services\FavoriteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FavoriteController extends Controller
{
    public function __construct(
        private readonly FavoriteService $favoriteService
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $userId = $request->user()->id;
        $favorites = $this->favoriteService->getByUser($userId, $request->get('per_page', 15));
        return FavoriteResource::collection($favorites);
    }

    public function store(StoreFavoriteRequest $request): JsonResponse
    {
        $userId = $request->user()->id;
        $result = $this->favoriteService->toggle($userId, $request->validated()['place_id']);
        return response()->json($result);
    }

    public function destroy(int $placeId, Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        return response()->json($this->favoriteService->toggle($userId, $placeId));
    }

    public function check(int $placeId, Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $exists = $this->favoriteService->exists($userId, $placeId);
        return response()->json(['favorited' => $exists]);
    }

    public function count(int $placeId): JsonResponse
    {
        $count = $this->favoriteService->countByPlace($placeId);
        return response()->json(['count' => $count]);
    }
}
