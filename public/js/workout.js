const newWorkoutModal = document.querySelector("#newWorkoutModal");

const addLinkBtn = document.querySelector("#addLink");
addLinkBtn.addEventListener("click", showNewWorkOut);
/*Show modal new Exercise */
function showNewWorkOut() {
    /*FORM RESET */
    document.querySelector('#workoutForm').reset();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    document.querySelector('#publicationDate').value = today;
    /*Modal display*/
    newWorkoutModal.style.display = "block";
}

/*Reference add  */
const addWorkoutBtn = document.querySelector('#workoutCreate');
addWorkoutBtn.addEventListener('click', function (event) {
    if (inputCheck(event)) {
        workoutCreate(event);
    }

});

function workoutCreate(event) {
    event.preventDefault();
    let name = document.querySelector('#workoutName').value;
    if (name == "") {

        return;
    }

    let form = document.querySelector('#workoutForm');
    let fd = new FormData(form);

    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    console.log(token);
    fetch('/workout/create', {
        method: 'POST',
        headers: headers,
        body: fd,
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
            let workout = data.workout;
            addWorkoutBtn.disabled = true;
            let id = workout['id'];
            let name = workout['name'];
            let publicationDate = workout['publication_date'];
            let public = workout['public'];


            // set new li id in the workout table
            let newId = document.querySelector('#workoutTable').getElementsByTagName("li").length;
            let newElem = document.createElement("li");
            newElem.setAttribute('id', 'li_' + newId);
            newElem.innerHTML = '<div class="table-item">' +
                '<div id ="li_' + newId + '_name"' + 'class ="workout-name"  data-id=' + id + ' data-name = "' + name + '" data-public ="' + public + '"  >' +
                name +
                '</div>' +
                '<div id ="li_' + newId + '_publication"' + 'class ="workout-type  data-pubbliation = "' + publicationDate + '" >' +
                publicationDate +
                '</div>' +
                '<div  class ="button-container">' +
                '<a class="btn  show" role = "button" data-li-reference ="li_' + newId + '">' +
                '<i class="far fa-eye show-icon icon-table" >' +
                '</i>' + '</a>' +
                '<a class="btn  edit" role"button" data-li-reference ="li_' + newId + '">' +
                '<i class="far fa-edit edit-icon icon-table"  >' +
                '</i>' + '</a>' +
                '<a class="btn  public"  role="button" data-li-reference ="li_' + newId + '">' +
                '<i class="fas fa-share share-icon icon-table" >' +
                '</i>' + '</a>' +
                '<a class="btn  delete"  role="button" data-li-reference ="li_' + newId + '">' +
                '<i class="fas fa-trash trash-icon icon-table" >' +
                '</i>' + '</a>'
                + '</div>' +
                '</div >';
            //insert new workout as first workoutTable
            let referenceNode = document.querySelector("#workoutTable li:first-child");

            if (referenceNode == null) {
                //first element of table;
                document.querySelector("#workoutTable").appendChild(newElem);
            }
            else {
                referenceNode.parentNode.insertBefore(newElem, referenceNode);    // referenceNode.nextSibling
            }
            setTimeout(function () { window.location.href = "/workout/" + id; }, 200);
            operationSuccessShow()

        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });
}

//Delete workout
/*Add event listner*/

const deleteBtns = document.querySelectorAll('.delete');
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", showDeleteWorkout);
}

/*  Get deleteExerciseModal  */
const deleteWorkoutModal = document.querySelector("#deleteWorkoutModal");

/*  Show deleteModal   */
function showDeleteWorkout() {
    deleteWorkoutModal.style.display = "block";

    //reference for deleting element    
    //id reference 
    let li_id = this.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id');
    //set workout id into modal div with data-attribute
    document.querySelector('#deletedId').setAttribute('data-id', id);
    document.querySelector('#checkId').innerHTML = 'Number id' + ' ' + id;
    //Set li-id into modal div with data-attribute
    document.querySelector('#deletedLi').setAttribute('data-li', li_id);
};

/*Add event listner delete confirm*/
const confirmDeleteBtn = document.querySelector('#confirmDeleteBtn');
confirmDeleteBtn.addEventListener("click", deleteWorkout);
/*  Ajax call Record delete */
function deleteWorkout(event) {
    event.preventDefault();
    let id = document.querySelector('#deletedId').getAttribute('data-id');
    //get stored id of the li to remove
    let li_id = document.querySelector('#deletedLi').getAttribute('data-li');
    //get reference of li
    let selected_li = document.querySelector('#' + li_id);

    /* Ajax call for delete */
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);

    fetch('/workout/delete/' + id, {
        method: 'DELETE',
        headers: headers,
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            if (response.status >= 400 && response.status < 499) {
                alert("Richiesta errata");
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
            }
        }).then(data => {
            selected_li.remove();
            //close modal
            deleteWorkoutModal.style.display = "none";
            operationSuccessShow();
        }).catch(error => {
            operationFailedShow();
            console.log("Si è verificato un errore!")
        });
}


