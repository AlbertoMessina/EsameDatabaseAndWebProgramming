/*  Button Reference    */
const btnSubmit = document.querySelector("#workoutCreate");

var nameCheck = true;
var dateCheck = true;

/*Check for name */
const workoutName = document.querySelector("#workoutName");
workoutName.addEventListener('change', checkName);

function checkName() {
    let name = workoutName.value.trim();
    if (string_has_spec_char(name) || name == "") {
        //not valid
        errorValidation(workoutName, "#nameError", btnSubmit);
        nameCheck = false;
    }
    else {
        successValidation(workoutName, "#nameError", btnSubmit)
        nameCheck = true;
    }
}

const publicationDate = document.querySelector("#publicationDate");
publicationDate.addEventListener('change', checkDate);

function checkDate() {
    if (!pastDate(publicationDate.value)) {
        successValidation(publicationDate, "#dateError", btnSubmit);
        dateCheck = true;
    }
    else {
        errorValidation(publicationDate, "#dateError", btnSubmit);
        dateCheck = false;
    }
}

function inputCheck(e){
    e.preventDefault();
    checkName();
    checkDate();
    if(!(nameCheck && dateCheck)){
        errorValidationOnlyShow('#workoutCreateError');
        return(false);
    }else{
        successValidationOnlyShow('#workoutCreateError');
    }
    return true;
}

