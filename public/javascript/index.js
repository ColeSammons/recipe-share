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
    let new_input = ` <div class="col-md-5 col-sm-6" id="${rand}-i">
    <input type="text" autocomplete="off" maxlength="30" 
        placeholder="Ingredient" class="form-control login text-custom" required />
</div>
<div class="col-md-3 col-sm-6" id="${rand}-m">
    <input type="text" autocomplete="off" maxlength="20" 
        placeholder="Measurement ex. 1/4 cup" class="form-control login text-custom"
        required />
</div>`;

    $(".ing-area").append(new_input);
});

$('#remove-ing').click(function () {
    console.log($(".ing-area").children().last().attr('id'));
    let num = $(".ing-area").children().last().attr('id').split("-");
    console.log(num);
    let id = num[0];
    console.log(id);
   if(id != 1) {
    $(`#${id}-m`).remove();
    $(`#${id}-i`).remove();
   }
});

//recipe.js
//displays recipe chosen by user
$(window).on('load', function () {
    $('#recipeChosen').modal('show');
});