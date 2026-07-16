<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VirtualTourImageResource;
use App\Services\VirtualTourImageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VirtualTourImageController extends Controller
{
    public function __construct(
        private readonly VirtualTourImageService $virtualTourImageService
    ) {}

    public function index(int $placeId): JsonResponse
    {
        $tours = $this->virtualTourImageService->getByPlace($placeId);
        $formatted = $tours->map(fn($t) => $this->virtualTourImageService->formatTour($t))->values();
        return response()->json(['data' => $formatted]);
    }

    public function upload(Request $request, int $placeId): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:512000',
            'title' => 'required|string|max:255',
        ]);

        $tour = $this->virtualTourImageService->upload($placeId, $request->file('image'), $request->input('title'));

        return response()->json([
            'message' => 'Virtual tour uploaded successfully',
            'data' => $tour,
        ], 201);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'place_id' => 'required|integer|exists:places,id',
            'title' => 'required|string|max:255',
            'image_path' => 'required|string|max:500',
        ]);

        $tour = $this->virtualTourImageService->create($request->validated());
        $formatted = $this->virtualTourImageService->formatTour($tour);

        return response()->json([
            'message' => 'Virtual tour image created successfully',
            'data' => $formatted,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $tour = $this->virtualTourImageService->findById($id);
        if (!$tour) {
            return response()->json(['message' => 'Virtual tour image not found'], 404);
        }
        return response()->json(['data' => $this->virtualTourImageService->formatTour($tour)]);
    }

    public function update(Request $request, int $virtualTour): JsonResponse
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'image_path' => 'sometimes|required|string|max:500',
        ]);

        $updated = $this->virtualTourImageService->update($virtualTour, $request->validated());
        if (!$updated) {
            return response()->json(['message' => 'Virtual tour image not found'], 404);
        }
        $tour = $this->virtualTourImageService->findById($virtualTour);
        return response()->json([
            'message' => 'Virtual tour image updated successfully',
            'data' => $this->virtualTourImageService->formatTour($tour),
        ]);
    }

    public function destroy(int $placeId, int $virtualTour): JsonResponse
    {
        $deleted = $this->virtualTourImageService->delete($virtualTour);

        if (!$deleted) {
            return response()->json(['message' => 'Virtual tour image not found'], 404);
        }

        return response()->json(['message' => 'Virtual tour image deleted successfully']);
    }
}
