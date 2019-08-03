/* global $, GI */
import { updatePage, buildNavigationListeners } from './components/navigation';
import './the-css.js';
import { runLandingPageAnimation } from './animations';
import * as constructors from './constructors.js';

window.initCore = function () {
    if (GI.activePage) {
        updatePage(GI.activePage);
    }

    if (GI.isLandingPage) {
        runLandingPageAnimation();
    }

    constructors.initMainMenu()
        .then(constructors.initGalleryMenu)
        .then(buildNavigationListeners);
};
