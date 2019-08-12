'use strict';

function css_browser_selector (u, ns) {
    var html = document.documentElement;
    var b = [];
    ns = ns || '', uaInfo.ua = u.toLowerCase();
    var browser = uaInfo.getBrowser();
    browser == 'gecko' && (browser = !window.ActiveXObject && 'ActiveXObject' in window ? 'ie ie11' : browser);
    var pattTouch = /no-touch/g;
    pattTouch.test(html.className) ? b = b.concat('no-touch') : b = b.concat('touch');
    var pattAdmin = /admin-mode/g;
    pattAdmin.test(html.className) && (b = b.concat('admin-mode')), b = b.concat(browser), b = b.concat(uaInfo.getPlatform()), b = b.concat(uaInfo.getMobile()), b = b.concat(uaInfo.getIpadApp()), b = b.concat(uaInfo.getLang()), b = b.concat(['js']), b = b.concat(screenInfo.getPixelRatio()), b = b.concat(screenInfo.getInfo());
    var updateScreen = function () {
        html.className = html.className.replace(/ ?orientation_\w+/g, '').replace(/ [min|max|cl]+[w|h]_\d+/g, ''), html.className = html.className + ' ' + screenInfo.getInfo().join(' ');
    };
    window.addEventListener('resize', updateScreen), window.addEventListener('orientationchange', updateScreen);
    var data = dataUriInfo.getImg();
    return data.onload = data.onerror = function () {
        html.className += ' ' + dataUriInfo.checkSupport().join(' ');
    }, b = b.filter(function (e) {
        return e;
    }), b[0] = ns ? ns + b[0] : b[0], html.className = b.join(' ' + ns), html.className;
}

function onYouTubeIframeAPIReady () {
    YTplayers = new Array(), jQuery('.no-touch .uncode-video-container.video').each(function () {
        var playerY;
        if (jQuery(this).attr('data-provider') == 'youtube') {
            var id = jQuery(this).attr('data-id');
            options = jQuery(window).data('okoptions-' + id), options.time = jQuery(this).attr('data-t'), playerY = new YT.Player('okplayer-' + id, {
                videoId: options.video ? options.video.id : null,
                playerVars: {
                    autohide: 1,
                    autoplay: 0,
                    disablekb: options.keyControls,
                    cc_load_policy: options.captions,
                    controls: options.controls,
                    enablejsapi: 1,
                    fs: 0,
                    modestbranding: 1,
                    origin: window.location.origin || window.location.protocol + '//' + window.location.hostname,
                    iv_load_policy: options.annotations,
                    loop: options.loop,
                    showinfo: 0,
                    rel: 0,
                    wmode: 'opaque',
                    hd: options.hd,
                    mute: 1
                },
                events: {
                    onReady: OKEvents.yt.ready,
                    onStateChange: OKEvents.yt.onStateChange,
                    onError: OKEvents.yt.error
                }
            }), YTplayers[id] = playerY, playerY.videoId = id;
        }
    });
}

function vimeoPlayerReady (id) {
    options = jQuery(window).data('okoptions-' + id);
    var jIframe = options.jobject;
    var iframe = jIframe[0];
    jIframe.attr('src', jIframe.data('src'));
    var playerV = $f(iframe);
    playerV.addEvent('ready', function (e) {
        OKEvents.v.onReady(iframe);
        var carouselContainer = jQuery(iframe).closest('.owl-carousel');
        carouselContainer.length && UNCODE.owlPlayVideo(carouselContainer), OKEvents.utils.isMobile() ? OKEvents.v.onPlay(playerV) : (playerV.addEvent('play', OKEvents.v.onPlay(playerV)), playerV.addEvent('pause', OKEvents.v.onPause), playerV.addEvent('finish', OKEvents.v.onFinish)), options.time != null && playerV.api('seekTo', options.time.replace('t=', '')), playerV.api('play'), jQuery(iframe).css({
            visibility: 'visible',
            opacity: 1
        }), jQuery(iframe).closest('.uncode-video-container').css('opacity', '1'), jQuery(iframe).closest('#page-header').addClass('video-started'), jQuery(iframe).closest('.background-wrapper').find('.block-bg-blend-mode.not-ie').css('opacity', '1');
    });
}

function whichTransitionEvent () {
    var t; var el = document.createElement('fakeelement');
    var transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
    };
    for (t in transitions) { if (el.style[t] !== undefined) return transitions[t]; }
}

function whichAnimationEvent () {
    var t; var el = document.createElement('fakeelement');
    var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd'
    };
    for (t in animations) { if (el.style[t] !== undefined) return animations[t]; }
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
        window.setTimeout(callback, 1e3 / 60);
    };
}()), window.requestTimeout = function (fn, delay) {
    function loop () {
        var current = (new Date()).getTime();
        var delta = current - start;
        delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
    }
    if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && (!window.mozRequestAnimationFrame || !window.mozCancelRequestAnimationFrame) && !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return window.setTimeout(fn, delay);
    var start = (new Date()).getTime();
    var handle = new Object();
    return handle.value = requestAnimFrame(loop), handle;
}, window.clearRequestTimeout = function (handle) {
    typeof handle !== 'undefined' && (window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) : window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) : clearTimeout(handle));
};

