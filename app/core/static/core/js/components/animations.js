/* global $, GI */
import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';
import TweenLite from 'gsap/TweenLite';

export function runLandingPageAnimation () {
    const $text = $('.landing-text');
    const $bg = $('.landing-animation');
    const video = document.getElementById('bg-banner-video');

    var tl = new TimelineLite();
    tl.to($text, 1, { opacity: 0, delay: 3.5 });
    tl.to($bg, 2, { backgroundColor: 'rgba(0,0,0,0)' });
    tl.to($bg, 0, { display: 'none' }, 5.5);

    // Both fail
    // tl.call(video.play, null, video, 8);
    // tl.call(video.playVideo(), null, video, 8);
    setTimeout(function () {
        video.play();
    }, 3000);
}
