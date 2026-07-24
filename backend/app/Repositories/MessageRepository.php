<?php

namespace App\Repositories;

use App\Models\Message;
use Illuminate\Pagination\LengthAwarePaginator;

class MessageRepository
{
    public function getAll(array $filters = []): LengthAwarePaginator
    {
        $query = Message::query()
            ->when(isset($filters['search']), fn($q) => $q->where(function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['search']}%")
                  ->orWhere('email', 'like', "%{$filters['search']}%")
                  ->orWhere('subject', 'like', "%{$filters['search']}%");
            }))
            ->latest();

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function findById(int $id): ?Message
    {
        return Message::find($id);
    }

    public function create(array $data): Message
    {
        return Message::create($data);
    }

    public function delete(int $id): bool
    {
        $message = $this->findById($id);
        if (!$message) return false;
        return $message->delete();
    }
}