/* global $, GI */
import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';

export function runLandingPageAnimation () {
    $('.LandingAnimation').addClass('loaded');
    setTimeout(function () {
        $('.LandingAnimation').addClass('open');
    }, 4000);
}
