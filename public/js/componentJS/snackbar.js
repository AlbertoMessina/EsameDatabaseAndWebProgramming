
function operationSuccessShow(){
      let snackbar = document.querySelector('#snackbar');
      snackbar.classList.add("operationSuccess");
      document.querySelector('.snackbar i').classList.add('fas','fa-check', 'mr-1');
      document.querySelector('.snackbar span').innerHTML = 'Operation Success';
      setTimeout(function(){snackbar.classList.remove("operationSuccess")}, 2500);
      bLoader  = false;
}

function operationFailedShow(){
      let snackbar = document.querySelector('#snackbar');
      snackbar.classList.add("operationFailed");
      document.querySelector('.snackbar i').classList.add('fas', 'fa-exclamation-triangle','mr-1');
      document.querySelector('.snackbar span').innerHTML = 'Operation Failed';
      setTimeout(function(){snackbar.classList.remove("operationFailed")}, 2500);
      bLoader  = false;
}


