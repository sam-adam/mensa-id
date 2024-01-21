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
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin');
            $table->boolean('is_member');
            $table->string('membership_code');
            $table->dateTime('membership_from')->nullable();
            $table->dateTime('membership_until')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
            $table->dropColumn('is_member');
            $table->dropColumn('membership_code');
            $table->dropColumn('membership_from')->nullable();
            $table->dropColumn('membership_until')->nullable();
        });
    }
};
