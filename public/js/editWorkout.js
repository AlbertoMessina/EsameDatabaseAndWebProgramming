//Add EventListner
const addButton = document.querySelector("#addLink");
addButton.addEventListener('click', showNewExerciseWorkout);

//Modal Reference
const newWorkoutModal = document.querySelector("#addExerciseModal");
const editWorkoutModal = document.querySelector('#editExerciseModal');

var exerciseList = "";
loadExerciseList();
/*Select reference*/
const exerciseSelect = document.querySelector('#exerciseSelect');
const exerciseEditSelect = document.querySelector('#editExerciseSelect');
const optionSelect = document.querySelector('#typeSelect');
const editOptionSelect = document.querySelector('#editTypeSelect');


/*  Show newWorkoutModal   */
function showNewExerciseWorkout() {
    /*FORM RESET */
    document.querySelector('#workoutForm').reset();
    document.querySelector('#exerciseSelect').innerHTML = "";
    /*Modal display*/
    newWorkoutModal.style.display = "block";
};

/*Add event listner to select option */
optionSelect.addEventListener('change', function () {
    let option = document.querySelector('#typeSelect').value;
    optionsCreate(exerciseSelect, option);
});

//SHOW EDIT EXERCISE


const editExerciseBtn = document.querySelector('#editExercise');
const editBtns = document.querySelectorAll('.edit');
for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener("click", showEditExercise);
};

editExerciseBtn.addEventListener('click', editExercise );

function showEditExercise(event) {
    event.preventDefault();
   
    let li_id = this.getAttribute('data-li-reference');
    let option = document.querySelector('#' + li_id + '_type').getAttribute('data-type');
    let exercise = document.querySelector('#' + li_id + '_name').getAttribute('data-name');
    let series = document.querySelector('#' + li_id + '_series').getAttribute('data-series');
    let repetition = document.querySelector('#' + li_id + '_repetition').getAttribute('data-repetition');

    optionsCreate(exerciseEditSelect, option);
  
        document.querySelector('#editTypeSelect').value = option;
        document.querySelector('#editExerciseSelect').value = exercise;
        document.querySelector('#editSeries').value = series;
        document.querySelector('#editRepetition').value = repetition;
        editExerciseBtn.setAttribute('data-li-reference', li_id);
        editWorkoutModal.style.display = "block";

}

//EDIT EXERCISE

editOptionSelect.addEventListener('change', function () {
    let option = editOptionSelect.value;
    optionsCreate(exerciseEditSelect, option);
});
function editExercise(event){
    event.preventDefault();

    let node = document.querySelector('#editExerciseSelect').options.selectedIndex;
    let li_id = this.getAttribute('data-li-reference');

    //GET VALUE
    let exercise_id = document.querySelector('#editExerciseSelect').options[node].getAttribute('data-id');
    let exercise = document.querySelector('#editExerciseSelect').value;
    let type = document.querySelector('#editTypeSelect').value;
    let series = document.querySelector('#editSeries').value;
    let repetition = document.querySelector('#editRepetition').value;

 
    document.querySelector('#'+ li_id +'_name').setAttribute('data-id', exercise_id);
    document.querySelector('#'+ li_id +'_type').setAttribute('data-type',type );
    document.querySelector('#'+ li_id +'_name').setAttribute('data-name', exercise);
    document.querySelector('#'+ li_id +'_series').setAttribute('data-series', series);
    document.querySelector('#'+ li_id +'_repetition').setAttribute('data-repetition', repetition);
    
    document.querySelector('#'+ li_id +'_name').innerHTML=exercise; 
    document.querySelector('#'+ li_id +'_series').innerHTML=series; 
    document.querySelector('#'+ li_id +'_repetition').innerHTML=repetition; 

    editWorkoutModal.style.display = "none";
}

