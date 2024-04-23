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
        Schema::create('comodity', function (Blueprint $table) {
            $table->id();
            $table->integer('amount');
            $table->bigInteger('user_id')->references('id')->on('users');
            $table->foreignId('supervisor_id')->references('id')->on('users')->nullable();
            $table->enum('status', ['pending', 'store', 'available', 'sold', 'reject'])->default('pending');
            $table->enum('grade', ['A', 'B', 'C', 'D'])->nullable();
            $table->bigInteger('type_id')->references('id')->on('comodity_type');
            $table->bigInteger('warehouse_id')->references('id')->on('warehouse');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
