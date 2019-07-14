$(document).ready(function(){
    // $('.link-to-gallery').mouseenter(
    //     function() {
    //         $('.gallery-section').addClass('open');
    //     }
    // ).mouseleave(
    //     function() {
    //         $('.gallery-section').removeClass('open');
    //     }
    // )


    $('.menu-item').click(function() {
        $('.link-target').removeClass('open');
        $('.menu-item').removeClass('active');
        // $('.link-to-gallery').addClass('active');
        $(this).addClass('active');
        $('.' + $(this).attr('data-target')).addClass('open');
    })
})
