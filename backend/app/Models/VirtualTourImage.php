<?php

namespace App\Models;

use Database\Factories\VirtualTourImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class VirtualTourImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'place_id',
        'title',
        'image_path',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : '';
    }

    public function place(): BelongsTo
    {
        return $this->belongsTo(Place::class);
    }
}
