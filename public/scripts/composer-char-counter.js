$(document).ready(function () {
  // --- our code goes here ---
  console.log("program ready")

  $(".text-area").on('input', function () {

    const section = $(this).closest(".div-btn-counter");

    const counter = section.find(".counter");
    //console.log(counter)

    const maxChars = 140;
    //console.log($(this).val());

    const remainingText = maxChars - $(this).val().length;

    if (remainingText < 0) {
      $('.counter').css({
        'color': 'red'
      })
    } else {
      $('.counter').css({
        'color': '#545149'

      })
    }

    //console.log(remainingText);
    $('.counter').val(remainingText);

  })


});