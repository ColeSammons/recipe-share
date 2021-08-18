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



//recipe.js
//displays recipe chosen by user on load
$(window).on('load', function () {
    $('#recipeChosen').modal('show');
});

$('.stars').click(async function (event) {
    if (event.target.matches('input')) {
        console.log(event.target.parentNode.id);
        const rating = event.target.value;
        const post_id = event.target.parentNode.id;
        let update = '';
        if(event.target.parentNode.dataset.value == "post") {
            update = 'put';
            await fetch('/api/rate', {
                method: 'post',
                body: JSON.stringify({
                    rating,
                    update,
                    post_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        }
        else {
            update = event.target.parentNode.dataset.value;
            await fetch('/api/rate', {
                method: 'put',
                body: JSON.stringify({
                    rating,
                    update,
                    post_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
        console.log(event.target.parentNode.dataset.value);

})

//comment post
async function commentHandler(event) {
    event.preventDefault();

    const text = $('#commentText').val().trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(text);
    console.log(post_id);


    if (text) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                text,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

async function editPostHandler(event) {
    console.log(event.target.parentNode.id);
}

async function deletePostHandler(event) {
    console.log(event.target.parentNode.id);
    const id = event.target.parentNode.id;
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
}


$('#post-edit').click(editPostHandler)
$('#post-delete').click(deletePostHandler)
$('#comment-submit').click(commentHandler)

