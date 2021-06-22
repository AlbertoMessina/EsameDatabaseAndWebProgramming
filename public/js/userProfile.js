
/*Sub menu */
const profileBtn = document.getElementById('profileBtn');
const settingBtn = document.getElementById('settingBtn');

profileBtn.addEventListener("click", showProfile);
settingBtn.addEventListener("click", showSetting);

const profileSection = document.querySelector("#userProfileSection");
const settingSection = document.querySelector("#profileSettingSection");

function showProfile() {
    profileSection.style.display = "block";
    settingSection.style.display = "none";
    profileBtn.classList.add("active-item");
    settingBtn.classList.remove("active-item");
    document.querySelector('#settingForm').reset();

    //RESET FEEDBACK
    let feedbacks = document.querySelectorAll('.feedback');

    [].forEach.call(feedbacks, function (feedback) {
        feedback.style.visibility = "hidden";
    });

    let errordivs = document.querySelectorAll('.form-control');
    [].forEach.call(errordivs, function (div) {
        div.style.border = "1px solid lightgrey";
    });

    let settingBtnSubmit = document.querySelector("#profileSettingSubmit");
    settingBtnSubmit.disabled = false;

    //RESET IMG IF NO UPDATE
    let settingPhoto = document.querySelector('#setting-photo');
    let profilePhoto = document.querySelector('#profile-photo');

    let src = profilePhoto.src;
    settingPhoto.src = src;
}

function showSetting() {
    settingSection.style.display = "block";
    profileSection.style.display = "none";
    profileBtn.classList.remove("active-item");
    settingBtn.classList.add("active-item");
}


const submitBtn = document.querySelector('#profileSettingSubmit');
submitBtn.addEventListener('click', function (event) {
    if (inputCheck(event)) {
        profileSettingUpdate(event);
    }
});

function profileSettingUpdate(event) {
    event.preventDefault();
    let form = document.querySelector('#settingForm');
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let user_id = document.querySelector('#pageSectionName').getAttribute('data-id');
    let fd = new FormData(form);
    fd.append('user_id', user_id);

    let headers = new Headers();
    headers.append("X-CSRFToken", token);

    fetch('/profile/update', {
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
            }
            if (response.status >= 500 && response.status < 599) {
                alert("Errore sul server");
                operationFailedShow();
            }
        }).then(data => {
            console.log(data);
            console.log(data.client);
            let client = data.client;
            //SET New values
            //Set in profile
            document.querySelector("#name-label").innerHTML = client['name'];
            document.querySelector("#surname-label").innerHTML = client['surname'];
            document.querySelector("#birth-label").innerHTML = client['birth'];
            document.querySelector("#weight-label").innerHTML = client['weight'];
            document.querySelector("#description-area").innerHTML = client['description'];

            //SET in setting
            document.querySelector("#name").value = client['name'];
            document.querySelector("#name").placeholder = client['name'];
            document.querySelector("#surname").value = "";
            document.querySelector("#surname").placeholder = client['surname'];
            document.querySelector("#birth").value = client['birth'];
            document.querySelector("#weight").value = client['weight'];
            document.querySelector("#description-area").innerHTML = client['description'];

            document.querySelector("#description-area").placeholder = client['description'];
            document.querySelector("#description-area").value = client['description'];

            //SET photo
            let photoContainers = document.querySelectorAll('.user-photo');
            [].forEach.call(photoContainers, function (div) {
                if (client['url'] != 'none') {
                    let url = '/storage/' + client['url'];
                    div.src = url;
                }
            });
            operationSuccessShow();
            location.reload();
        }).catch(error => {
            console.log("Si è verificato un errore!");
            operationFailedShow();
        });
}
const photo = document.querySelector('#photoProfile');
if (window.File && window.FileList && window.FileReader) {
    photo.addEventListener("change", function (event) {
        filePreview(event, '#setting-photo');
    });
} else {
    alert("Your browser does not support File API");
}

function filePreview(event, idElement) {
    let files = event.target.files; //FileList object
    let output = document.querySelector(idElement);
    output.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        //Only pics
        if (!file.type.match('image'))
            continue;

        let picReader = new FileReader();

        picReader.addEventListener("load", function (event) {

            let picSrc = event.target.result;
            output.src = picSrc;

        });
        //Read the image
        picReader.readAsDataURL(file);
    }

}