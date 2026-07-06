<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProvinceResource;
use App\Models\Province;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProvinceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $provinces = Province::orderBy('name')->get();
        return ProvinceResource::collection($provinces);
    }
}
