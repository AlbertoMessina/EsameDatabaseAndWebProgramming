<x-showModal class="showWorkoutModal" >
@slot('modalTitle' , 'Workout Show')
@slot('modalId' , 'showWorkoutModal')
@slot('modalClass' , 'large-modal')
@slot('rightTitle' , "")
<div id="showHeader">
    <span>
        NAME
    </span>
    <span>
        SERIES
    </span>
    <span>
        REPETITION
    </span>
</div>
<ul id= "exerciseWorkoutList">
</ul>
<div class="info-container">
   <label class="info-label"><span>INFO</span></label>
   <div id="showInfo">
     <div id="showDescription">

     </div>
   </div>
</div>
</x-showModal>