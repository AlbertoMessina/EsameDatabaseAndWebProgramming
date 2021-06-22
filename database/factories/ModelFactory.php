<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;
use App\Models\Exercise;
use App\Models\Photo;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/


// EXERCISE FACTORY

$factory->define(App\Models\Exercise::class, function (Faker $faker) {
    return [
        'description' => $faker->text(250),
        'name' => $faker->name,
        'difficulty' => $faker->numberBetween($min = 1 , $max = 5),
        'type'=>$faker->randomElement(['fullBody', 'lowerBody','upperBody', 'core', 'cardio']),
    ];
});

//PHOTO FACTORY

$factory->define(App\Models\Photo::class, function (Faker $faker) {
    return [
        'exercise_id' => Exercise::inRandomOrder()->first()->id,
        'description' => $faker->text(150),
        'url' => $faker->imageUrl(640, 480 , 'sports')

    ];
});
