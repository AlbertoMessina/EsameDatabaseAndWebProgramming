@extends('templates.layout')
@section('webSection' , 'NetWork')
@section('css')

<link rel="stylesheet" href="{{asset('css/snackbar.css')}}">
<link rel="stylesheet" href="{{asset('css/menu.css')}}">
<link rel="stylesheet" href="{{asset('css/snackbar.css')}}">
<link rel="stylesheet" href="{{asset('css/components/table.css')}}">
<link rel="stylesheet" href="{{asset('css/modal/genericModal.css')}}">
<link rel="stylesheet" href="{{asset('css/network.css')}}">
<!--Javascript import -->
<script src="{{asset('js/network.js')}}" defer></script>
<script src="{{asset('js/componentJS/snackbar.js')}}" defer></script>
@stop
@section('subMenuSection')
<div class="sub-menu">
    <button id="followerBtn" class="sub-menu-btn "> Follower<i class="fas fa-user-friends"></i> </button>
    <button id="publicBtn" class="sub-menu-btn active-item">PUBLIC <i class="fas fa-users"></i></button>
</div>
@stop

@section('content')

<div id="utility-bars">
  <!--  <div class="search-div">
        <form class="search" action="">
            <input type="text" placeholder="Search.." name="search">
            <button type="search-submit"><i class="fa fa-search"></i></button>
        </form>
    </div>
-->
</div>
<div id="network-div">
    <div class="user-follower-container">
        <div class="header-label user-follower-header">
            <label class="info-label"> <span>FOLLOW USERS</span> </label>
        </div>
        <div class="user-follower-body">
            @foreach($follwerUsers as $user)
            <div class="user-container">
                <div id="followerUsers_{{$user->user_id}}" class="user-card" style="background-image : url(storage/{{$user->url}});">
                    <a class="user-card-link" data-id="{{$user->user_id}}">
                        <div class="layer">
                        </div>
                        <div class="user-name-div">
                            <label class="user-name" data-name='{{$user->name}}' data-surname='{{$user->surname}}'> {{$user->name}} {{$user->surname}}</label>
                        </div>
                    </a>
                </div>
                <div class="submit-container">
                    <input type='submit' class="btn btn-primary confirm-unfollow" data-id="{{$user->user_id}}" value="UNFOLLOW">
                </div>
            </div>
            @endforeach

        </div>
    </div>
    <div class="user-public-container">
        <div class="header-label user-public-header">
            <label class="info-label"> <span>PUBLIC USERS</span> </label>
        </div>
        <div class="user-public-body">
            @foreach($publicUsers as $user)
            <div class="user-container">
                <div id="publicUser_{{$user->user_id}}" class="user-card" style="background-image : url(storage/{{$user->url}});">
                    <a class="user-card-link" data-id="{{$user->user_id}}">
                        <div class="layer">
                        </div>
                        <div class="user-name-div">
                            <label class="user-name" data-name='{{$user->name}}' data-surname='{{$user->surname}}'> {{$user->name}} {{$user->surname}}</label>
                        </div>
                    </a>

                </div>
                <div class="submit-container">
                    <input type='submit' class="btn btn-success btn-unique confirm-follow"  data-id="{{$user->user_id}}" value="FOLLOW">
                </div>
            </div>
            @endforeach

        </div>
    </div>
</div>
<div id="snackbar" class="snackbar"><i></i><span>Operation snackbar</span></div>

@include('/modalWindows/networkModal/showPublicWorkouts')
@stop