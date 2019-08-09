/* global $, GI */
import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';
import TweenLite from 'gsap/TweenLite';

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

export function animateDrawerOut () {
    const drawer = $('#drawer');

    console.log('animate the drawer out');
    // const menuTL = new TimelineLite();
    // menuTL.to();

    const _menuItems = $('.drawer-item');

    const showMenuItem = function (el) {
        TweenMax.to(el.el, 1, {
            opacity: 1,
            ease: 'Power2.easeOut',
            delay: el.delay
        });
        TweenMax.fromTo(el.el, 1, {
            x: 300
        }, {
            x: 0,
            ease: 'Power4.easeOut',
            delay: el.delay
        });
    };

    const show = function () {
        for (var i = 0; i < _menuItems.length; i++) {
            // _menuItems[i].style.display = 'block';
            showMenuItem({
                el: _menuItems[i],
                delay: i * .055
            });
        }
    };

    show();
}

console.log('sanity jane');
