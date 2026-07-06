<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $categories = $this->categoryService->getAll($request->all());
        return CategoryResource::collection($categories);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->categoryService->create($request->validated());
        return response()->json([
            'message' => 'Category created successfully',
            'data' => new CategoryResource($category),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $category = $this->categoryService->findById($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json(['data' => new CategoryResource($category)]);
    }

    public function update(UpdateCategoryRequest $request, int $id): JsonResponse
    {
        $updated = $this->categoryService->update($id, $request->validated());
        if (!$updated) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json([
            'message' => 'Category updated successfully',
            'data' => new CategoryResource($this->categoryService->findById($id)),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->categoryService->delete($id);
        if (!$deleted) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function byCode(string $code): JsonResponse
    {
        $category = $this->categoryService->findByCode($code);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json(['data' => new CategoryResource($category)]);
    }
}
