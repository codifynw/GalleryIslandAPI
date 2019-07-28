/* global $ */
export function initXScroll () {
    console.log('initXScroll')
    // function scrollHorizontally (e) {
    //     e = window.event || e;
    //     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    //     document.getElementById('gallery-photos').scrollLeft -= (delta * 40); // Multiplied by 40
    //     e.preventDefault();
    // }
    // if (document.getElementById('gallery-photos').addEventListener) {
    //     // IE9, Chrome, Safari, Opera
    //     document.getElementById('gallery-photos').addEventListener('mousewheel', scrollHorizontally, false);
    //     // Firefox
    //     document.getElementById('gallery-photos').addEventListener('DOMMouseScroll', scrollHorizontally, false);
    // } else {
    //     // IE 6/7/8
    //     document.getElementById('gallery-photos').attachEvent('onmousewheel', scrollHorizontally);
    // }
    console.log($('body'));
    $('#gallery-photos').on('mousewheel DOMMouseScroll', function (event) {
        var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));
        $(this).scrollLeft($(this).scrollLeft() - (delta * 40));
        event.preventDefault();
    });
}
