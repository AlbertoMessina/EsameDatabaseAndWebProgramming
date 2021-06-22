<x-genericModal class="newExerciseModal">
  @slot('modalTitle' , 'Update Exercise')
  @slot('modalId' , 'updateExeciseModal')
  @slot('modalClass', 'large-modal')

  <form id="updateExerciseForm" method="POST" enctype="multipart/form-data">
    <div style="display:none" id='updateli'></div>
    <div style="display:none" id='updateId'></div>
    <div class="form-group-element ">
      <label class="form-label" data-error="wrong" data-success="right" for="exercise-name"><span>Exercise name</span></label>
      <input type="text" id="updateName" name="update_name" class="form-control" required>
    </div>

    <div class="form-group-element ">
      <label class="form-label" data-error="wrong" data-success="right" for="difficulty"><span>Difficulty (betwenn 1 and 5)</span></label>
      <input type="number" id="updateDifficulty" name="update_difficulty" class="form-control form-control-sm validate" min="1" max="5" required>
    </div>
    <div class="form-group-element ">
      <label class="form-label" data-error="wrong" data-success="right"><span>Type</span></label>
      <div class="radio-button-container">
        <div  class="radio-option">
          <input type="radio" id="updateUpperBody" name="update_type" value="upperBody">
          <label for="updateUpperBody">Upper body</label>
        </div>
        <div  class="radio-option">
          <input type="radio" id="updateLowerBody" name="update_type" value="lowerBody">
          <label for="updateLowerBody">Lower Body</label>
        </div>
        <div  class="radio-option">
          <input type="radio" id="updateFullBody" name="update_type" value="fullBody">
          <label for="updateFullBody">Full Body</label>
        </div>
        <div  class="radio-option">
          <input type="radio" id="updateCore" name="update_type" value="core">
          <label for="updateCore">Core</label>
        </div>
        <div  class="radio-option">
          <input type="radio" id="updateCardio" name="update_type" value="cardio">
          <label for="updateCardio">Cardio</label>
        </div>
      </div>
    </div>
    <div class="form-group-element ">
      <label class="form-label" data-error="wrong" data-success="right" for="img_path[]"><span>LoadImage</span></label>
      <div class="multiple-img-upload">
        <input type="file" id="updateImgs" name="img_path[]" class="form-control validate" multiple />
        <div style='padding:14px; margin:auto' ;>
          <div id="imgThumbnailPreviewUpdate" class="img-thumbnail-preview">

          </div>
        </div>
      </div>
    </div>
    <div>
      <img id="update-miniature-img"> </img>
    </div>
    <div class="form-group-element">
      <label class="form-label" data-error="wrong" data-success="right" for="update_info"><span>Exercise Info</span></label>
      <textarea type="text" id="updateInfo" name="update_info" class="md-textarea form-control" rows="4"></textarea>
    </div>
    <div class="center-centered">
      <input type='submit' id="exercise_update" class="btn btn-success btn-unique" value='UPDATE'>
    </div>
  </form>

</x-genericModal>