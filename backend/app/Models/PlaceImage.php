<?php

namespace App\Models;

use Database\Factories\PlaceImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

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
