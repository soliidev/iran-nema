<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVirtualTourImageRequest;
use App\Http\Requests\UpdateVirtualTourImageRequest;
use App\Http\Resources\VirtualTourImageResource;
use App\Services\VirtualTourImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VirtualTourImageController extends Controller
{
    public function __construct(
        private readonly VirtualTourImageService $virtualTourImageService
    ) {}

    public function index(int $placeId): AnonymousResourceCollection
    {
        $images = $this->virtualTourImageService->getByPlace($placeId);
        return VirtualTourImageResource::collection($images);
    }

    public function store(StoreVirtualTourImageRequest $request): JsonResponse
    {
        $image = $this->virtualTourImageService->create($request->validated());
        return response()->json([
            'message' => 'Virtual tour image created successfully',
            'data' => new VirtualTourImageResource($image),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $image = $this->virtualTourImageService->findById($id);
        if (!$image) {
            return response()->json(['message' => 'Virtual tour image not found'], 404);
        }
        return response()->json(['data' => new VirtualTourImageResource($image)]);
    }

    public function update(UpdateVirtualTourImageRequest $request, int $id): JsonResponse
    {
        $updated = $this->virtualTourImageService->update($id, $request->validated());
        if (!$updated) {
            return response()->json(['message' => 'Virtual tour image not found'], 404);
        }
        return response()->json([
            'message' => 'Virtual tour image updated successfully',
            'data' => new VirtualTourImageResource($this->virtualTourImageService->findById($id)),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->virtualTourImageService->delete($id);
        if (!$deleted) {
            return response()->json(['message' => 'Virtual tour image not found'], 404);
        }
        return response()->json(['message' => 'Virtual tour image deleted successfully']);
    }
}
