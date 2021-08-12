//close login modal and open signin modal
$("#createAccount").click(function() {
    $("#loginBackdrop").modal('hide');
    $("#signupBackdrop").modal('show');
});

//close signin and open login modal
$("#loginAccount").click(function() {
    $("#signupBackdrop").modal('hide');
    $("#loginBackdrop").modal('show');
});

//displays recipe chosen by user
$(window).on('load', function() {
    $('#recipeChosen').modal('show');
});