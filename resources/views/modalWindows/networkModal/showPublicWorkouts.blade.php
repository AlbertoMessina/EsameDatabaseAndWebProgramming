<x-showModal class="showWorkoutModal">
  @slot('modalTitle' , 'Public Workout')
  @slot('modalId' , 'showPublicWorkoutsModal')
  @slot('rightTitle' , "")
  <div class="workouts-list-div">
    <div class="table-container  ">
      <div class="table-header">
        <div>
          NAME
        </div>
        <div>
          DATE
        </div>
        <div>

        </div>

      </div>
      <ul class="table-body" id='workoutTable'>


      </ul>
    </div>
   

  </div>
  <div class="workout-div">
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
    <ul id="exerciseWorkoutList">
    </ul>
    <div class="info-container">
      <label class="info-label"><span>INFO</span></label>
      <div id="showInfo">
        <div id="showDescription">

        </div>
      </div>
    </div>
    <div class="submit-container">
      <button class="btn btn-primary  go-back">
        <i class="fa fa-arrow-left" aria-hidden="true">GO BACK</i>
      </button>
    </div>
  </div>

</x-showModal>