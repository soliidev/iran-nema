<?php

namespace App\Services;

use App\Models\VirtualTourImage;
use App\Repositories\VirtualTourImageRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class VirtualTourImageService
{
    public function __construct(
        private readonly VirtualTourImageRepository $virtualTourImageRepository
    ) {}

    public function getByPlace(int $placeId): LengthAwarePaginator
    {
        return $this->virtualTourImageRepository->getByPlace($placeId);
    }

    public function findById(int $id): ?VirtualTourImage
    {
        return $this->virtualTourImageRepository->findById($id);
    }

    public function create(array $data): VirtualTourImage
    {
        return $this->virtualTourImageRepository->create($data);
    }

    public function upload(int $placeId, UploadedFile $file, string $title): array
    {
        $path = $file->store('places/' . $placeId . '/virtual-tours', 'public');

        $tour = $this->virtualTourImageRepository->create([
            'place_id' => $placeId,
            'title' => $title,
            'image_path' => $path,
        ]);

        return $this->formatTour($tour);
    }

    public function update(int $id, array $data): bool
    {
        return $this->virtualTourImageRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        $image = $this->virtualTourImageRepository->findById($id);
        if ($image && $image->image_path) {
            Storage::disk('public')->delete($image->image_path);
        }
        return $this->virtualTourImageRepository->delete($id);
    }

    public function formatTour(VirtualTourImage $tour): array
    {
        return [
            'id' => $tour->id,
            'place_id' => $tour->place_id,
            'title' => $tour->title,
            'image_path' => $tour->image_path,
            'image_url' => $tour->image_url,
            'created_at' => $tour->created_at,
            'updated_at' => $tour->updated_at,
        ];
    }
}
