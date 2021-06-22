@extends('templates.authLayout')
@section('css')
<link rel="stylesheet" href="{{asset('css/login.css')}}">
<link rel="stylesheet" href="{{asset('css/main.css')}}">
<link rel="stylesheet" href="{{asset('css/social.css')}}">
<script src="{{asset('js/componentJS/passwordStuff.js')}}" defer></script>
@stop
@section('home', '/')
@section('content')
<div class="login-container">
    <div class="div-card">
        <div class="login-header">{{ __('Login') }}</div>

        <div class="login-form-container">
            <form id="logInForm" method="POST" action="{{ route('login') }}">
                @csrf 
                <label  for="email">{{ __('E-Mail Address') }}</label>
                <div class="form-group-element ">
                    <input id="email" name='email' class="form-control @error('email') is-invalid @enderror" required autocomplete="email" autofocus>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <label  for="password">{{ __('Password') }}</label>
                <div class="form-group-element ">
                    <input id="password" type="password" name="password" class="form-control  @error('password') is-invalid @enderror" required autocomplete="current-password">
                    <input type="checkbox" onclick="showPassword()">
                    <label>
                            {{ __('Show password') }}
                    </label>
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
                <div class="form-group-element ">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                        <label class="form-check-label" for="remember">
                            {{ __('Remember Me') }}
                        </label>
                    </div>
                </div>
                <div class="center-centered">
                    <input type='submit' id="logInSubmit" class="btn btn-success btn-unique" value="LogIn">

                </div>
                <a class="btn btn-link" href="{{ route('register') }}">
                    {{ __('Are you new, join?') }}
                </a>
            </form>

        </div>
    </div>
</div>
@endsection