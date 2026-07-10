<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePlaceImageRequest;
use App\Http\Requests\UpdatePlaceImageRequest;
use App\Services\PlaceImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PlaceImageController extends Controller
{
    public function __construct(
        private readonly PlaceImageService $placeImageService
    ) {}

    public function index(int $placeId): JsonResponse
    {
        $images = $this->placeImageService->getByPlace($placeId);
        $formatted = $images->map(fn($img) => $this->placeImageService->formatImage($img))->values();
        return response()->json(['data' => $formatted]);
    }

    public function upload(Request $request, int $placeId): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:10240',
        ]);

        $image = $this->placeImageService->upload($placeId, $request->file('image'));

        return response()->json([
            'message' => 'Image uploaded successfully',
            'data' => $image,
        ], 201);
    }

    public function store(StorePlaceImageRequest $request): JsonResponse
    {
        $image = $this->placeImageService->create($request->validated());
        $formatted = $this->placeImageService->formatImage($image);
        return response()->json([
            'message' => 'Image created successfully',
            'data' => $formatted,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $image = $this->placeImageService->findById($id);
        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        return response()->json(['data' => $this->placeImageService->formatImage($image)]);
    }

    public function update(UpdatePlaceImageRequest $request, int $id): JsonResponse
    {
        $updated = $this->placeImageService->update($id, $request->validated());
        if (!$updated) {
            return response()->json(['message' => 'Image not found'], 404);
        }
        $image = $this->placeImageService->findById($id);
        return response()->json([
            'message' => 'Image updated successfully',
            'data' => $this->placeImageService->formatImage($image),
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
        return response()->json(['data' => $this->placeImageService->formatImage($image)]);
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
