<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('virtual_tour_images', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('place_id')->index()->comment('مکان مرتبط');

            $table->string('title')->comment('عنوان تصویر');
            $table->string('image_path')->comment('مسیر فایل تصویر');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('place_id')->references('id')->on('places')
                ->cascadeOnUpdate()->cascadeOnDelete();

            $table->comment('تصاویر تور مجازی مکان ها');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('virtual_tour_images');
    }
};