function loadExerciseList() {
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    /*Ajax call*/
    let request = new Request('/exercise/record', { headers: { "X-CSRFToken": token } });
    fetch(request)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            if (response.status >= 400 && response.status < 499) {
                alert("Richiesta errata");
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
            }
        })
        .then(data => {
            exerciseList = data.exercise;
            /*Array sort*/
            exerciseList.sort((e1, e2) => {
                if (e1.type > e2.type) return 1;
                if (e1.type < e2.type) return -1;
                if (e1.type == e2.type) return 0;
            });
            /*End*/
        }).catch(error => console.log("Si è verificato un errore!"));
}

function optionsCreate(listReference, selectOption) {
    listReference.innerHTML = "";

    // Splitting the array
    let objectList = Object.values(exerciseList).filter(exercise => exercise.type == selectOption);

    [].forEach.call(objectList, function (exercise) {
        let name = exercise.name;
        let id = exercise.id;
        let option = document.createElement('option');
        option.text = name;
        option.setAttribute('data-id', id);
        listReference.add(option);
    });
}
//ADD EXERCISE
//Add event listner 
const submit = document.querySelector('#submitExercise');
submit.addEventListener('click', addExercise);

function addExercise(event) {
    event.preventDefault();
    let node = document.querySelector('#exerciseSelect').options.selectedIndex;
    let exercise_id = document.querySelector('#exerciseSelect').options[node].getAttribute('data-id');

    let option = document.querySelector('#typeSelect').value;
    let name = document.querySelector('#exerciseSelect').value;
    let series = document.querySelector('#series').value;
    let repetition = document.querySelector('#repetition').value;

    // add in table 
    let newId = document.querySelector('#workoutTable').getElementsByTagName("li").length;
    let newElem = document.createElement("li");
    newElem.setAttribute('id', 'li_' + newId);
    newElem.innerHTML = '<div class="table-item">' +
        '<div id ="li_' + newId + '_name"' + 'class ="workout-name"  data-id=' + exercise_id + ' data-name = "' + name + '">' +
        name +
        '</div>' +
        '<div id ="li_' + newId + '_type"' + 'class ="workout-type"  data-type = "' + option + '">' +
        option +
        '</div>' +
        '<div id ="li_' + newId + '_series"' + 'class ="workout-series"  data-series = "' + series + '">' +
        series +
        '</div>' +
        '<div id ="li_' + newId + '_repetition"' + 'class ="workout-repetition"  data-repetition = "' + repetition + '">' +
        repetition +
        '</div>' +
        '<div  class ="button-container">' +
        '<a class="btn  edit" role"button" data-li-reference ="li_' + newId + '">' +
        '<i class="far fa-edit edit-icon icon-table"  >' +
        '</i>' + '</a>' +
        '<a class="btn  copy" role"button" data-li-reference ="li_' + newId + '">' +
        '<i class="far fa-copy copy-icon icon-table"  >' +
        '</i>' + '</a>' +
        '<a class="btn  delete"  role="button" data-li-reference ="li_' + newId + '">' +
        '<i class="fas fa-trash trash-icon icon-table" >' +
        '</i>' + '</a>'
        + '</div>' +
        '</div >';
    //insert new exercise as first workoutTable
    let referenceNode = document.querySelector("#workoutTable li:first-child");
    //add evenet listner 
    if (referenceNode == null) {
        //first element of table;
        document.querySelector("#workoutTable").appendChild(newElem);
    }
    else {
        referenceNode.parentNode.insertBefore(newElem, referenceNode);    // referenceNode.nextSibling
    }
    //add event listner
    document.querySelector('#li_' + newId).querySelector(".edit").addEventListener('click', showEditExercise);
    document.querySelector('#li_' + newId).querySelector(".copy").addEventListener('click', copyExercise);
    document.querySelector('#li_' + newId).querySelector(".delete").addEventListener('click', deleteExercise);
    newWorkoutModal.style.display = "none";
}

//DELETE EXERCISE

const deleteBtns = document.querySelectorAll('.delete');
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", deleteExercise);
};
function deleteExercise() {
    let li_id = this.getAttribute('data-li-reference');
    //get reference of li
    let selected_li = document.querySelector('#' + li_id);
    selected_li.remove();
};

