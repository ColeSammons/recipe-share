//homepage.js
//close login modal and open signin modal
$("#createAccount").click(function () {
    $("#loginBackdrop").modal('hide');
    $("#signupBackdrop").modal('show');
});

//close signin and open login modal
$("#loginAccount").click(function () {
    $("#signupBackdrop").modal('hide');
    $("#loginBackdrop").modal('show');
});

// add new ingredient line to recipe sharing
$("#add-ing").click(function () {
    let rand = Math.floor(Math.random() * 10000);
    let new_input = ` <div class="col-md-6" id="${rand}-i">
    <input type="text" autocomplete="off" maxlength="30" 
        placeholder="Ingredient" class="form-control login text-custom" required name="ingName"/>
</div>
<div class="col-md-6 col-lg-5 ing-margin" id="${rand}-m">
    <input type="text" autocomplete="off" maxlength="20" 
        placeholder="Measurement ex. 1/4 cup" class="form-control login text-custom"
        required name="ingMeasure"/>
</div>`;

    $(".ing-area").append(new_input);
});

//login, signup, and logout
async function loginHandler(event) {
    event.preventDefault();
    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val().trim();

    console.log(email);
    console.log(password);


    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};
async function signupHandler(event) {
    event.preventDefault();

    const username = $('#username').val().trim();
    const email = $('#userEmail').val().trim();
    const password = $('#userPassword').val().trim();

    console.log(username);
    console.log(email);
    console.log(password);

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

async function logoutHandler(event) {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

$('#login-form').click(loginHandler);
$("#signup-form").click(signupHandler);
$("#logout-form").click(logoutHandler);



//remove ingredient line in recipe sharing
$('#remove-ing').click(function () {
    let num = $(".ing-area").children().last().attr('id').split("-");
    let id = num[0];
    if (id != 1) {
        $(`#${id}-m`).remove();
        $(`#${id}-i`).remove();
    }
});
