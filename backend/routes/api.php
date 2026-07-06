<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\PlaceImageController;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Api\VirtualTourImageController;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);
Route::get('auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

Route::get('provinces', [ProvinceController::class, 'index']);

Route::get('statistics', [PlaceController::class, 'statistics']);

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('{id}', [CategoryController::class, 'show']);
    Route::get('code/{code}', [CategoryController::class, 'byCode']);
});

Route::prefix('places')->group(function () {
    Route::get('search', [PlaceController::class, 'search']);
    Route::get('code/{code}', [PlaceController::class, 'byCode']);
    Route::get('category/{categoryId}', [PlaceController::class, 'byCategory']);
    Route::get('province/{provinceId}', [PlaceController::class, 'byProvince']);
    Route::get('{id}/related', [PlaceController::class, 'related']);
    Route::get('{id}', [PlaceController::class, 'show']);
    Route::get('/', [PlaceController::class, 'index']);
    Route::get('{id}/images', [PlaceImageController::class, 'index']);
    Route::get('{id}/images/primary', [PlaceImageController::class, 'primary']);
    Route::get('{id}/virtual-tour', [VirtualTourImageController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    Route::apiResource('places', PlaceController::class)->except(['index', 'show']);
    Route::post('places/{place}/images/{image}/primary', [PlaceImageController::class, 'setPrimary']);

    Route::prefix('places/{place}')->group(function () {
        Route::apiResource('images', PlaceImageController::class)->except(['index', 'show']);
        Route::apiResource('virtual-tour', VirtualTourImageController::class)->except(['index', 'show']);
    });

    Route::prefix('favorites')->group(function () {
        Route::get('/', [FavoriteController::class, 'index']);
        Route::post('/', [FavoriteController::class, 'store']);
        Route::delete('{placeId}', [FavoriteController::class, 'destroy']);
        Route::get('check/{placeId}', [FavoriteController::class, 'check']);
        Route::get('count/{placeId}', [FavoriteController::class, 'count']);
    });
});