//END DELETE

// UPDATE MODAL 
/*Add event listner*/
const updateBtns = document.querySelectorAll('.edit');
for (let i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener("click", showUpdateWorkout);
}
/*  Show updateModal   */
function showUpdateWorkout() {
    let li_id = this.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id')
    window.location.href = "/workout/" + id;
}
//END UPDATE MODAL

//Show workout
const showBtns = document.querySelectorAll('.show');
for (let i = 0; i < showBtns.length; i++) {
    showBtns[i].addEventListener("click", showWorkout);
}

function showWorkout() {
    //Modal reset
    document.querySelector('#exerciseWorkoutList').innerHTML = "";
    let li_id = this.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id')
    //Ajax call  let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    /*Ajax call*/
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let request = new Request('/workout/record/' + id, { headers: { "X-CSRFToken": token } });
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
            //WORKPOINT
            let workout = data.workout;
            let description = data.workout_description;
            for (let i = 0; i < workout.length; i++) {
                console.log(workout[i]);
                elem = workout[i];
                let newElem = document.createElement("li");
                newElem.innerHTML = '<div class="exercise-list-elem">' +
                    '<div class="exercise-name">' + elem.name +
                    '</div>' +
                    '<div  class="exercise-seris">' + elem.series +
                    '</div>' +
                    '<div class="exercise-repetiton">' + elem.repetition +
                    '</div>';
                document.querySelector('#exerciseWorkoutList').appendChild(newElem);
            }
            document.querySelector('#showDescription').innerHTML = data.workout_description['0'].description;
        }).catch(error => console.log("Si è verificato un errore!"));
    setTimeout(function () { document.querySelector('#showWorkoutModal').style.display = "block"; }, 500);

}

//Share modal
const shareWorkoutModal = document.querySelector("#shareWorkoutModal");

// share btn
const shareBtns = document.querySelectorAll('.share');
for (let i = 0; i < shareBtns.length; i++) {
    shareBtns[i].addEventListener("click", shareWorkout);
}

function shareWorkout() {
    //id reference 
    let li_id = this.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id');
    let name = document.querySelector('#' + li_id + '_name').getAttribute('data-name');
    let public = document.querySelector('#' + li_id + '_name').getAttribute('data-public');
    //set workout id into modal div with data-attribute
    document.querySelector('#workoutPublicId').setAttribute('data-id', id);
    document.querySelector('#workoutPublicId').setAttribute('data-li_id', id);
    document.querySelector('#workoutPublicId').setAttribute('data-publicVisibility', public);

    if (public == 1) {

        document.querySelector('#shareWorkoutMessage').innerHTML = 'Do you want to make the training  "' + name + '" private? ';
    } else {
        document.querySelector('#shareWorkoutMessage').innerHTML = 'Do you want to make the training  "' + name + '" public? ';
    }

    //Set li-id into modal div with data-attribute
    document.querySelector('#workoutPublicId').setAttribute('data-li', li_id);

    shareWorkoutModal.style.display = "block";
}

const confirmChangePublic = document.querySelector('#confirmPublicBtn');
confirmChangePublic.addEventListener('click', changePublicVisibilty);

function changePublicVisibilty(event) {
    event.preventDefault();
    let li_id = document.querySelector('#workoutPublicId').getAttribute('data-li');
    let id = document.querySelector('#workoutPublicId').getAttribute('data-id');
    let public = document.querySelector('#workoutPublicId').getAttribute('data-publicVisibility');
    //get reference of li
    let selected_li = document.querySelector('#' + li_id);

    /* Ajax call for delete */
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);

    fetch('/workout/updateVisibility/' + id, {
        method: 'POST',
        headers: headers,
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            if (response.status >= 400 && response.status < 499) {
                alert("Richiesta errata");
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
            }
        }).then(response => {

            if (public == 1) {
                console.log('public go to private');
                //now public visibilty = false add class private
                selected_li.querySelector('.fa-share').classList.add('share-icon-private');
                selected_li.querySelector('.fa-share').classList.remove('share-icon-public'); 
                document.querySelector('#' + li_id + '_name').setAttribute('data-public', 0);

            }else{
                console.log('private go to public');
                selected_li.querySelector('.fa-share').classList.add('share-icon-public');
                selected_li.querySelector('.fa-share').classList.remove('share-icon-private');
                document.querySelector('#' + li_id + '_name').setAttribute('data-public', 1);
                console.log('asd set privete to public');
               
            }
            
            //close modal
            shareWorkoutModal.style.display = "none";
            operationSuccessShow();
        }).catch(error => {
            operationFailedShow();
            console.log("Si è verificato un errore!")
        });

}
//close modal
function closeModal(button) {
    button.parentNode.parentNode.parentNode.style.display = "none";
}

// When user clicks anywhere outside of the modalCompanies, close it
window.addEventListener("click", function (event) {
    if (event.target == newWorkoutModal) {
        newWorkoutModal.style.display = "none";
    }
})
