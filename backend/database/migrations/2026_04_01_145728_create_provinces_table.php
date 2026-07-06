<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('provinces', static function (Blueprint $table) {
            $table->tinyIncrements('id');

            $table->string('code')->comment('کد');
            $table->string('name')->comment('نام');
            $table->decimal('latitude', 10, 6)->nullable()->comment('عرض جغرافیایی');
            $table->decimal('longitude', 10, 6)->nullable()->comment('طول جغرافیایی');

            $table->timestamps();
            $table->softDeletes();

            $table->unique(['code', 'deleted_at']);
            $table->unique(['name', 'deleted_at']);

            $table->comment('استان ها');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
