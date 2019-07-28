/* global $, Mustache, BASE_URL, GI */
import template from '../../../templates/core/partials/gallery-list-item.html';
import { buildGalleryListListeners, returnHome, updatePage } from './components/navigation';
import './the-css.js';
import { runLandingPageAnimation } from './animations';

// import css from 'file.css';

window.initCore = function () {
    console.log('main - activePage-',GI.activePage);
    if (GI.activePage) {
        console.log(GI.activePage);
        updatePage(GI.activePage);
    }

    if (GI.isLandingPage) {
        runLandingPageAnimation();
    }

    const buildGalleryMenu = function (galleries) {
        var text = Mustache.render(template, { gallery: galleries });
        console.log('pre build gallery menu');
        $('.gallery-list').append(text);
        buildGalleryListListeners();
    };

    $.ajax({
        url: BASE_URL + 'api/gallery/'
    }).done(function (response) {
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

    $('.modal-close').click(function () {
        $('.modal').fadeOut();
    });

    $('.menu-item').click(function () {
        if ($('body').hasClass('gallery-view')) {
            returnHome();
            $('body').removeClass('gallery-view');
        }

        $('.link-target').removeClass('open');
        $('.menu-item').removeClass('active');
        // $('.link-to-gallery').addClass('active');
        $(this).addClass('active');
        $('.' + $(this).attr('data-target')).addClass('open');
    });

    $(document).ready(function () {
        var hamburger = $('#hamburger-icon');
        hamburger.click(function () {
            hamburger.toggleClass('active');
            return false;
        });
    });
};

//
// var found = GI.galleries.find(function(element) {
//   return id = 2;
// });
//
// console.log(found);
