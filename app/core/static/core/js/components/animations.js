/* global $ */
import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';
// import { TweenMax } from 'gsap/TweenMax';
// import { TimelineLite } from 'gsap/TweenMax';
// import TweenLite from 'gsap/TweenLite';

export function runLandingPageAnimation () {
    const $text = $('.landing-text');
    const $bg = $('.landing-animation');
    const $logo = $('.landing-logo');
    const video = document.getElementById('bg-banner-video');

    var landingTimeLineTween = new TimelineLite().timeScale(0.7);
    landingTimeLineTween.to($text, 1, { opacity: 0, delay: 3.5 });
    landingTimeLineTween.to($bg, 2, { backgroundColor: 'rgba(0,0,0,0)' });
    landingTimeLineTween.to($logo, 2, { opacity: 0 }, '-=3');
    landingTimeLineTween.to($bg, 0, { display: 'none' });

    // Both fail
    // tl.call(video.play, null, video, 8);
    // tl.call(video.playVideo(), null, video, 8);
    setTimeout(function () {
        video.play();
    }, 3000);
}

export function animateHomeToGallery () {
    GI.Controller.curtainAnimation.play();
    setTimeout(function () {
        $('.galleries-target').removeClass('open');
    }, 100);
    setTimeout(function () {
        $('#fullwidth-video').fadeOut();
        $('#gallery-target').show();
    }, 800);
}

const buildHeaderAnimation = function (header) {
    const headerAnimation = TweenMax.to(header, '.4', {
        height: '120px',
        paused: true
    });
    return headerAnimation;
};

const buildCurtainAnimation = function () {
    var tl = new TimelineLite({
        paused: true,
        clearProps: 'all'
    });
    var curtain = $('#curtain');

    tl.to(curtain, 1, { width: '100vh', transformOrigin: 'left', ease: 'Expo.easeOut' });
    tl.to(curtain, 2, { opacity: 0, ease: 'Expo.easeOut' });
    tl.to(curtain, 0, { display: 'none' });
    // tl.from(img, 1, { opacity: 0 }, "reveal");
    return tl;
};

export { buildHeaderAnimation, buildCurtainAnimation };
