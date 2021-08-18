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


$('#post-edit').click(editPostHandler);
$('#post-delete').click(deletePostHandler);
$('#comment-submit').click(commentHandler);