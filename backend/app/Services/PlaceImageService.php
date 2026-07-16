<?php

namespace App\Services;

use App\Models\PlaceImage;
use App\Repositories\PlaceImageRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PlaceImageService
{
    public function __construct(
        private readonly PlaceImageRepository $placeImageRepository
    ) {}

    public function getByPlace(int $placeId): LengthAwarePaginator
    {
        return $this->placeImageRepository->getByPlace($placeId);
    }

    public function findById(int $id): ?PlaceImage
    {
        return $this->placeImageRepository->findById($id);
    }

    public function getPrimary(int $placeId): ?PlaceImage
    {
        return $this->placeImageRepository->getPrimary($placeId);
    }

    public function create(array $data): PlaceImage
    {
        return $this->placeImageRepository->create($data);
    }

    public function upload(int $placeId, UploadedFile $file): array
    {
        $path = $file->store('places/' . $placeId, 'public');
        
        $image = $this->placeImageRepository->create([
            'place_id' => $placeId,
            'image_path' => $path,
            'alt_text' => $file->getClientOriginalName(),
            'is_primary' => false,
        ]);

        return $this->formatImage($image);
    }

    public function update(int $id, array $data): bool
    {
        return $this->placeImageRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        $image = $this->placeImageRepository->findById($id);
        if ($image && $image->image_path) {
            Storage::disk('public')->delete($image->image_path);
        }
        return $this->placeImageRepository->delete($id);
    }

    public function setPrimary(int $placeId, int $imageId): bool
    {
        return $this->placeImageRepository->setPrimary($placeId, $imageId);
    }

    public function formatImage(PlaceImage $image): array
    {
        return [
            'id' => $image->id,
            'place_id' => $image->place_id,
            'image_path' => $image->image_path,
            'image_url' => $image->image_url,
            'alt_text' => $image->alt_text,
            'is_primary' => $image->is_primary,
            'created_at' => $image->created_at,
            'updated_at' => $image->updated_at,
        ];
    }
}
