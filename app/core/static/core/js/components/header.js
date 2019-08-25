import { buildHeaderAnimation } from './animations.js';

export default function initStickyHeader () {
    // When the user scrolls the page, execute myFunction
    window.onscroll = function () {
        toggleAnimation();
    };

    // Get the header
    var header = document.getElementById('stickyHeader');

    // Build the Tween
    var headerTween = buildHeaderAnimation(header);

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function toggleAnimation () {
        if (window.pageYOffset >= 10) {
            headerTween.play();
        } else {
            headerTween.reverse();
        }
    }
}
