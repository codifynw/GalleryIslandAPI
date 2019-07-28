export function initXScroll () {
    console.log('init X SCROLL!');
    console.log(document);
    function scrollHorizontally (e) {
        console.log('i am scrolled');
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('gallery-photos').scrollLeft -= (delta * 40); // Multiplied by 40
        e.preventDefault();
    }
    if (document.getElementById('gallery-photos').addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.getElementById('gallery-photos').addEventListener('mousewheel', scrollHorizontally, false);
        // Firefox
        document.getElementById('gallery-photos').addEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
        // IE 6/7/8
        document.getElementById('gallery-photos').attachEvent('onmousewheel', scrollHorizontally);
    }
}
