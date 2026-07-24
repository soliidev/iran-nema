<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest;
use App\Services\MessageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct(
        private readonly MessageService $messageService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $messages = $this->messageService->getAll($request->all());
        return response()->json(['data' => $messages->values()->all()]);
    }

    public function show(int $id): JsonResponse
    {
        $message = $this->messageService->findById($id);

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        return response()->json(['data' => $message]);
    }

    public function store(StoreMessageRequest $request): JsonResponse
    {
        $message = $this->messageService->create($request->validated());

        return response()->json([
            'message' => 'پیام شما با موفقیت ارسال شد',
            'data' => $message,
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->messageService->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        return response()->json(['message' => 'پیام حذف شد']);
    }
}
