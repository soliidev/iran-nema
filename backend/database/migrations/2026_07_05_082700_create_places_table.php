<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('category_id')->index()->comment('دسته‌بندی مکان');
            $table->unsignedTinyInteger('province_id')->index()->comment('استان');

            $table->string('code')->comment('کد');
            $table->string('title')->comment('عنوان');
            $table->decimal('latitude', 10, 8)->comment('عرض جغرافیایی');
            $table->decimal('longitude', 11, 8)->comment('طول جغرافیایی');
            $table->text('description')->nullable()->comment('توضیحات');
            $table->decimal('rating', 3)->default(0)->comment('میانگین امتیاز (۰ تا ۵)');

            $table->timestamps();
            $table->softDeletes();

            $table->unique(['code', 'deleted_at']);
            $table->unique(['title', 'deleted_at']);

            $table->foreign('category_id')->references('id')->on('categories')
                ->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('province_id')->references('id')->on('provinces')
                ->cascadeOnUpdate()->cascadeOnDelete();

            $table->comment('مکان ها');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
