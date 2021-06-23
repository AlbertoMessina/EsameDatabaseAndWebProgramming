<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Models\Exercise_list;
use App\Models\Exercise;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class dashBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $today =  date("Y-m-d");
        $user = Auth::user();
        $client = $user->client;

        $workouts = $client->workouts()->where('publication_date', $today)->get();
       
        $dailyWorkouts = array();
        foreach ($workouts as $workout) {
            $id = $workout->id;
            $exercises =  $workout->exercises()->withPivot('repetition', 'series')->get();
            $dailyWorkout = ['workout' => $workout->name, 'exercises' => $exercises];
            array_push($dailyWorkouts, $dailyWorkout);
        
        
        }

        // GET STAT VALUES

        $workouts =  $client->workouts()->get();
        $totalWorkouts = $workouts->count();

        
        $FirstDay = date("Y-m-d", strtotime('sunday last week'));
        $LastDay = date("Y-m-d", strtotime('sunday this week'));
        $weeklyWorkout = 0;
        foreach ($workouts as $workout) {
            if ($workout->publication_date > $FirstDay && $workout->publication_date < $LastDay) {
                $weeklyWorkout++;
            }
        }
        $queryBuilder = EXERCISE::where('custom_id', Auth::user()->id);
        $personalExerciseNumber = $queryBuilder->count();
        if($personalExerciseNumber > 0){
            $queryBuilder->selectRaw('type, count(type) maxCount')->groupBy('type')->orderBy('maxCount' ,'desc');
            $favoriteExercise= $queryBuilder->first()->type;
        }
        else{
            $favoriteExercise = "No Exercise";
        }

        $user_stats = [
            'totalWorkout' => $totalWorkouts,
            'weeklyWorkout' => $weeklyWorkout,
            'personalExerciseNumber' => $personalExerciseNumber,
            'favoriteExercise' => $favoriteExercise
        ];
        return view('dashboard')->with('dailyWorkouts', $dailyWorkouts )->with('userStats', $user_stats );
     
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
