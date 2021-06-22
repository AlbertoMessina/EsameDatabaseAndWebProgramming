@extends('templates.authLayout')
@section('css')
<link rel="stylesheet" href="{{asset('css/registration.css')}}">
<link rel="stylesheet" href="{{asset('css/main.css')}}">
<link rel="stylesheet" href="{{asset('css/social.css')}}">
<script src="{{asset('js/componentJS/passwordStuff.js')}}" defer></script>
<!--Input validation-->
<script src="{{asset('js/inputValidation/validationRules.js')}}" defer></script>
<script src="{{asset('js/inputValidation/inputValidationRegister.js')}}" defer></script>

@stop
@section('home', '/')
@section('content')
<div class="register-container">
    <div class="div-card">
        <div class="register-header">{{ __('Register') }}</div>

        <div class="register-form-container">
            <form id="registrationForm" role="form" method="POST" action="{{ url('/register') }}">
                @csrf    
                <div class="form-group-element">
                    <label class="label-input" for="name">{{ __('Name') }}</label>
                    <input id="name" name='name' class="form-control @error('name') is-invalid @enderror" required autocomplete="name" autofocus>
                    <span class="feedback" id="nameError"> 
                            <strong> Name can't contain special element or number</strong>
                    </span>
                    @error('name')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                        
                </div>
                <div class="form-group-element ">
                    <label class="label-input" for="surname">{{ __('Surname') }}</label>
                    <input id="surname" name='surname' class="form-control @error('surname') is-invalid @enderror" required autocomplete="name" >
                    <div class="feedback" id="surnameError"> 
                         <strong> Surname can't contain special element or number</strong>
                    </div>
                    @error('surname')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="form-group-element ">
                    <label class="label-input" for="logInMail">{{ __('E-Mail Address') }}</label>
                    <input id="email" name='email' type="email"class="form-control @error('email') is-invalid @enderror" required autocomplete="email" >
                    <div class="feedback" id="emailError"> 
                         <strong> Insert email in format @pippo.pluto </strong>
                    </div>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="form-group-element ">
                    <label class="label-input" for="password">{{ __('Password') }}</label>
                    <input id="password" type="password" name="password" class="form-control  @error('password') is-invalid @enderror" required >
                    <input type="checkbox" onclick="showPassword()">
                    <label>
                            {{ __('Show password') }}
                    </label>
                    <div class="feedback" id="passwordFormatError"> 
                         <strong> Must contain -Special Caracter -Min 8 -A number. No blank space</strong>
                    </div>
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>  
                <div class="form-group-element ">
                    <label class="label-input" for="password_confirmation">{{ __('Confirm Password') }}</label>
                    <input id="password_confirmation" type="password" name="password_confirmation" class="form-control " required disabled>
                    <div class="feedback" id="passwordError"> 
                         <strong> Password must mach</strong>
                    </div>
                </div>            
                <div class="form-group-element ">
                    <label class="label-input" for="birth">{{ __('Birth') }}</label>
                    <input id="birth" type = "date" name="birth" class="form-control  @error('date') is-invalid @enderror" required>
                    <div class="feedback" id="ageError"> 
                         <strong>You mast have 14 to join </strong>
                    </div>
                    @error('birth')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="form-group-element ">
                    <label class="label-input" for="description">{{ __('Description') }}</label>
                    <textarea id="description"  name="description" class="form-control  @error('description') is-invalid @enderror" maxlength="120" required> </textarea>
                    @error('description')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="form-group-element ">
                    <label class="label-input" for="weight">{{ __('Weight') }}</label>
                    <input type="number" id="weight"  name="weight" class="form-control  @error('weight') is-invalid @enderror" required min = "10" max = "650"> 
                    @error('weight')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="center-centered">
                    <button id="registrationBtn" type="submit" class="btn btn-primary">
                                    {{ __('JOIN') }}
                    </button>
                </div>
                
            </form>

        </div>
    </div>
</div>
@endsection
