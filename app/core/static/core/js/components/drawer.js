/* global $, Mustache, GI */
// import { TweenMax, Power2, TimelineLite } from 'gsap/TweenMax';
import { TweenMax } from 'gsap/TweenMax';
import drawerItemTemplate from '../../../../templates/core/mustacheTemplates/drawer-list-item.html';
// import TweenLite from 'gsap/TweenLite';

const drawer = {
    // METHODS
    init () {
        const self = this;
        self.drawer = $('#drawer');
        self.buildDrawerMenu(GI.menu);
        self.drawerMenuItems = $('.drawer-item');
    },

    buildDrawerMenu (menuItems) {
        const self = this;
        const text = Mustache.render(drawerItemTemplate, { obj: menuItems.sort((a, b) => (a.rank > b.rank) ? 1 : -1) });
        $('.drawer-items').append(text);
        self.buildDrawerMenuListeners();
    },

    buildDrawerMenuListeners () {
        const self = this;
        $('.drawer-item').click(function () {
            // $('.link-target').removeClass('open');
            // $('.menu-item').removeClass('active');
            // $(this).addClass('active');
            // $('.' + $(this).attr('data-target')).addClass('open');
            console.log('clicked');
            console.log(this);
            GI.hamburger.removeClass('active');
            self.deactivateDrawerMenuItems();
            self.deactivateDrawerTranslate();
            GI.Controller.navigateTo($(this).attr('data-target'))
        });
    },

    showMenuItem (el) {
        TweenMax.to(el.el, 1, {
            opacity: 1,
            ease: 'Power2.easeOut',
            delay: el.delay
        });
        TweenMax.fromTo(el.el, 1, {
            transform: 'translateX(-50%)'
        }, {
            transform: 'translateX(0%)',
            ease: 'Power4.easeOut',
            delay: el.delay
        });
    },

    hideMenuItem (el) {
        TweenMax.to(el.el, 1, {
            opacity: 0,
            ease: 'Power2.easeOut',
            delay: el.delay
        });
        TweenMax.fromTo(el.el, 1, {
            transform: 'translateX(50%)',
            ease: 'Power4.easeOut',
            delay: el.delay
        }, {
            transform: 'translateX(0%)'
        });
    },

    activateDrawer () {
        const self = this;
        self.activateDrawerTranslate();
        setTimeout(function () {
            self.activateDrawerMenuItems();
        }, 150);
    },

    deactivateDrawer () {
        this.deactivateDrawerTranslate();
        this.deactivateDrawerMenuItems();
    },

    activateDrawerMenuItems () {
        const self = this;
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

    deactivateDrawerMenuItems () {
        const self = this;

        const hide = function () {
            for (var i = 0; i < self.drawerMenuItems.length; i++) {
                // drawerMenuItems[i].style.display = 'block';
                self.hideMenuItem({
                    el: self.drawerMenuItems[i],
                    delay: i * 0.055
                });
            }
        };

        hide();
    },

    activateDrawerTranslate () {
        const self = this;

        TweenMax.killTweensOf(self.drawer);
        TweenMax.fromTo(self.drawer, 0.8, {
            transform: 'translateX(-100%)'
        }, {
            transform: 'translateX(0%)',
            ease: 'Expo.easeOut'
        });
    },

    deactivateDrawerTranslate () {
        const self = this;

        TweenMax.fromTo(self.drawer, 1, {
            transform: 'translateX(0%)'
        }, {
            transform: 'translateX(-100%)',
            ease: 'Expo.easeOut',
            onComplete: function () {
            },
            clearProps: 'transform'
        });
    }
};

export { drawer as default };
