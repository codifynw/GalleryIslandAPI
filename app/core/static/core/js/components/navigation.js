/* global $, BASE_URL, GI */
import { initXScroll } from '../gallery.js';
import initMasonryGrid from '../masonry-gallery.js';
// import { activateDrawer } from '../components/animations.js';
import drawer from './drawer';

export function navigateTo (pageString) {
}

export function updatePage (newPage) {
    GI.activePage = newPage;
    switch (GI.activePage) {
    case 'gallery-MU':
        filterClass($('body'), 'view-*', 'view-gallery');
        $('body').removeClass('home');
        initXScroll();
        break;
    case 'home':
        filterClass($('body'), 'view-*', 'view-home');
        $('body').addClass('home');
        break;
    case 'gallery-MA':
        filterClass($('body'), 'view-*', 'view-gallery');
        initMasonryGrid();
        break;
    default:
        console.log(GI.activePage);
        console.log('add page to nav in js');
    }
}

export function buildGalleryListListeners () {
    // This executes when clicking on a gallery from the gallery index list.
    $('.gallery-link').off().on('click', function () {
        var self = $(this);
        $('body').addClass('menu-running');
        setTimeout(function () {
            $('.galleries-index').removeClass('open');
        }, 300);
        setTimeout(function () {
            $('#fullwidth-video').fadeOut();
            $('#gallery-target').show();
        }, 800);
        setTimeout(function () {
            $('body').removeClass('menu-running');
        }, 2000);

        function loadGallery (data, callback) {
            setTimeout(function () {
                $('#gallery-target').html('');
                $('#gallery-target').html(data);
                $('#gallery-target').fadeIn();
                callback();
            }, 300);
            $('body').addClass('view-gallery');
        }

        $.ajax({
            url: BASE_URL + 'gallery-content/' + self.attr('data-slug')
        }).done(function (response) {
            loadGallery(response, function () {
                var photoIDs = [];
                photoIDs = $.map($('.photo-row-photo'), function (n, i) {
                    return $(n).attr('data-id');
                });

                $('.photo-row-photo').click(function () {
                    const bgProperty = $(this).css('background-image');
                    $('.modal-target').css('background-image', bgProperty);
                    $('.modal').fadeIn();
                    $('.modal').attr('data-id', $(this).attr('data-id'));
                });
                $('.modal-close').click(function () {
                    $('.modal').fadeOut();
                });
                $('.modal-next-arrow').click(function () {
                    const currentID = $('.modal').attr('data-id');
                    const currentIndex = photoIDs.indexOf(currentID);
                    if (currentIndex !== photoIDs.length) {
                        const nextIndex = parseInt(currentIndex) + 1;
                        const bgProperty = $($('.photo-row-photo')[nextIndex]).css('background-image');
                        $('.modal-target').css('background-image', bgProperty);
                        $('.modal').attr('data-id', photoIDs[nextIndex]);
                    }
                });
                $('.modal-prev-arrow').click(function () {
                    const currentID = $('.modal').attr('data-id');
                    const currentIndex = photoIDs.indexOf(currentID);
                    if (currentIndex !== 0) {
                        const prevIndex = parseInt(currentIndex) - 1;
                        const bgProperty = $($('.photo-row-photo')[prevIndex]).css('background-image');
                        $('.modal-target').css('background-image', bgProperty);
                        $('.modal').attr('data-id', photoIDs[prevIndex]);
                    }
                });
                updatePage('gallery-' + self.attr('data-type'));
            });
        });
        window.history.pushState({}, 'Test Title', 'gallery/' + self.attr('data-slug'));
    });
}

export function returnHome () {
    $('.menu-item').removeClass('active');
    $('body').addClass('menu-running');
    setTimeout(function () {
        $('#gallery-target').fadeOut();
        $('#fullwidth-video').fadeIn();
    }, 800);
    setTimeout(function () {
        $('body').removeClass('menu-running');
    }, 2000);
    window.history.pushState({}, 'Home', '/');
}

export function buildNavigationListeners () {
    $('.menu-item').click(function () {
        if ($('body').hasClass('view-gallery')) {
            returnHome();
            $('body').removeClass('view-gallery');
        }

        $('.link-target').removeClass('open');
        $('.menu-item').removeClass('active');
        // $('.link-to-gallery').addClass('active');
        $(this).addClass('active');
        $('.' + $(this).attr('data-target')).addClass('open');
    });

    $('.logo-container').click(function () {
        navigateTo('home');
        if ($('body').hasClass('view-gallery')) {
            returnHome();
            $('body').removeClass('view-gallery');
        }

        $('.link-target').removeClass('open');
        $('.menu-item').removeClass('active');
        // $('.link-to-gallery').addClass('active');
        $(this).addClass('active');
        $('.' + $(this).attr('data-target')).addClass('open');
    });

    $(GI.hamburger).off().on('click', function () {
        const active = $(this).hasClass('active');

        if (active) {
            drawer.deactivateDrawer();
        } else {
            drawer.activateDrawer();
        }

        $(GI.hamburger).toggleClass('active');
        return false;
    });
}

const filterClass = function (element, removals, additions) {
    if (removals.indexOf('*') === -1) {
        // Use native jQuery methods if there is no wildcard matching
        element.removeClass(removals);
        return !additions ? element : element.addClass(additions);
    }

    var patt = new RegExp('\\s' +
            removals
                .replace(/\*/g, '[A-Za-z0-9-_]+')
                .split(' ')
                .join('\\s|\\s') +
            '\\s', 'g');

    element.each(function (i, it) {
        var cn = ' ' + it.className + ' ';
        while (patt.test(cn)) {
            cn = cn.replace(patt, ' ');
        }
        it.className = $.trim(cn);
    });

    return !additions ? element : element.addClass(additions);
};
