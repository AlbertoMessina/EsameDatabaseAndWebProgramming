<?php

use Illuminate\Database\Seeder;
use App\Models\Exercise;

class SeedExerciseTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Exercise::truncate();
        factory(App\Models\Exercise::class, 30)->create();
    }
}
