//Controll on submit

/*  Add event listener to button    */
const registrationBtn = document.querySelector("#registrationBtn");

/*Check for each field*/

/*Check for name */
const userName = document.querySelector("#name");
userName.addEventListener('change', checkName);

function checkName() {
    let name = userName.value.trim();
    if (hasNumber(name) || string_has_spec_char(name)) {
        //not valid
        errorValidation(userName,"#nameError",registrationBtn);
    }
    else {
        successValidation(userName,"#nameError",registrationBtn);     
    }
}

/*Check for surname */
const userSurname = document.querySelector("#surname");
userSurname.addEventListener('change', checkSurname);

function checkSurname() {
    let surname = userSurname.value.trim();
    if (hasNumber(surname) || string_has_spec_char(surname)) {
        errorValidation(userSurname,"#surnameError", registrationBtn);
    }
    else {
        successValidation(userSurname,"#surnameError", registrationBtn);
    }
}

/*Check for match password*/
const confirmPassword = document.querySelector("#password_confirmation");
confirmPassword.addEventListener('change', matchPassword);

function matchPassword(){
    let password = document.querySelector("#password");
    if( checkPassword(password.value.trim(), confirmPassword.value.trim()))
    {        
         successValidation(confirmPassword,"#passwordError", registrationBtn);
    }
    else{
        errorValidation(confirmPassword,"#passwordError",registrationBtn);
    }
}

/*Check for password format*/
const password = document.querySelector("#password");
password.addEventListener('change', passwordFormat);

function passwordFormat(){  
    if( passwordValidation(password.value.trim()))
    {    
        successValidation(password,"#passwordFormatError",registrationBtn);
        confirmPassword.disabled = false;
    }
    else{
        errorValidation(password,"#passwordFormatError",registrationBtn);
        confirmPassword.disabled = true;
    }
}

/*Chek for AGE*/
const age = document.querySelector("#birth");
age.addEventListener('change', checkAge);

function checkAge(){
    if (futureDate(age.value)){
        errorMessageSet(age, "#ageError", "Welcome time Traveler");
        registrationBtn.disabled = true;
        return;
    }
    else{
        document.querySelector("#ageError").innerHTML="<strong> You mast have 14 to join</strong>"
        if( validateAge(age.value)){      
            successValidation(age,"#ageError" ,registrationBtn);
       }
       else{
           errorValidation(age,"#ageError" ,registrationBtn);
       }
    } 
}

/*Check for email*/ 
const email = document.querySelector("#email");
email.addEventListener('change', checkMail);

function checkMail(){
    if(validateEmail(email.value.trim())){
        successValidation(email, "#emailError", registrationBtn);
        //if mail is valid check is used yet
        emailCheck();
    }
    else{
        document.querySelector("#emailError").innerHTML="<strong> Insert email in format @pippo.pluto</strong>"
        errorValidation(email, "#emailError", registrationBtn);
    }

}

/*Ajax call for email check  */
function emailCheck(){
        //get email and create form data
        let mail = email.value.trim();
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        
        let checkRequest = new Request('/checkUser/'+ mail, {headers: { "X-CSRFToken":token }});

        fetch(checkRequest)
        .then(response => {
            if(response.ok){
                return response.json()
                alert("response ok ciccio")
            }
            if (response.status >= 400 && response.status < 499) {
                alert("Richiesta errata");
             }
             if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
             }
        })
        .then(data => {
            let find = data.find;
            if(find){
                //set error message and disable
                errorMessageSet(email , "#emailError", "mail taken, pls insert a new one");
                registrationBtn.disabled = true;
            }
          }).catch(error => console.log("Si è verificato un errore!"));
        
}
