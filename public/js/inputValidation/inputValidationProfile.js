/*  Button Reference    */
const settingBtnSubmit = document.querySelector("#profileSettingSubmit");

var nameCheck = true;
var surnameCheck = true;
var ageCheck = true;
var weightCheck = true;
/*Check for name */
const userName = document.querySelector("#name");
userName.addEventListener('change', checkName);

function checkName() {
    let name = userName.value.trim();
    if (hasNumber(name) || string_has_spec_char(name)) {
        //not valid
        errorValidation(userName, "#nameError", settingBtnSubmit);
        nameCheck = false;
    }
    else {
        successValidation(userName, "#nameError", settingBtnSubmit);
        nameCheck = true;
    }
}

/*Check for surname */
const userSurname = document.querySelector("#surname");
userSurname.addEventListener('change', checkSurname);

function checkSurname() {
    let surname = userSurname.value.trim();
    if (hasNumber(surname) || string_has_spec_char(surname)) {
        errorValidation(userSurname, "#surnameError", settingBtnSubmit);
        surnameCheck = false;
    }
    else {
        successValidation(userSurname, "#surnameError", settingBtnSubmit);
        surnameCheck = true;
    }
}

/*Chek for AGE*/
const age = document.querySelector("#birth");
age.addEventListener('change', checkAge);

function checkAge() {
    if (futureDate(age.value)) {
        errorMessageSet(age, "#ageError", "Welcome time Traveler");
        settingBtnSubmit.disabled = true;
        return;
    }
    else {
        document.querySelector("#ageError").innerHTML = "<strong> You mast have 14 to join</strong>"
        if (validateAge(age.value)) {
            successValidation(age, "#ageError", settingBtnSubmit);
            var ageCheck = true;
        }
        else {
            errorValidation(age, "#ageError", settingBtnSubmit);
            var ageCheck = false;
        }
    }
}

/*Check Weight */

const weight = document.querySelector('#weight');
weight.addEventListener('change', checkWeight);

function checkWeight() {
    if (weight.value > 10 && weight.value < 650) {
        successValidation(weight, "#weightError", settingBtnSubmit);
        weightCheck = true;
    } else {
        errorValidation(weight, "#weightError", settingBtnSubmit);
        weightCheck = false;
    }
}

function inputCheck(e) {
    e.preventDefault();
    checkName();
    checkSurname();
    checkAge();
    checkWeight();
    if (!(nameCheck && ageCheck && surnameCheck && weightCheck)) {
        errorValidationOnlyShow('#submitError');
        return (false);
    } else {
        successValidationOnlyShow('#submitError');
    }
    return true;
}
