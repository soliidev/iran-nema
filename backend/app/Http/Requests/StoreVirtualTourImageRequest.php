<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVirtualTourImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'place_id' => ['required', 'integer', 'exists:places,id'],
            'title' => ['required', 'string', 'max:255'],
            'image_path' => ['required', 'string', 'max:500'],
        ];
    }
}
