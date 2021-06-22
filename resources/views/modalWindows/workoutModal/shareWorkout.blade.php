<x-genericModal>
  @slot('modalTitle' , 'Share Workout')
  @slot('modalId' , 'shareWorkoutModal')
  @slot('modalClass' , 'small-modal')
  <div id="shareWorkoutMessageContainer">
    <label id="shareWorkoutMessage"> Do you want to make the training public? </label>
  </div>
  <div style="display:none" id="workoutPublicId"> </div>


  <div class="submit-container">
    <input type='submit' id="confirmPublicBtn" class="btn btn-success btn-unique" value="sure">
  </div>
</x-genericModal>