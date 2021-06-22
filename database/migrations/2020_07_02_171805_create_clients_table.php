<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
           $table->id();
           $table->unsignedBigInteger('user_id');
           $table->string('name', 50);
           $table->string('surname', 50);
           $table->date('birth');
           $table->string('description', 350);
           $table->string('url', 100)->default('none');
           $table->float('weight');
           $table->softDeletes();
           $table->timestamps();
           $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
