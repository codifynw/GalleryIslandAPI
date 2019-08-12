/* global $, Mustache, BASE_URL, GI */
import { buildGalleryListListeners, buildNavigationListeners } from './navigation';
import galleryLITemplate from '../../../../templates/core/mustacheTemplates/gallery-list-item.html';
import menuItemTemplate from '../../../../templates/core/mustacheTemplates/main-menu-list-item.html';
import drawerItemTemplate from '../../../../templates/core/mustacheTemplates/drawer-list-item.html';
import pageTemplate from '../../../../templates/core/mustacheTemplates/page-targets.html';

export const initMainMenu = function () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: BASE_URL + 'api/menu-item/',
            success: function (data) {
                GI.menu = data;
                buildMainMenu(GI.menu);
                buildDrawerMenu(GI.menu);
                resolve(data);
            },
            error: function (data) {
                reject(data);
            }
        });
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
    $('.galleries-index').append(text);
    buildGalleryListListeners();
};

const buildMainMenu = function (menuItems) {
    buildMenuTargets(menuItems);
    const text = Mustache.render(menuItemTemplate, { obj: menuItems.sort((a, b) => (a.rank > b.rank) ? 1 : -1) });
    $('.menu').append(text);
};

const buildDrawerMenu = function (menuItems) {
    const text = Mustache.render(drawerItemTemplate, { obj: menuItems.sort((a, b) => (a.rank > b.rank) ? 1 : -1) });
    $('.drawer-items').append(text);
};

const buildMenuTargets = function (menuItems) {
    const text = Mustache.render(pageTemplate, { obj: menuItems });
    $('#targets').append(text);
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
