<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            $table->string('name')->comment('نام فرستنده');
            $table->string('email')->comment('ایمیل فرستنده');
            $table->string('subject')->comment('موضوع پیام');
            $table->text('message')->comment('متن پیام');

            $table->timestamps();
            $table->softDeletes();

            $table->index('email');

            $table->comment('پیام ها');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
