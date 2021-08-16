//edit comment
async function editHandler(event) {
    const id = event.target.parentNode.parentNode.parentNode.id
    console.log(id);
    const text = $(`#text-${id}`).text().trim();
    console.log(text);
    $(`#textarea-${id}`).html('');
    $(`#textarea-${id}`).html(`<textarea class="form-control login text-custom font-comment" id="commentText" rows="2"
    maxlength="3000"
    required>${text}</textarea>
<div class="text-right">
    <button type="submit" class="btn btn-black comment-button"
        id="comment-submit">Update</button>
</div>`);
};

//after comment button is clicked
async function updateHandler(event) {
    event.preventDefault();

    const text = $('#commentText').val().trim();
    const id = event.target.parentNode.parentNode.parentNode.id

    console.log(text);
    console.log(id);


    if (text) {
        const response = await fetch(`/api/comment/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                text
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

//delete comment
async function deleteHandler(event) {
    const id = event.target.parentNode.parentNode.parentNode.id
    console.log(id);

    const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

$(document).on('click', '#editComment', editHandler);
$(document).on('click', '#deleteComment', deleteHandler);
$(document).on('click', '#comment-submit', updateHandler);
$(window).on('load', function () {
    $('#commentsChosen').modal('show');
});