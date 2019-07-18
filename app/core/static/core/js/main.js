$(document).ready(function(){

    window.GI = {};

    $.ajax({
        url: BASE_URL + 'api/gallery/',
    }).done(function(response) {
        GI.galleries = response;
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
        setTimeout(function(){
            $('#gallery-target').fadeOut();
            $('#fullwidth-video').fadeIn();
        }, 800);
        setTimeout(function(){
            $('#fullwidth-video').fadeIn();
            $('body').removeClass('menu-running');
        }, 2000);
    }

    $('.modal-close').click(function() {
        $('.modal').fadeOut();
    });


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
            $('#gallery-target').show();
        }, 800);
        setTimeout(function(){
            $('body').removeClass('menu-running');
        }, 2000);

        function loadGallery(data, callback) {
            setTimeout(function(){
                $('#gallery-target').html("")
                $('#gallery-target').html(data);
                $('#gallery-target').fadeIn();
                callback();
            }, 300);
            $('body').addClass( "gallery-view" );
            // gallery-target BG
        }

        $.ajax({
            url: BASE_URL + 'gallery/' + self.attr('data-slug'),
        }).done(function(response) {
            loadGallery(response, function() {
                var photoIDs = [];
                photoIDs = $.map( $('.photo-row-photo'), function( n, i) {
                    return $(n).attr('data-id');
                });

                $('.photo-row-photo').click(function(){
                    const bgProperty = $(this).css('background-image');
                    $('.modal-target').css('background-image', bgProperty);
                    $('.modal').fadeIn();
                    $('.modal').attr('data-id',$(this).attr('data-id'));
                })

                $('.modal-next-arrow').click(function(){
                    let currentID = $('.modal').attr('data-id');
                    let currentIndex = photoIDs.indexOf(currentID);
                    if ( currentIndex !== photoIDs.length ) {
                        nextIndex = parseInt(currentIndex) + 1;
                        console.log('nextIndex:',nextIndex);
                        console.log($('.photo-row-photo')[nextIndex]);
                        const bgProperty = $($('.photo-row-photo')[nextIndex]).css('background-image');
                        $('.modal-target').css('background-image', bgProperty);
                        $('.modal').attr('data-id',photoIDs[nextIndex]);
                    };
                })
                $('.modal-prev-arrow').click(function(){
                    let currentID = $('.modal').attr('data-id');
                    let currentIndex = photoIDs.indexOf(currentID);
                    if ( currentIndex !== 0 ) {
                        prevIndex = parseInt(currentIndex) - 1
                        const bgProperty = $($('.photo-row-photo')[prevIndex]).css('background-image');
                        $('.modal-target').css('background-image', bgProperty);
                        $('.modal').attr('data-id',photoIDs[prevIndex]);
                    };
                })
            });
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
