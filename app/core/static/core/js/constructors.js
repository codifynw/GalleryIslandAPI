/* global $, Mustache, BASE_URL, GI */
import buildGalleryListListeners from './components/navigation';
import galleryLITemplate from '../../../templates/core/partials/gallery-list-item.html';

const buildGalleryMenu = function (galleries) {
    var text = Mustache.render(galleryLITemplate, { gallery: galleries });
    console.log('pre build gallery menu');
    $('.gallery-list').append(text);
    buildGalleryListListeners();
};

export const initGalleryMenu = function () {
    $.ajax({
        url: BASE_URL + 'api/gallery/'
    }).done(function (response) {
        GI.galleries = response;
        buildGalleryMenu(GI.galleries);
    });
};
