<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFavoriteRequest;
use App\Services\FavoriteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function __construct(
        private readonly FavoriteService $favoriteService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $favorites = $this->favoriteService->getByUser($userId, $request->get('per_page', 15));

        // Transform to include place details
        $items = $favorites->getCollection()->transform(function ($fav) {
            $place = $fav->place;
            $primaryImage = $place?->primaryImage;

            $placeData = null;
            if ($place) {
                $primaryImageData = null;
                if ($primaryImage) {
                $primaryImageData = [
                    'image_path' => $primaryImage->image_path,
                    'image_url' => $primaryImage->image_url,
                        'alt_text' => $primaryImage->alt_text,
                    ];
                }

                $categoryData = null;
                if ($place->category) {
                    $categoryData = [
                        'id' => $place->category->id,
                        'title' => $place->category->title,
                        'icon' => $place->category->icon,
                    ];
                }

                $provinceData = null;
                if ($place->province) {
                    $provinceData = [
                        'id' => $place->province->id,
                        'name' => $place->province->name,
                    ];
                }

                $placeData = [
                    'id' => $place->id,
                    'code' => $place->code,
                    'title' => $place->title,
                    'latitude' => $place->latitude,
                    'longitude' => $place->longitude,
                    'category' => $categoryData,
                    'province' => $provinceData,
                    'rating' => $place->rating,
                    'primary_image' => $primaryImageData,
                ];
            }

            return [
                'id' => $fav->id,
                'user_id' => $fav->user_id,
                'place_id' => $fav->place_id,
                'place' => $placeData,
                'created_at' => $fav->created_at,
            ];
        })->values();

        return response()->json(['data' => $items]);
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