<x-genericModal class="edit-workout-modal">
    @slot('modalTitle' , 'Add exercise')
    @slot('modalId' , 'addExerciseModal')
    @slot('modalClass' , 'small-modal')
    <div id="workoutFormContainer">
        <form id="workoutForm" method="POST" enctype="multipart/form-data">
                <div class="select-container">
                    <div class="form-group-element">
                        <label class="form-label"><span>Exercise Type</span></label>
                        <div>
                            <select id="typeSelect" class="type-select" required>
                                <option value="0"> Select type: </option>
                                <option value="cardio">Cardio</option>
                                <option value="core">Core</option>
                                <option value="fullBody">Full body</option>
                                <option value="lowerBody">Lower body</option>
                                <option value="upperBody">Upper body</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group-element right-element">
                        <label class="form-label"><span>Exercise </span></label>
                        <div class="select-list" >
                            <select id="exerciseSelect" class="exercise-select">
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="form-group-element exercise-container-column">
                        <div class="series-div">
                            <label class="form-label" for="series">{{ __('Series') }}</label>
                            <input type="number" id="series" name="series" class="form-control" required min="1" max="200">
                        </div>
                        <div class="right-element">
                            <label class="form-label" for="repetition">{{ __('Repetition') }}</label>
                            <input type="number" id="repetition" name="repetition" class="form-control" required min="1" max="200">
                        </div>
                    </div>
                </div>
                <div class="form-group-element center-centered">
                    <input type='submit' id="submitExercise" class="btn btn-success" value="submit">
                </div>
        </form>
    </div>
</x-genericModal>