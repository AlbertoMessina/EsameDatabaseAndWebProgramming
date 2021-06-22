//if the string has a number

function hasNumber(str) {
    var reg= /\d/g;
    return reg.test(str);
  }
// if the string has special characters
function string_has_spec_char(str){
    var reg = /[~`!#@$%\^&*+=\-\[\]\\';,_./{}\(\)\|\\":<>\?]/g;
    return reg.test(str);
}
// check if string has spaces
function string_has_spaces(str) {
    var reg = /\s/g;
    return reg.test(str);
}

function validateEmail(str) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  }

  function validationAge(userinput){

        var dob = newDate(userinput);
        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();
        
        //convert the calculated difference in date format
        var age_dt = new Date(month_diff); 
        
        //extract year from date    
        var year = age_dt.getUTCFullYear();
        
        //now calculate the age of the user
        var age = Math.abs(year - 1970);
        
        //display the calculated age
        alert("age" + age);
        validation = true;

        if(age < 14 || age > 116){
            validation = false;
        }
        return(validation);
    
  }

  function checkPassword(password, confirmPassword){
        validation = false;
        if(password.localeCompare(confirmPassword) === 0){
            validation == true;
        } 
        return validation;
  }