<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->index()->comment('کاربر');
            $table->unsignedBigInteger('place_id')->index()->comment('مکان مورد علاقه');

            $table->timestamps();

            $table->unique(['user_id', 'place_id']);

            $table->foreign('user_id')->references('id')->on('users')
                ->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('place_id')->references('id')->on('places')
                ->cascadeOnUpdate()->cascadeOnDelete();

            $table->comment('علاقه مندی های کاربران');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
