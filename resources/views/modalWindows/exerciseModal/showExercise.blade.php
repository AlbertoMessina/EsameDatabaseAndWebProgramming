<x-showModal class="showExerciseModal" >
@slot('modalTitle' , 'Exercise info')
@slot('modalId' , 'showExerciseModal')
@slot('rightTitle' , "")
<div class="info-container">
   <label class="info-label"><span id= "exerciseTypeShow">TYPE</span></label>
</div>

<div class = "carousel-show-container">
   <div id="carouselShowExercise" class="carousel slide carousel-show-exercise" data-ride="carousel">
     <ol class="carousel-indicators carousel-indicators-exercise">

     </ol>
     <div class="carousel-inner carousel-inner-exercise">

     </div>
     <a class="carousel-control-prev" href="#carouselShowExercise" role="button" data-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="sr-only">Previous</span>
     </a>
     <a class="carousel-control-next" href="#carouselShowExercise" role="button" data-slide="next">
       <span class="carousel-control-next-icon" aria-hidden="true"></span>
       <span class="sr-only">Next</span>
     </a>
   </div>

</div>
<div class="info-container">
   <label class="info-label"><span>INFO</span></label>
   <div id="showInfo">
     <div id="infoText">

     </div>
   </div>
</div>

</x-showModal>
