<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePlaceImageRequest;
use App\Http\Requests\UpdatePlaceImageRequest;
use App\Http\Resources\PlaceImageResource;
use App\Services\PlaceImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PlaceImageController extends Controller
{
    public function __construct(
        private readonly PlaceImageService $placeImageService
    ) {}

    public function index(int $placeId): AnonymousResourceCollection
    {
        $images = $this->placeImageService->getByPlace($placeId);
        return PlaceImageResource::collection($images);
    }

    public function store(StorePlaceImageRequest $request): JsonResponse
    {
        $image = $this->placeImageService->create($request->validated());
        return response()->json([
            'message' => 'Image created successfully',
            'data' => new PlaceImageResource($image),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $image = $this->placeImageService->findById($id);
        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        return response()->json(['data' => new PlaceImageResource($image)]);
    }

    public function update(UpdatePlaceImageRequest $request, int $id): JsonResponse
    {
        $updated = $this->placeImageService->update($id, $request->validated());
        if (!$updated) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        return response()->json([
            'message' => 'Image updated successfully',
            'data' => new PlaceImageResource($this->placeImageService->findById($id)),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->placeImageService->delete($id);
        if (!$deleted) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        return response()->json(['message' => 'Image deleted successfully']);
    }

    public function primary(int $placeId): JsonResponse
    {
        $image = $this->placeImageService->getPrimary($placeId);
        if (!$image) {
            return response()->json(['message' => 'No primary image found'], 404);
        }
        return response()->json(['data' => new PlaceImageResource($image)]);
    }

    public function setPrimary(int $placeId, int $imageId): JsonResponse
    {
        $result = $this->placeImageService->setPrimary($placeId, $imageId);
        if (!$result) {
            return response()->json(['message' => 'Failed to set primary image'], 400);
        }
        return response()->json(['message' => 'Primary image updated successfully']);
    }
}
