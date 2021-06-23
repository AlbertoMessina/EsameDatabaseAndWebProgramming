<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Workout;
use App\Models\Exercise_list;
use App\Models\Exercise;
use Carbon\Carbon;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $client = $user->client;
        $workouts = $client->workouts()->orderBy('publication_date', 'desc')->get();
        $localDate = Carbon::now();
        return view('workout')->with('workouts', $workouts)->with('localDate', $localDate->toDateString());
    }

    /* */
    public function indexUpdate($id)
    {
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $request->all();
        $workout = new Workout();
        $workout->name = $request->name;
        $workout->publication_date = $request->publication_date;
        $workout->client_id =  Auth::user()->id;
        $res = $workout->save();
        return response()->json(array('success' => true, 'workout' => $workout), 200);
    }

    public function createRandom(Request $request)
    {
        $req = json_decode($request->getContent(), true);
        $user_id =  Auth::user()->id;
        $today =  date("Y-m-d");
        $workout = new Workout();
        $workout->name = "Daily Workout Random";
        $workout->publication_date = $today;
        $workout->client_id = $user_id;
        $res = $workout->save();
        if ($res) {
            $id = $workout->id;
            foreach ($req as $value) {

                $exercise = new Exercise_list();
                $exercise->repetition = $value['rep'];
                $exercise->series = $value['series'];
                $exercise->exercise_id = $value['exercise_id'];
                $exercise->workout_id = $id;
                $save =  $exercise->save();
            }
            return response()->json(array('success' => true), 200);
        }
        return response()->json(array('success' => false), 500);
    }

    /**updateVisibilty
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       
        $queryBuilder = Workout::where('id', $id);
        $workout = $queryBuilder->get();
        
       /*  $queryBuilder = Exercise_list::join('exercises', 'exercise_lists.exercise_id', '=', 'exercises.id')
            ->where('exercise_lists.workout_id', $id)->select('exercises.id', 'exercises.name', 'exercises.type', 'exercises.difficulty', 'exercise_lists.series', 'exercise_lists.repetition');
        $exercises = $queryBuilder->get();
        */
        $exercises = $workout['0']->exercises()->select('exercises.id', 'exercises.name', 'exercises.type', 'exercises.difficulty', 'exercise_lists.series', 'exercise_lists.repetition')->get();
        return view('editWorkout')->with('workout',$workout)->with('exercises',$exercises);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        Exercise_list::where("workout_id", $id)->delete();
        $save = true;
        $req = json_decode($request->getContent(), true);
        $array =  $req['exerciseList'];
        foreach ($array as $value) {
            if ($save) {
                $exercise = new Exercise_list();
                $exercise->repetition = $value['rep'];
                $exercise->series = $value['series'];
                $exercise->exercise_id = $value['exercise_id'];
                $exercise->workout_id = $id;
                $save =  $exercise->save();
            }
        }
        if ($save) {
            $workout = WORKOUT::find($id);
            $workout->name = $req['name'];
            $workout->description = $req['description'];
            $workout->publication_date = $req['publication'];
            $save = $workout->save();
        }
        return ($save);
    }


    /**
     * get record of specific resource
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getRecord($id)
    {
        $queryBuilder =  Workout::where('id', $id)->select('description');
        $workout_description = $queryBuilder->get();
        $queryBuilder = Exercise_list::join('exercises', 'exercise_lists.exercise_id', '=', 'exercises.id')
            ->where('exercise_lists.workout_id', $id)->select('exercises.name', 'exercises.type', 'exercises.difficulty', 'exercise_lists.series', 'exercise_lists.repetition');
        $workout = $queryBuilder->get();
        return response()->json(array('success' => true, 'workout' => $workout, 'workout_description' => $workout_description), 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $exercises = Exercise_list::where("workout_id", $id)->delete();
        $res =  Workout::where('id', $id)->delete();
        return $res;
    }
    public function updateVisibility($id)
    {
        $workout=  WORKOUT::find($id);
        if($workout->public === 1){
            //SET PUBLIC = FALSE
            $workout->public = 0;
        }else{
            //SET PUBLIC = TRUE
            $workout->public = 1;
        }
        $save = $workout->save();
        return ($save);
    }
}
