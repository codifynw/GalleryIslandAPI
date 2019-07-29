/* global $, Mustache, BASE_URL, GI */
import { buildGalleryListListeners } from './components/navigation';
import galleryLITemplate from '../../../templates/core/partials/gallery-list-item.html';

const buildGalleryMenu = function (galleries) {
    var text = Mustache.render(galleryLITemplate, { gallery: galleries });
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

//
// var found = GI.galleries.find(function(element) {
//   return id = 2;
// });
//
// console.log(found);
