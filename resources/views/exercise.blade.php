@extends('templates.layout')
@section('webSection' , 'Exercise')
@section('home', '/dashboard')
@section('css')
<link rel="stylesheet" href="{{asset('css/scrollbar.css')}}">
<link rel="stylesheet" href="{{asset('css/snackbar.css')}}">
<link rel="stylesheet" href="{{asset('css/menu.css')}}">
<link rel="stylesheet" href="{{asset('css/components/table.css')}}">
<link rel="stylesheet" href="{{asset('css/modal/filePreview.css')}}">
<link rel="stylesheet" href="{{asset('css/modal/genericModal.css')}}">
<link rel="stylesheet" href="{{asset('css/exercise.css')}}">
<!--Javascript import -->
<script src="{{asset('js/exercise.js')}}" defer></script>
<script src="{{asset('js/componentJS/filePreview.js')}}" defer></script>


@stop

@section('content')
{{--Tabella esercizi--}}
<div class="table-container  ">
   <div class="table-header">

      <div>
         NAME
      </div>
      <div>
         TYPE
      </div>
      <div>
         DIFFICULTY
      </div>
      <div>
         <a class="btn btn-secondary add-btn" id="addLink" role="button"><span class="fas fa-plus add-exercise"> </span></a>
      </div>

   </div>
   <ul class="table-body" id='exerciseTable'>

      @foreach ($exercise as $exercise)
      <li id='li_{{$loop -> index}}'>
         <div class="table-item">
            <div id='li_{{$loop -> index}}_name' class="exercise-name" data-id='{{$exercise->id}}' data-name='{{$exercise->name}}'>
               {{$exercise->name}}
            </div>
            <div id='li_{{$loop -> index}}_type' class="exercise-type" data-type='{{$exercise->type}}'>
               {{$exercise->type}}
            </div>
            <div id='li_{{$loop -> index}}_difficulty' class="exercise-difficulty" data-difficulty='{{$exercise->difficulty}}'>
               {{$exercise->difficulty}}
            </div>
            <div class="button-container">

               <a class="btn  show " role="button" data-li-reference='li_{{$loop -> index}}'><i class='far fa-eye show-icon icon-table' ></i></a>
               @if($exercise->custom_id != 0)

               <a class="btn  edit" data-li-reference='li_{{$loop -> index}}' role="button"><i class='far fa-edit edit-icon icon-table'></i></a>
               <a class="btn  delete" role="button" data-li-reference='li_{{$loop -> index}}'><i class='fas fa-trash trash-icon icon-table'></i></a>

               @endif
            </div>
         </div>
      </li>
      @endforeach
   </ul>
</div>
<div id="snackbar" class="snackbar"><i></i><span>Operation snackbar</span></div>
<!--Modals-->

<!--Modal new exerise-->
@include('/modalWindows/exerciseModal/newExercise')
<!--End modal-->

<!--Modal Alter-->
@include('/modalWindows/exerciseModal/updateExercise')
<!--delete Modal-->
@include('/modalWindows/exerciseModal/deleteExercise')
<!--show -->
@include('/modalWindows/exerciseModal/showExercise')

@endsection
