$(document).ready(function(){

    window.GI = {};

    $.ajax({
        url: BASE_URL + 'api/gallery/',
    }).done(function(response) {
        GI.galleries = response
    });

    // $('.link-to-gallery').mouseenter(
    //     function() {
    //         $('.gallery-section').addClass('open');
    //     }
    // ).mouseleave(
    //     function() {
    //         $('.gallery-section').removeClass('open');
    //     }
    // )

    var returnHome = function() {
        $('.menu-item').removeClass('active');
        $('body').addClass('menu-running');
        $('#gallery-container').fadeOut();
        setTimeout(function(){
            $('#fullwidth-video').fadeIn();
        }, 800);
        setTimeout(function(){
            $('#fullwidth-video').fadeIn();
            $('body').removeClass('menu-running');
        }, 2000);
    }

    $('.menu-item').click(function() {
        if ( $('body').hasClass('gallery-view') ) {
            returnHome();
            $('body').removeClass('gallery-view')
        }

        $('.link-target').removeClass('open');
        $('.menu-item').removeClass('active');
        // $('.link-to-gallery').addClass('active');
        $(this).addClass('active');
        $('.' + $(this).attr('data-target')).addClass('open');
    })

    $('.gallery-link').click(function() {
        var self = $(this)
        $('body').addClass('menu-running');
        setTimeout(function(){
            $('.gallery-index').removeClass('open');
        }, 300);
        setTimeout(function(){
            $('#fullwidth-video').fadeOut();
            $('#gallery-container').show();
        }, 800);
        setTimeout(function(){
            $('body').removeClass('menu-running');
        }, 2000);

        function loadGallery(data) {
            setTimeout(function(){
                $('#gallery-container').html("")
                $('#gallery-container').html(data);
                $('#gallery-container').fadeIn();
            }, 300);
            $('body').addClass( "gallery-view" );
            // gallery-container BG
        }

        $.ajax({
            url: BASE_URL + 'gallery/' + self.attr('data-slug'),
        }).done(function(response) {
            loadGallery(response);
        });

        // window.history.pushState({}, "Test Title", 'gallery/' + self.attr('data-slug'));
    })
})


        //
        // var found = GI.galleries.find(function(element) {
        //   return id = 2;
        // });
        //
        // console.log(found);
