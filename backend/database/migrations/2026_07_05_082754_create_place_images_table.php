<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('place_images', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('place_id')->index()->comment('مکان مرتبط');

            $table->string('image_path')->comment('مسیر فایل تصویر');
            $table->string('alt_text')->nullable()->comment('متن جایگزین برای سئو و دسترسی‌پذیری');
            $table->boolean('is_primary')->default(false)->comment('آیا تصویر شاخص مکان است؟');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('place_id')->references('id')->on('places')
                ->cascadeOnUpdate()->cascadeOnDelete();

            $table->comment('گالری تصاویر مکان ها');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('place_images');
    }
};
