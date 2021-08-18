$(window).on('load', function () {
    $('#rateChosen').modal('show');
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

});

