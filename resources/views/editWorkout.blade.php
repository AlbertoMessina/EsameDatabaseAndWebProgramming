@extends('templates.layout')
@section('webSection' , 'Edit Workout')
@section('home', '/dashboard')
@section('css')
<link rel="stylesheet" href="{{asset('css/scrollbar.css')}}">
<link rel="stylesheet" href="{{asset('css/snackbar.css')}}">
<link rel="stylesheet" href="{{asset('css/menu.css')}}">
<link rel="stylesheet" href="{{asset('css/components/table.css')}}">
<link rel="stylesheet" href="{{asset('css/modal/genericModal.css')}}">
<link rel="stylesheet" href="{{asset('css/editWorkout.css')}}">
<!--Javascript import -->
<script src="{{asset('js/componentJS/snackbar.js')}}" defer></script>

<!--Validation -->
<script src="{{asset('js/inputValidation/validationRules.js')}}" defer></script>
<script src="{{asset('js/inputValidation/inputValidationEditWorkout.js')}}" defer></script>

<script src="{{asset('js/editWorkout.js')}}" defer></script>
@stop


@section('content')

<div class="section-content">
    @foreach ($workout as $workout)
    <div class="workout-container">

        @endforeach
        <div id="table-container">
            <div class="table-header">
                <div>
                    NAME
                </div>
                <div>
                    TYPE
                </div>
                <div>
                    SERIES
                </div>
                <div>
                    REP
                </div>
                <div>
                    <a class="btn btn-secondary add-btn" id="addLink" role="button"><span class="fas fa-plus add-exercise"> </span></a>
                </div>
            </div>
            <ul class="table-body" id='workoutTable' data-id='{{$workout->id}}'>
                @foreach ($exercises as $exercise)
                <li id='li_{{$loop -> index}}'>
                    <div class="table-item">
                        <div id='li_{{$loop -> index}}_name' class="workout-name" data-id='{{$exercise->id}}' data-name='{{$exercise->name}}'>
                            {{$exercise->name}}
                        </div>
                        <div id='li_{{$loop -> index}}_type' class="workout-type" data-type='{{$exercise->type}}'>
                            {{$exercise->type}}
                        </div>
                        <div id='li_{{$loop -> index}}_series' class="workout-series" data-series='{{$exercise->series}}'>
                            {{$exercise->series}}
                        </div>
                        <div id='li_{{$loop -> index}}_repetition' class="workout-repetition" data-repetition='{{$exercise->repetition}}'>
                            {{$exercise->repetition}}
                        </div>
                        <div class="button-container">
                            <a class="btn  edit" data-li-reference='li_{{$loop -> index}}' role="button"><i class='far fa-edit edit-icon icon-table'></i></a>
                            <a class="btn  copy" data-li-reference='li_{{$loop -> index}}' role="button"><i class='far fa-copy copy-icon icon-table'></i></a>
                            <a class="btn  delete" role="button" data-li-reference='li_{{$loop -> index}}'><i class='fas fa-trash trash-icon icon-table'></i></a>
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
        </div>
        <div id="description-container">
            <div>
                <label class="form-label" for="repetition">{{ __('Name:') }}</label>
                <input id="workoutName" name="workoutName" class="form-control" value='{{$workout->name}} ' required>
                <span class="feedback" id="nameError">
                    <strong> Name can't contain special element or void</strong>
                </span>
                <label class="form-label" for="publicationDate"><span>Pubblication Date</span></label>
                <input type="date" id="workoutPublication" name='publication_date' max="2021-12-31" class="form-control" value='{{$workout->publication_date}}' required>
                <div class="feedback" id="dateError">
                    <strong>Date cannot be past</strong>
                </div>
            </div>
            <div>
                <label class="form-label" for="info"><span>{{ __('Workout Info') }}</span></label>
                <textarea type="text" id="workoutInfo" name="info" class="md-textarea form-control" rows="4">{{$workout->description}}</textarea>
                <span class="feedback" id="nameError">
                    <strong> Name can't contain special element or void</strong>
                </span>
            </div>
        </div>
    </div>
    <div> <button id="updateWorkout" class="btn btn-success" value="update">Update</button></div>
</div>
<div id="snackbar" class="snackbar"><i></i><span>Operation snackbar</span></div>
<!--Modal Alter-->
@include('/modalWindows/workoutModal/addExerciseWorkout')
<!--Update -->
@include('/modalWindows/workoutModal/editExerciseWorkout')
@endsection