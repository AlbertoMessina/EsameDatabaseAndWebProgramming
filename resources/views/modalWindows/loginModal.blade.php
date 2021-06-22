<x-genericModal>
    @slot('modalTitle' , '')
    @slot('modalId' , 'logInModal')
    <form id="exerciseForm" method="POST" enctype="multipart/form-data">
        <div class="form-group-element ">
        <label  data-error="wrong" data-success="right" for="logInMail"><span>Name</span></label>
            <input  id="logInMail" name='logIn_mail' class="form-control form-control-sm validate" min="1" max="5" required>
        </div>

        <div class="form-group-element ">
            <label  data-error="wrong" data-success="right" for="logInPsw"><span>Password</span></label>
            <input id="logInPsw" name='logIn_psw' class="form-control form-control-sm validate" min="1" max="5" required>
        </div>
        <div class="center-centered">
            <input type='submit' id="logInSubmit" class="btn btn-success btn-unique" value="LogIn">
        </div>
    </form>
</x-genericModal>