/* global $, GI */
import { navigateTo, buildNavigationListeners } from './components/navigation';
import { runLandingPageAnimation } from './components/animations';
import * as constructors from './components/constructors.js';
import './the-css.js';

window.initCore = function () {
    // define some globals:
    GI.hamburger = $('#hamburger-icon');
    GI.isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

    if (GI.activePage) {
        navigateTo(GI.activePage);
    }

    if (GI.isLandingPage) {
        runLandingPageAnimation();
    }

    constructors.initMainMenu()
        .then(constructors.initGalleryMenu)
        .then(buildNavigationListeners);
};
