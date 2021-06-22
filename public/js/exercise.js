
//MODAL NEW EXERCISE

/*  Add event listener to button    */
const addLinkBtn = document.querySelector("#addLink");
addLinkBtn.addEventListener("click", showNewExercise);

/*  Get newExerciseModal  */
const newExerciseModal = document.querySelector("#newExeciseModal")

/*  Show newExerciseModal   */
function showNewExercise() {
    /*FORM RESET */
    document.querySelector('#exerciseForm').reset();
    document.querySelector('#imgThumbnailPreview').innerHTML = "";
    newExerciseModal.style.display = "block";
};

/*  Add event listener to form  */
const creationForm = document.querySelector("#exerciseForm");
creationForm.addEventListener("submit", recordCreation);

/*  Ajax call Record Creation */

function recordCreation(event) {
    event.preventDefault();

    /*Get value and create object*/
    let name = document.querySelector("#exerciseName").value;
    let difficulty = document.querySelector("#exerciseDifficulty").value;
    let info = document.querySelector("#exerciseInfo").value;
    let imgs = document.querySelector('#inputImgs').files;

    let type = "";
    //radio button value
    let radioCheck = document.querySelectorAll("input[name=exercise_type]");
    for (let i = 0; i < radioCheck.length; i++) {
        if (radioCheck[i].checked) {
            type = radioCheck[i].value;
            break;
        }
    }


    let form = document.querySelector("#exerciseForm");

    if (imgs.length > 4) {
        alert('Max 4 file');

        return;
    }

    let fd = new FormData(form);
    for (var pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    console.log(fd);

    //ajax call

    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    fetch('/exercise/create', {
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
            let id = data.insertedId;
            console.log(id + '   inderted id');

            // set new li id
            let newId = document.querySelector('#exerciseTable').getElementsByTagName("li").length;

            let newElem = document.createElement("li");
            newElem.setAttribute('id', 'li_' + newId);
            newElem.innerHTML = '<div class="table-item">' +
                '<div id ="li_' + newId + '_name"' + 'class ="exercise-name"  data-id=' + id + ' data-name = "' + name + '">' +
                name +
                '</div>' +
                '<div id ="li_' + newId + '_type"' + 'class ="exercise-type  data-type = "' + type + '" >' +
                type +
                '</div>' +
                '<div id ="li_' + newId + '_difficulty"' + 'class ="exercise-difficulty  data-difficulty = "' + difficulty + '" >' +
                difficulty +
                '</div>' +
                '<div  class ="button-container">' +
                '<a class="btn  show" role = "button" data-li-reference ="li_' + newId + '">' +
                '<i class="far fa-eye show-icon icon-table" >' +
                '</i>' + '</a>' +
                '<a class="btn  edit" role"button" data-li-reference ="li_' + newId + '">' +
                '<i class="far fa-edit edit-icon icon-table"  >' +
                '</i>' + '</a>' +
                '<a class="btn  delete"  role="button" data-li-reference ="li_' + newId + '">' +
                '<i class="fas fa-trash trash-icon icon-table" >' +
                '</i>' + '</a>'
                + '</div>' +
                '</div >';

            //insert new exercise as first
            let referenceNode = document.querySelector("#exerciseTable li:first-child");
            referenceNode.parentNode.insertBefore(newElem, referenceNode);    // referenceNode.nextSibling
            newExerciseModal.style.display = "none";



            // event listner to new button

            let deleteBtn = document.querySelector('#li_' + newId).querySelector('.delete');
            deleteBtn.addEventListener("click", showDeleteExercise);

            let editBtn = document.querySelector('#li_' + newId).querySelector('.edit');
            editBtn.addEventListener("click", showUpdateExercise);

            let showBtn = document.querySelector('#li_' + newId).querySelector('.show');
            showBtn.addEventListener("click", showExercise);
            operationSuccessShow();
            document.querySelector('#exerciseForm').reset();
            document.querySelector('#imgThumbnailPreview').innerHTML = "";


        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });
}

//END MODAL NEW EXERCISE

//MODAL DELETE

/*Add event listner*/
const deleteBtns = document.querySelectorAll('.delete');
for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", showDeleteExercise);
}

/*  Get deleteExerciseModal  */
const deleteExerciseModal = document.querySelector("#deleteExeciseModal");

