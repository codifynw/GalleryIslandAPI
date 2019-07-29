/* global $, GI */
import { updatePage, buildNavigationListeners } from './components/navigation';
import './the-css.js';
import { runLandingPageAnimation } from './animations';
import * as builders from './constructors.js';

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

    buildNavigationListeners();
};
