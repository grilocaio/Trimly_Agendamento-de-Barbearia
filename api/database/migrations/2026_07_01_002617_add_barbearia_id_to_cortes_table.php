<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cortes', function (Blueprint $table) {
            $table->unsignedBigInteger('barbeariaId')->nullable()->after('valor');
        });
    }

    public function down(): void
    {
        Schema::table('cortes', function (Blueprint $table) {
            $table->dropColumn('barbeariaId');
        });
    }
};