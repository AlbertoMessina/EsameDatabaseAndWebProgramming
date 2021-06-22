<x-showModal class="showWorkoutModal" >
@slot('modalTitle' , 'Generate Workout Show')
@slot('modalId' , 'showWorkoutModal')
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
   <label class="info-label"><span>ARE YOU SURE</span></label>
   <div id="confirmButtonContainer">
     <button id="confirmBtn" class="btn btn-secondary" >SURE</>
   </div>
</div>
</x-showModal>