var uaInfo = {
    ua: '',
    is: function (t) {
        return RegExp(t, 'i').test(uaInfo.ua);
    },
    version: function (p, n) {
        n = n.replace('.', '_');
        var i = n.indexOf('_');
        var ver = '';
        while (i > 0) ver += ' ' + p + n.substring(0, i), i = n.indexOf('_', i + 1);
        return ver += ' ' + p + n, ver;
    },
    getBrowser: function () {
        var g = 'gecko';
        var w = 'webkit';
        var c = 'chrome';
        var f = 'firefox';
        var s = 'safari';
        var o = 'opera';
        var a = 'android';
        var bb = 'blackberry';
        var dv = 'device_';
        var ua = uaInfo.ua;
        var is = uaInfo.is;
        return [!/opera|webtv/i.test(ua) && /msie\s(\d+)/.test(ua) ? 'ie ie' + (/trident\/4\.0/.test(ua) ? '8' : RegExp.$1) : is('edge/') ? 'edge ie' + (/edge\/(\d+)\.(\d+)/.test(ua) ? RegExp.$1 + ' ie' + RegExp.$1 + '_' + RegExp.$2 : '') : is('trident/') ? 'ie ie' + (/trident\/.+rv:(\d+)/i.test(ua) ? RegExp.$1 : '') : is('firefox/') ? g + ' ' + f + (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + f + RegExp.$2 + ' ' + f + RegExp.$2 + '_' + RegExp.$4 : '') : is('gecko/') ? g : is('opera') ? o + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + o + RegExp.$2 + ' ' + o + RegExp.$2 + '_' + RegExp.$4 : /opera(\s|\/)(\d+)\.(\d+)/.test(ua) ? ' ' + o + RegExp.$2 + ' ' + o + RegExp.$2 + '_' + RegExp.$3 : '') : is('konqueror') ? 'konqueror' : is('blackberry') ? bb + (/Version\/(\d+)(\.(\d+)+)/i.test(ua) ? ' ' + bb + RegExp.$1 + ' ' + bb + RegExp.$1 + RegExp.$2.replace('.', '_') : /Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) ? ' ' + bb + RegExp.$2 + (RegExp.$3 ? ' ' + bb + RegExp.$2 + RegExp.$3 : '') : '') : is('android') ? a + (/Version\/(\d+)(\.(\d+))+/i.test(ua) ? ' ' + a + RegExp.$1 + ' ' + a + RegExp.$1 + RegExp.$2.replace('.', '_') : '') + (/Android (.+); (.+) Build/i.test(ua) ? ' ' + dv + RegExp.$2.replace(/ /g, '_').replace(/-/g, '_') : '') : is('chrome') ? w + ' ' + c + (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + c + RegExp.$2 + (RegExp.$4 > 0 ? ' ' + c + RegExp.$2 + '_' + RegExp.$4 : '') : '') : is('iron') ? w + ' iron' : is('applewebkit/') ? w + ' ' + s + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + s + RegExp.$2 + ' ' + s + RegExp.$2 + RegExp.$3.replace('.', '_') : / Safari\/(\d+)/i.test(ua) ? RegExp.$1 == '419' || RegExp.$1 == '417' || RegExp.$1 == '416' || RegExp.$1 == '412' ? ' ' + s + '2_0' : RegExp.$1 == '312' ? ' ' + s + '1_3' : RegExp.$1 == '125' ? ' ' + s + '1_2' : RegExp.$1 == '85' ? ' ' + s + '1_0' : '' : '') : is('mozilla/') ? g : ''];
    },
    getPlatform: function () {
        var wp = 'winphone';
        var a = 'android';
        var bb = 'blackberry';
        var dv = 'device_';
        var ua = uaInfo.ua;
        var version = uaInfo.version;
        var is = uaInfo.is;
        return [is('j2me') ? 'j2me' : is('windows phone') ? wp + (/Windows Phone (\d+)(\.(\d+))+/i.test(ua) ? ' ' + wp + RegExp.$1 + ' ' + wp + RegExp.$1 + RegExp.$2.replace('.', '_') : /Windows Phone OS (\d+)(\.(\d+))+/i.test(ua) ? ' ' + wp + RegExp.$1 + ' ' + wp + RegExp.$1 + RegExp.$2.replace('.', '_') : '') : is('blackberry') ? bb + (/Version\/(\d+)(\.(\d+)+)/i.test(ua) ? ' ' + bb + RegExp.$1 + ' ' + bb + RegExp.$1 + RegExp.$2.replace('.', '_') : /Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) ? ' ' + bb + RegExp.$2 + (RegExp.$3 ? ' ' + bb + RegExp.$2 + RegExp.$3 : '') : '') : is('android') ? a + (/Version\/(\d+)(\.(\d+))+/i.test(ua) ? ' ' + a + RegExp.$1 + ' ' + a + RegExp.$1 + RegExp.$2.replace('.', '_') : '') + (/Android (.+); (.+) Build/i.test(ua) ? ' ' + dv + RegExp.$2.replace(/ /g, '_').replace(/-/g, '_') : '') : is('ipad|ipod|iphone') ? (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua) ? 'ios' + version('ios', RegExp.$2) : '') + ' ' + (/(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : '') : is('playbook') ? 'playbook' : is('kindle|silk') ? 'kindle' : is('playbook') ? 'playbook' : is('mac') ? 'mac' + (/mac os x ((\d+)[.|_](\d+))/.test(ua) ? ' mac' + RegExp.$2 + ' mac' + RegExp.$1.replace('.', '_') : '') : is('win') ? 'win' + (is('windows nt 10.0') ? ' win10' : is('windows nt 6.3') ? ' win8_1' : is('windows nt 6.2') ? ' win8' : is('windows nt 6.1') ? ' win7' : is('windows nt 6.0') ? ' vista' : is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp' : is('windows nt 5.0') ? ' win_2k' : is('windows nt 4.0') || is('WinNT4.0') ? ' win_nt' : '') : is('freebsd') ? 'freebsd' : is('x11|linux') ? 'linux' : ''];
    },
    getMobile: function () {
        var is = uaInfo.is;
        return [is('android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk') ? 'mobile' : ''];
    },
    getIpadApp: function () {
        var is = uaInfo.is;
        return [is('ipad|iphone|ipod') && !is('safari') ? 'ipad_app' : ''];
    },
    getLang: function () {
        var ua = uaInfo.ua;
        return [/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua) ? ('lang_' + RegExp.$2).replace('-', '_') + (RegExp.$3 != '' ? (' lang_' + RegExp.$1).replace('-', '_') : '') : ''];
    }
};
var screenInfo = {
    width: (window.outerWidth || document.documentElement.clientWidth) - 15,
    height: window.outerHeight || document.documentElement.clientHeight,
    screens: [0, 768, 980, 1200],
    screenSize: function () {
        screenInfo.width = (window.outerWidth || document.documentElement.clientWidth) - 15, screenInfo.height = window.outerHeight || document.documentElement.clientHeight;
        var screens = screenInfo.screens;
        var i = screens.length;
        var arr = [];
        var maxw; var minw;
        while (i--) {
            if (screenInfo.width >= screens[i]) {
                i && arr.push('minw_' + screens[i]), i <= 2 && arr.push('maxw_' + (screens[i + 1] - 1));
                break;
            }
        }
        return arr;
    },
    getOrientation: function () {
        return screenInfo.width < screenInfo.height ? ['orientation_portrait'] : ['orientation_landscape'];
    },
    getInfo: function () {
        var arr = [];
        return arr = arr.concat(screenInfo.screenSize()), arr = arr.concat(screenInfo.getOrientation()), arr;
    },
    getPixelRatio: function () {
        var arr = [];
        var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
        return pixelRatio > 1 ? (arr.push('retina_' + parseInt(pixelRatio) + 'x'), arr.push('hidpi')) : arr.push('no-hidpi'), arr;
    }
};
var dataUriInfo = {
    data: new Image(),
    div: document.createElement('div'),
    isIeLessThan9: !1,
    getImg: function () {
        return dataUriInfo.data.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', dataUriInfo.div.innerHTML = '<!--[if lt IE 9]><i></i><![endif]-->', dataUriInfo.isIeLessThan9 = dataUriInfo.div.getElementsByTagName('i').length == 1, dataUriInfo.data;
    },
    checkSupport: function () {
        return dataUriInfo.data.width != 1 || dataUriInfo.data.height != 1 || dataUriInfo.isIeLessThan9 ? ['no-datauri'] : ['datauri'];
    }
};
var css_browser_selector_ns = css_browser_selector_ns || '';
css_browser_selector(navigator.userAgent, css_browser_selector_ns),
(function () {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
    var is_ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
    (is_webkit || is_opera || is_ie) && document.getElementById && window.addEventListener && window.addEventListener('hashchange', function () {
        var id = location.hash.substring(1);
        var element;
        if (!/^[A-z0-9_-]+$/.test(id)) return;
        element = document.getElementById(id), element && (/^(?:a|select|input|button|textarea)$/i.test(element.tagName) || (element.tabIndex = -1), element.focus());
    }, !1);
}());
try {
    new CustomEvent('test');
} catch (e) {
    var CustomEvent = function (event, params) {
        var evt;
        return params = params || {
            bubbles: !1,
            cancelable: !1,
            detail: undefined
        }, evt = document.createEvent('CustomEvent'), evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), evt;
    };
    CustomEvent.prototype = window.Event.prototype, window.CustomEvent = CustomEvent;
}
Array.prototype.indexOf || (Array.prototype.indexOf = function (n) {
    if (this == null) throw new TypeError();
    var t; var e; var o = Object(this);
    var r = o.length >>> 0;
    if (r === 0) return -1;
    if (t = 0, arguments.length > 1 && (t = Number(arguments[1]), t != t ? t = 0 : t != 0 && 1 / 0 != t && t != -1 / 0 && (t = (t > 0 || -1) * Math.floor(Math.abs(t)))), t >= r) return -1;
    for (e = t >= 0 ? t : Math.max(r - Math.abs(t), 0); r > e; e++) { if (e in o && o[e] === n) return e; }
    return -1;
});
var evento = (function (n) {
    var t; var e; var o; var r = n;
    var i = r.document;
    var f = {};
    return t = (function () {
        return typeof i.addEventListener === 'function' ? function (n, t, e) {
            n.addEventListener(t, e, !1), f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t].push(e);
        } : typeof i.attachEvent === 'function' ? function (n, t, e) {
            n.attachEvent(t, e), f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t].push(e);
        } : function (n, t, e) {
            n['on' + t] = e, f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t].push(e);
        };
    }()), e = (function () {
        return typeof i.removeEventListener === 'function' ? function (n, t, e) {
            n.removeEventListener(t, e, !1), Helio.each(f[n][t], function (o) {
                o === e && (f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t][f[n][t].indexOf(o)] = void 0);
            });
        } : typeof i.detachEvent === 'function' ? function (n, t, e) {
            n.detachEvent(t, e), Helio.each(f[n][t], function (o) {
                o === e && (f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t][f[n][t].indexOf(o)] = void 0);
            });
        } : function (n, t, e) {
            n['on' + t] = void 0, Helio.each(f[n][t], function (o) {
                o === e && (f[n] = f[n] || {}, f[n][t] = f[n][t] || [], f[n][t][f[n][t].indexOf(o)] = void 0);
            });
        };
    }()), o = function (n, t) {
        f[n] = f[n] || {}, f[n][t] = f[n][t] || [];
        for (var e = 0, o = f[n][t].length; o > e; e += 1) f[n][t][e]();
    }, {
        add: t,
        remove: e,
        trigger: o,
        _handlers: f
    };
}(this));
var player; var OKEvents; var options; var videoWidth; var videoHeight; var YTplayers; var youtubePlayers = new Array();
OKEvents = {
    yt: {
        ready: function (event) {
            var id = event.target.videoId;
            youtubePlayers[id] = event.target, event.target.setVolume(options.volume);
            if (options.autoplay === 1) {
                if (options.playlist.list) player.loadPlaylist(options.playlist.list, options.playlist.index, options.playlist.startSeconds, options.playlist.suggestedQuality);
                else {
                    var inCarousel = jQuery('#okplayer-' + id).closest('.owl-item');
                    !inCarousel.length || inCarousel.length && inCarousel.hasClass('active') ? (options.time != null && event.target.seekTo(parseInt(options.time)), event.target.playVideo()) : event.target.pauseVideo();
                }
            }
            OKEvents.utils.isFunction(options.onReady) && options.onReady(event.target);
        },
        onStateChange: function (event) {
            var id = event.target.videoId;
            switch (event.data) {
            case -1:
                OKEvents.utils.isFunction(options.unstarted) && options.unstarted();
                break;
            case 0:
                OKEvents.utils.isFunction(options.onFinished) && options.onFinished(), options.loop && event.target.playVideo();
                break;
            case 1:
                OKEvents.utils.isFunction(options.onPlay) && options.onPlay(), setTimeout(function () {
                    UNCODE.initVideoComponent(document.body, '.uncode-video-container.video, .uncode-video-container.self-video'), jQuery('#okplayer-' + id).closest('.uncode-video-container').css('opacity', '1'), jQuery('#okplayer-' + id).closest('#page-header').addClass('video-started'), jQuery('#okplayer-' + id).closest('.background-wrapper').find('.block-bg-blend-mode.not-ie').css('opacity', '1');
                }, 300);
                break;
            case 2:
                OKEvents.utils.isFunction(options.onPause) && options.onPause();
                break;
            case 3:
                OKEvents.utils.isFunction(options.buffering) && options.buffering();
                break;
            case 5:
                OKEvents.utils.isFunction(options.cued) && options.cued();
                break;
            default:
                throw 'OKVideo: received invalid data from YT player.';
            }
        },
        error: function (event) {
            throw event;
        }
    },
    v: {
        onReady: function (target) {
            OKEvents.utils.isFunction(options.onReady) && options.onReady(target);
        },
        onPlay: function (player) {
            OKEvents.utils.isMobile() || player.api('setVolume', options.volume), OKEvents.utils.isFunction(options.onPlay) && options.onPlay(), jQuery(player.element).closest('.uncode-video-container').css('opacity', '1'), jQuery(player.element).closest('#page-header').addClass('video-started'), jQuery(player.element).closest('.background-wrapper').find('.block-bg-blend-mode.not-ie').css('opacity', '1');
        },
        onPause: function () {
            OKEvents.utils.isFunction(options.onPause) && options.onPause();
        },
        onFinish: function () {
            OKEvents.utils.isFunction(options.onFinish) && options.onFinish();
        }
    },
    utils: {
        isFunction: function (func) {
            return typeof func === 'function' ? !0 : !1;
        },
        isMobile: function () {
            return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) ? !0 : !1;
        }
    }
},
(function (window) {
    function classReg (className) {
        return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
    }

    function toggleClass (elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    var hasClass, addClass, removeClass;
    'classList' in document.documentElement ? (hasClass = function (elem, c) {
        if (elem !== null && typeof elem.classList !== 'undefined') return elem.classList.contains(c);
    }, addClass = function (elem, c) {
        elem !== null && typeof elem.classList !== 'undefined' && elem.classList.add(c);
    }, removeClass = function (elem, c) {
        elem !== null && typeof elem.classList !== 'undefined' && elem.classList.remove(c);
    }) : (hasClass = function (elem, c) {
        if (elem !== null) return classReg(c).test(elem.className);
    }, addClass = function (elem, c) {
        hasClass(elem, c) || elem !== null && (elem.className = elem.className + ' ' + c);
    }, removeClass = function (elem, c) {
        elem !== null && (elem.className = elem.className.replace(classReg(c), ' '));
    });
    var classie = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    typeof define === 'function' && define.amd ? define(classie) : window.classie = classie, window.wrap = function (wrapper, elms) {
        elms.length || (elms = [elms]);
        for (var i = elms.length - 1; i >= 0; i--) {
            var child = i > 0 ? wrapper.cloneNode(!0) : wrapper;
            var el = elms[i];
            var parent = el.parentNode;
            var sibling = el.nextSibling;
            child.appendChild(el), sibling ? parent.insertBefore(child, sibling) : parent.appendChild(child);
        }
    }, window.wrapAll = function (wrapper, nodes) {
        var parent = nodes[0].parentNode;
        var previousSibling = nodes[0].previousSibling;
        for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) wrapper.appendChild(nodes[i]);
        var nextSibling = previousSibling ? previousSibling.nextSibling : parent.firstChild;
        return parent.insertBefore(wrapper, nextSibling), wrapper;
    };
}(window)),
(function (window, undefined) {
    function getClosest (el, tag) {
        do { if (el.className != undefined && el.className.indexOf(tag) > -1) return el; }
        while (el = el.parentNode);
        return null;
    }

    function outerHeight (el, includeMargin) {
        if (el != null) {
            var height = el.offsetHeight;
            if (includeMargin) {
                var style = el.currentStyle || getComputedStyle(el);
                height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            }
            return height;
        }
    }

    function outerWidth (el, includeMargin) {
        var width = el.offsetWidth;
        if (includeMargin) {
            var style = el.currentStyle || getComputedStyle(el);
            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        }
        return width;
    }

    function forEachElement (selector, fn) {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) fn(elements[i], i);
    }

    function getDivChildren (containerId, selector, fn) {
        if (containerId !== null) {
            var elements = containerId.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) fn(elements[i], i, elements.length);
        }
    }

    function hideFooterScroll () {
        classie.hasClass(document.body, 'hide-scrollup') && (footerScroller[0].style.display = 'none');
    }
    var bodyTop; var scrollbarWidth = !1;
    var noScroll = !1;
    var boxEvent = new CustomEvent('boxResized');
    var menuClose = new CustomEvent('menuClose');
    var menuOpen = new CustomEvent('menuOpen');
    var bodyBorder = 0;
    var adminBarHeight = 0;
    var boxWidth = 0;
    var boxLeft = 0;
    var parallaxRows; var parallaxCols; var parallaxHeaders; var kenburnsHeaders; var kenburnsRows; var kenburnsCols; var backwashHeaders; var backwashRows; var backwashCols; var visibleRows; var headerWithOpacity; var speedDivider = SiteParameters.parallax_factor;
    var adminBar; var pageHeader; var headerVideo; var masthead; var mastheadMobile; var mastheadMobilePaddingTop = 0;
    var maincontainer; var menuwrapper; var menuhide; var menusticky; var menuHeight = 0;
    var menuMobileHeight = 0;
    var mainmenu = new Array();
    var secmenu = new Array();
    var secmenuHeight = 0;
    var transmenuHeight = 0;
    var header; var transmenuel; var logo; var logoel; var logolink; var logoMinScale; var lastScrollValue = 0;
    var wwidth = window.innerWidth || document.documentElement.clientWidth;
    var wheight = window.innerHeight || document.documentElement.clientHeight;
    var boxWrapper; var docheight = 0;
    var isMobile = classie.hasClass(document.documentElement, 'touch') ? !0 : !1;
    var isIE = classie.hasClass(document.documentElement, 'ie') || classie.hasClass(document.documentElement, 'opera12') ? !0 : !1;
    var isFF = classie.hasClass(document.documentElement, 'firefox') ? !0 : !1;
    var isFullPage; var isFullPageSnap; var transitionEvent = whichTransitionEvent();
    var animationEvent = whichAnimationEvent();
    var footerScroller = !1;
    var mediaQuery = 959;
    var mediaQueryMobile = 569;
    var menuOpened = !1;
    var overlayOpened = !1;
    var menuMobileTriggerEvent = new CustomEvent('menuMobileTrigged');
    var resizeTimer_; var resizeTimer; var hidingTimer; var isSplitMenu = !1;
    var mainNavMenu; var mainNavWrapper; var isMobileTransparent = !1;
    var isMobileParallaxAllowed = SiteParameters.mobile_parallax_allowed;
    var loadedFonts = new Array();
    var already_font = !1;
    var checkVisible = function (elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    };
    var initBox = function () {
        var bodyBorderDiv = document.querySelectorAll('.body-borders .top-border');
        bodyBorderDiv.length ? bodyBorder = outerHeight(bodyBorderDiv[0]) : bodyBorder = 0, UNCODE.isRTL = classie.hasClass(document.body, 'rtl') ? !0 : !1, UNCODE.bodyBorder = bodyBorder, UNCODE.isFullPage = classie.hasClass(document.body, 'uncode-fullpage-slide') && !(UNCODE.isMobile && classie.hasClass(document.body, 'uncode-fp-mobile-disable') && window.innerWidth < 570), UNCODE.isFullPageSnap = classie.hasClass(document.body, 'uncode-scroll-snap'), bodyBorder != 0 && (UNCODE.isFullPage || (document.documentElement.style.paddingTop = bodyBorder + 'px'), wheight = (window.innerHeight || document.documentElement.clientHeight) - bodyBorder * 2);
        if (!isMobile && !scrollbarWidth) {
            var scrollDiv = document.createElement('div');
            scrollDiv.className = 'scrollbar-measure';
            var dombody = document.body;
            dombody != null && (dombody.appendChild(scrollDiv), scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth, dombody.removeChild(scrollDiv));
        }
        isMobile || forEachElement('.box-container', function (el, i) {
            if (!classie.hasClass(el, 'limit-width')) {
                var elWidth = outerWidth(el);
                var newWidth = 12 * Math.ceil((wwidth - scrollbarWidth) / 12);
                boxWidth = newWidth - bodyBorder * 2, boxLeft = (wwidth - boxWidth - scrollbarWidth) / 2, el.style.width = boxWidth + 'px', UNCODE.isRTL ? el.style.marginRight = boxLeft + 'px' : el.style.marginLeft = boxLeft + 'px', mainmenu != undefined && mainmenu[0] != undefined && (mainmenu[0].style.width = boxWidth + 'px');
            }
        }), classie.hasClass(document.body, 'menu-mobile-transparent') && (isMobileTransparent = !0), isMobileTransparent || (wwidth > mediaQuery && classie.hasClass(document.body, 'menu-force-opacity') && classie.removeClass(document.body, 'menu-force-opacity'), wwidth < mediaQuery && !classie.hasClass(document.body, 'menu-force-opacity') && classie.addClass(document.body, 'menu-force-opacity'));
    };
    var fixMenuHeight = function () {
        classie.hasClass(document.body, 'vmenu') || (noScroll = !0), menuwrapper = document.querySelectorAll('.menu-wrapper'), masthead = document.getElementById('masthead'), classie.hasClass(document.body, 'hmenu-center-split') ? mastheadMobile = new Array(document.getElementById('logo-container-mobile'), document.getElementById('main-logo').parentNode) : mastheadMobile = document.getElementById('logo-container-mobile'), menuhide = document.querySelector('#masthead .menu-hide, .main-header .menu-hide, #masthead .menu-hide-vertical'), menusticky = document.querySelectorAll('.menu-sticky, .menu-sticky-vertical'), transmenuel = document.querySelectorAll('.menu-transparent:not(.vmenu-container)');
        var menuItemsButton = document.querySelectorAll('.menu-item-button .menu-btn-table');
        logo = document.querySelector('#main-logo'), logo != undefined && (logolink = logo.firstElementChild || logo.firstChild), logolink != undefined && (logoMinScale = logolink.getAttribute('data-minheight')), logoel = document.querySelectorAll('.menu-shrink .logo-container'), mainmenu = document.querySelectorAll('.vmenu .vmenu-container, .menu-primary .menu-container');
        if (classie.hasClass(document.body, 'hmenu-center')) {
            var mainmenucenter = document.querySelectorAll('.hmenu-center .menu-container-mobile');
            var first_array = Array.prototype.slice.call(mainmenu);
            var second_array = Array.prototype.slice.call(mainmenucenter);
            mainmenu = first_array.concat(second_array);
        }
        secmenu = document.querySelectorAll('.menu-secondary'), calculateMenuHeight(!0);
        for (var k = 0; k < menuItemsButton.length; k++) {
            var a_item = menuItemsButton[k].parentNode;
            var buttonHeight = outerHeight(menuItemsButton[k]);
            a_item.style.height = buttonHeight + 'px';
        }
        classie.hasClass(document.body, 'hmenu-center-split') && (mainNavMenu = document.querySelector('#masthead .navbar-main .menu-primary-inner'), mainNavWrapper = document.querySelector('#masthead > .menu-container'), isSplitMenu = !0), fixMenu();
    };
    var calculateMenuHeight = function (first) {
        menuHeight = transmenuHeight = secmenuHeight = 0, mastheadMobile != null && (mastheadMobile.length === 2 ? wwidth > mediaQuery ? (UNCODE.menuMobileHeight = outerHeight(mastheadMobile[1]), mastheadMobilePaddingTop = parseFloat(getComputedStyle(mastheadMobile[1]).paddingTop)) : (UNCODE.menuMobileHeight = outerHeight(mastheadMobile[0]), mastheadMobilePaddingTop = parseFloat(getComputedStyle(mastheadMobile[0]).paddingTop)) : (UNCODE.menuMobileHeight = outerHeight(mastheadMobile), mastheadMobilePaddingTop = parseFloat(getComputedStyle(mastheadMobile).paddingTop)));
        if (wwidth > mediaQuery) {
            for (var i = 0; i < mainmenu.length; i++) {
                if (classie.hasClass(document.body, 'hmenu-center') && i === 1) continue;
                classie.hasClass(masthead, 'masthead-vertical') ? menuHeight = 0 : menuHeight += outerHeight(mainmenu[i]), isIE && first && getDivChildren(mainmenu[i], '.menu-horizontal-inner', function (innerMenu, i) {
                    innerMenu.style.height = menuHeight + 'px';
                }), classie.hasClass(mainmenu[i].parentNode, 'menu-transparent') && (transmenuHeight += menuHeight);
            }
            for (var j = 0; j < secmenu.length; j++) secmenuHeight += outerHeight(secmenu[j]);
            menuHeight += secmenuHeight;
        } else {
            menuHeight = UNCODE.menuMobileHeight;
            if (isMobileTransparent) { for (var i = 0; i < mainmenu.length; i++) classie.hasClass(mainmenu[i].parentNode, 'menu-transparent') && (transmenuHeight += menuHeight); }
            var search_box = document.querySelectorAll('.search-icon .drop-menu');
            for (var i = 0; i < search_box.length; i++) search_box[i].removeAttribute('style');
        }
        classie.hasClass(document.documentElement, 'admin-mode') && (adminBar = document.getElementById('wpadminbar'), wwidth > 600 ? adminBar != null ? adminBarHeight = outerHeight(adminBar) : wwidth > 782 ? adminBarHeight = 32 : adminBarHeight = 46 : adminBarHeight = 0), UNCODE.adminBarHeight = adminBarHeight, UNCODE.menuHeight = menuHeight, UNCODE.isFullPage && (UNCODE.adminBarHeight > 0 && (document.body.style.marginTop = (UNCODE.adminBarHeight + UNCODE.bodyBorder) * -1 + 'px'), document.body.style.paddingTop = UNCODE.adminBarHeight + UNCODE.bodyBorder + 'px'), masthead != undefined && classie.hasClass(masthead, 'menu-transparent') && wwidth > mediaQuery && (masthead.parentNode.style.height = '0px');
        if (typeof menuhide === 'object' && menuhide != null && mainmenu[0] != undefined) {
            var sticky_element = typeof mainmenu.item === 'undefined' ? wwidth > mediaQuery ? mainmenu[0] : mainmenu[1] : mainmenu[0];
            sticky_element.style.top != '' && (sticky_element.style.top = UNCODE.bodyBorder + 'px');
        }
    };
    var centerSplitMenu = function () {
        if (wwidth > mediaQuery && mainNavMenu) {
            if (mainNavMenu.style.left == '') {
                mainNavMenu.style.left = '0px';
                var logoPos = logo.parentNode.getBoundingClientRect();
                mainNavMenu.style.left = wwidth / 2 - (logoPos.left + logoPos.width / 2) + 'px', mainNavWrapper.style.opacity = '1';
            }
            mainNavWrapper.style.opacity = '1';
        }
    };
    var initHeader = function () {
        UNCODE.adaptive(), headerHeight('.header-wrapper'), parallaxHeaders = document.querySelectorAll('.header-parallax > .header-bg-wrapper'), header = document.querySelectorAll('.header-wrapper.header-uncode-block, .header-wrapper.header-revslider, .header-wrapper.header-layerslider, .header-basic .header-wrapper, .header-uncode-block > .row-container:first-child > .row > .row-inner > .col-lg-12 > .uncol, .header-uncode-block .uncode-slider .owl-carousel > .row-container:first-child .column_child .uncoltable'), headerWithOpacity = document.querySelectorAll('.header-scroll-opacity'), pageHeader = document.getElementById('page-header'), typeof pageHeader === 'object' && pageHeader !== null && (headerVideo = pageHeader.querySelectorAll('.uncode-video-container'), kenburnsHeaders = pageHeader.querySelectorAll('.with-kburns > .header-bg-wrapper'), backwashHeaders = pageHeader.querySelectorAll('.with-zoomout > .header-bg-wrapper'), headerVideo.length && classie.addClass(pageHeader, 'has-video'));
        if (pageHeader != undefined) {
            var backs = pageHeader.querySelectorAll('.header-bg');
            var backsCarousel = pageHeader.querySelectorAll('.header-uncode-block .background-inner');
            var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â€œâ€â€˜â€™]))/ig;
            if (backs.length == 0 && backsCarousel.length == 0) pageHeader.setAttribute('data-imgready', 'true');
            else if (backsCarousel.length) {
                for (var j = 0; j < backsCarousel.length; j++) {
                    if (j == 0) {
                        if (!backsCarousel[j].style.backgroundImage || backsCarousel[j].style.backgroundImage === void 0) pageHeader.setAttribute('data-imgready', 'true');
                        else {
                            var url = backsCarousel[j].style.backgroundImage.match(uri_pattern);
                            var image = new Image();
                            image.onload = function () {
                                pageHeader.setAttribute('data-imgready', 'true');
                            }, image.src = url[0];
                        }
                    }
                }
            } else {
                for (var i = 0; i < backs.length; i++) {
                    if (i == 0) {
                        if (!backs[i].style.backgroundImage || backs[i].style.backgroundImage === void 0) pageHeader.setAttribute('data-imgready', 'true');
                        else {
                            var url = backs[i].style.backgroundImage.match(uri_pattern);
                            var image = new Image();
                            image.onload = function () {
                                pageHeader.setAttribute('data-imgready', 'true');
                            }, image.src = url[0];
                        }
                    }
                }
            }
        }
        if (masthead != undefined && !classie.hasClass(masthead, 'masthead-vertical')) {
            if (header.length) {
                masthead.parentNode.style.height = menuHeight + 'px', menuwrapper[0] != undefined && classie.addClass(menuwrapper[0], 'with-header');
                for (var j = 0; j < header.length; j++) {
                    var headerel = header[j];
                    var closestStyle = getClosest(headerel, 'style-light');
                    closestStyle != null && classie.hasClass(closestStyle, 'style-light') ? switchColorsMenu(0, 'light') : getClosest(headerel, 'style-dark') != null ? (classie.addClass(getClosest(headerel, 'style-dark'), 'test-class'), switchColorsMenu(0, 'dark')) : masthead.style.opacity !== 1 && (masthead.style.opacity = 1);
                    if (classie.hasClass(masthead, 'menu-transparent')) {
                        if (isMobileTransparent || wwidth > mediaQuery) {
                            masthead.parentNode.style.height = '0px';
                            if (classie.hasClass(masthead, 'menu-add-padding')) {
                                var headerBlock = getClosest(headerel, 'header-uncode-block');
                                if (headerBlock != null) {
                                    var innerRows = headerel.querySelectorAll('.column_parent > .uncol > .uncoltable > .uncell > .uncont, .uncode-slider .column_child > .uncol > .uncoltable > .uncell > .uncont');
                                    for (var k = 0; k < innerRows.length; k++) innerRows[k] != undefined && (wwidth > mediaQuery ? innerRows[k].style.paddingTop = transmenuHeight + 'px' : innerRows[k].style.paddingTop = transmenuHeight - mastheadMobilePaddingTop + 'px');
                                } else {
                                    getDivChildren(headerel, '.header-content', function (headerContent, i) {
                                        wwidth > mediaQuery ? headerContent.style.paddingTop = transmenuHeight + 'px' : headerContent.style.paddingTop = transmenuHeight - mastheadMobilePaddingTop + 'px';
                                    });
                                }
                            }
                        }
                    }
                    if (classie.hasClass(headerel, 'uncoltable')) break;
                }
            } else menuwrapper[0] != undefined && classie.addClass(menuwrapper[0], 'no-header'), classie.removeClass(masthead, 'menu-transparent'), transmenuHeight = 0, isMobileTransparent = !1;
        } else isMobileTransparent = !1;
        transmenuel.length || (isMobileTransparent = !1), bodyTop = document.documentElement.scrollTop || document.body.scrollTop, UNCODE.bodyTop = bodyTop, classie.hasClass(document.body, 'vmenu') || initBox(), scrollFunction(), showHideScrollup(bodyTop);
        if (UNCODE.isMobile) {
            var eventName = 'loadedmetadata';
            eventName = eventName.replace(/^on/, '');
            var elt = document.createElement('video'[eventName]);
            var eventIsSupported = 'on' + eventName in elt;
            elt = null, eventIsSupported || classie.addClass(document.body, 'video-not-supported');
        }
    };
    var initRow = function (currentRow) {
        function word_for_lines (event, $parent_el) {
            if (typeof $parent_el === 'undefined' || $parent_el === null) $parent_el = document.body;
            var $headings = $parent_el.querySelectorAll('.heading-text');
            for (var head_k = 0; head_k < $headings.length; head_k++) {
                var $heading = $headings[head_k];
                var heading_cont = $heading.innerHTML;
                var $row = $heading.closest('.row-parent');
                var $owl_carousel = $heading.closest('.owl-carousel-wrapper');
                var $owl_item = $heading.closest('.owl-item');
                var $words = $heading.querySelectorAll('.split-word');
                var setWrap;
                if (!$words.length && $owl_item !== null) continue;
                if ($owl_carousel === null && typeof event !== 'undefined' && event !== 'resize' && event !== !1) continue;
                if ($owl_carousel !== null) { if ($owl_item === null || $owl_item !== null && classie.hasClass($owl_item, 'active') && $owl_item.getAttribute('data-index') !== '1' || $owl_item !== null && classie.hasClass($owl_item, 'active') && $owl_item.getAttribute('data-index') === '1' && $owl_item.getAttribute('data-already-reached') === 'true') continue; }
                $heading.innerHTML = heading_cont, $words = $heading.querySelectorAll('.split-word');
                var lineArray = [];
                var lineIndex = 0;
                var lineStart = !0;
                var lineEnd = !1;
                var $text_highlight = $heading.querySelectorAll('.heading-text-highlight');
                var $line_wraps = $heading.querySelectorAll('.heading-line-wrap');
                if ($line_wraps.length && typeof event === 'undefined') continue;
                var lettering = function () {
                    var $wraps = $parent_el.querySelectorAll('.animate_inner_when_almost_visible.curtain, .animate_inner_when_almost_visible.curtain-words, .animate_inner_when_almost_visible.typewriter, .animate_inner_when_almost_visible.single-curtain, .animate_inner_when_almost_visible.single-slide, .animate_inner_when_almost_visible.single-slide-opposite');
                    for (var i = 0; i < $wraps.length; i++) {
                        var $wrap = $wraps[i];
                        var $lines = $wrap.querySelectorAll('.heading-line-wrap');
                        var $words = $wrap.querySelectorAll('.split-word');
                        var containerDelay = $wrap.getAttribute('data-delay');
                        var containerSpeed = $wrap.getAttribute('data-speed');
                        var containerSpeed_val = typeof containerSpeed !== 'undefined' && containerSpeed !== null ? parseFloat(containerSpeed) : 400;
                        var containerInterval = typeof $wrap.getAttribute('data-interval') !== 'undefined' && $wrap.getAttribute('data-interval') !== null ? $wrap.getAttribute('data-interval') : 0;
                        var delayAttr = containerDelay != undefined ? containerDelay : 0;
                        if (classie.hasClass($wrap, 'already-animated')) break;
                        if (classie.hasClass($wrap, 'curtain')) {
                            for (var il = 0; il < $lines.length; il++) {
                                var $line = $lines[il];
                                var $spans = $line.querySelectorAll('.split-word-inner');
                                for (var is = 0; is < $spans.length; is++) {
                                    var $span = $spans[is];
                                    $span.setAttribute('data-delay', parseFloat(delayAttr) + (parseFloat(containerInterval) + 100) * il), typeof containerSpeed_val !== 'undefined' && $span.setAttribute('data-speed', containerSpeed_val), classie.addClass($span, 'animate_when_parent_almost_visible'), classie.addClass($span, 'text-bottom-t-top'), is + 1 === $spans.length && il + 1 === $lines.length && classie.addClass($span, 'anim-tot-checker');
                                }
                            }
                        } else if (classie.hasClass($wrap, 'single-curtain')) {
                            var $spans = $wrap.querySelectorAll('.split-char');
                            for (var is = 0; is < $spans.length; is++) {
                                var $span = $spans[is];
                                $span.setAttribute('data-delay', parseFloat(delayAttr) + (parseFloat(containerInterval) + 20) * is), typeof containerSpeed_val !== 'undefined' && $span.setAttribute('data-speed', containerSpeed_val), classie.addClass($span, 'animate_when_parent_almost_visible'), classie.addClass($span, 'text-bottom-t-top'), is + 1 == $spans.length && classie.addClass($span, 'anim-tot-checker');
                            }
                        } else if (classie.hasClass($wrap, 'typewriter')) {
                            var $spans = $wrap.querySelectorAll('.split-char');
                            for (var is = 0; is < $spans.length; is++) {
                                var $span = $spans[is];
                                $span.setAttribute('data-delay', parseFloat(delayAttr) + (parseFloat(containerInterval) + 20) * is), typeof containerSpeed_val !== 'undefined' && $span.setAttribute('data-speed', containerSpeed_val), classie.addClass($span, 'animate_when_parent_almost_visible'), classie.addClass($span, 'typewriter'), is + 1 == $spans.length && classie.addClass($span, 'anim-tot-checker');
                            }
                        } else if (classie.hasClass($wrap, 'single-slide')) {
                            var $spans = $wrap.querySelectorAll('.split-word-inner');
                            for (var is = 0; is < $spans.length; is++) {
                                var $span = $spans[is];
                                $span.setAttribute('data-delay', parseFloat(delayAttr) + (parseFloat(containerInterval) + 50) * is), typeof containerSpeed_val !== 'undefined' && $span.setAttribute('data-speed', containerSpeed_val), classie.addClass($span, 'animate_when_parent_almost_visible'), classie.hasClass(document.body, 'rtl') ? classie.addClass($span, 'text-left-t-right') : classie.addClass($span, 'text-right-t-left'), is + 1 == $spans.length && classie.addClass($span, 'anim-tot-checker');
                            }
                        } else if (classie.hasClass($wrap, 'single-slide-opposite')) {
                            var $spans = $wrap.querySelectorAll('.split-word-inner');
                            for (var is = 0; is < $spans.length; is++) {
                                var $span = $spans[is];
                                $span.setAttribute('data-delay', parseFloat(delayAttr) + (parseFloat(containerInterval) + 50) * is), typeof containerSpeed_val !== 'undefined' && $span.setAttribute('data-speed', containerSpeed_val), classie.addClass($span, 'animate_when_parent_almost_visible'), classie.hasClass(document.body, 'rtl') ? classie.addClass($span, 'text-left-t-right') : classie.addClass($span, 'text-right-t-left'), is + 1 == $spans.length && classie.addClass($span, 'anim-tot-checker');
                            }
                        } else if (classie.hasClass($wrap, 'curtain-words')) {
                            var $spans = $wrap.querySelectorAll('.split-word-inner');
                            for (var is = 0; is < $spans.length; is++) {
                                var $span = $spans[is];
                                $span.setAttribute('data-delay', parseFloat(delayAttr) + (parseFloat(containerInterval) + 50) * is), typeof containerSpeed_val !== 'undefined' && $span.setAttribute('data-speed', containerSpeed_val), classie.addClass($span, 'animate_when_parent_almost_visible'), classie.addClass($span, 'text-bottom-t-top'), is + 1 == $spans.length && classie.addClass($span, 'anim-tot-checker');
                            }
                        }
                    }
                };
                var removeOldLines = function () {
                    for (var wrap_k = 0; wrap_k < $line_wraps.length; wrap_k++) {
                        var $line_wrap = $line_wraps[wrap_k];
                        var $parent_wrap = $line_wrap.parentNode;
                        while ($line_wrap.firstChild) $parent_wrap.insertBefore($line_wrap.firstChild, $line_wrap);
                        $parent_wrap.removeChild($line_wrap);
                    }
                };
                var createHighlightSpans = function () {
                    for (var high_k = 0; high_k < $text_highlight.length; high_k++) {
                        var $highlight = $text_highlight[high_k];
                        var atts = $highlight.getAttribute('data-atts');
                        var objAtts; var styleEl = '';
                        var classEl = '';
                        var animation = !1;
                        var hexRe = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
                        var $h_words = $highlight.querySelectorAll('.split-word');
                        if (typeof atts !== 'undefined' && atts != '') {
                            objAtts = JSON.parse(atts), typeof objAtts.bg !== 'undefined' && (hexRe.test(objAtts.bg) ? styleEl += 'background-color:' + objAtts.bg + ';' : classEl += ' ' + objAtts.bg);
                            if (typeof objAtts.color !== 'undefined') {
                                if (hexRe.test(objAtts.color)) styleEl += 'color:' + objAtts.color + ';';
                                else var classChild = objAtts.color;
                            }
                            typeof objAtts.height !== 'undefined' && (styleEl += 'height:' + objAtts.height + ';'), typeof objAtts.offset !== 'undefined' && (styleEl += 'bottom:' + objAtts.offset + ';'), typeof objAtts.opacity !== 'undefined' && (styleEl += 'opacity:' + objAtts.opacity + ';'), objAtts.animated == 'yes' && (animation = !0);
                        }
                        for (var h_words_k = 0; h_words_k < $h_words.length; h_words_k++) {
                            var $word = $h_words[h_words_k];
                            var $new_el = document.createElement('span');
                            typeof classChild !== 'undefined' && classie.addClass($word, objAtts.color), h_words_k === 0 ? classie.addClass($word, 'first-highlight') : h_words_k + 1 === $h_words.length && classie.addClass($word, 'last-highlight'), $new_el.className = 'heading-text-highlight-inner' + classEl, styleEl !== '' && $new_el.setAttribute('style', styleEl), animation && $new_el.setAttribute('data-animated', 'yes'), $word.appendChild($new_el);
                        }
                        var $parent_highlight = $highlight.parentNode;
                        while ($highlight.firstChild) $parent_highlight.insertBefore($highlight.firstChild, $highlight);
                        $parent_highlight.removeChild($highlight);
                    }
                };
                var createNewLines = function () {
                    for (var word_k = 0; word_k < $words.length; word_k++) {
                        var $word = $words[word_k];
                        var top = $word.offsetTop;
                        var elH = $word.offsetHeight;
                        var $next = typeof $words[word_k + 1] !== 'undefined' ? $words[word_k + 1] : null;
                        var nextTop = $next !== null ? $next.offsetTop : null;
                        lineStart ? (lineArray[lineIndex] = [word_k], nextTop !== null && nextTop > top + elH / 2 ? (lineArray[lineIndex].push(word_k), lineIndex++, lineStart = !0) : lineStart = !1) : nextTop !== null && nextTop > top + elH / 2 ? (lineArray[lineIndex].push(word_k), lineIndex++, lineStart = !0) : nextTop === null && lineArray[lineIndex].push(word_k);
                    }
                    for (var i = 0; i < lineArray.length; i++) {
                        var start = lineArray[i][0];
                        var end = lineArray[i][1] + 1;
                        var spanWrap = document.createElement('span');
                        spanWrap.className = 'heading-line-wrap';
                        if (!end) window.wrap(spanWrap, $words[start]);
                        else {
                            for (var _i = start; _i < end; _i++) typeof $words[_i] !== 'undefined' && $words[_i] !== null && (classie.addClass($words[_i], 'heading-temp'), $words[_i].style.zIndex = end - _i);
                            var $towrap = $heading.querySelectorAll('.heading-temp');
                            if (typeof $towrap[0] !== 'undefined' && $towrap[0] !== null) {
                                window.wrapAll(spanWrap, $towrap);
                                for (var _i = 0; _i < $towrap.length; _i++) classie.removeClass($towrap[_i], 'heading-temp');
                            }
                        }
                        i + 1 == lineArray.length && classie.addClass($row, 'loaded-split-word'), classie.addClass($heading, 'heading-lined');
                    }
                    lettering();
                };
                removeOldLines(), createHighlightSpans(), createNewLines(), $parent_el.addEventListener('owl-carousel-changed', function () {
                    removeOldLines(), createHighlightSpans(), createNewLines();
                }), event !== 'resize' && document.body.dispatchEvent(new CustomEvent('uncode_waypoints'));
            }
        }
        UNCODE.adaptive();
        var el = currentRow.parentNode.parentNode.getAttribute('data-parent') == 'true' ? currentRow.parentNode : currentRow.parentNode.parentNode;
        var rowParent = el.parentNode;
        var rowInner = currentRow.parentNode;
        var percentHeight = el.getAttribute('data-height-ratio');
        var minHeight = el.getAttribute('data-minheight');
        var calculateHeight; var calculatePadding = 0;
        var isHeader = !1;
        var isFirst = !1;
        var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â€œâ€â€˜â€™]))/ig;
        getDivChildren(el.parentNode, '.column_parent, .column_child', function (obj, i, total) {
            obj.className.indexOf('col-md-') > -1 && classie.addClass(obj.parentNode, 'cols-md-responsive'), obj.className.indexOf('col-sm-') > -1 && obj.className.indexOf('col-sm-clear') == -1 && classie.addClass(obj.parentNode, 'cols-sm-responsive');
        }), setRowHeight(el);
        var elements = 0;
        getDivChildren(el, '.row-internal .background-inner', function (obj, i, total) {
            elements++;
            if (i == 0) {
                if (!obj.style.backgroundImage || obj.style.backgroundImage === void 0) el.setAttribute('data-imgready', 'true'), el.dispatchEvent(new CustomEvent('imgLoaded'));
                else {
                    var url = obj.style.backgroundImage.match(uri_pattern);
                    var image = new Image();
                    image.onload = function () {
                        el.setAttribute('data-imgready', 'true'), el.dispatchEvent(new CustomEvent('imgLoaded'));
                    }, image.src = url[0];
                }
            }
        }), elements == 0 && el.setAttribute('data-imgready', 'true'), UNCODE.isFullPage || (bodyTop = document.documentElement.scrollTop || document.body.scrollTop, kenburnsRows = el.parentNode.parentNode.querySelectorAll('.with-kburns > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'), kenburnsCols = el.querySelectorAll('.with-kburns > .column-background > .background-wrapper'), backwashRows = el.parentNode.parentNode.querySelectorAll('.with-zoomout > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'), backwashCols = el.querySelectorAll('.with-zoomout > .column-background > .background-wrapper'), isMobileParallaxAllowed || !UNCODE.isMobile ? (parallaxRows = el.parentNode.parentNode.querySelectorAll('.with-parallax > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'), parallaxCols = el.querySelectorAll('.with-parallax > .column-background > .background-wrapper'), visibleRows = el.parentNode.parentNode, parallaxRowCol(bodyTop), visibleRowCol(bodyTop)) : UNCODE.isMobile && (kenburnsHeader(bodyTop), kenburnsRowCol(bodyTop), backwashHeader(bodyTop), backwashRowCol(bodyTop))), shapeDivider();
        var wrapLinesWw = wwidth;
        var setWrap; var $h_markup = document.body.querySelectorAll('.font-obs');
        var fontArr = new Array();
        for (var i = 0; i < $h_markup.length; i++) {
            var font_to_check = $h_markup[i].getAttribute('data-font');
            if (font_to_check === null) word_for_lines(!1, el);
            else {
                var font_weight = $h_markup[i].getAttribute('data-weight');
                var font_style = $h_markup[i].getAttribute('data-style');
                font_weight === null && (font_weight = 'normal'), font_style === null && (font_style = 'normal'), font_to_check = font_to_check.split(',');
                var font_val = font_to_check[0].replace(/['"]+/g, '');
                var font_key = "'" + font_val + '_' + font_weight + '_' + font_style + "'";
                fontArr.indexOf(font_val + '_' + font_weight) === -1 && (fontArr[font_key] = {
                    family: font_val,
                    weight: font_weight,
                    style: font_style
                });
            }
        }
        var counter = 0;
        for (var key in fontArr) {
            if (fontArr.hasOwnProperty(key)) {
                var font = new FontFaceObserver(fontArr[key].family, {
                    weight: fontArr[key].weight,
                    style: fontArr[key].style
                });
                font.load(null, 1e4).then(function (font) {
                    counter++, counter == Object.keys(fontArr).length && (already_font = !0, requestTimeout(function () {
                        word_for_lines(!1, el);
                    }, 10));
                }, function (error) {
                    word_for_lines(!1, el);
                });
            }
        }
        el.addEventListener('owl-carousel-initialized', function () {
            word_for_lines('owl-carousel-initialized', el);
        }), window.addEventListener('resize', function () {
            wwidth != wrapLinesWw && (clearRequestTimeout(setWrap), setWrap = requestTimeout(function () {
                wrapLinesWw = wwidth, word_for_lines('resize');
            }, 100));
        }), scrollFunction();
        if (uaInfo.is('chrome')) {
            var videos = document.querySelectorAll('.wp-video-shortcode');
            for (var i = 0; i < videos.length; i++) {
                var video = videos[i];
                if (typeof video.getAttribute('autoplay') !== 'undefined' && video.getAttribute('autoplay') !== null && (typeof video.getAttribute('muted') === 'undefined' || video.getAttribute('muted') === null)) {
                    video.oncanplay = function (e) {
                        video.muted = !0, video.play();
                    };
                    break;
                }
            }
        }
    };
    var setRowHeight = function (container, forced, resized) {
        var currentTallest = 0;
        var percentHeight = 0;
        var minHeight = 0;
        var el; var child; var hasSubCols = !1;
        container.length == undefined && (container = [container]);
        for (var i = 0; i < container.length; i++) {
            var el = container[i];
            var $row = el;
            var totalHeight = 0;
            var colsArray = new Array();
            var calculatePadding = 0;
            var $rowParent = $row.parentNode;
            var isHeader = !1;
            var isFirst = !1;
            $row.oversized = !1, percentHeight = el.getAttribute('data-height-ratio'), minHeight = el.getAttribute('data-minheight'), child = el.firstElementChild || el.firstChild;
            var childHeight = outerHeight(child);
            if (!!percentHeight || !!minHeight || forced || isIE && classie.hasClass(el, 'unequal')) {
                child.style.height = '', percentHeight ? percentHeight == 'full' ? currentTallest = parseInt(wheight) : currentTallest = parseInt(wheight * percentHeight / 100) : currentTallest = el.clientHeight, !!minHeight && (currentTallest < minHeight || currentTallest == undefined) && (currentTallest = parseInt(minHeight));
                if (getClosest(el, 'header-uncode-block') != null) el.setAttribute('data-row-header', 'true'), isHeader = !0;
                else if (pageHeader == null) {
                    var prevRow = $rowParent.previousSibling;
                    prevRow != null && prevRow.innerText == 'UNCODE.initHeader();' && (isFirst = !0);
                }
                if (classie.hasClass(el, 'row-slider')) {
                    percentHeight = el.getAttribute('data-height-ratio'), minHeight = el.getAttribute('data-minheight'), percentHeight == 'full' ? currentTallest = parseInt(wheight) : currentTallest = parseInt(wheight * percentHeight / 100);
                    var computedStyleRow = getComputedStyle(el);
                    var computedStyleRowParent = getComputedStyle($rowParent);
                    calculatePadding -= parseFloat(computedStyleRow.paddingTop) + parseFloat(computedStyleRowParent.paddingTop), calculatePadding -= parseFloat(computedStyleRow.paddingBottom) + parseFloat(computedStyleRowParent.paddingBottom), isHeader || isFirst ? (isMobileTransparent || wwidth > mediaQuery ? currentTallest -= menuHeight - transmenuHeight : currentTallest -= menuHeight - secmenuHeight, currentTallest += calculatePadding) : isMobileTransparent || wwidth > mediaQuery ? currentTallest += calculatePadding : currentTallest = 'auto', getDivChildren(el, '.owl-carousel', function (owl, i) {
                        owl.style.height = currentTallest == 'auto' ? 'auto' : currentTallest + 'px', isIE && getDivChildren(owl, '.owl-stage', function (owlIn, i) {
                            owlIn.style.height = currentTallest == 'auto' ? '100%' : currentTallest + 'px';
                        });
                    });
                    if (UNCODE.isFullPageSnap || classie.hasClass(masthead, 'menu-transparent')) continue;
                    classie.hasClass(document.body, 'uncode-fp-menu-hide') && ($rowParent.parentNode.style.paddingTop = menuHeight + 'px');
                } else if (isHeader || isFirst || UNCODE.isFullPage) {
                    UNCODE.isFullPage && !classie.hasClass(masthead, 'menu-transparent') && classie.hasClass(document.body, 'uncode-fp-menu-hide') && !isHeader && !isFirst || (isMobileTransparent || wwidth > mediaQuery ? currentTallest -= menuHeight - transmenuHeight : currentTallest -= menuHeight - secmenuHeight);
                    if (UNCODE.isFullPage && classie.hasClass(document.body, 'uncode-scroll-safe-padding') && classie.hasClass(masthead, 'menu-transparent') && !classie.hasClass(document.body, 'uncode-fp-menu-hide')) {
                        var safeMenuHeight = parseFloat(document.body.getAttribute('data-additional-padding')) + parseFloat(menuHeight);
                        if ((' ' + child.parentNode.className + ' ').replace(/[\n\t]/g, ' ').indexOf('-top-padding ') < 0 || classie.hasClass(child.parentNode, 'single-top-padding')) classie.addClass(child.parentNode, 'fp-safe-padding-top'), child.parentNode.style.paddingTop = safeMenuHeight + 'px';
                        if ((' ' + child.parentNode.className + ' ').replace(/[\n\t]/g, ' ').indexOf('-bottom-padding ') < 0 || classie.hasClass(child.parentNode, 'single-bottom-padding')) classie.addClass(child.parentNode, 'fp-safe-padding-bottom'), child.parentNode.style.paddingBottom = safeMenuHeight + 'px';
                    }!classie.hasClass(masthead, 'menu-transparent') && classie.hasClass(document.body, 'uncode-fp-menu-hide') && (isFirst || isHeader) && ($rowParent.parentNode.style.paddingTop = menuHeight + 'px');
                    var computedStyleRow = getComputedStyle(el);
                    var computedStyleRowParent = getComputedStyle($rowParent);
                    calculatePadding -= parseFloat(computedStyleRow.paddingTop) + parseFloat(computedStyleRowParent.paddingTop), calculatePadding -= parseFloat(computedStyleRow.paddingBottom) + parseFloat(computedStyleRowParent.paddingBottom), currentTallest += calculatePadding;
                } else {
                    var computedStyleRow = getComputedStyle(el);
                    var computedStyleRowParent = getComputedStyle($rowParent);
                    calculatePadding -= parseFloat(computedStyleRow.paddingTop) + parseFloat(computedStyleRowParent.paddingTop), calculatePadding -= parseFloat(computedStyleRow.paddingBottom) + parseFloat(computedStyleRowParent.paddingBottom), wwidth > mediaQuery ? currentTallest += calculatePadding : currentTallest = 'auto';
                }
                UNCODE.isFullPage && (currentTallest -= UNCODE.adminBarHeight), !!minHeight && (currentTallest < minHeight || currentTallest == 'auto') && (currentTallest = parseInt(minHeight)), child.style.height = currentTallest == 'auto' ? 'auto' : currentTallest + 'px';
            } else currentTallest = 0;
            if (wwidth > mediaQuery) {
                getDivChildren(el, '.column_parent', function (col, i, total) {
                    var $col = col;
                    var $colHeight = 0;
                    var $colDiff = 0;
                    var $colPercDiff = 100;
                    $col.oversized = !1, $col.forceHeight = currentTallest, currentTallest = child.clientHeight, (isHeader || isFirst) && currentTallest != 'auto' && (currentTallest -= transmenuHeight);
                    var getFirstCol = null;
                    var getMargin = 0;
                    var getSubMargin = 0;
                    getDivChildren(col, '.row-child', function (obj, i, total) {
                        var $colChild = obj;
                        var $colParent = $colChild.parentNode;
                        var computedStyleCol = getComputedStyle($colParent);
                        parseFloat(computedStyleCol.marginTop), getSubMargin += parseFloat(computedStyleCol.marginTop);
                    }), currentTallest += getSubMargin, getDivChildren(col, '.row-child', function (obj, i, total) {
                        var $colChild = obj;
                        var $colInner; var $colParent = $colChild.parentNode;
                        var $uncont = $colParent.parentNode;
                        for (var it = 0; it < $colChild.childNodes.length; it++) {
                            if (!classie.hasClass($colChild.childNodes[it], 'uncode-divider-wrap')) {
                                $colInner = $colChild.childNodes[it];
                                break;
                            }
                        }
                        i == 0 && total > 1 && (getFirstCol = $colInner), $colChild.oversized = !1, percentHeight = $colChild.getAttribute('data-height'), minHeight = $colChild.getAttribute('data-minheight');
                        if (percentHeight != null || minHeight != null) {
                            classie.hasClass($colInner, 'uncode-divider-wrap') || ($colInner.style.height = ''), $colParent.style.height = 'auto', $uncont.style.height = '100%', $colChild.removeAttribute('style');
                            var newHeight = percentHeight != null ? Math.ceil(currentTallest * (percentHeight / 100)) : parseInt(minHeight);
                            var computedStyleCol = getComputedStyle($colParent);
                            getMargin = parseFloat(computedStyleCol.marginTop), newHeight -= getMargin, $colPercDiff -= percentHeight != null ? percentHeight : 0;
                            if (currentTallest > newHeight) {
                                var getColHeight = outerHeight($colChild);
                                getColHeight > newHeight ? ($colHeight += getColHeight, $colDiff += getColHeight, $colChild.oversized = !0, $col.oversized = !0, $row.oversized = !0) : ($colHeight += newHeight, classie.hasClass($colInner, 'uncode-divider-wrap') || ($colInner.style.height = newHeight + 'px'));
                            }
                        } else $colHeight += outerHeight($colChild);
                    }), getFirstCol != null && (getFirstCol.style.height = parseFloat(getFirstCol.style.height) - getMargin + 'px'), colsArray.push({
                        colHeight: $colHeight,
                        colDiv: $col
                    }), $col.colDiff = $colDiff, $col.colPercDiff = $colPercDiff;
                });
                if ($row.oversized) {
                    child.style.height = '', colsArray.sort(function (a, b) {
                        return a.colHeight < b.colHeight ? 1 : a.colHeight > b.colHeight ? -1 : 0;
                    });
                    var $totalHeight = 0;
                    colsArray.forEach(function (col) {
                        var $col = col.colDiv;
                        var $colHeight = col.colHeight;
                        getDivChildren($col, '.row-child', function (obj, i, total) {
                            var $colChild = obj;
                            var $colInner = $colChild.children[0];
                            var percentHeight = $colChild.getAttribute('data-height');
                            var $colParent = $colChild.parentNode;
                            var $uncont = $colParent.parentNode;
                            var newHeight;
                            $colHeight = $col.forceHeight - $col.colDiff, percentHeight != null && ($colHeight > 0 ? $col.oversized ? $colChild.oversized || (newHeight = Math.ceil($colHeight * (percentHeight / $col.colPercDiff)), i == total - 1 && total > 1 && ($uncont.style.height = 'auto', $colChild.style.display = 'none', newHeight = outerHeight($col.parentNode) - outerHeight($uncont), $uncont.style.height = '100%', $colChild.style.display = 'table'), newHeight == 0 && (newHeight = Math.ceil($col.forceHeight * (percentHeight / 100))), $colInner.style.height = newHeight + 'px') : ($totalHeight == 0 ? newHeight = Math.ceil($colHeight * (percentHeight / $col.colPercDiff)) : newHeight = Math.ceil($totalHeight * (percentHeight / $col.colPercDiff)), i == total - 1 && total > 1 && ($uncont.style.height = 'auto', $colChild.style.display = 'none', newHeight = outerHeight($col.parentNode) - outerHeight($uncont), $uncont.style.height = '100%', $colChild.style.display = 'table'), $colInner.style.height = newHeight + 'px') : $colChild.oversized && ($totalHeight == 0 ? newHeight = Math.ceil($colHeight * (percentHeight / $col.colPercDiff)) : ($col.colPercDiff == 0 && ($col.colPercDiff = 100), newHeight = Math.ceil($totalHeight * (percentHeight / $col.colPercDiff))), i == total - 1 && total > 1 && ($uncont.style.height = 'auto', $colChild.style.display = 'none', newHeight = outerHeight($col.parentNode) - outerHeight($uncont), $uncont.style.height = '100%', $colChild.style.display = 'table'), $colInner.style.height = newHeight + 'px'));
                        });
                        var uncell = $col.getElementsByClassName('uncell');
                        uncell[0] != undefined && $totalHeight == 0 && ($totalHeight = outerHeight(uncell[0]));
                    });
                }
                isFF && getDivChildren(el, '.uncoltable', function (col, i, total) {
                    col.style.minHeight != '' && (col.style.height = '');
                }), resized && (getDivChildren(el, '.row-child > .row-inner', function (obj, k, total) {
                    if (obj.style.height == '' && wwidth > mediaQueryMobile) {
                        var getStyle = window.getComputedStyle(obj.parentNode, null);
                        var getInnerHeight = parseInt(obj.parentNode.clientHeight) - parseInt(getStyle.paddingTop) - parseInt(getStyle.paddingBottom);
                        obj.style.height = getInnerHeight + 'px';
                    }
                }), getDivChildren(el, '.row-parent > .row-inner', function (obj, k, total) {
                    if (obj.style.height != '') {
                        var getStyle = window.getComputedStyle(obj.parentNode, null);
                        var getInnerHeight = parseInt(obj.parentNode.clientHeight) - parseInt(getStyle.paddingTop) - parseInt(getStyle.paddingBottom);
                        var getTempHeight = parseInt(obj.style.height);
                        getInnerHeight > getTempHeight && (obj.style.height = getInnerHeight + 'px');
                    }
                }));
            } else {
                isFF && getDivChildren(el, '.uncoltable', function (col, i, total) {
                    col.style.minHeight != '' && (col.style.height = '', col.style.height = outerHeight(col.parentNode) + 'px');
                }), isIE && wwidth > mediaQueryMobile && child.style.height == 'auto' && (child.style.height = outerHeight(child) + 'px');
            }
            if (isFF) {
                var sliderColumnFix = document.querySelector('.uncode-slider .row-inner > .column_child:only-child');
                sliderColumnFix != null && (wwidth > mediaQuery ? sliderColumnFix.style.setProperty('height', '') : (sliderColumnFix.style.setProperty('height', ''), sliderColumnFix.style.setProperty('height', outerHeight(sliderColumnFix.parentNode) + 'px', 'important')));
            }
        }
    };
    var headerHeight = function (container) {
        forEachElement(container, function (el, i) {
            var getHeight = el.getAttribute('data-height');
            var newHeight = wheight * getHeight / 100;
            getHeight != 'fixed' && newHeight != 0 && (isMobileTransparent || wwidth > mediaQuery ? newHeight -= menuHeight - transmenuHeight : newHeight -= menuHeight - secmenuHeight, el.style.height = newHeight + 'px');
        });
        if (masthead != undefined) {
            masthead.parentNode.style.height = menuHeight + 'px';
            if (header != undefined && header.length && classie.hasClass(masthead, 'menu-transparent')) {
                if (isMobileTransparent || wwidth > mediaQuery) {
                    masthead.parentNode.style.height = '0px';
                    if (classie.hasClass(masthead, 'menu-add-padding')) {
                        for (var j = 0; j < header.length; j++) {
                            var headerel = header[j];
                            var headerBlock = getClosest(headerel, 'header-uncode-block');
                            if (headerBlock != null) {
                                var innerRows = headerel.querySelectorAll('.column_parent > .uncol > .uncoltable > .uncell > .uncont, .uncode-slider .column_child > .uncol > .uncoltable > .uncell > .uncont');
                                for (var k = 0; k < innerRows.length; k++) innerRows[k] != undefined && (wwidth > mediaQuery ? innerRows[k].style.paddingTop = transmenuHeight + 'px' : innerRows[k].style.paddingTop = transmenuHeight - mastheadMobilePaddingTop + 'px');
                            } else {
                                getDivChildren(headerel, '.header-content', function (headerContent, i) {
                                    wwidth > mediaQuery ? headerContent.style.paddingTop = transmenuHeight + 'px' : headerContent.style.paddingTop = transmenuHeight - mastheadMobilePaddingTop + 'px';
                                });
                            }
                        }
                    }
                }
            }
        }
    };
    var initVideoComponent = function (container, classTarget) {
        getDivChildren(container, classTarget, function (el, i) {
            var width = outerWidth(el);
            var pWidth; var height = outerHeight(el);
            var pHeight; var $tubularPlayer = el.getElementsByTagName('iframe').length == 1 ? el.getElementsByTagName('iframe') : el.getElementsByTagName('video');
            var ratio = el.getAttribute('data-ratio') != null ? Number(el.getAttribute('data-ratio')) : typeof $tubularPlayer[0] !== 'undefined' ? $tubularPlayer[0].getAttribute('data-ratio') : '1.8';
            var heightOffset = 80;
            var widthOffset = heightOffset * ratio;
            $tubularPlayer[0] != undefined && (width / ratio < height ? (pWidth = Math.ceil((height + heightOffset) * ratio), $tubularPlayer[0].style.width = pWidth + widthOffset + 'px', $tubularPlayer[0].style.height = height + heightOffset + 'px', $tubularPlayer[0].style.left = (width - pWidth) / 2 - widthOffset / 2 + 'px', $tubularPlayer[0].style.top = '-' + heightOffset / 2 + 'px', $tubularPlayer[0].style.position = 'absolute') : (pHeight = Math.ceil(width / ratio), $tubularPlayer[0].style.width = width + widthOffset + 'px', $tubularPlayer[0].style.height = pHeight + heightOffset + 'px', $tubularPlayer[0].style.left = '-' + widthOffset / 2 + 'px', $tubularPlayer[0].style.top = (height - pHeight) / 2 - heightOffset / 2 + 'px', $tubularPlayer[0].style.position = 'absolute'));
        });
    };
    var init_overlay = function () {
        function toggleOverlay (btn) {
            Array.prototype.forEach.call(document.querySelectorAll('div.overlay'), function (overlay) {
                if (btn.getAttribute('data-area') == overlay.getAttribute('data-area')) {
                    var container = document.querySelector('div.' + btn.getAttribute('data-container'));
                    var inputField = overlay.querySelector('.search-field');
                    if (classie.has(overlay, 'open')) {
                        window.dispatchEvent(menuClose), overlayOpened = !1, classie.remove(overlay, 'open'), classie.remove(container, 'overlay-open'), classie.add(overlay, 'close'), classie.remove(overlay, 'open-items');
                        var onEndTransitionFn = function (ev) {
                            if (transitionEvent) {
                                if (ev.propertyName !== 'visibility') return;
                                this.removeEventListener(transitionEvent, onEndTransitionFn);
                            }
                            classie.remove(overlay, 'close');
                        };
                        transitionEvent ? overlay.addEventListener(transitionEvent, onEndTransitionFn) : onEndTransitionFn();
                    } else {
                        classie.has(overlay, 'close') || (window.dispatchEvent(menuOpen), overlayOpened = !0, classie.add(overlay, 'open'), classie.add(container, 'overlay-open'), jQuery('body.menu-overlay').length == 0 && setTimeout(function () {
                            inputField.focus();
                        }, 1e3), setTimeout(function () {
                            classie.has(overlay, 'overlay-sequential') && classie.add(overlay, 'open-items');
                        }, 800));
                    }
                }
            });
            if (classie.hasClass(btn, 'search-icon') || classie.hasClass(btn, 'menu-close-search')) return;
            if (classie.hasClass(triggerButton, 'close')) {
                UNCODE.menuOpened = !1, classie.removeClass(triggerButton, 'close'), classie.addClass(triggerButton, 'closing'), Array.prototype.forEach.call(closeButtons, function (closeButton) {
                    classie.hasClass(closeButton, 'menu-close-search') || (classie.removeClass(closeButton, 'close'), classie.addClass(closeButton, 'closing'));
                }), setTimeout(function () {
                    classie.removeClass(triggerButton, 'closing'), triggerButton.style.opacity = 1, Array.prototype.forEach.call(closeButtons, function (closeButton) {
                        classie.hasClass(closeButton, 'menu-close-search') || (classie.removeClass(closeButton, 'closing'), closeButton.style.opacity = 0);
                    });
                }, 800);
            } else {
                UNCODE.menuOpened = !0, triggerButton.style.opacity = 0;
                var getBtnRect = classie.hasClass(triggerButton, 'search-icon') ? null : triggerButton.getBoundingClientRect();
                Array.prototype.forEach.call(closeButtons, function (closeButton) {
                    classie.hasClass(closeButton, 'menu-close-search') || (classie.addClass(triggerButton, 'close'), getBtnRect != null && closeButton.setAttribute('style', 'top:' + getBtnRect.top + 'px; left:' + getBtnRect.left + 'px !important'), classie.addClass(closeButton, 'close'), closeButton.style.opacity = 1);
                }), window.addEventListener('resize', function () {
                    positionCloseBtn(triggerButton, closeButtons);
                });
            }
        }

        function positionCloseBtn (triggerButton, closeButtons) {
            var getBtnRect = classie.hasClass(triggerButton, 'search-icon') ? null : triggerButton.getBoundingClientRect();
            Array.prototype.forEach.call(closeButtons, function (closeButton) {
                classie.hasClass(closeButton, 'menu-close-search') || (getBtnRect != null && closeButton.setAttribute('style', 'top:' + getBtnRect.top + 'px; left:' + getBtnRect.left + 'px !important'), closeButton.style.opacity = 1);
            });
        }
        var triggerButton; var closeButtons = new Array();
        (function bindEscape () {
            document.onkeydown = function (evt) {
                evt = evt || window.event;
                var isEscape = !1;
                'key' in evt ? isEscape = evt.key == 'Escape' || evt.key == 'Esc' : isEscape = evt.keyCode == 27, isEscape && overlayOpened && Array.prototype.forEach.call(closeButtons, function (closeButton) {
                    classie.hasClass(closeButton, 'overlay-close') && classie.hasClass(closeButton, 'menu-button-overlay') && closeButton.click();
                });
            };
        })(), Array.prototype.forEach.call(document.querySelectorAll('.trigger-overlay'), function (triggerBttn) {
            if (UNCODE.menuOpened) return;
            triggerBttn.addEventListener('click', function (e) {
                triggerButton = e.currentTarget;
                if (wwidth < mediaQuery && classie.hasClass(triggerButton, 'search-icon')) return !0;
                e.stopPropagation();
                if (wwidth > mediaQuery) toggleOverlay(triggerButton);
                else if (classie.addClass(triggerButton, 'search-icon')) return !0;
                return e.preventDefault(), !1;
            }, !1);
        }), Array.prototype.forEach.call(document.querySelectorAll('.overlay-close'), function (closeBttn) {
            closeButtons.push(closeBttn), closeBttn.addEventListener('click', function (e) {
                return wwidth > mediaQuery && toggleOverlay(closeBttn), e.preventDefault(), !1;
            }, !1);
        });
    };
    var shrinkMenu = function (bodyTop) {
        var logoShrink; var offset = 100;
        for (var i = 0; i < logoel.length; i++) {
            (secmenuHeight == 0 ? bodyTop > menuHeight : bodyTop > secmenuHeight + offset) && !classie.hasClass(logoel[i], 'shrinked') && wwidth > mediaQuery ? (classie.addClass(logoel[i], 'shrinked'), logoMinScale != undefined && (logoShrink = logolink.children, Array.prototype.forEach.call(logoShrink, function (singleLogo) {
                singleLogo.style.height = logoMinScale + 'px', singleLogo.style.lineHeight = logoMinScale + 'px', classie.hasClass(singleLogo, 'text-logo') && (singleLogo.style.fontSize = logoMinScale + 'px');
            })), setTimeout(function () {
                calculateMenuHeight(!1);
            }, 300)) : ((secmenuHeight == 0 ? bodyTop == 0 : bodyTop <= secmenuHeight + offset) || wwidth < mediaQuery) && classie.hasClass(logoel[i], 'shrinked') && (classie.removeClass(logoel[i], 'shrinked'), logoMinScale != undefined && (logoShrink = logolink.children, Array.prototype.forEach.call(logoShrink, function (singleLogo) {
                singleLogo.style.height = singleLogo.getAttribute('data-maxheight') + 'px', singleLogo.style.lineHeight = singleLogo.getAttribute('data-maxheight') + 'px', classie.hasClass(singleLogo, 'text-logo') && (singleLogo.style.fontSize = singleLogo.getAttribute('data-maxheight') + 'px');
            })), setTimeout(function () {
                calculateMenuHeight(!1);
            }, 300));
        }
    };
    var switchColorsMenu = function (bodyTop, style) {
        for (var i = 0; i < transmenuel.length; i++) masthead.style.opacity !== 1 && (masthead.style.opacity = 1), (secmenuHeight == 0 ? bodyTop > menuHeight / 2 : bodyTop > secmenuHeight) ? (classie.hasClass(masthead, 'style-dark-original') && (logo.className = logo.className.replace('style-light', 'style-dark')), classie.hasClass(masthead, 'style-light-original') && (logo.className = logo.className.replace('style-dark', 'style-light')), style != undefined && (style == 'dark' && classie.removeClass(transmenuel[i], 'style-light-override'), style == 'light' && classie.removeClass(transmenuel[i], 'style-dark-override'), classie.addClass(transmenuel[i], 'style-' + style + '-override'))) : style != undefined && (style == 'dark' && classie.removeClass(transmenuel[i], 'style-light-override'), style == 'light' && classie.removeClass(transmenuel[i], 'style-dark-override'), classie.addClass(transmenuel[i], 'style-' + style + '-override'));
        pageHeader != undefined && style != undefined && (classie.hasClass(pageHeader, 'header-style-dark') && classie.removeClass(pageHeader, 'header-style-dark'), classie.hasClass(pageHeader, 'header-style-light') && classie.removeClass(pageHeader, 'header-style-light'), classie.addClass(pageHeader, 'header-style-' + style));
    };
    var visibleRowCol = function (bodyTop) {
        if (typeof visibleRows === 'object') {
            for (var i = 0; i < visibleRows.length; i++) {
                var section = visibleRows[i];
                var sectionHeight = outerHeight(section);
                var offSetTop = bodyTop + (section != null ? section.getBoundingClientRect().top : 0);
                var offSetPosition = wheight + bodyTop - offSetTop;
                offSetPosition > 0 && offSetPosition < sectionHeight + wheight ? (classie.addClass($kenburnsInner[0], 'uncode-scroll-visible'), visibleRows[i].dispatchEvent(new CustomEvent('enter-row'))) : (classie.removeClass($kenburnsInner[0], 'uncode-scroll-visible'), visibleRows[i].dispatchEvent(new CustomEvent('exit-row')));
            }
        }
    };
    var kenburnsHeader = function (bodyTop) {
        var value;
        if (typeof kenburnsHeaders === 'object' && kenburnsHeaders.length) {
            for (var i = 0; i < kenburnsHeaders.length; i++) {
                var section = kenburnsHeaders[i].parentNode;
                var sectionHeight = outerHeight(section);
                var offSetTop = bodyTop + (section != null ? classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top : 0);
                var offSetPosition = wheight + bodyTop - offSetTop;
                var $kenburnsInner = kenburnsHeaders[i].querySelectorAll('.header-bg');
                classie.hasClass(kenburnsHeaders[i], 'header-carousel-wrapper') && ($kenburnsInner = kenburnsHeaders[i].querySelectorAll('.t-background-cover'));
                if (offSetPosition > 0 && offSetPosition < sectionHeight + wheight) { for (var i = 0; i < $kenburnsInner.length; i++) classie.addClass($kenburnsInner[i], 'uncode-kburns'), $kenburnsInner[i].dispatchEvent(new CustomEvent('enter-kburns')); } else { for (var i = 0; i < $kenburnsInner.length; i++) classie.removeClass($kenburnsInner[i], 'uncode-kburns'), $kenburnsInner[i].dispatchEvent(new CustomEvent('exit-kburns')); }
            }
        }
    };
    var kenburnsRowCol = function (bodyTop) {
        var value;
        if (typeof kenburnsRows === 'object' && kenburnsRows.length) {
            for (var i = 0; i < kenburnsRows.length; i++) {
                var section = kenburnsRows[i].parentNode;
                var sectionHeight = outerHeight(section);
                var offSetTop = bodyTop + (section != null ? classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top : 0);
                var offSetPosition = wheight + bodyTop - offSetTop;
                var $kenburnsInner = kenburnsRows[i].querySelectorAll('.background-inner, .header-bg');
                offSetPosition > 0 && offSetPosition < sectionHeight + wheight ? (classie.addClass($kenburnsInner[0], 'uncode-kburns'), $kenburnsInner[0].dispatchEvent(new CustomEvent('enter-kburns'))) : (classie.removeClass($kenburnsInner[0], 'uncode-kburns'), $kenburnsInner[0].dispatchEvent(new CustomEvent('exit-kburns')));
            }
        }
        if (typeof kenburnsCols === 'object' && kenburnsCols.length) {
            for (var j = 0; j < kenburnsCols.length; j++) {
                var elm = kenburnsCols[j];
                var $kenburnsInner = elm.querySelectorAll('.background-inner');
                checkVisible(elm) ? (classie.addClass($kenburnsInner[0], 'uncode-kburns'), $kenburnsInner[0].dispatchEvent(new CustomEvent('enter-kburns'))) : (classie.removeClass($kenburnsInner[0], 'uncode-kburns'), $kenburnsInner[0].dispatchEvent(new CustomEvent('exit-kburns')));
            }
        }
    };
    var backwashHeader = function (bodyTop) {
        var value; var onEndAnimationFn = function (ev) {
            if (animationEvent) {
                if (ev.animationName !== 'backwash') return;
                this.removeEventListener(animationEvent, onEndAnimationFn);
            }
            classie.addClass(ev.target, 'uncode-zoomout-already');
        };
        if (typeof backwashHeaders === 'object' && backwashHeaders.length) {
            for (var i = 0; i < backwashHeaders.length; i++) {
                var section = backwashHeaders[i].parentNode;
                var sectionHeight = outerHeight(section);
                var offSetTop = bodyTop + (section != null ? classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top : 0);
                var offSetPosition = wheight + bodyTop - offSetTop;
                var $backwashInner = backwashHeaders[i].querySelectorAll('.header-bg');
                if (classie.hasClass($backwashInner[0], 'uncode-video-container')) continue;
                classie.hasClass(backwashHeaders[i], 'header-carousel-wrapper') && ($backwashInner = backwashHeaders[i].querySelectorAll('.t-background-cover'));
                if (offSetPosition > 0 && offSetPosition < sectionHeight + wheight) { for (var i = 0; i < $backwashInner.length; i++) classie.addClass($backwashInner[i], 'uncode-zoomout'), $backwashInner[i].dispatchEvent(new CustomEvent('enter-zoomout')); } else { for (var i = 0; i < $backwashInner.length; i++) classie.removeClass($backwashInner[i], 'uncode-zoomout'), $backwashInner[i].dispatchEvent(new CustomEvent('exit-zoomout')); }
                for (var i = 0; i < $backwashInner.length; i++) $backwashInner[i].addEventListener(animationEvent, onEndAnimationFn);
            }
        }
    };
    var backwashRowCol = function (bodyTop) {
        var value; var onEndAnimationFn = function (ev) {
            if (animationEvent) {
                if (ev.animationName !== 'backwash') return;
                this.removeEventListener(animationEvent, onEndAnimationFn);
            }
            classie.addClass(ev.target, 'uncode-zoomout-already');
        };
        if (typeof backwashRows === 'object' && backwashRows.length) {
            for (var i = 0; i < backwashRows.length; i++) {
                var section = backwashRows[i].parentNode;
                var sectionHeight = outerHeight(section);
                var offSetTop = bodyTop + (section != null ? classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top : 0);
                var offSetPosition = wheight + bodyTop - offSetTop;
                var $backwashInner = backwashRows[i].querySelectorAll('.background-inner');
                if (classie.hasClass($backwashInner[0], 'uncode-video-container')) continue;
                offSetPosition > 0 && offSetPosition < sectionHeight + wheight ? (classie.addClass($backwashInner[0], 'uncode-zoomout'), $backwashInner[0].dispatchEvent(new CustomEvent('enter-zoomout'))) : (classie.removeClass($backwashInner[0], 'uncode-zoomout'), $backwashInner[0].dispatchEvent(new CustomEvent('exit-zoomout'))), $backwashInner[0].addEventListener(animationEvent, onEndAnimationFn);
            }
        }
        if (typeof backwashCols === 'object' && backwashCols.length) {
            for (var j = 0; j < backwashCols.length; j++) {
                var elm = backwashCols[j];
                var $backwashInner = elm.querySelectorAll('.background-inner');
                checkVisible(elm) ? (classie.addClass($backwashInner[0], 'uncode-zoomout'), $backwashInner[0].dispatchEvent(new CustomEvent('enter-zoomout'))) : (classie.removeClass($backwashInner[0], 'uncode-zoomout'), $backwashInner[0].dispatchEvent(new CustomEvent('exit-zoomout'))), $backwashInner[0].addEventListener(animationEvent, onEndAnimationFn);
            }
        }
    };
    var parallaxRowCol = function (bodyTop) {
        var value;
        if (typeof parallaxRows === 'object') {
            for (var i = 0; i < parallaxRows.length; i++) {
                var section = parallaxRows[i].parentNode;
                var thisHeight = outerHeight(parallaxRows[i]);
                var sectionHeight = outerHeight(section);
                var offSetTop = bodyTop + (section != null ? classie.hasClass(section.parentNode.parentNode, 'owl-carousel') ? section.parentNode.parentNode.getBoundingClientRect().top : section.getBoundingClientRect().top : 0);
                var offSetPosition = wheight + bodyTop - offSetTop;
                offSetPosition > 0 && offSetPosition < sectionHeight + wheight && (value = (offSetPosition - wheight) * speedDivider, Math.abs(value) < thisHeight - sectionHeight ? translateElement(parallaxRows[i], Math.floor(value)) : translateElement(parallaxRows[i], Math.floor(thisHeight - sectionHeight)));
            }
        }
        if (typeof parallaxCols === 'object') {
            for (var j = 0; j < parallaxCols.length; j++) {
                var section = parallaxCols[j].parentNode;
                var thisHeight = outerHeight(parallaxCols[j]);
                var sectionHeight = outerHeight(section);
                var offSetTop = bodyTop + (section != null ? section.getBoundingClientRect().top : 0);
                var offSetPosition = wheight + bodyTop - offSetTop;
                offSetPosition > 0 && offSetPosition < sectionHeight + wheight && (value = (offSetPosition - wheight) * speedDivider, value *= 0.8, Math.abs(value) < thisHeight - sectionHeight ? translateElement(parallaxCols[j], Math.floor(value)) : translateElement(parallaxCols[j], Math.floor(thisHeight - sectionHeight)));
            }
        }
    };
    var parallaxHeader = function (bodyTop) {
        var value;
        if (typeof parallaxHeaders === 'object') {
            for (var i = 0; i < parallaxHeaders.length; i++) {
                var section = parallaxHeaders[i].parentNode;
                var thisSibling = section.nextSibling;
                var thisHeight; var sectionHeight; var offSetTop; var offSetPosition;
                classie.hasClass(parallaxHeaders[i], 'header-carousel-wrapper') ? getDivChildren(parallaxHeaders[i], '.t-entry-visual-cont', function (item, l, total) {
                    thisHeight = outerHeight(item), sectionHeight = outerHeight(section), offSetTop = bodyTop + section.getBoundingClientRect().top, offSetPosition = wheight + bodyTop - offSetTop, offSetPosition > 0 && offSetPosition < sectionHeight + wheight && (value = (offSetPosition - wheight) * speedDivider, Math.abs(value) < thisHeight - sectionHeight && translateElement(item, Math.floor(value)));
                }) : (thisHeight = outerHeight(parallaxHeaders[i]), sectionHeight = outerHeight(section), offSetTop = bodyTop + section.getBoundingClientRect().top, offSetPosition = wheight + bodyTop - offSetTop, offSetPosition > 0 && offSetPosition < sectionHeight + wheight && (value = (offSetPosition - wheight) * speedDivider, Math.abs(value) < thisHeight - sectionHeight && translateElement(parallaxHeaders[i], Math.floor(value))));
            }
        }
    };
    var headerOpacity = function (bodyTop) {
        if (headerWithOpacity && headerWithOpacity.length) {
            var thisHeight = outerHeight(headerWithOpacity[0]);
            bodyTop > thisHeight / 8 ? pageHeader != undefined && classie.addClass(pageHeader, 'header-scrolled') : pageHeader != undefined && classie.removeClass(pageHeader, 'header-scrolled');
        }
    };
    var showHideScrollup = function (bodyTop) {
        bodyTop != 0 && (bodyTop > wheight || bodyTop + wheight >= docheight && docheight > 0 ? (classie.addClass(document.body, 'window-scrolled'), classie.removeClass(document.body, 'hide-scrollup'), footerScroller && footerScroller[0] != undefined && (footerScroller[0].style.display = '')) : (classie.hasClass(document.body, 'window-scrolled') && classie.addClass(document.body, 'hide-scrollup'), classie.removeClass(document.body, 'window-scrolled')));
    };
    var fixMenu = function () {
        menuwrapper = document.querySelectorAll('.menu-wrapper'), !classie.hasClass(document.body, 'vmenu') && UNCODE.isFullPage && !UNCODE.isFullPageSnap && classie.hasClass(document.body, 'uncode-fp-menu-hide') && (menuwrapper = document.querySelector('.menu-wrapper'), pageHeader = document.getElementById('page-header'), menuwrapper.style.position = 'fixed', menuwrapper.style.zIndex = '5');
    };
    var hideMenu = function (bodyTop) {
        if (UNCODE.menuOpened || bodyTop < 0) return;
        classie.hasClass(document.body, 'vmenu') && (wwidth < mediaQuery ? menuhide = document.querySelector('#masthead .menu-hide-vertical') : menuhide = null), classie.hasClass(document.body, 'hmenu-center') && (wwidth > mediaQuery ? menuhide = document.querySelector('#masthead .menu-hide') : menuhide = document.querySelector('.menu-container-mobile.menu-hide'));
        if (typeof menuhide === 'object' && menuhide != null && mainmenu[0] != undefined) {
            var translate; var scrollingDown = !0;
            var sticky_element = typeof mainmenu.item === 'undefined' ? wwidth > mediaQuery ? mainmenu[0] : mainmenu[1] : mainmenu[0];
            if (lastScrollValue == bodyTop) return;
            lastScrollValue > bodyTop ? scrollingDown = !1 : scrollingDown = !0, lastScrollValue = bodyTop;
            if (!scrollingDown) {
                if (!UNCODE.scrolling) {
                    if (secmenuHeight == 0 ? bodyTop == 0 : bodyTop < secmenuHeight) classie.removeClass(sticky_element.parentNode, 'is_stuck'), classie.hasClass(masthead, 'menu-transparent') && (isMobileTransparent || wwidth > mediaQuery) && !classie.hasClass(masthead.parentNode, 'no-header') && (masthead.parentNode.style.height = '0px'), wwidth < mediaQuery ? sticky_element.style.position = 'fixed' : sticky_element.style.position = '', hideMenuReset(sticky_element), clearTimeout(hidingTimer);
                    classie.hasClass(menuhide, 'menu-hided') && (classie.removeClass(menuhide, 'menu-hided'), hidingTimer = setTimeout(function () {
                        classie.addClass(sticky_element.parentNode, 'is_stuck'), hideMenuReset(sticky_element);
                    }, 400));
                }
            } else menusticky.length == 0 && bodyTop < wheight / 3 && sticky_element.style.position == 'fixed' && (sticky_element.style.position = ''), bodyTop > wheight / 2 && (clearTimeout(hidingTimer), classie.hasClass(menuhide, 'menu-hided') || (classie.addClass(menuhide, 'menu-hided'), classie.addClass(sticky_element.parentNode, 'is_stuck'), sticky_element.style.position != 'fixed' && (sticky_element.style.visibility = 'hidden', sticky_element.style.position = 'fixed', sticky_element.style.top = '0px'), translateElement(menuhide, -UNCODE.menuMobileHeight - 1)));
        }
    };
    var hideMenuReset = function (sticky_element) {
        var topOffset = 0;
        sticky_element.style.visibility == 'hidden' && (sticky_element.style.visibility = ''), bodyBorder > 0 && (topOffset += bodyBorder), adminBar != null && window.getComputedStyle(adminBar, null).getPropertyValue('position') != 'fixed' && (adminBarHeight = 0), adminBarHeight > 0 && (topOffset += adminBarHeight), !classie.hasClass(document.body, 'boxed-width') && boxWidth > 0 && (sticky_element.style.width = boxWidth + 'px'), translateElement(menuhide, 0);
    };
    var stickMenu = function (bodyTop) {
        if (header && mainmenu[0] != undefined) {
            if (classie.hasClass(mainmenu[0], 'vmenu-container') && wwidth > mediaQuery) return;
            var sticky_element = typeof mainmenu.item === 'undefined' ? isMobileTransparent || wwidth > mediaQuery ? mainmenu[0] : mainmenu[1] : mainmenu[0];
            if (secmenuHeight == 0 && (isMobileTransparent || wwidth > mediaQuery) ? bodyTop > 0 + adminBarHeight : bodyTop > secmenuHeight + adminBarHeight) {
                if (!classie.hasClass(sticky_element.parentNode, 'is_stuck')) {
                    classie.addClass(sticky_element.parentNode, 'is_stuck'), sticky_element.style.position = 'fixed';
                    var getAnchorTop = bodyBorder;
                    adminBar != null && window.getComputedStyle(adminBar, null).getPropertyValue('position') != 'fixed' && (adminBarHeight = 0), adminBarHeight > 0 && (getAnchorTop += adminBarHeight), sticky_element.style.top = getAnchorTop + 'px', !classie.hasClass(document.body, 'boxed-width') && boxWidth > 0 && (sticky_element.style.width = boxWidth + 'px');
                }
            } else {
                clearTimeout(hidingTimer), classie.removeClass(sticky_element.parentNode, 'is_stuck'), sticky_element.style.position = 'fixed';
                if (isMobileTransparent || wwidth > mediaQuery) sticky_element.style.position = '';
                classie.hasClass(document.body, 'hmenu-center') && (sticky_element.style.position = 'absolute'), sticky_element.style.top = '';
            }
        }
    };
    var translateElement = function (element, valueY) {
        var translate = 'translate3d(0, ' + valueY + 'px' + ', 0)';
        element.style['-webkit-transform'] = translate, element.style['-moz-transform'] = translate, element.style['-ms-transform'] = translate, element.style['-o-transform'] = translate, element.style.transform = translate;
    };
    var scrollFunction = function () {
        if (!UNCODE.isFullPage) {
            kenburnsHeader(bodyTop), kenburnsRowCol(bodyTop), backwashHeader(bodyTop), backwashRowCol(bodyTop), logoel != undefined && logoel.length && !isMobile && shrinkMenu(bodyTop), menusticky != undefined && menusticky.length && stickMenu(bodyTop), hideMenu(bodyTop);
            if (isMobileParallaxAllowed || !isMobile) header && menusticky != undefined && menusticky.length && switchColorsMenu(bodyTop), parallaxRowCol(bodyTop), parallaxHeader(bodyTop), headerOpacity(bodyTop), visibleRowCol(bodyTop);
        }
    };
    var shapeDivider = function () {
        var $shape = '.uncode-divider-wrap';
        forEachElement($shape, function ($el, i) {
            var elH = parseInt($el.getAttribute('data-height'));
            var elHunit = $el.getAttribute('data-unit');
            var newEl; var $parent = $el.parentNode;
            var parentH; var $svg = $el.getElementsByTagName('svg')[0];
            if (elHunit == 'px') {
                switch (!0) {
                case wwidth < 1500 && wwidth >= 1180:
                    newEl = elH * 0.8;
                    break;
                case wwidth < 1180 && wwidth >= 960:
                    newEl = elH * 0.65;
                    break;
                case wwidth < 960 && wwidth >= 570:
                    newEl = elH * 0.5;
                    break;
                case wwidth < 570:
                    newEl = elH * 0.25;
                    break;
                default:
                    newEl = elH;
                }
                $el.style.height = newEl + elHunit;
            }
            if (classie.hasClass($el, 'uncode-divider-preserve-ratio') && (window.navigator.userAgent.indexOf('MSIE ') !== -1 || window.navigator.userAgent.indexOf('Trident/') !== -1)) {
                $svg.setAttribute('preserveAspectRatio', 'none');
                var sizes = $svg.getAttribute('viewBox').split(' ');
                var svgW = sizes[2];
                var svgH = sizes[3];
                var newSvgW;
                newSvgW = newEl * (svgW / svgH), $svg.style.width = newSvgW + 'px';
            }
        });
    };
    noScroll || window.addEventListener('scroll', function (e) {
        UNCODE.isFullPage || (bodyTop = document.documentElement.scrollTop || document.body.scrollTop, scrollFunction(), showHideScrollup(bodyTop));
    }, !1), document.addEventListener('DOMContentLoaded', function (event) {
        UNCODE.adaptive(), boxWrapper = document.querySelectorAll('.box-wrapper'), docheight = boxWrapper[0] != undefined ? boxWrapper[0].offsetHeight : 0, !classie.hasClass(document.body, 'vmenu') && !classie.hasClass(document.body, 'menu-offcanvas') && init_overlay(), kenburnsRows = document.querySelectorAll('.with-kburns > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .row-background > .background-wrapper, .with-kburns > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'), kenburnsCols = document.querySelectorAll('.with-kburns > .column-background > .background-wrapper'), backwashRows = document.querySelectorAll('.with-zoomout > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .row-background > .background-wrapper, .with-zoomout > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'), backwashCols = document.querySelectorAll('.with-zoomout > .column-background > .background-wrapper');
        if (!UNCODE.isMobile || isMobileParallaxAllowed) parallaxRows = document.querySelectorAll('.with-parallax > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .row-background > .background-wrapper, .with-parallax > .fp-tableCell > .fp-scrollable > .fp-scroller > .row-background > .background-wrapper'), parallaxCols = document.querySelectorAll('.with-parallax > .column-background > .background-wrapper');
        footerScroller = document.querySelectorAll('.footer-scroll-top'), footerScroller && footerScroller[0] != undefined && transitionEvent && footerScroller[0].addEventListener(transitionEvent, hideFooterScroll), Array.prototype.forEach.call(document.querySelectorAll('.row-inner'), function (el) {
            el.style.height = '', el.style.marginBottom = '';
        }), setRowHeight(document.querySelectorAll('.page-wrapper .row-parent, footer .row-parent'));
    }), window.addEventListener('resize', function () {
        docheight = boxWrapper != undefined && boxWrapper[0] != undefined ? boxWrapper[0].offsetHeight : 0;
        var oldWidth = wwidth;
        UNCODE.wwidth = wwidth = window.innerWidth || document.documentElement.clientWidth, UNCODE.wheight = wheight = (window.innerHeight || document.documentElement.clientHeight) - bodyBorder * 2, isSplitMenu && typeof resizeTimer_ === 'undefined' && centerSplitMenu();
        if (isMobile && oldWidth == wwidth) return !1;
        calculateMenuHeight(!1), initBox(), headerHeight('.header-wrapper'), window.dispatchEvent(boxEvent), scrollFunction(), shapeDivider(), showHideScrollup(bodyTop), clearTimeout(resizeTimer_), resizeTimer_ = setTimeout(function () {
            isSplitMenu && centerSplitMenu();
        }, 10), clearTimeout(resizeTimer), resizeTimer = setTimeout(function () {
            UNCODE.wheight = wheight = (window.innerHeight || document.documentElement.clientHeight) - bodyBorder * 2, Array.prototype.forEach.call(document.querySelectorAll('.row-inner'), function (el) {
                el.style.height = '', el.style.marginBottom = '';
            }), setRowHeight(document.querySelectorAll('.page-wrapper .row-parent, footer .row-parent'), !1, !0), isMobile || initVideoComponent(document.body, '.uncode-video-container.video, .uncode-video-container.self-video');
        }, 500);
    }), window.addEventListener('load', function () {
        UNCODE.isMobile || setTimeout(function () {
            window.dispatchEvent(UNCODE.boxEvent), Waypoint.refreshAll();
        }, 2e3), UNCODE.isMobile && !isMobileParallaxAllowed && (kenburnsHeader(bodyTop), kenburnsRowCol(bodyTop)), backwashHeader(bodyTop), backwashRowCol(bodyTop), showHideScrollup(bodyTop);
        if (document.createEvent) {
            var ev = document.createEvent('Event');
            ev.initEvent('resize', !0, !0), window.dispatchEvent(ev);
        } else document.fireEvent('onresize');
    }, !1);
    var UNCODE = {
        bodyTop: bodyTop,
        boxEvent: boxEvent,
        bodyBorder: bodyBorder,
        initBox: initBox,
        adminBarHeight: 0,
        menuHeight: 0,
        menuMobileHeight: 0,
        fixMenuHeight: fixMenuHeight,
        initHeader: initHeader,
        initRow: initRow,
        setRowHeight: setRowHeight,
        switchColorsMenu: switchColorsMenu,
        isMobile: isMobile,
        scrolling: !1,
        menuHiding: !1,
        menuOpened: !1,
        menuMobileTriggerEvent: menuMobileTriggerEvent,
        mediaQuery: mediaQuery,
        initVideoComponent: initVideoComponent,
        hideMenu: hideMenu,
        wwidth: wwidth,
        wheight: wheight
    };
    typeof define === 'function' && define.amd ? define(UNCODE) : window.UNCODE = UNCODE, UNCODE.adaptive = function () {
        var images = new Array();
        var getImages = document.querySelectorAll('.adaptive-async:not(.adaptive-fetching)');
        for (var i = 0; i < getImages.length; i++) {
            var imageObj = {};
            var el = getImages[i];
            classie.addClass(el, 'adaptive-fetching'), imageObj.unique = el.getAttribute('data-uniqueid'), imageObj.url = el.getAttribute('data-guid'), imageObj.path = el.getAttribute('data-path'), imageObj.singlew = el.getAttribute('data-singlew'), imageObj.singleh = el.getAttribute('data-singleh'), imageObj.origwidth = el.getAttribute('data-width'), imageObj.origheight = el.getAttribute('data-height'), imageObj.crop = el.getAttribute('data-crop'), imageObj.fixed = el.getAttribute('data-fixed') == undefined ? null : el.getAttribute('data-fixed'), imageObj.screen = window.uncodeScreen, imageObj.images = window.uncodeImages, images.push(imageObj);
        }
        var post_data = {
            images: JSON.stringify(images),
            action: 'get_adaptive_async',
            nonce_adaptive_images: SiteParameters.nonce_adaptive_images
        };
        if (images.length > 0) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', SiteParameters.ajax_url, !0), xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'), xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'), xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200 && xhr.responseText) {
                        var jsonResponse = JSON.parse(xhr.responseText);
                        if (jsonResponse.success && jsonResponse.data.images) {
                            var images = jsonResponse.data.images;
                            for (var i = 0; i < images.length; i++) {
                                var val = images[i];
                                var getImage = document.querySelectorAll('[data-uniqueid="' + val.unique + '"]');
                                for (var j = 0; j < getImage.length; j++) {
                                    var attrScr = getImage[j].getAttribute('src');
                                    var replaceImg = new Image();
                                    replaceImg.source = attrScr, replaceImg.el = getImage[j], classie.removeClass(getImage[j], 'adaptive-async'), classie.removeClass(getImage[j], 'adaptive-fetching'), replaceImg.onload = function () {
                                        var _this = this;
                                        var parentNode = _this.el.parentNode;
                                        var placeH;
                                        typeof parentNode.prepend === 'undefined' ? (_this.source !== null ? _this.el.src = _this.src : _this.el.style.backgroundImage = 'url("' + _this.src + '")', classie.addClass(_this.el, 'async-done')) : (_this.source !== null ? (placeH = document.createElement('IMG'), placeH.setAttribute('class', 'placeH'), placeH.src = _this.src, placeH.style.position = 'absolute', placeH.style.opacity = '0') : (placeH = document.createElement('DIV'), placeH.setAttribute('style', _this.el.getAttribute('style')), placeH.setAttribute('class', 'placeH ' + _this.el.getAttribute('class')), placeH.style.backgroundImage = 'url("' + _this.src + '")', placeH.style.backgroundSize = 'cover', placeH.style.backgroundPosition = 'center', placeH.style.position = 'absolute', placeH.style.top = '0', placeH.style.width = '100%', placeH.style.height = '100%'), classie.hasClass(_this.el, 'box-wrapper') || parentNode.prepend(placeH), requestTimeout(function () {
                                            _this.source !== null ? _this.el.src = _this.src : _this.el.style.backgroundImage = 'url("' + _this.src + '")', classie.hasClass(_this.el, 'box-wrapper') || parentNode.removeChild(placeH), classie.addClass(_this.el, 'async-done');
                                        }, 250));
                                    }, replaceImg.src = val.url;
                                }
                            }
                        } else SiteParameters.enable_debug == 1 && console.log('There was an error: bad response');
                    } else xhr.status == 400 ? SiteParameters.enable_debug == 1 && console.log('There was an error 400') : SiteParameters.enable_debug == 1 && console.log('Something else other than 200 was returned');
                }
            };
            var queryString = '';
            var arrayLength = Object.keys(post_data).length;
            var arrayCounter = 0;
            for (var key in post_data) queryString += key + '=' + post_data[key], arrayCounter < arrayLength - 1 && (queryString += '&'), arrayCounter++;
            xhr.send(queryString);
        }
    };
}(window)), 'use strict',
(function () {
    function Pathformer (element) {
        if (typeof element === 'undefined') throw new Error('Pathformer [constructor]: "element" parameter is required');
        if (element.constructor === String) {
            element = document.getElementById(element);
            if (!element) throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');
        }
        if (!(element instanceof window.SVGElement || element instanceof window.SVGGElement || /^svg$/i.test(element.nodeName))) throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');
        this.el = element, this.scan(element);
    }

    function Vivus (element, options, callback) {
        setupEnv(), this.isReady = !1, this.setElement(element, options), this.setOptions(options), this.setCallback(callback), this.isReady && this.init();
    }
    Pathformer.prototype.TYPES = ['line', 'ellipse', 'circle', 'polygon', 'polyline', 'rect'], Pathformer.prototype.ATTR_WATCH = ['cx', 'cy', 'points', 'r', 'rx', 'ry', 'x', 'x1', 'x2', 'y', 'y1', 'y2'], Pathformer.prototype.scan = function (svg) {
        var fn; var element; var pathData; var pathDom; var elements = svg.querySelectorAll(this.TYPES.join(','));
        for (var i = 0; i < elements.length; i++) element = elements[i], fn = this[element.tagName.toLowerCase() + 'ToPath'], pathData = fn(this.parseAttr(element.attributes)), pathDom = this.pathMaker(element, pathData), element.parentNode.replaceChild(pathDom, element);
    }, Pathformer.prototype.lineToPath = function (element) {
        var newElement = {};
        var x1 = element.x1 || 0;
        var y1 = element.y1 || 0;
        var x2 = element.x2 || 0;
        var y2 = element.y2 || 0;
        return newElement.d = 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2, newElement;
    }, Pathformer.prototype.rectToPath = function (element) {
        var newElement = {};
        var x = parseFloat(element.x) || 0;
        var y = parseFloat(element.y) || 0;
        var width = parseFloat(element.width) || 0;
        var height = parseFloat(element.height) || 0;
        if (element.rx || element.ry) {
            var rx = parseInt(element.rx, 10) || -1;
            var ry = parseInt(element.ry, 10) || -1;
            rx = Math.min(Math.max(rx < 0 ? ry : rx, 0), width / 2), ry = Math.min(Math.max(ry < 0 ? rx : ry, 0), height / 2), newElement.d = 'M ' + (x + rx) + ',' + y + ' ' + 'L ' + (x + width - rx) + ',' + y + ' ' + 'A ' + rx + ',' + ry + ',0,0,1,' + (x + width) + ',' + (y + ry) + ' ' + 'L ' + (x + width) + ',' + (y + height - ry) + ' ' + 'A ' + rx + ',' + ry + ',0,0,1,' + (x + width - rx) + ',' + (y + height) + ' ' + 'L ' + (x + rx) + ',' + (y + height) + ' ' + 'A ' + rx + ',' + ry + ',0,0,1,' + x + ',' + (y + height - ry) + ' ' + 'L ' + x + ',' + (y + ry) + ' ' + 'A ' + rx + ',' + ry + ',0,0,1,' + (x + rx) + ',' + y;
        } else newElement.d = 'M' + x + ' ' + y + ' ' + 'L' + (x + width) + ' ' + y + ' ' + 'L' + (x + width) + ' ' + (y + height) + ' ' + 'L' + x + ' ' + (y + height) + ' Z';
        return newElement;
    }, Pathformer.prototype.polylineToPath = function (element) {
        var newElement = {};
        var points = element.points.trim().split(' ');
        var i; var path;
        if (element.points.indexOf(',') === -1) {
            var formattedPoints = [];
            for (i = 0; i < points.length; i += 2) formattedPoints.push(points[i] + ',' + points[i + 1]);
            points = formattedPoints;
        }
        path = 'M' + points[0];
        for (i = 1; i < points.length; i++) points[i].indexOf(',') !== -1 && (path += 'L' + points[i]);
        return newElement.d = path, newElement;
    }, Pathformer.prototype.polygonToPath = function (element) {
        var newElement = Pathformer.prototype.polylineToPath(element);
        return newElement.d += 'Z', newElement;
    }, Pathformer.prototype.ellipseToPath = function (element) {
        var newElement = {};
        var rx = parseFloat(element.rx) || 0;
        var ry = parseFloat(element.ry) || 0;
        var cx = parseFloat(element.cx) || 0;
        var cy = parseFloat(element.cy) || 0;
        var startX = cx - rx;
        var startY = cy;
        var endX = parseFloat(cx) + parseFloat(rx);
        var endY = cy;
        return newElement.d = 'M' + startX + ',' + startY + 'A' + rx + ',' + ry + ' 0,1,1 ' + endX + ',' + endY + 'A' + rx + ',' + ry + ' 0,1,1 ' + startX + ',' + endY, newElement;
    }, Pathformer.prototype.circleToPath = function (element) {
        var newElement = {};
        var r = parseFloat(element.r) || 0;
        var cx = parseFloat(element.cx) || 0;
        var cy = parseFloat(element.cy) || 0;
        var startX = cx - r;
        var startY = cy;
        var endX = parseFloat(cx) + parseFloat(r);
        var endY = cy;
        return newElement.d = 'M' + startX + ',' + startY + 'A' + r + ',' + r + ' 0,1,1 ' + endX + ',' + endY + 'A' + r + ',' + r + ' 0,1,1 ' + startX + ',' + endY, newElement;
    }, Pathformer.prototype.pathMaker = function (element, pathData) {
        var i; var attr; var pathTag = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        for (i = 0; i < element.attributes.length; i++) attr = element.attributes[i], this.ATTR_WATCH.indexOf(attr.name) === -1 && pathTag.setAttribute(attr.name, attr.value);
        for (i in pathData) pathTag.setAttribute(i, pathData[i]);
        return pathTag;
    }, Pathformer.prototype.parseAttr = function (element) {
        var attr; var output = {};
        for (var i = 0; i < element.length; i++) {
            attr = element[i];
            if (this.ATTR_WATCH.indexOf(attr.name) !== -1 && attr.value.indexOf('%') !== -1) throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");
            output[attr.name] = attr.value;
        }
        return output;
    }, 'use strict';
    var setupEnv, requestAnimFrame, cancelAnimFrame, parsePositiveInt;
    Vivus.LINEAR = function (x) {
        return x;
    }, Vivus.EASE = function (x) {
        return -Math.cos(x * Math.PI) / 2 + 0.5;
    }, Vivus.EASE_OUT = function (x) {
        return 1 - Math.pow(1 - x, 3);
    }, Vivus.EASE_IN = function (x) {
        return Math.pow(x, 3);
    }, Vivus.EASE_OUT_BOUNCE = function (x) {
        var base = -Math.cos(x * 0.5 * Math.PI) + 1;
        var rate = Math.pow(base, 1.5);
        var rateR = Math.pow(1 - x, 2);
        var progress = -Math.abs(Math.cos(rate * 2.5 * Math.PI)) + 1;
        return 1 - rateR + progress * rateR;
    }, Vivus.prototype.setElement = function (element, options) {
        var onLoad, self;
        if (typeof element === 'undefined') throw new Error('Vivus [constructor]: "element" parameter is required');
        if (element.constructor === String) {
            element = document.getElementById(element);
            if (!element) throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');
        }
        this.parentEl = element;
        if (options && options.file) {
            var self = this;
            onLoad = function (e) {
                var domSandbox = document.createElement('div');
                domSandbox.innerHTML = this.responseText;
                var svgTag = domSandbox.querySelector('svg');
                if (!svgTag) throw new Error('Vivus [load]: Cannot find the SVG in the loaded file : ' + options.file);
                self.el = svgTag, self.el.setAttribute('width', '100%'), self.el.setAttribute('height', '100%'), self.parentEl.appendChild(self.el), self.isReady = !0, self.init(), self = null;
            };
            var oReq = new window.XMLHttpRequest();
            oReq.addEventListener('load', onLoad), oReq.open('GET', options.file), oReq.send();
            return;
        }
        switch (element.constructor) {
        case window.SVGSVGElement:
        case window.SVGElement:
        case window.SVGGElement:
            this.el = element, this.isReady = !0;
            break;
        case window.HTMLObjectElement:
            self = this, onLoad = function (e) {
                if (self.isReady) return;
                self.el = element.contentDocument && element.contentDocument.querySelector('svg');
                if (!self.el && e) throw new Error('Vivus [constructor]: object loaded does not contain any SVG');
                self.el && (element.getAttribute('built-by-vivus') && (self.parentEl.insertBefore(self.el, element), self.parentEl.removeChild(element), self.el.setAttribute('width', '100%'), self.el.setAttribute('height', '100%')), self.isReady = !0, self.init(), self = null);
            }, onLoad() || element.addEventListener('load', onLoad);
            break;
        default:
            throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)');
        }
    }, Vivus.prototype.setOptions = function (options) {
        var allowedTypes = ['delayed', 'sync', 'async', 'nsync', 'oneByOne', 'scenario', 'scenario-sync'];
        var allowedStarts = ['inViewport', 'manual', 'autostart'];
        if (options !== undefined && options.constructor !== Object) throw new Error('Vivus [constructor]: "options" parameter must be an object');
        options = options || {};
        if (options.type && allowedTypes.indexOf(options.type) === -1) throw new Error('Vivus [constructor]: ' + options.type + ' is not an existing animation `type`');
        this.type = options.type || allowedTypes[0];
        if (options.start && allowedStarts.indexOf(options.start) === -1) throw new Error('Vivus [constructor]: ' + options.start + ' is not an existing `start` option');
        this.start = options.start || allowedStarts[0], this.isIE = window.navigator.userAgent.indexOf('MSIE') !== -1 || window.navigator.userAgent.indexOf('Trident/') !== -1 || window.navigator.userAgent.indexOf('Edge/') !== -1, this.duration = parsePositiveInt(options.duration, 120), this.delay = parsePositiveInt(options.delay, null), this.delayStart = parsePositiveInt(options.delayStart, null), this.dashGap = parsePositiveInt(options.dashGap, 1), this.forceRender = options.hasOwnProperty('forceRender') ? !!options.forceRender : this.isIE, this.reverseStack = !!options.reverseStack, this.selfDestroy = !!options.selfDestroy, this.onReady = options.onReady, this.map = [], this.frameLength = this.currentFrame = this.delayUnit = this.speed = this.handle = null, this.ignoreInvisible = options.hasOwnProperty('ignoreInvisible') ? !!options.ignoreInvisible : !1, this.animTimingFunction = options.animTimingFunction || Vivus.LINEAR, this.pathTimingFunction = options.pathTimingFunction || Vivus.LINEAR;
        if (this.delay >= this.duration) throw new Error('Vivus [constructor]: delay must be shorter than duration');
    }, Vivus.prototype.setCallback = function (callback) {
        if (!!callback && callback.constructor !== Function) throw new Error('Vivus [constructor]: "callback" parameter must be a function');
        this.callback = callback || function () {};
    }, Vivus.prototype.mapping = function () {
        var i, paths, path, pAttrs, pathObj, totalLength, lengthMeter, timePoint;
        timePoint = totalLength = lengthMeter = 0, paths = this.el.querySelectorAll('path');
        for (i = 0; i < paths.length; i++) {
            path = paths[i];
            if (this.isInvisible(path)) continue;
            pathObj = {
                el: path,
                length: Math.ceil(path.getTotalLength())
            };
            if (isNaN(pathObj.length)) {
                window.console && console.warn && console.warn('Vivus [mapping]: cannot retrieve a path element length', path);
                continue;
            }
            this.map.push(pathObj), path.style.strokeDasharray = pathObj.length + ' ' + (pathObj.length + this.dashGap * 2), path.style.strokeDashoffset = pathObj.length + this.dashGap, pathObj.length += this.dashGap, totalLength += pathObj.length, this.renderPath(i);
        }
        totalLength = totalLength === 0 ? 1 : totalLength, this.delay = this.delay === null ? this.duration / 3 : this.delay, this.delayUnit = this.delay / (paths.length > 1 ? paths.length - 1 : 1), this.reverseStack && this.map.reverse();
        for (i = 0; i < this.map.length; i++) {
            pathObj = this.map[i];
            switch (this.type) {
            case 'delayed':
                pathObj.startAt = this.delayUnit * i, pathObj.duration = this.duration - this.delay;
                break;
            case 'oneByOne':
                pathObj.startAt = lengthMeter / totalLength * this.duration, pathObj.duration = pathObj.length / totalLength * this.duration;
                break;
            case 'sync':
            case 'async':
            case 'nsync':
                pathObj.startAt = 0, pathObj.duration = this.duration;
                break;
            case 'scenario-sync':
                path = pathObj.el, pAttrs = this.parseAttr(path), pathObj.startAt = timePoint + (parsePositiveInt(pAttrs['data-delay'], this.delayUnit) || 0), pathObj.duration = parsePositiveInt(pAttrs['data-duration'], this.duration), timePoint = pAttrs['data-async'] !== undefined ? pathObj.startAt : pathObj.startAt + pathObj.duration, this.frameLength = Math.max(this.frameLength, pathObj.startAt + pathObj.duration);
                break;
            case 'scenario':
                path = pathObj.el, pAttrs = this.parseAttr(path), pathObj.startAt = parsePositiveInt(pAttrs['data-start'], this.delayUnit) || 0, pathObj.duration = parsePositiveInt(pAttrs['data-duration'], this.duration), this.frameLength = Math.max(this.frameLength, pathObj.startAt + pathObj.duration);
            }
            lengthMeter += pathObj.length, this.frameLength = this.frameLength || this.duration;
        }
    }, Vivus.prototype.drawer = function () {
        var self = this;
        this.currentFrame += this.speed;
        if (this.currentFrame <= 0) this.stop(), this.reset();
        else {
            if (!(this.currentFrame >= this.frameLength)) {
                this.trace(), this.handle = requestAnimFrame(function () {
                    self.drawer();
                });
                return;
            }
            this.stop(), this.currentFrame = this.frameLength, this.trace(), this.selfDestroy && this.destroy();
        }
        this.callback(this), this.instanceCallback && (this.instanceCallback(this), this.instanceCallback = null);
    }, Vivus.prototype.trace = function () {
        var i, progress, path, currentFrame;
        currentFrame = this.animTimingFunction(this.currentFrame / this.frameLength) * this.frameLength;
        for (i = 0; i < this.map.length; i++) path = this.map[i], progress = (currentFrame - path.startAt) / path.duration, progress = this.pathTimingFunction(Math.max(0, Math.min(1, progress))), path.progress !== progress && (path.progress = progress, path.el.style.strokeDashoffset = Math.floor(path.length * (1 - progress)), this.renderPath(i));
    }, Vivus.prototype.renderPath = function (index) {
        if (this.forceRender && this.map && this.map[index]) {
            var pathObj = this.map[index];
            var newPath = pathObj.el.cloneNode(!0);
            pathObj.el.parentNode.replaceChild(newPath, pathObj.el), pathObj.el = newPath;
        }
    }, Vivus.prototype.init = function () {
        this.frameLength = 0, this.currentFrame = 0, this.map = [], new Pathformer(this.el), this.mapping(), this.starter(), this.onReady && this.onReady(this);
    }, Vivus.prototype.starter = function () {
        switch (this.start) {
        case 'manual':
            return;
        case 'autostart':
            this.play();
            break;
        case 'inViewport':
            var self = this;
            var listener = function () {
                self.isInViewport(self.parentEl, 1) && (self.play(), window.removeEventListener('scroll', listener), window.removeEventListener('fp-slide-changed', listener), window.removeEventListener('fp-slide-scroll', listener));
            };
            window.addEventListener('scroll', listener), window.addEventListener('fp-slide-changed', listener), window.addEventListener('fp-slide-scroll', listener), listener();
        }
    }, Vivus.prototype.getStatus = function () {
        return this.currentFrame === 0 ? 'start' : this.currentFrame === this.frameLength ? 'end' : 'progress';
    }, Vivus.prototype.reset = function () {
        return this.setFrameProgress(0);
    }, Vivus.prototype.finish = function () {
        return this.setFrameProgress(1);
    }, Vivus.prototype.setFrameProgress = function (progress) {
        return progress = Math.min(1, Math.max(0, progress)), this.currentFrame = Math.round(this.frameLength * progress), this.trace(), this;
    }, Vivus.prototype.play = function (speed, callback) {
        this.instanceCallback = null;
        if (speed && typeof speed === 'function') this.instanceCallback = speed, speed = null;
        else if (speed && typeof speed !== 'number') throw new Error('Vivus [play]: invalid speed');
        callback && typeof callback === 'function' && !this.instanceCallback && (this.instanceCallback = callback), this.speed = speed || 1;
        if (!this.handle) {
            var $this = this;
            var delay = this.delayStart != null ? this.delayStart : 0;
            setTimeout(function () {
                $this.drawer();
            }, delay);
        }
        return this;
    }, Vivus.prototype.stop = function () {
        return this.handle && (cancelAnimFrame(this.handle), this.handle = null), this;
    }, Vivus.prototype.destroy = function () {
        this.stop();
        var i, path;
        for (i = 0; i < this.map.length; i++) path = this.map[i], path.el.style.strokeDashoffset = null, path.el.style.strokeDasharray = null, this.renderPath(i);
    }, Vivus.prototype.isInvisible = function (el) {
        var rect; var ignoreAttr = el.getAttribute('data-ignore');
        return ignoreAttr !== null ? ignoreAttr !== 'false' : this.ignoreInvisible ? (rect = el.getBoundingClientRect(), !rect.width && !rect.height) : !1;
    }, Vivus.prototype.parseAttr = function (element) {
        var attr; var output = {};
        if (element && element.attributes) { for (var i = 0; i < element.attributes.length; i++) attr = element.attributes[i], output[attr.name] = attr.value; }
        return output;
    }, Vivus.prototype.isInViewport = function (el, h) {
        var scrolled = this.scrollY();
        var viewed = scrolled + this.getViewportH();
        var elBCR = el.getBoundingClientRect();
        var elHeight = elBCR.height;
        var elTop = scrolled + elBCR.top;
        var elBottom = elTop + elHeight;
        return h = h || 0, elTop + elHeight * h <= viewed && elBottom >= scrolled;
    }, Vivus.prototype.getViewportH = function () {
        var client = this.docElem.clientHeight;
        var inner = window.innerHeight;
        return client < inner ? inner : client;
    }, Vivus.prototype.scrollY = function () {
        return window.pageYOffset || this.docElem.scrollTop;
    }, setupEnv = function () {
        if (Vivus.prototype.docElem) return;
        Vivus.prototype.docElem = window.document.documentElement, requestAnimFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                return window.setTimeout(callback, 1e3 / 60);
            };
        }()), cancelAnimFrame = (function () {
            return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
                return window.clearTimeout(id);
            };
        }());
    }, parsePositiveInt = function (value, defaultValue) {
        var output = parseInt(value, 10);
        return output >= 0 ? output : defaultValue;
    }, typeof define === 'function' && define.amd ? define([], function () {
        return Vivus;
    }) : typeof exports === 'object' ? module.exports = Vivus : window.Vivus = Vivus;
}()),
(function (global) {
    var startY = 0;
    var enabled = !1;
    var supportsPassiveOption = !1;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = !0;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {}
    var handleTouchmove = function (evt) {
        var el = evt.target;
        while (el !== document.body && el !== document) {
            var style = window.getComputedStyle(el);
            if (!style) break;
            if (el.nodeName === 'INPUT' && el.getAttribute('type') === 'range') return;
            var scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
            var overflowY = style.getPropertyValue('overflow-y');
            var height = parseInt(style.getPropertyValue('height'), 10);
            var isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
            var canScroll = el.scrollHeight > el.offsetHeight;
            if (isScrollable && canScroll) {
                var curY = evt.touches ? evt.touches[0].screenY : evt.screenY;
                var isAtTop = startY <= curY && el.scrollTop === 0;
                var isAtBottom = startY >= curY && el.scrollHeight - el.scrollTop === height;
                (isAtTop || isAtBottom) && evt.preventDefault();
                return;
            }
            el = el.parentNode;
        }
        evt.preventDefault();
    };
    var handleTouchstart = function (evt) {
        startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
    };
    var enable = function () {
        window.addEventListener('touchstart', handleTouchstart, supportsPassiveOption ? {
            passive: !1
        } : !1), window.addEventListener('touchmove', handleTouchmove, supportsPassiveOption ? {
            passive: !1
        } : !1), enabled = !0;
    };
    var disable = function () {
        window.removeEventListener('touchstart', handleTouchstart, !1), window.removeEventListener('touchmove', handleTouchmove, !1), enabled = !1;
    };
    var isEnabled = function () {
        return enabled;
    };
    var testDiv = document.createElement('div');
    document.documentElement.appendChild(testDiv), testDiv.style.WebkitOverflowScrolling = 'touch';
    var scrollSupport = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
    document.documentElement.removeChild(testDiv), scrollSupport && enable();
    var iNoBounce = {
        enable: enable,
        disable: disable,
        isEnabled: isEnabled
    };
    typeof module !== 'undefined' && module.exports && (module.exports = iNoBounce), typeof global.define === 'function' ? (function (define) {
        define('iNoBounce', [], function () {
            return iNoBounce;
        });
    }(global.define)) : global.iNoBounce = iNoBounce;
}(this)), iNoBounce.disable(),
(function () {
    function l (a, b) {
        document.addEventListener ? a.addEventListener('scroll', b, !1) : a.attachEvent('scroll', b);
    }

    function m (a) {
        document.body ? a() : document.addEventListener ? document.addEventListener('DOMContentLoaded', function c () {
            document.removeEventListener('DOMContentLoaded', c), a();
        }) : document.attachEvent('onreadystatechange', function k () {
            if (document.readyState == 'interactive' || document.readyState == 'complete') document.detachEvent('onreadystatechange', k), a();
        });
    }

    function t (a) {
        this.a = document.createElement('div'), this.a.setAttribute('aria-hidden', 'true'), this.a.appendChild(document.createTextNode(a)), this.b = document.createElement('span'), this.c = document.createElement('span'), this.h = document.createElement('span'), this.f = document.createElement('span'), this.g = -1, this.b.style.cssText = 'max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;', this.c.style.cssText = 'max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;', this.f.style.cssText = 'max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;', this.h.style.cssText = 'display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;', this.b.appendChild(this.h), this.c.appendChild(this.f), this.a.appendChild(this.b), this.a.appendChild(this.c);
    }

    function u (a, b) {
        a.a.style.cssText = 'max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:' + b + ';';
    }

    function z (a) {
        var b = a.a.offsetWidth;
        var c = b + 100;
        return a.f.style.width = c + 'px', a.c.scrollLeft = c, a.b.scrollLeft = a.b.scrollWidth + 100, a.g !== b ? (a.g = b, !0) : !1;
    }

    function A (a, b) {
        function c () {
            var a = k;
            z(a) && a.a.parentNode && b(a.g);
        }
        var k = a;
        l(a.b, c), l(a.c, c), z(a);
    }

    function B (a, b) {
        var c = b || {};
        this.family = a, this.style = c.style || 'normal', this.weight = c.weight || 'normal', this.stretch = c.stretch || 'normal';
    }

    function G () {
        if (D === null) {
            if (J() && /Apple/.test(window.navigator.vendor)) {
                var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
                D = !!a && parseInt(a[1], 10) < 603;
            } else D = !1;
        }
        return D;
    }

    function J () {
        return F === null && (F = !!document.fonts), F;
    }

    function K () {
        if (E === null) {
            var a = document.createElement('div');
            try {
                a.style.font = 'condensed 100px sans-serif';
            } catch (b) {}
            E = a.style.font !== '';
        }
        return E;
    }

    function L (a, b) {
        return [a.style, a.weight, K() ? a.stretch : '', '100px', b].join(' ');
    }
    var C = null;
    var D = null;
    var E = null;
    var F = null;
    B.prototype.load = function (a, b) {
        var c = this;
        var k = a || 'BESbswy';
        var r = 0;
        var n = b || 3e3;
        var H = (new Date()).getTime();
        return new Promise(function (a, b) {
            if (J() && !G()) {
                var M = new Promise(function (a, b) {
                    function e () {
                        (new Date()).getTime() - H >= n ? b(Error('' + n + 'ms timeout exceeded')) : document.fonts.load(L(c, '"' + c.family + '"'), k).then(function (c) {
                            c.length >= 1 ? a() : setTimeout(e, 25);
                        }, b);
                    }
                    e();
                });
                var N = new Promise(function (a, c) {
                    r = setTimeout(function () {
                        c(Error('' + n + 'ms timeout exceeded'));
                    }, n);
                });
                Promise.race([N, M]).then(function () {
                    clearTimeout(r), a(c);
                }, b);
            } else {
                m(function () {
                    function v () {
                        var b;
                        if (b = f != -1 && g != -1 || f != -1 && h != -1 || g != -1 && h != -1)(b = f != g && f != h && g != h) || (C === null && (b = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), C = !!b && (parseInt(b[1], 10) < 536 || parseInt(b[1], 10) === 536 && parseInt(b[2], 10) <= 11)), b = C && (f == w && g == w && h == w || f == x && g == x && h == x || f == y && g == y && h == y)), b = !b;
                        b && (d.parentNode && d.parentNode.removeChild(d), clearTimeout(r), a(c));
                    }

                    function I () {
                        if ((new Date()).getTime() - H >= n) d.parentNode && d.parentNode.removeChild(d), b(Error('' + n + 'ms timeout exceeded'));
                        else {
                            var a = document.hidden;
                            if (!0 === a || void 0 === a) f = e.a.offsetWidth, g = p.a.offsetWidth, h = q.a.offsetWidth, v();
                            r = setTimeout(I, 50);
                        }
                    }
                    var e = new t(k);
                    var p = new t(k);
                    var q = new t(k);
                    var f = -1;
                    var g = -1;
                    var h = -1;
                    var w = -1;
                    var x = -1;
                    var y = -1;
                    var d = document.createElement('div');
                    d.dir = 'ltr', u(e, L(c, 'sans-serif')), u(p, L(c, 'serif')), u(q, L(c, 'monospace')), d.appendChild(e.a), d.appendChild(p.a), d.appendChild(q.a), document.body.appendChild(d), w = e.a.offsetWidth, x = p.a.offsetWidth, y = q.a.offsetWidth, I(), A(e, function (a) {
                        f = a, v();
                    }), u(e, L(c, '"' + c.family + '",sans-serif')), A(p, function (a) {
                        g = a, v();
                    }), u(p, L(c, '"' + c.family + '",serif')), A(q, function (a) {
                        h = a, v();
                    }), u(q, L(c, '"' + c.family + '",monospace'));
                });
            }
        });
    }, typeof module === 'object' ? module.exports = B : (window.FontFaceObserver = B, window.FontFaceObserver.prototype.load = B.prototype.load);
}());
