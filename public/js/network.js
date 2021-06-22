
var bLoader = false;
var internalBLoader = false;
const followerUserBtn = document.querySelector('#followerBtn');
const publicUserBtn = document.querySelector('#publicBtn');

followerUserBtn.addEventListener('click', showFollower);
publicUserBtn.addEventListener('click', showPublic);

const publicSection = document.querySelector('.user-public-container');
const followerSection = document.querySelector('.user-follower-container');

function showFollower() {
    followerSection.style.display = "flex";
    publicSection.style.display = "none";
    followerUserBtn.classList.add("active-item");
    publicUserBtn.classList.remove("active-item");
}

function showPublic() {
    publicSection.style.display = "flex";
    followerSection.style.display = "none";
    publicUserBtn.classList.add("active-item");
    followerUserBtn.classList.remove("active-item");
}

const publicUser = document.querySelectorAll('.user-card-link');
for (let i = 0; i < publicUser.length; i++) {
    publicUser[i].addEventListener("click", function () {
        if (!bLoader) {
            showUserWorkout(this);
        }
    });
}
function showUserWorkout(elem) {
    //modal reset 
    if (!bLoader) {
        bLoader = true;
        document.querySelector('.workouts-list-div').style.display = "block";
        document.querySelector('.workout-div').style.display = "none";
        document.querySelector('#workoutTable').innerHTML = "";
        let id = elem.getAttribute('data-id');
        let name = elem.querySelector('.user-name').getAttribute('data-name');
        let surname = elem.querySelector('.user-name').getAttribute('data-surname');
        let parentDiv = elem.parentNode;
        document.querySelector('#showPublicWorkoutsModal').querySelector('.show-right-title').innerHTML = ' > ' + name + ' ' + surname;
        document.querySelector('#showPublicWorkoutsModal').querySelector('.show-right-title').setAttribute('data-parentNode', parentDiv);
        //Ajax for retive workout
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let headers = new Headers();
        headers.append("X-CSRF-Token", token);
        fetch('/publicWorkouts/' + id, {
            method: 'GET',
            headers: headers,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                if (response.status >= 400 && response.status < 499) {
                    alert("Richiesta errata");
                    operationFailedShow();
                }
                if (response.status >= 500 && response.status < 599) {
                    alert("Errore sul server");
                    operationFailedShow();
                }
            }).then(data => {
                let workouts = data.workouts;
                console.log(data);
                console.log(workouts);
                for (let i = 0; i < workouts.length; i++) {
                    workout = workouts[i];
                    let name = workout['name'];
                    let publicationDate = workout['publication_date'];
                    let id = workout['id'];

                    // set new li id in the workout table
                    let newId = document.querySelector('#workoutTable').getElementsByTagName("li").length;
                    let newElem = document.createElement("li");
                    newElem.setAttribute('id', 'li_' + newId);
                    newElem.innerHTML = '<div class="table-item">' +
                        '<div id ="li_' + newId + '_name"' + 'class ="workout-name"  data-id=' + id + ' data-name = "' + name + '">' +
                        name +
                        '</div>' +
                        '<div id ="li_' + newId + '_publication"' + 'class ="workout-type  data-pubbliation = "' + publicationDate + '" >' +
                        publicationDate +
                        '</div>' +
                        '<div  class ="button-container">' +
                        '<a class="btn  show" role = "button" data-li-reference ="li_' + newId + '">' +
                        '<i class="far fa-eye show-icon icon-table" >' +
                        '</i>' + '</a>' +
                        '</div>' +
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
                }
                let showBtns = document.querySelector('#workoutTable').querySelectorAll('.show');
                for (let i = 0; i < showBtns.length; i++) {

                    showBtns[i].addEventListener('click', function () {
                        if (!bLoader) {
                            showWorkout(this);
                        }
                    });
                }

                setTimeout(function () {
                    document.querySelector('#showPublicWorkoutsModal').style.display = "block";
                }, 0);
                bLoader = false;
            }).catch(error => {
                console.log("Si è verificato un errore!");
                operationFailedShow();
            });

    }
}
function showWorkout(elem) {
    bLoader = true;
    document.querySelector('#exerciseWorkoutList').innerHTML = "";
    let li_id = elem.getAttribute('data-li-reference');
    let id = document.querySelector('#' + li_id + '_name').getAttribute('data-id')
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
                operationFailedShow();
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
                operationFailedShow();
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
            setTimeout(function () {
                document.querySelector('.workouts-list-div').style.display = "none";
                document.querySelector('.workout-div').style.display = "flex";
            }, 100);
            bLoader = false;
        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });
}

const goBackBtn = document.querySelector('.go-back');
goBackBtn.addEventListener('click', goBack);

function goBack() {
    document.querySelector('.workouts-list-div').style.display = "block";
    document.querySelector('.workout-div').style.display = "none";
}

/*Follow  */
const confirmBtns = document.querySelectorAll('.confirm-follow');
for (let i = 0; i < confirmBtns.length; i++) {
    confirmBtns[i].addEventListener('click', addFollower);
}

