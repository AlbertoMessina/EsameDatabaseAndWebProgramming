@extends('templates.layout')
@section('webSection' , '')
@section('css')
<link rel="stylesheet" href="{{asset('css/userProfile.css')}}">
<link rel="stylesheet" href="{{asset('css/snackbar.css')}}">
<link rel="stylesheet" href="{{asset('css/menu.css')}}">
<!--Javascript import -->
<script src="{{asset('js/componentJS/snackbar.js')}}" defer></script>

<!--Input validation-->
<script src="{{asset('js/inputValidation/validationRules.js')}}" defer></script>
<script src="{{asset('js/inputValidation/inputValidationProfile.js')}}" defer></script>

<script src="{{asset('js/userProfile.js')}}" defer></script>
@stop
@section('subMenuSection')
<div class="sub-menu">
   <button id="profileBtn" class="sub-menu-btn active-item"> PROFILE </button>
   <button id="settingBtn" class="sub-menu-btn">SETTINGS </button>
</div>
@stop
@section('content')
@foreach($client as $client)
<div id="userProfileSection" class="profile-section-container">
   <div class="profile-container">
      <div class='profile-item-container flex-20'>
         <div class="profile-item">
            <div class="photo-container">
               @if($client->url != 'none')
               <img id="profile-photo" class="user-photo " src='/storage/{{$client->url}}'> </img>
               @else
               <img id="profile-photo" class="user-photo " src="/images/unknow.jpg"> </img>
               @endif
            </div>
         </div>
         <div class="profile-item-column">
            <div class="profile-item">
               <label class="attribute-label">{{ __('Name:')}}</label>
               <label id="name-label" class="value-label">{{ $client->name }}</label>
            </div>
            <div class="profile-item">
               <label class="attribute-label">{{ __('Surname:') }}</label>
               <label id="surname-label" class="value-label">{{$client->surname}}</label>
            </div>
         </div>
      </div>
      <div class="profile-item-container flex-60">
         <div class="profile-info">
            <div class="profile-item ">
               <label class="attribute-label">{{ __('Birth:') }}</label>
               <label id="birth-label" class="value-label">{{$client->birth}}</label>
            </div>
            <div class="profile-item">
               <label class="attribute-label">{{ __('Weight:') }}</label>
               <label id="weight-label" class="value-label">{{$client->weight}}
            </div>
         </div>
         <div class="profile-item-column">
            <div class="profile-item">
               <label class="label-input" for="description">{{ __('Description') }}</label>
               <textarea id="description-area" name="description" class="form-control " readonly>{{$client->description}} </textarea>
            </div>
         </div>
      </div>

   </div>
</div>
<div id="profileSettingSection" class="profile-section-container">
   <div class="profile-container">
      <form id="settingForm" role="form">
         @csrf
         <div class="form-row">
            <div class="setting-container">
               <div class="setting-photo-container flex-30">
                  <div class="tag">
                     <label for="photoProfile" class="custom-file-upload bi bi-camera-fill"></label>
                     <input id="photoProfile" name="img_path" type="file" />
                  </div>
                  @if($client->url != 'none')
                  <img id="setting-photo" class="user-photo" src='/storage/{{$client->url}}'> </img>
                  @else
                  <img id="setting-photo" class="user-photo" src="/images/unknow.jpg"> </img>
                  @endif
               </div>
            </div>
            <div>
               <div class="form-group-element form-row flex-70">
                  <div>
                     <label class="label-input" for="name">{{ __('Name') }}</label>
                     <input id="name" name='name' class="form-control @error('name') is-invalid @enderror" placeholder='{{ $client->name }}' value='{{ $client->name }}' required autocomplete="name" autofocus>
                     <span class="feedback" id="nameError">
                        <strong> Name can't contain special element or number</strong>
                     </span>
                     @error('name')
                     <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                     </span>
                     @enderror
                  </div>
                  <div>
                     <label class="label-input" for="surname">{{ __('Surname') }}</label>
                     <input id="surname" name='surname' class="form-control @error('surname') is-invalid @enderror" placeholder='{{ $client->surname }}' value='{{ $client->surname }}' required autocomplete="name">
                     <div class="feedback" id="surnameError">
                        <strong> Surname can't contain special element or number</strong>
                     </div>
                     @error('surname')
                     <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                     </span>
                     @enderror
                  </div>
               </div>
               <div class="form-group-element form-row ">
                  <div>
                     <label class="label-input" for="birth">{{ __('Birth') }}</label>
                     <input id="birth" type="date" name="birth" class="form-control  @error('date') is-invalid @enderror" value='{{ $client->birth}}' required>
                     <div class="feedback" id="ageError">
                        <strong>You mast have 14 to join </strong>
                     </div>
                     @error('birth')
                     <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                     </span>
                     @enderror
                  </div>
                  <div>
                     <label class="label-input" for="weight">{{ __('Weight') }}</label>
                     <input type="number" id="weight" name="weight" class="form-control  @error('weight') is-invalid @enderror" placeholder='{{ $client->weight}}' value='{{ $client->weight}}' required min="10" max="650"> </textarea>
                     <div class="feedback" id="weightError">
                        <strong>Weight mix 10 - max 650 </strong>
                     </div>
                     @error('weight')
                     <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                     </span>
                     @enderror
                  </div>
               </div>
            </div>
         </div>
         <div class="form-group-element ">
            <label class="label-input" for="description">{{ __('Description') }}</label>
            <textarea id="description" name="description" class="form-control  @error('description') is-invalid @enderror" value='{{ $client->description}}' maxlength="120" required>{{ $client->description}}</textarea>
            @error('description')
            <span class="invalid-feedback" role="alert">
               <strong>{{ $message }}</strong>
            </span>
            @enderror
         </div>
         <div class="form-group-element ">

         </div>
         <div class="submit-container">
            <div class="feedback" id="submitError">
               <strong> Check for input error</strong>
            </div>
            <button id="profileSettingSubmit" class="btn btn-primary">
               {{ __('Update') }}
            </button>
         </div>
      </form>
   </div>
   @endforeach
</div>
<div id="snackbar" class="snackbar"><i></i><span>Operation snackbar</span></div>

@stop

@section('script')

@stop