/*  Show deleteModal   */
function showDeleteExercise() {
    deleteExerciseModal.style.display = "block";

    //reference for deleting element    
    //id reference 
    let li_id = this.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id');
    //set exercise id into modal div with data-attribute
    document.querySelector('#deletedId').setAttribute('data-id', id);
    document.querySelector('#checkId').innerHTML = 'Number id' + ' ' + id;
    //Set li-id into modal div with data-attribute
    document.querySelector('#deletedLi').setAttribute('data-li', li_id);
};

/*Add event listner delete confirm*/
const confirmDeleteBtn = document.querySelector('#confirmDeleteBtn');
confirmDeleteBtn.addEventListener("click", deleteExercise);
/*  Ajax call Record delete */
function deleteExercise(event) {
    event.preventDefault();
    let id = document.querySelector('#deletedId').getAttribute('data-id');
    //get stored id of the li to remove
    let li_id = document.querySelector('#deletedLi').getAttribute('data-li');
    //get reference of li
    let selected_li = document.querySelector('#' + li_id);

    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    fetch('exercise/delete/' + id, {
        method: 'DELETE',
        headers: headers
    })
        .then(response => {
            if (response.ok) {
                console.log('operationOk')
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
        }).then(response => {
            console.log('element' + id + 'deleted');
            //remove li 
            selected_li.remove();
            operationSuccessShow();
            //close modal
            deleteExerciseModal.style.display = "none";
        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });


}


//END MODAL DELETE


// UPDATE MODAL 
/*Add event listner*/
const updateBtns = document.querySelectorAll('.edit');
for (let i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener("click", showUpdateExercise);
}

/*  Get updateExerciseModal  */
const updateExerciseModal = document.querySelector("#updateExeciseModal");

/*  Show updateModal   */
function showUpdateExercise() {
    // get the refence
    let li_id = this.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id');
    console.log(id + 'update');
    //Ajax call for set values


    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    fetch('exercise/record/' + id, {
        method: 'GET',
        headers: headers
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
            let exercise =  data["exercise"].exercise;
            let name = exercise.name;
            let info = exercise.description;
            let difficulty = exercise.difficulty;
            let type = exercise.type;

            document.querySelector('#updateName').setAttribute('value', name);
            document.querySelector('#updateDifficulty').setAttribute('value', difficulty);
            document.querySelector('#updateInfo').value = info;
            document.querySelector("input[name=update_type][value=" + type + "]").setAttribute('checked', 'checked');
            //SET ATTRIBUTE 
            document.querySelector('#updateId').setAttribute('data-id', id);
            document.querySelector('#updateli').setAttribute('li-id', li_id);

            //SET IMG  
            let files = data["exercise"].files;
            let output = document.querySelector('#imgThumbnailPreviewUpdate');
            output.innerHTML = "No image found";
            if (files.length > 0) {
                output.innerHTML = "";
                for (let i = 0; i < files.length; i++) {

                    let file = files[i];
                    console.log(file);
                    let imgUrl = file.url;
                    let imgThumbnailElem = "<div class='imgThumbContainer'><div class='IMGthumbnail' ><img  src='storage/" + imgUrl + "'" +
                        "title='" + file.name + "'/>";

                    output.innerHTML = output.innerHTML + imgThumbnailElem;

                }
            }
            setTimeout(function () { updateExerciseModal.style.display = "block"; }, 200);
        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });

}
//Update submit listner
const updateSubmitbtn = document.querySelector('#updateExerciseForm');
updateSubmitbtn.addEventListener('submit', updateExercise);

function updateExercise(event) {
    event.preventDefault();
    let name = document.querySelector('#updateName').value;
    let difficulty = document.querySelector('#updateDifficulty').value;
    let info = document.querySelector('#updateInfo').value;
    let type = "";
    let radioCheck = document.querySelectorAll("input[name=update_type]");
    for (let i = 0; i < radioCheck.length; i++) {
        if (radioCheck[i].checked) {
            type = radioCheck[i].value;
            break;
        }
    }
    if (info == null || info == '') {
        info = "No description";
    }
    if (name != '' && difficulty != '' && difficulty <= 5 && difficulty > 0) {
        //get id for ajax call

        let id = document.querySelector('#updateId').getAttribute('data-id');

        //form data creation
        //get form
        let form = document.querySelector('#updateExerciseForm');
        let fd = new FormData(form);
        fd.append("update_id", id);

        //Ajax Call

        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let headers = new Headers();
        headers.append("X-CSRF-Token", token);
        fetch('/exercise/update', {
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
            }).then(response => {
                //change value on li
                let li_id = document.querySelector('#updateli').getAttribute('li-id');
                document.querySelector('#' + li_id + '_name').innerHTML = name;
                document.querySelector('#' + li_id + '_name').setAttribute('data-name', name);
                document.querySelector('#' + li_id + '_difficulty').innerHTML = difficulty;
                document.querySelector('#' + li_id + '_difficulty').setAttribute = ('data-difficulty', difficulty);
                document.querySelector('#' + li_id + '_type').innerHTML = type;
                document.querySelector('#' + li_id + '_type').setAttribute = ('data-type', type);
                //show snackbar
                operationSuccessShow();
                //close modal
                updateExerciseModal.style.display = "none";

            }).catch(error => {
                console.log("Si è verificato un errore!");
                operationFailedShow();
            });
    }
}

//END UPDATE MODAL


// SHOW MODAL
/*Add event listner*/
const showBtns = document.querySelectorAll('.show');
for (let i = 0; i < showBtns.length; i++) {
    showBtns[i].addEventListener("click", showExercise);
}
/*  Get showExercisModal  */
const showExerciseModal = document.querySelector("#showExerciseModal");

/*  Show deleteModal   */
function showExercise() {
    //carousel flush
    document.querySelector('.carousel-indicators-exercise').innerHTML = "";
    document.querySelector('.carousel-inner-exercise').innerHTML = "";
    // get id for ajax call
    let li_id = this.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id');
    //ajax call 
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    fetch('exercise/record/' + id, {
        method: 'GET',
        headers: headers
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
            let files = data["exercise"].files;
            console.log(data);

            if (files != null) {
                for (let i = 0; i < files.length; i++) {
                    // LETTURA VALORI
                    console.log(files[i].url);

                    let imgUrl = files[i].url;
                    //check if it's a storage or in url ht         let url = exercise.img_path;
                    if ((imgUrl.search('http')) === -1) {
                        imgUrl = 'storage/' + imgUrl;
                    }
                    // fare append nel carousello
                    if (i == 0) {
                        document.querySelector('.carousel-indicators-exercise').innerHTML += '<li data-target="#carouselShowExercise" data-slide-to="' + i + '" class="active">' + '</li>';
                        document.querySelector('.carousel-inner-exercise').innerHTML += '<div class="carousel-item active">' +
                            '<img src="' + imgUrl + '" class="d-block  img-exercise" alt="...">' +
                            '</div>';
                    }
                    else {
                        document.querySelector('.carousel-indicators-exercise').innerHTML += '<li data-target="#carouselShowExercise" data-slide-to="' + i + '">' + '</li>';
                        document.querySelector('.carousel-inner-exercise').innerHTML += '<div class="carousel-item ">' +
                            '<img src="' + imgUrl + '" class="d-block  img-exercise" alt="...">' +
                            '</div>';
                    }
                }
            }
            if (files.length == 0) {
                document.querySelector('.carousel-indicators-exercise').innerHTML += '<li data-target="#carouselShowExercise" data-slide-to="0" class="active">' + '</li>';
                document.querySelector('.carousel-inner-exercise').innerHTML += '<div class="carousel-item active">' +
                    '<img src="storage/images/default.png" class="d-block  img-exercise" alt="...">' +
                    '</div>';
            }
            let exercise = data["exercise"].exercise; 
            let name = exercise.name;
            let info = exercise.description;
            let type = exercise.type;
            document.querySelector('#exerciseTypeShow').innerHTML = "TYPE" + " -> " + type;
            document.querySelector('#infoText').innerHTML = info;
            document.querySelector('.show-right-title').innerHTML = ">" + name;
            setTimeout(function () { showExerciseModal.style.display = "block"; }, 200);

        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });

}
//END SHOW MODAL
//SnackBar handle

function operationSuccessShow() {
    let snackbar = document.querySelector('.snackbar');
    let i = document.querySelector('.snackbar i');
    let span = document.querySelector('.snackbar span');
    snackbar.classList.add("operationSuccess");
    span.innerHTML = 'Operation Success';
    // add margin
    i.classList.add('fas', 'fa-check', 'mr-1');

    setTimeout(function () { snackbar.classList.remove("operationSuccess") }, 3000);
}

function operationFailedShow() {
    let snackbar = document.querySelector('.snackbar');
    snackbar.classList.add("operationFailed");
    document.querySelector('.snackbar i').classList.add('fas', 'fa-exclamation-triangle', 'mr-1');
    document.querySelector('.snackbar span').innerHTML = 'Operation Failed';
    setTimeout(function () { snackbar.classList.remove("operationFailed") }, 3000);
}
function closeModal(button) {
    button.parentNode.parentNode.parentNode.style.display = "none";
}

