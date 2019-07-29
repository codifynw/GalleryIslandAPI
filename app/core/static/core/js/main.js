/* global $, GI */
import { navigateTo, returnHome, updatePage } from './components/navigation';
import './the-css.js';
import { runLandingPageAnimation } from './animations';
import * as builders from 'constructors.js';

// import css from 'file.css';

window.initCore = function () {
    if (GI.activePage) {
        updatePage(GI.activePage);
    }

    if (GI.isLandingPage) {
        runLandingPageAnimation();
    }

    builders.initGalleryMenu();

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

    $('.logo-container').click(function () {
        navigateTo('home');
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
