<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePlaceRequest;
use App\Http\Requests\UpdatePlaceRequest;
use App\Http\Resources\PlaceResource;
use App\Services\PlaceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PlaceController extends Controller
{
    public function __construct(
        private readonly PlaceService $placeService
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $places = $this->placeService->getAll($request->all(), $request->get('per_page', 15));
        return PlaceResource::collection($places);
    }

    public function store(StorePlaceRequest $request): JsonResponse
    {
        $place = $this->placeService->create($request->validated());
        return response()->json([
            'message' => 'Place created successfully',
            'data' => new PlaceResource($place),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $place = $this->placeService->findById($id, ['category', 'province', 'images', 'virtualTourImages', 'primaryImage']);
        if (!$place) {
            return response()->json(['message' => 'Place not found'], 404);
        }
        return response()->json(['data' => new PlaceResource($place)]);
    }

    public function update(UpdatePlaceRequest $request, int $id): JsonResponse
    {
        $updated = $this->placeService->update($id, $request->validated());
        if (!$updated) {
            return response()->json(['message' => 'Place not found'], 404);
        }
        return response()->json([
            'message' => 'Place updated successfully',
            'data' => new PlaceResource($this->placeService->findById($id, ['category', 'province', 'images', 'virtualTourImages'])),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->placeService->delete($id);
        if (!$deleted) {
            return response()->json(['message' => 'Place not found'], 404);
        }
        return response()->json(['message' => 'Place deleted successfully']);
    }

    public function byCode(string $code): JsonResponse
    {
        $place = $this->placeService->findByCode($code, [
            'category', 'province', 'images', 'virtualTourImages', 'primaryImage',
        ]);
        if (!$place) {
            return response()->json(['message' => 'Place not found'], 404);
        }
        return response()->json(['data' => new PlaceResource($place)]);
    }

    public function byCategory(int $categoryId, Request $request): AnonymousResourceCollection
    {
        $places = $this->placeService->getByCategory($categoryId, $request->get('per_page', 15));
        return PlaceResource::collection($places);
    }

    public function byProvince(int $provinceId, Request $request): AnonymousResourceCollection
    {
        $places = $this->placeService->getByProvince($provinceId, $request->get('per_page', 15));
        return PlaceResource::collection($places);
    }

    public function search(Request $request): AnonymousResourceCollection
    {
        $request->validate(['q' => 'required|string|min:2']);
        $places = $this->placeService->search($request->get('q'), $request->get('per_page', 15));
        return PlaceResource::collection($places);
    }

    public function related(int $id): AnonymousResourceCollection
    {
        $places = $this->placeService->getRelated($id);
        return PlaceResource::collection($places);
    }

    public function statistics(): JsonResponse
    {
        return response()->json(['data' => $this->placeService->getStatistics()]);
    }
}
