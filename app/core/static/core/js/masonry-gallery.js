/* global $, GI, imagesloaded */
import jQueryBridget from 'jquery-bridget';
import Masonry from 'masonry-layout';
import * as GridLoader from './components/gridLoaderFX';

// make Masonry a jQuery plugin
jQueryBridget('masonry', Masonry, $);

var body = null;
var grids = null;
var masonry = [];
var currentGrid = 0;
// Switch grid radio buttons.
var switchGridCtrls = []
// Choose effect buttons.
var fxCtrls = [];
// The GridLoaderFx instances.
var loaders = [];
var loadingTimeout;

export default function initMasonryGrid () {
    body = $('body');
    grids = [].slice.call(document.querySelectorAll('.grid'));
    masonry = [];
    currentGrid = 0;
    // Switch grid radio buttons.
    switchGridCtrls = [].slice.call(document.querySelectorAll('.control__radio'));
    // Choose effect buttons.
    fxCtrls = [].slice.call(document.querySelectorAll('.effect-control__btn'));
    // The GridLoaderFx instances.
    loaders = [];
    // Preload images
    imagesloaded(body, function () {
        // Initialize Masonry on each grid.
        grids.forEach(function (grid) {
            var m = new Masonry(grid, {
                itemSelector: '.grid__item',
                columnWidth: '.grid__sizer',
                percentPosition: true,
                transitionDuration: 0
            });
            masonry.push(m);
            // Hide the grid.
            grid.classList.add('grid--hidden');
            // Init GridLoaderFx.
            loaders.push(new GridLoaderFx(grid));
        });

        // Show current grid.
        grids[currentGrid].classList.remove('grid--hidden');
        // Init/Bind events.
        GridLoader.initEvents();
        // Remove loading class from body
        body.removeClass('loading');
    });
}
