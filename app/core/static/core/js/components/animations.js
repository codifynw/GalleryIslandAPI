/* global $ */
// import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';
import { TimelineLite } from 'gsap/TweenMax';
// import TweenLite from 'gsap/TweenLite';

export function runLandingPageAnimation () {
    const $text = $('.landing-text');
    const $bg = $('.landing-animation');
    const $logo = $('.landing-logo');
    const video = document.getElementById('bg-banner-video');

    var tl = new TimelineLite();
    tl.to($text, 1, { opacity: 0, delay: 3.5 });
    tl.to($bg, 2, { backgroundColor: 'rgba(0,0,0,0)' });
    tl.to($logo, 2, { opacity: 0 }, '-=3');
    tl.to($bg, 0, { display: 'none' });

    // Both fail
    // tl.call(video.play, null, video, 8);
    // tl.call(video.playVideo(), null, video, 8);
    setTimeout(function () {
        video.play();
    }, 3000);
}

export function animateHomeToGallery () {
    $('body').addClass('menu-running');
    setTimeout(function () {
        $('.galleries-target').removeClass('open');
    }, 300);
    setTimeout(function () {
        $('#fullwidth-video').fadeOut();
        $('#gallery-target').show();
    }, 800);
    setTimeout(function () {
        $('body').removeClass('menu-running');
    }, 2000);
}
