<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('username')->comment('نام کاربری');
            $table->string('email')->comment('ایمیل');
            $table->timestamp('email_verified_at')->nullable()->comment('زمان تایید ایمیل');
            $table->boolean('is_admin')->default(false)->comment('مدیر سیستم');
            $table->string('password')->comment('گذرواژه');
            $table->rememberToken();

            $table->timestamps();
            $table->softDeletes();

            $table->unique(['username' , 'email', 'deleted_at']);

            $table->comment('کاربران');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
