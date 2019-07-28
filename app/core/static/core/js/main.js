/* global $ */
import template from '../../../templates/core/partials/gallery-list-item.html';
import { buildGalleryListListeners, returnHome } from './components/navigation';
import { runLandingAnimation } from './animations';
import galleryFunctions from './gallery.js';

// import css from 'file.css';

window.initCore = function () {

    console.log('loaded main.js');
    window.GI = {};
    galleryFunctions.initXScroll();

    let buildGalleryMenu = function(galleries) {
        var text = Mustache.render(template,{gallery:galleries});
        console.log('pre build gallery menu');
        $(".gallery-list").append(text);
        buildGalleryListListeners();
    }

    $.ajax({
        url: BASE_URL + 'api/gallery/',
    }).done(function(response) {
        GI.galleries = response;
        console.log('done with API');
        console.log(response);
        buildGalleryMenu(GI.galleries);
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
}


        //
        // var found = GI.galleries.find(function(element) {
        //   return id = 2;
        // });
        //
        // console.log(found);