function addFollower(event) {
    event.preventDefault();

    let followId = this.getAttribute('data-id');
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    fetch('/publicWorkouts/newFollower/' + followId, {
        method: 'POST',
        headers: headers,
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            if (response.status >= 400 && response.status < 499) {
                alert("Richiesta errata");
                operationFailedShow();
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
                operationFailedShow();
            }
        }).then(data => {
            let divId = '#publicUser_' + followId;
            let divFollower = document.querySelector(divId);
            let followerImg = getComputedStyle(divFollower).backgroundImage;
            let urlExtension = followerImg.split("\.")[4].replace("\")", "");
            let name = divFollower.querySelector('.user-name').getAttribute('data-name');
            let surname = divFollower.querySelector('.user-name').getAttribute('data-surname');
            divFollower.parentNode.remove();

            //create elemen
            let newElement = document.createElement('div');
            newElement.classList.add('user-container');

            let followerUser = document.createElement('div');
            followerUser.setAttribute('id', 'followerUsers_' + followId);
            followerUser.classList.add('user-card');
            let urlImg = 'url("storage/images/users/' + followId + '.' + urlExtension + '")';
            followerUser.style.backgroundImage = urlImg;

            let userCardLink = document.createElement('a');
            userCardLink.classList.add('user-card-link');
            userCardLink.setAttribute('data-id', followId);

            let layer = document.createElement('div');
            layer.classList.add('layer');

            let userNameDiv = document.createElement('div');
            userNameDiv.classList.add('user-name-div');

            let label = document.createElement('label');
            label.classList.add('user-name');
            label.setAttribute('data-name', name);
            label.setAttribute('data-surname', surname);
            label.innerHTML = name + ' ' + surname;
            userNameDiv.appendChild(label);
            userCardLink.appendChild(layer);
            userCardLink.appendChild(userNameDiv);
            followerUser.appendChild(userCardLink);

            //btn creation
            let btnContainer = document.createElement('div');
            btnContainer.classList.add('submit-container');
            let button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.classList.add('confirm-unfollow');
            button.setAttribute('data-id', followId);
            button.setAttribute('value', 'UNFOLLOW');
            button.type = "button";
            button.innerHTML = 'UNFOLLOW';

            btnContainer.appendChild(button);

            newElement.appendChild(followerUser);
            newElement.appendChild(btnContainer);

            document.querySelector('.user-follower-body').appendChild(newElement);

            userCardLink.addEventListener("click", function () {
                if (!bLoader) {
                    showUserWorkout(this);
                }
            });

            button.addEventListener('click', unfollowUser);
            operationSuccessShow();
        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });

}

//UNFOLLOW 
const unfollowBtn = document.querySelectorAll('.confirm-unfollow');
for (let i = 0; i < unfollowBtn.length; i++) {
    unfollowBtn[i].addEventListener('click', unfollowUser);
}

function unfollowUser(event) {
    event.preventDefault();
    let followId = this.getAttribute('data-id');
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    fetch('/publicWorkouts/unfollow/' + followId, {
        method: 'POST',
        headers: headers,
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            if (response.status >= 400 && response.status < 499) {
                alert("Richiesta errata");
                operationFailedShow();
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
                operationFailedShow();
            }
        }).then(data => {
            let divId = '#followerUsers_' + followId;
            let divFollower = document.querySelector(divId);
            
            let followerImg = getComputedStyle(divFollower).backgroundImage;
            let urlExtension = followerImg.split("\.")[4].replace("\")", "");
            let name = divFollower.querySelector('.user-name').getAttribute('data-name');
            let surname = divFollower.querySelector('.user-name').getAttribute('data-surname');
            divFollower.parentNode.remove();

            //create elemen
            let newElement = document.createElement('div');
            newElement.classList.add('user-container');

            let followerUser = document.createElement('div');
            followerUser.setAttribute('id', 'publicUser_' + followId);
            followerUser.classList.add('user-card');
            let urlImg = 'url("storage/images/users/' + followId + '.' + urlExtension + '")';
            followerUser.style.backgroundImage = urlImg;

            let userCardLink = document.createElement('a');
            userCardLink.classList.add('user-card-link');
            userCardLink.setAttribute('data-id', followId);

            let layer = document.createElement('div');
            layer.classList.add('layer');

            let userNameDiv = document.createElement('div');
            userNameDiv.classList.add('user-name-div');

            let label = document.createElement('label');
            label.classList.add('user-name');
            label.setAttribute('data-name', name);
            label.setAttribute('data-surname', surname);
            label.innerHTML = name + ' ' + surname;
            userNameDiv.appendChild(label);
            userCardLink.appendChild(layer);
            userCardLink.appendChild(userNameDiv);
            followerUser.appendChild(userCardLink);

            //btn creation
            let btnContainer = document.createElement('div');
            btnContainer.classList.add('submit-container');
            let button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('btn-success');
            button.classList.add('confirm-follow');
            button.setAttribute('data-id', followId);
            button.setAttribute('value', 'FOLLOW');
            button.type = "button";
            button.innerHTML = 'FOLLOW';

            btnContainer.appendChild(button);

            newElement.appendChild(followerUser);
            newElement.appendChild(btnContainer);

            document.querySelector('.user-public-body').appendChild(newElement);

            userCardLink.addEventListener("click", function () {
                if (!bLoader) {
                    showUserWorkout(this);
                }
            });

            button.addEventListener('click', addFollower);
            operationSuccessShow();

        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });

}


//MODAL HANDLER
//close modal
function closeModal(button) {
    button.parentNode.parentNode.parentNode.style.display = "none";
}
