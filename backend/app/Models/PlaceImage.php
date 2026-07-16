<?php

namespace App\Models;

use Database\Factories\PlaceImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class PlaceImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'place_id',
        'image_path',
        'alt_text',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): string
    {
        return $this->image_path ? url('api/media/' . ltrim($this->image_path, '/')) : '';
    }

    public function place(): BelongsTo
    {
        return $this->belongsTo(Place::class);
    }

    protected static function booted(): void
    {
        static::creating(function (self $image) {
            if ($image->is_primary) {
                static::where('place_id', $image->place_id)
                    ->where('is_primary', true)
                    ->update(['is_primary' => false]);
            }
        });

        static::updating(function (self $image) {
            if ($image->is_primary && $image->isDirty('is_primary')) {
                static::where('place_id', $image->place_id)
                    ->where('id', '!=', $image->id)
                    ->where('is_primary', true)
                    ->update(['is_primary' => false]);
            }
        });
    }
}
