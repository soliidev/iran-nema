<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlaceImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'place_id' => ['required', 'integer', 'exists:places,id'],
            'image_path' => ['required', 'string', 'max:500'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'is_primary' => ['boolean'],
        ];
    }
}
