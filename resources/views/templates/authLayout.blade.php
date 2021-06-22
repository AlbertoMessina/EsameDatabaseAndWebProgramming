<!doctype html>
<html lang="en">

<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <meta name="csrf-token" content='{{csrf_token()}}'>
   <title>@yield('title','BigMuscle')</title>
   <script src="https://kit.fontawesome.com/267061b199.js" crossorigin="anonymous"></script>
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
   <!--CSS IMPORT -->
   <link rel="stylesheet" href='/css/main.css'>
   <link rel="stylesheet" href="{{asset('/css/social.CSS')}}">
   @yield('css' , "")
</head>

<body>
   <div>
      <nav class="navbar navbar-expand-md navbar-dark  nav-row">
         <div class="home-link">
            <div id="image-background">
               <a class="navbar-brand text-bold  text-size-medium" href=@yield('home','/')> <label class="hide-meta">Big Muscle </label></a>
            </div>
         </div>
      </nav>
   </div>
   <div class="row view">      
            @yield('content')
   </div>


   <!-- Footer -->
   @include('/partial/footer')
   <!-- Bootstrap , Jquery e popper -->
   <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

   <script src="{{asset('js/mainLayout.js')}}"> </script>
   @section('script')
   <!--Myscript -->
   @stop
</body>

</html>