//COPY EXERCISE
var aux = "";
const copyBtns = document.querySelectorAll('.copy');
for (let i = 0; i < copyBtns.length; i++) {
    copyBtns[i].addEventListener("click", copyExercise);
};

function copyExercise() {
    let li_id = this.getAttribute('data-li-reference');
    if (aux == "") {

        let name = document.querySelector('#' + li_id + '_name').getAttribute('data-name');
        let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id');
        let series = document.querySelector('#' + li_id + '_series').getAttribute('data-series');
        let repetition = document.querySelector('#' + li_id + '_repetition').getAttribute('data-repetition');
        let type =  document.querySelector('#' + li_id + '_type').getAttribute('data-type');
        this.style.backgroundColor = "green";
        aux = { type: type ,li_id: li_id, name: name, exercise_id: id, series: series, repetition: repetition };
    } else {

        document.querySelector('#' + li_id + '_name').setAttribute('data-name', aux.name);
        document.querySelector('#' + li_id + '_name').innerHTML = aux.name;
        document.querySelector('#' + li_id + '_name').setAttribute('data-id', aux.exercise_id);
        document.querySelector('#' + li_id + '_type').setAttribute('data-type', aux.type);
        document.querySelector('#' + li_id + '_type').innerHTML = aux.type;
        document.querySelector('#' + li_id + '_series').setAttribute('data-series', aux.series);
        document.querySelector('#' + li_id + '_series').innerHTML = aux.series;
        document.querySelector('#' + li_id + '_repetition').setAttribute('data-repetition', aux.repetition);
        document.querySelector('#' + li_id + '_repetition').innerHTML = aux.repetition;
        document.querySelector('#' + aux.li_id).querySelector(".copy").style.backgroundColor = "transparent";
        aux = "";
    }
}
//UPDATE WORKOUT
const updateWorkoutBtn = document.querySelector('#updateWorkout');
updateWorkoutBtn.addEventListener('click', function(event){
    if(inputCheck(event)){
        updateWorkout(event);
    }else{
        operationFailedShow();
    };
    
});

function updateWorkout(event) {
    event.preventDefault();
    let workout_id = document.querySelector('#workoutTable').getAttribute('data-id')
    let tableLenght = document.querySelector('#workoutTable').getElementsByTagName("li").length;
    let nodeList = document.querySelector('#workoutTable').getElementsByTagName("li");
    let exerciseList = [];
    for (let i = 0; i < tableLenght; i++) {
        let id = nodeList[i].querySelector('.workout-name').getAttribute('data-id');
        let series = nodeList[i].querySelector('.workout-series').getAttribute('data-series');
        let rep = nodeList[i].querySelector('.workout-repetition').getAttribute('data-repetition');
        let exercise = { exercise_id: id, series: series, rep: rep };
        exerciseList.push(exercise);
    }
    console.log(exerciseList);
    let description = document.querySelector('#workoutInfo').value;
    let publication = document.querySelector('#workoutPublication').value;
    let name = document.querySelector('#workoutName').value;

    let workout = {
        description : description,
        publication : publication,
        name : name,
        exerciseList : exerciseList
    }
    let json = JSON.stringify(workout);
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    headers.append("Content-Type", "application/json");
    //update to database
    fetch('/workout/update/' + workout_id, {
        method: 'POST',
        headers: headers,
        body: json,
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            if (response.status >= 400 && response.status < 499) {
                alert("Richiesta errata");
                operationFailedShow();
                return;
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
                operationFailedShow();
                return;
            }
        }).then(data => {
            console.log(data);
            operationSuccessShow();
            /*Operation success*/
        }).catch(error => {
            operationFailedShow();
            console.log("Si è verificato un errore!");
        });
}

//MODAL HANDLER
//close modal
function closeModal(button) {
    button.parentNode.parentNode.parentNode.style.display = "none";
}

// When user clicks anywhere outside of the modalCompanies, close it
window.addEventListener("click", function (event) {
    if (event.target == newWorkoutModal) {
        newWorkoutModal.style.display = "none";
    }
});