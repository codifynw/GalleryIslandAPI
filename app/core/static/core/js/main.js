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

    $('.gallery-link').click(function() {
        $('body').addClass('menu-running');
        setTimeout(function(){
            $('.gallery-index').removeClass('open');
        }, 300);
        $('body').addClass('menu-running');
        setTimeout(function(){
            $('#fullwidth-video').fadeOut();
            $('#gallery-container').show();
        }, 800);
        setTimeout(function(){
            $('body').removeClass('menu-running');
        }, 2000);

        window.history.pushState({}, "Test Title", "/gallery/favorites");

    })
})
