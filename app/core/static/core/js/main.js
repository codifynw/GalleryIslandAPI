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

    var returnHome = function() {
        $('.menu-item').removeClass('active');
        $('body').addClass('menu-running');
        $('#fullwidth-video').fadeIn();
        $('#gallery-container').hide();
        setTimeout(function(){
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
            console.log('load gallery yo');
            console.log(data);
            var template = $('#gallery-template').html();
            var rendered = Mustache.render(template, data);
            $('#gallery-container').html(rendered);
        }

        $.ajax({
            url: BASE_URL + 'gallery/' + self.attr('data-slug'),
        }).done(function(response) {
            console.log(response);
            // loadGallery(data);

            setTimeout(function(){
                $('#gallery-container').html(response);
                $('#gallery-container').fadeIn();
            }, 300);
            $('body').addClass( "gallery-view" );
        });

        // window.history.pushState({}, "Test Title", 'gallery/' + self.attr('data-slug'));
    })
})
