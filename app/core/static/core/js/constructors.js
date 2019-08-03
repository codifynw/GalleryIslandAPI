/* global $, Mustache, BASE_URL, GI */
import { buildGalleryListListeners, buildNavigationListeners } from './components/navigation';
import galleryLITemplate from '../../../templates/core/mustacheTemplates/gallery-list-item.html';
import menuItemTemplate from '../../../templates/core/mustacheTemplates/main-menu-list-item.html';
import pageTemplate from '../../../templates/core/mustacheTemplates/page-targets.html';

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
    const text = Mustache.render(galleryLITemplate, { gallery: galleries });
    $('.gallery-list').append(text);
    buildGalleryListListeners();
};

const buildMainMenu = function (menuItems) {
    buildMenuTargets(menuItems);
    const text = Mustache.render(menuItemTemplate, { obj: menuItems.sort((a, b) => (a.rank > b.rank) ? 1 : -1) });
    $('.menu').append(text);
    buildNavigationListeners();
};

const buildMenuTargets = function (menuItems) {
    console.log('menuItems',menuItems);
    const text = Mustache.render(pageTemplate, { obj: menuItems });
    console.log('text',text);
    $('#targets').append(text);
}
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