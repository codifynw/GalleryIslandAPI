/* global $, GI */
import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';
// import TweenLite from 'gsap/TweenLite';

console.log('init drawer');

const drawer = {
    // METHODS
    init () {
        console.log('it is inited');
        this.drawer = $('#drawer');
        this.drawerMenuItems = $('.drawer-item');
    },

    showMenuItem (el) {
        TweenMax.to(el.el, 1, {
            opacity: 1,
            ease: 'Power2.easeOut',
            delay: el.delay
        });
        TweenMax.fromTo(el.el, 1, {
            transform: 'translateX(0%)'
        }, {
            transform: 'translateX(50%)',
            ease: 'Power4.easeOut',
            delay: el.delay
        });
    },

    activateDrawer () {
        this.activateDrawerTranslate();
        this.activateDrawerMenuItems();
    },

    activateDrawerMenuItems () {
        const self = this;
        console.log('activate the drawer menu items');
        // const menuTL = new TimelineLite();
        // menuTL.to();

        const show = function () {
            for (var i = 0; i < self.drawerMenuItems.length; i++) {
                // drawerMenuItems[i].style.display = 'block';
                self.showMenuItem({
                    el: self.drawerMenuItems[i],
                    delay: i * 0.055
                });
            }
        };

        show();
    },

    activateDrawerTranslate () {
        const self = this;

        console.log('adding tween to:')
        console.log(self.drawer);

        TweenMax.killTweensOf(self.drawer);
        TweenMax.fromTo(self.drawer, 0.4, {
            transform: 'translateX(-100%)'
        }, {
            transform: 'translateX(0%)',
            ease: 'Power4.easeOut'
        });
    },

    deactivateDrawer (elms) {
        TweenMax.killTweensOf(elms);
        TweenMax.to(elms, 1, {
            x: 0,
            y: 0,
            ease: 'Power4.easeOut'
        });
    }
};

$(document).ready(function () {
    drawer.init();
});

export {drawer as default};
