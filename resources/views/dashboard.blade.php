@extends('templates.layout')
@section('webSection' , 'Dashboard')
@section('css')
<link rel="stylesheet" href="{{asset('css/menu.css')}}">
<link rel="stylesheet" href="{{asset('css/modal/genericModal.css')}}">
<link rel="stylesheet" href="{{asset('css/dashboard.css')}}">
<script src="{{asset('js/dashboard.js')}}" defer></script>
<script src="{{asset('js/inputValidation/validationRules.js')}}" defer></script>

@stop

@section('content')
<div class="dashboard">
    <div class="workout-show">
        <div class="workout-show-header">
            <label class="info-label "> <span>Daily Workouts</span> </label>
        </div>


        @if($dailyWorkouts)
        @foreach($dailyWorkouts as $workout)
        <div class="workout-card">
            <div class="workout-name">
                <h4>{{$workout['workout']}}</h4>
            </div>
            <ul class="exerciseWorkoutList">
                <li class="exercise-list-header">
                    <div>EXERCISE
                    </div>
                    <div>
                        SERIES
                    </div>
                    <div>
                        REP
                    </div>
                </li>
                @foreach($workout['exercises'] as $exercise)
                <li class="exercise-list-elem">
                    <div class="exercise-name">
                        {{$exercise->name}}
                    </div>
                    <div class="series">
                        {{$exercise->pivot->series}}
                    </div>
                    <div class="repetition">
                        {{$exercise->pivot->repetition}}
                    </div>
                </li>
                @endforeach
        </div>
        @endforeach
        @else
        <div class="empty-workouts">No daily workouts, generate one </div>
        @endif
    </div>
    <div class="user-option">
        <div class="user-stat">
            <div id="userStatHeader">
                <label class="info-label"> <span>User Stat</span> </label>
            </div>
            <div id="userStatBody">
                <div class="stats-container">
                    <div>
                        <label class="title-label"> Total workouts : </label><label class="total-workout-label stat-label">{{$userStats['totalWorkout']}}</label>
                    </div>
                    <div>
                        <label class="title-label"> Weekly Workouts : </label> <label class="Wekly-workout-label stat-label">{{$userStats['weeklyWorkout']}}</label>
                    </div>
                </div>
                <div class="stats-container">
                    <div>
                        <label class="title-label">Personal exercises : </label> <label class="personal-exercise-label stat-label">{{$userStats['personalExerciseNumber']}}</label>
                    </div>
                    <div>
                        <label class="title-label">Favorite exercise : </label> <label class="favorite-exercise-label stat-label">{{$userStats['favoriteExercise']}}</label>
                    </div>
                </div>

            </div>

        </div>
        <div class="random-generator">
            <div id="randomGeneratorHeader">
                <label class="info-label"> <span>RANDOM GENERATOR</span> </label>
            </div>
            <div class="feedback" id="inputError">
                <strong>Please select all option</strong>
            </div>
            <div id="typeRadio">
                <div class="radio-option">
                    <input type="radio" id="lowerBody" name="type" value="lowerBody">
                    <label for="lowerBody"> Lower Body </label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="upperBody" name="type" value="upperBody">
                    <label for="upperBody"> Upper Body </label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="fullBody" name="type" value="fullBody">
                    <label for="fullBody"> Full Body </label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="core" name="type" value="core">
                    <label for="core">Core </label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="cardio" name="type" value="cardio">
                    <label for="cardio"> Cardio </label>
                </div>

            </div>
            <div id="difficultyRadio">
                <div class="radio-option">
                    <input type="radio" id="easy" name="difficulty" value="1">
                    <label>Easy </label>
                </div>
                <div class="radio-option" >
                    <input type="radio" id="medium" name="difficulty" value="2">
                    <label>medium </label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="hard" name="difficulty" value="3">
                    <label>Hard </label>
                </div>
            </div>

            <button id="randomGeneratorBtn" class="btn btn-success">Random</button>
        </div>
    </div>
</div>
@include('/modalWindows/dashboardModal/showWorkout')

@stop