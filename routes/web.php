<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::namespace('Admin')->prefix('admin')->name('admin.')->group(function(){
    Route::resource('/users', 'UsersController');
});


/*Auth*/ 
Auth::routes();

//Auth middleware 
Route::get('/checkUser/{mail}', 'UserController@findUserEmail');
Route::group(['middleware' => 'auth'],
    function(){
        /*User Route*/
        Route::get('/profile' , 'UserController@index');
        Route::POST('/profile/update', 'UserController@update');

        /*Exercise Route*/

        Route::get('/exercise','ExercisesController@index')->name('exercise.index');
        Route::get('/exercise/record/{id}','ExercisesController@getRecord')->where('id','[0-9]+');
        Route::get('/exercise/record', 'ExercisesController@getAllRecord');
        Route::delete('/exercise/delete/{id}','ExercisesController@delete')->where('id','[0-9]+');
        Route::POST('/exercise/update','ExercisesController@update')->name('exercise.updateExercise');
        Route::post('/exercise/create' , 'ExercisesController@save')->name('exercise.save');

        /*Workout route*/
        
        Route::get('/workout', 'WorkoutController@index')->name('workout.index');
        Route::get('/workout/{id}', 'WorkoutController@show')->where('id','[0-9]+');;
        Route::get('/workout/record/{id}', 'WorkoutController@getRecord')->where('id','[0-9]+');;
        Route::POST('/workout/create', 'WorkoutController@create');
        Route::POST('/workout/randomGenerate', 'WorkoutController@createRandom');
        Route::POST('/workout/update/{id}' , 'WorkoutController@update')->where('id','[0-9]+');
        Route::POST('/workout/updateVisibility/{id}','WorkoutController@updateVisibility')->where('id','[0-9]+');
        Route::delete('/workout/delete/{id}','WorkoutController@destroy')->where('id','[0-9]+');
    
        /*Dashboard*/

        Route::get('/dashboard', 'dashboardController@index')->name('dashboard.index');

        /*network*/
        Route::get('/publicWorkouts', 'NetworkController@index')->name('network.index');
        Route::get('/publicWorkouts/{id}','NetworkController@getPublicResource')->where('id','[0-9]+');
        Route::POST('/publicWorkouts/newFollower/{id}', 'NetworkController@newFollower')->where('id', '[0-9]+');
        Route::POST('/publicWorkouts/unfollow/{id}', 'NetworkController@unfollow')->where('id', '[0-9]+');

    }
    
);

