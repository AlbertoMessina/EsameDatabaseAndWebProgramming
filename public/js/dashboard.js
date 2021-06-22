

//Add eventListner to random generato btn
const randomGeneratorBtn = document.querySelector('#randomGeneratorBtn');
randomGeneratorBtn.addEventListener('click', showGeneratedWorkout);

function showGeneratedWorkout() {
    document.querySelector('#exerciseWorkoutList').innerHTML = "";
    //radio button value
    let type = "";
    let radioCheck = document.querySelectorAll("input[name=type]");
    for (let i = 0; i < radioCheck.length; i++) {
        if (radioCheck[i].checked) {
            type = radioCheck[i].value;
            break;
        }
    }
    let difficulty = "";
    radioCheck = document.querySelectorAll("input[name=difficulty]");
    for (let i = 0; i < radioCheck.length; i++) {
        if (radioCheck[i].checked) {
            difficulty = radioCheck[i].value;
            break;
        }
    }
    if ((type == "") || (difficulty == "")) {

        errorValidationOnlyShow('#inputError');

    }
    else {
        //ajax call for get value, and show generated exercise
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
                //Modal RESET

                let principalExercise = Object.values(exerciseList).filter(exercise => exercise.type == type);
                let complementaryExercise = [];
                let workout = "";
                if (type == "core") {
                    complementaryExercise = Object.values(exerciseList).filter(exercise => exercise.type == "cardio");
                }
                else {
                    complementaryExercise = Object.values(exerciseList).filter(exercise => exercise.type == "core");
                }

                
                for (let i = 0; i < 5; i++) {
                    if (!isOdd(i)) {

                        let randomElement = principalExercise[Math.floor(Math.random() * principalExercise.length)];
                        let randomSeries = Math.floor((Math.random() * 5 * difficulty) + 1);
                        let randomRep = Math.floor((Math.random() * 30) + 1);

                        console.log(randomElement.id + " " + randomElement.name + " " + randomSeries + " " + randomRep + " " + randomElement.type);
                        //Create element li 
                        console.log('create element' + i);
                        createElement(randomElement.name, randomSeries, randomRep, randomElement.id);
                    }
                    else {
                        let randomSeries = Math.floor((Math.random() * 5 * difficulty) + 1);
                        let randomRep = Math.floor((Math.random() * 30) + 1);
                        let randomComplementaryElement = complementaryExercise[Math.floor(Math.random() * complementaryExercise.length)];
                        // let idCompelementary = randomComplementaryElement.id;
                        console.log(randomComplementaryElement.id + " " + randomComplementaryElement.name + " " + randomSeries + " " + randomRep);
                        console.log('create element' + i);
                        createElement(randomComplementaryElement.name, randomSeries, randomRep, randomComplementaryElement.id);
                    }
                }
            }).catch(error => console.log("Si è verificato un errore!"));
        setTimeout(function () { document.querySelector('#showWorkoutModal').style.display = "block"; }, 500);

    }
}
function createElement(name, series, rep, exercise_id) {
    let newElem = document.createElement("li");
    newElem.innerHTML = '<div class="exercise-list-elem">' +
        '<div class="exercise-name" data-id = "' + exercise_id + '" data-name= "' + name + '">' + name +
        '</div>' +
        '<div  class="exercise-series" data-series="' + series + '">' + series +
        '</div>' +
        '<div class="exercise-repetition" data-repetition="' + rep + '">' + rep +
        '</div>';
    document.querySelector('#exerciseWorkoutList').appendChild(newElem);
}
function isOdd(num) {
    return num % 2;
}

//Add event Handler
const confirmBtn = document.querySelector('#confirmBtn');
confirmBtn.addEventListener('click', generateWorkout);

function generateWorkout(event) {
    event.preventDefault();
    let tableLenght = document.querySelector('#exerciseWorkoutList').getElementsByTagName("li").length;
    let nodeList = document.querySelector('#exerciseWorkoutList').getElementsByTagName("li");
    let exerciseList = [];
    for (let i = 0; i < tableLenght; i++) {
        let id = nodeList[i].querySelector('.exercise-name').getAttribute('data-id');
        let series = nodeList[i].querySelector('.exercise-series').getAttribute('data-series');
        let rep = nodeList[i].querySelector('.exercise-repetition').getAttribute('data-repetition');
        let exercise = { exercise_id: id, series: series, rep: rep };
        exerciseList.push(exercise);
    }

    let json = JSON.stringify(exerciseList);
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let headers = new Headers();
    headers.append("X-CSRF-Token", token);
    headers.append("Content-Type", "application/json");
    //update to database
    fetch('/workout/randomGenerate', {
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
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
            }
        }).then(data => {
            console.log('Tutto ok');
            location.reload();
            /*Operation success*/
        }).catch(error => console.log("Si è verificato un errore!"));;
    console.log(exerciseList);
}
//close modal
function closeModal(button) {
    button.parentNode.parentNode.parentNode.style.display = "none";
}


