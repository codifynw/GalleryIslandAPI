/* global $, Mustache, BASE_URL, GI */
import { buildGalleryListListeners } from './components/navigation';
import galleryLITemplate from '../../../templates/core/mustacheTemplates/gallery-list-item.html';
import menuItemTemplate from '../../../templates/core/mustacheTemplates/main-menu-list-item.html';

export const initMainMenu = function () {
    $.ajax({
        url: BASE_URL + 'api/menu-item/'
    }).done(function (response) {
        GI.menu = response;
        console.log(GI.menu);
        buildMainMenu(GI.menu);
    });
};

export const initGalleryMenu = function () {
    $.ajax({
        url: BASE_URL + 'api/gallery/'
    }).done(function (response) {
        GI.galleries = response;
        buildGalleryMenu(GI.galleries);
    });
};

const buildGalleryMenu = function (galleries) {
    var text = Mustache.render(galleryLITemplate, { gallery: galleries });
    $('.gallery-list').append(text);
    buildGalleryListListeners();
};

const buildMainMenu = function (menuItems) {
    var text = Mustache.render(menuItemTemplate, { obj: menuItems.sort((a, b) => (a.rank > b.rank) ? 1 : -1) });
    $('.menu').append(text);
    buildGalleryListListeners();
};
// menuItems = prepareMenuItems(menuItems);
//
//
// var found = GI.galleries.find(function (element) {
//     return id = 2;
// });
//
// console.log(found);
//
// const prepareMenuItems = function (menuItems) {
//
// }
