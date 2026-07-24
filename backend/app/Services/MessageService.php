<?php

namespace App\Services;

use App\Models\Message;
use App\Repositories\MessageRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class MessageService
{
    public function __construct(
        private readonly MessageRepository $messageRepository
    ) {}

    public function getAll(array $filters = []): LengthAwarePaginator
    {
        return $this->messageRepository->getAll($filters);
    }

    public function findById(int $id): ?Message
    {
        return $this->messageRepository->findById($id);
    }

    public function create(array $data): Message
    {
        return $this->messageRepository->create($data);
    }

    public function delete(int $id): bool
    {
        return $this->messageRepository->delete($id);
    }
}