import { expandStickyHeader } from './animations.js';

export default function initStickyHeader () {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function () { myFunction(); };

    // Get the header
    var header = document.getElementById('stickyHeader');

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction () {
        if (window.pageYOffset > sticky) {
            expandStickyHeader(header);
        } else {
            // reverseStickyHeader();
        }
    }
}
