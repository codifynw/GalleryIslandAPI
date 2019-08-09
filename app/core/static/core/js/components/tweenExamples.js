// http://www.olouen.com/menu

const _activateAbout = function () {
    var e = this;
    TweenMax.killTweensOf(this._ui.infoBar);
    TweenMax.to(this._ui.infoBar, 1, {
        x: '0%',
        scaleX: 1,
        ease: 'Power4.easeOut'
    });
    TweenMax.killTweensOf(this._ui.infoText1);
    TweenMax.to(this._ui.infoText1, 0.3, {
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: function () {
            TweenMax.to(e._ui.infoText2, 0.3, {
                opacity: 1,
                ease: 'Power2.easeOut'
            });
        }
    });
};

const _deactivateAbout = function () {
    var e = this;
    TweenMax.killTweensOf(this._ui.infoBar);
    TweenMax.to(this._ui.infoBar, 1, {
        x: '29%',
        scaleX: 0,
        ease: 'Power4.easeOut'
    });
    TweenMax.killTweensOf(this._ui.infoText2);
    TweenMax.to(this._ui.infoText2, 0.3, {
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: function () {
            TweenMax.to(e._ui.infoText1, 0.3, {
                opacity: 1,
                ease: 'Power2.easeOut'
            });
        }
    });
};

const _showLine = function () {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).delay;
    var t = void 0 === e ? 0 : e;
    TweenMax.killTweensOf(this._onDelayedHide);
    this.el.style.display = 'block';
    for (var i = 0; i < this._menuItems.length; i++) {
        this._menuItems[i].show({
            delay: t + 0.075 * i
        });
    }
};

const _setupMenu = function () {
    this._projectData = U.a.resources.getJSON('projects').media.projects;
    for (var e = 0; e < this._projectData.length; e++) {
        var t = this._projectData[e];
        var i = document.createElement('div');
        i.classList.add('menu__item');
        var n = t.title.replace('{SPACE}', ' ');
        i.innerHTML = n;
        var r = new Ke({
            el: i,
            parent: this._ui.container,
            index: e
        });
        this._menuItems.push(r);
    }
};

const activateProject = function (e) {
    this._projects[this._index].deactivateMask(e);
    this._projects[this._index].showText(e);
    this._projects[this._index].activateText(e);
    this._showSee && (this._showSee = !1, c.a.killTweensOf(this._see), c.a.to(this._see, 0.2, {
        opacity: 0,
        ease: 'Power2.easeOut'
    }));
    this.deactivateMenu();
};

const _activateProject = function () {
    var e = this;
    TweenMax.killTweensOf(this._ui.titleText1), TweenMax.to(this._ui.titleText1, 0.3, {
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: function () {
            TweenMax.to(e._ui.titleText2, 0.3, {
                opacity: 1,
                ease: 'Power2.easeOut'
            });
        }
    });
};

const deactivateProject = function () {
    this._scrollValue = 0;
    this._projects[this._index].activateMask();
    this._projects[this._index].deactivateProject();
    this._projects[this._index].deactivateText();
};

const _deactivateProject = function () {
    var e = this;
    TweenMax.killTweensOf(this._ui.titleBar);
    TweenMax.to(this._ui.titleBar, 1, {
        scaleX: 0,
        ease: 'Power4.easeOut'
    });
    TweenMax.killTweensOf(this._ui.titleText2);
    TweenMax.to(this._ui.titleText2, 0.3, {
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: function () {
            TweenMax.to(e._ui.titleText1, 0.3, {
                opacity: 1,
                ease: 'Power2.easeOut'
            });
        }
    });
};

const _activateMenu = function () {
    var e = this;
    this.el.classList.add('menuActive');
    TweenMax.killTweensOf(this.el);
    TweenMax.to(this.el, 2, {
        color: 'white',
        ease: 'Power2.easeOut'
    });
    TweenMax.killTweensOf(this._ui.projectsBar);
    TweenMax.to(this._ui.projectsBar, 1, {
        scaleX: 0.65,
        ease: 'Power4.easeOut'
    });
    TweenMax.killTweensOf(this._ui.projectsText1);
    TweenMax.to(this._ui.projectsText1, 0.3, {
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete: function () {
            TweenMax.to(e._ui.projectsText2, 0.3, {
                opacity: 1,
                ease: 'Power2.easeOut'
            });
        }
    });
};
