<x-genericModal>
  @slot('modalTitle' , 'Delete Workout')
  @slot('modalId' , 'deleteWorkoutModal')
  @slot('modalClass' , 'small-modal')
  <label> Are you sure to delete? </label>
  <span id='checkId'> </span>
  <div style="display:none" id="deletedId"> </div>
  <div style="display:none" id="deletedLi"> </div>
  <div class="submit-container">
    <input type='submit' id="confirmDeleteBtn" class="btn btn-success btn-unique" value='DELETE'>
  </div>
</x-genericModal>