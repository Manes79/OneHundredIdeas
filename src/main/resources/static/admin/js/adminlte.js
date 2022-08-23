/*!
 * AdminLTE v3.2.0 (https://adminlte.io)
 * Copyright 2014-2022 Colorlib <https://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
        typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.adminlte = {}, global.jQuery));
})(this, (function (exports, $) {
    'use strict';

    function _interopDefaultLegacy(e) {
        return e && typeof e === 'object' && 'default' in e ? e : {'default': e};
    }

    const $__default = /*#__PURE__*/_interopDefaultLegacy($);

    /**
     * --------------------------------------------
     * AdminLTE CardRefresh.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$e = 'CardRefresh';
    const DATA_KEY$e = 'lte.cardrefresh';
    const EVENT_KEY$7 = "." + DATA_KEY$e;
    const JQUERY_NO_CONFLICT$e = $__default["default"].fn[NAME$e];
    const EVENT_LOADED = "loaded" + EVENT_KEY$7;
    const EVENT_OVERLAY_ADDED = "overlay.added" + EVENT_KEY$7;
    const EVENT_OVERLAY_REMOVED = "overlay.removed" + EVENT_KEY$7;
    const CLASS_NAME_CARD$1 = 'card';
    const SELECTOR_CARD$1 = "." + CLASS_NAME_CARD$1;
    const SELECTOR_DATA_REFRESH = '[data-card-widget="card-refresh"]';
    const Default$c = {
        source: '',
        sourceSelector: '',
        params: {},
        trigger: SELECTOR_DATA_REFRESH,
        content: '.card-body',
        loadInContent: true,
        loadOnInit: true,
        loadErrorTemplate: true,
        responseType: '',
        overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
        errorTemplate: '<span class="text-danger"></span>',
        onLoadStart: function onLoadStart() {
        },
        onLoadDone: function onLoadDone(response) {
            return response;
        },
        onLoadFail: function onLoadFail(_jqXHR, _textStatus, _errorThrown) {
        }
    };

    const CardRefresh = /*#__PURE__*/function () {
        function CardRefresh(element, settings) {
            this._element = element;
            this._parent = element.parents(SELECTOR_CARD$1).first();
            this._settings = $__default["default"].extend({}, Default$c, settings);
            this._overlay = $__default["default"](this._settings.overlayTemplate);

            if (element.hasClass(CLASS_NAME_CARD$1)) {
                this._parent = element;
            }

            if (this._settings.source === '') {
                throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
            }
        }

        const _proto = CardRefresh.prototype;

        _proto.load = function load() {
            const _this = this;

            this._addOverlay();

            this._settings.onLoadStart.call($__default["default"](this));

            $__default["default"].get(this._settings.source, this._settings.params, function (response) {
                if (_this._settings.loadInContent) {
                    if (_this._settings.sourceSelector !== '') {
                        response = $__default["default"](response).find(_this._settings.sourceSelector).html();
                    }

                    _this._parent.find(_this._settings.content).html(response);
                }

                _this._settings.onLoadDone.call($__default["default"](_this), response);

                _this._removeOverlay();
            }, this._settings.responseType !== '' && this._settings.responseType).fail(function (jqXHR, textStatus, errorThrown) {
                _this._removeOverlay();

                if (_this._settings.loadErrorTemplate) {
                    const msg = $__default["default"](_this._settings.errorTemplate).text(errorThrown);

                    _this._parent.find(_this._settings.content).empty().append(msg);
                }

                _this._settings.onLoadFail.call($__default["default"](_this), jqXHR, textStatus, errorThrown);
            });
            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_LOADED));
        };

        _proto._addOverlay = function _addOverlay() {
            this._parent.append(this._overlay);

            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_OVERLAY_ADDED));
        };

        _proto._removeOverlay = function _removeOverlay() {
            this._parent.find(this._overlay).remove();

            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_OVERLAY_REMOVED));
        } // Private
        ;

        _proto._init = function _init() {
            const _this2 = this;

            $__default["default"](this).find(this._settings.trigger).on('click', function () {
                _this2.load();
            });

            if (this._settings.loadOnInit) {
                this.load();
            }
        } // Static
        ;

        CardRefresh._jQueryInterface = function _jQueryInterface(config) {
            let data = $__default["default"](this).data(DATA_KEY$e);

            const _options = $__default["default"].extend({}, Default$c, $__default["default"](this).data());

            if (!data) {
                data = new CardRefresh($__default["default"](this), _options);
                $__default["default"](this).data(DATA_KEY$e, typeof config === 'string' ? data : config);
            }

            if (typeof config === 'string' && /load/.test(config)) {
                data[config]();
            } else {
                data._init($__default["default"](this));
            }
        };

        return CardRefresh;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_DATA_REFRESH, function (event) {
        if (event) {
            event.preventDefault();
        }

        CardRefresh._jQueryInterface.call($__default["default"](this), 'load');
    });
    $__default["default"](function () {
        $__default["default"](SELECTOR_DATA_REFRESH).each(function () {
            CardRefresh._jQueryInterface.call($__default["default"](this));
        });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$e] = CardRefresh._jQueryInterface;
    $__default["default"].fn[NAME$e].Constructor = CardRefresh;

    $__default["default"].fn[NAME$e].noConflict = function () {
        $__default["default"].fn[NAME$e] = JQUERY_NO_CONFLICT$e;
        return CardRefresh._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE CardWidget.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$d = 'CardWidget';
    const DATA_KEY$d = 'lte.cardwidget';
    const EVENT_KEY$6 = "." + DATA_KEY$d;
    const JQUERY_NO_CONFLICT$d = $__default["default"].fn[NAME$d];
    const EVENT_EXPANDED$3 = "expanded" + EVENT_KEY$6;
    const EVENT_COLLAPSED$4 = "collapsed" + EVENT_KEY$6;
    const EVENT_MAXIMIZED = "maximized" + EVENT_KEY$6;
    const EVENT_MINIMIZED = "minimized" + EVENT_KEY$6;
    const EVENT_REMOVED$1 = "removed" + EVENT_KEY$6;
    const CLASS_NAME_CARD = 'card';
    const CLASS_NAME_COLLAPSED$1 = 'collapsed-card';
    const CLASS_NAME_COLLAPSING = 'collapsing-card';
    const CLASS_NAME_EXPANDING = 'expanding-card';
    const CLASS_NAME_WAS_COLLAPSED = 'was-collapsed';
    const CLASS_NAME_MAXIMIZED = 'maximized-card';
    const SELECTOR_DATA_REMOVE = '[data-card-widget="remove"]';
    const SELECTOR_DATA_COLLAPSE = '[data-card-widget="collapse"]';
    const SELECTOR_DATA_MAXIMIZE = '[data-card-widget="maximize"]';
    const SELECTOR_CARD = "." + CLASS_NAME_CARD;
    const SELECTOR_CARD_HEADER = '.card-header';
    const SELECTOR_CARD_BODY = '.card-body';
    const SELECTOR_CARD_FOOTER = '.card-footer';
    const Default$b = {
        animationSpeed: 'normal',
        collapseTrigger: SELECTOR_DATA_COLLAPSE,
        removeTrigger: SELECTOR_DATA_REMOVE,
        maximizeTrigger: SELECTOR_DATA_MAXIMIZE,
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        maximizeIcon: 'fa-expand',
        minimizeIcon: 'fa-compress'
    };

    const CardWidget = /*#__PURE__*/function () {
        function CardWidget(element, settings) {
            this._element = element;
            this._parent = element.parents(SELECTOR_CARD).first();

            if (element.hasClass(CLASS_NAME_CARD)) {
                this._parent = element;
            }

            this._settings = $__default["default"].extend({}, Default$b, settings);
        }

        const _proto = CardWidget.prototype;

        _proto.collapse = function collapse() {
            const _this = this;

            this._parent.addClass(CLASS_NAME_COLLAPSING).children(SELECTOR_CARD_BODY + ", " + SELECTOR_CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
                _this._parent.addClass(CLASS_NAME_COLLAPSED$1).removeClass(CLASS_NAME_COLLAPSING);
            });

            this._parent.find("> " + SELECTOR_CARD_HEADER + " " + this._settings.collapseTrigger + " ." + this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);

            this._element.trigger($__default["default"].Event(EVENT_COLLAPSED$4), this._parent);
        };

        _proto.expand = function expand() {
            const _this2 = this;

            this._parent.addClass(CLASS_NAME_EXPANDING).children(SELECTOR_CARD_BODY + ", " + SELECTOR_CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
                _this2._parent.removeClass(CLASS_NAME_COLLAPSED$1).removeClass(CLASS_NAME_EXPANDING);
            });

            this._parent.find("> " + SELECTOR_CARD_HEADER + " " + this._settings.collapseTrigger + " ." + this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);

            this._element.trigger($__default["default"].Event(EVENT_EXPANDED$3), this._parent);
        };

        _proto.remove = function remove() {
            this._parent.slideUp();

            this._element.trigger($__default["default"].Event(EVENT_REMOVED$1), this._parent);
        };

        _proto.toggle = function toggle() {
            if (this._parent.hasClass(CLASS_NAME_COLLAPSED$1)) {
                this.expand();
                return;
            }

            this.collapse();
        };

        _proto.maximize = function maximize() {
            this._parent.find(this._settings.maximizeTrigger + " ." + this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon);

            this._parent.css({
                height: this._parent.height(),
                width: this._parent.width(),
                transition: 'all .15s'
            }).delay(150).queue(function () {
                const $element = $__default["default"](this);
                $element.addClass(CLASS_NAME_MAXIMIZED);
                $__default["default"]('html').addClass(CLASS_NAME_MAXIMIZED);

                if ($element.hasClass(CLASS_NAME_COLLAPSED$1)) {
                    $element.addClass(CLASS_NAME_WAS_COLLAPSED);
                }

                $element.dequeue();
            });

            this._element.trigger($__default["default"].Event(EVENT_MAXIMIZED), this._parent);
        };

        _proto.minimize = function minimize() {
            this._parent.find(this._settings.maximizeTrigger + " ." + this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon);

            this._parent.css('cssText', "height: " + this._parent[0].style.height + " !important; width: " + this._parent[0].style.width + " !important; transition: all .15s;").delay(10).queue(function () {
                const $element = $__default["default"](this);
                $element.removeClass(CLASS_NAME_MAXIMIZED);
                $__default["default"]('html').removeClass(CLASS_NAME_MAXIMIZED);
                $element.css({
                    height: 'inherit',
                    width: 'inherit'
                });

                if ($element.hasClass(CLASS_NAME_WAS_COLLAPSED)) {
                    $element.removeClass(CLASS_NAME_WAS_COLLAPSED);
                }

                $element.dequeue();
            });

            this._element.trigger($__default["default"].Event(EVENT_MINIMIZED), this._parent);
        };

        _proto.toggleMaximize = function toggleMaximize() {
            if (this._parent.hasClass(CLASS_NAME_MAXIMIZED)) {
                this.minimize();
                return;
            }

            this.maximize();
        } // Private
        ;

        _proto._init = function _init(card) {
            const _this3 = this;

            this._parent = card;
            $__default["default"](this).find(this._settings.collapseTrigger).click(function () {
                _this3.toggle();
            });
            $__default["default"](this).find(this._settings.maximizeTrigger).click(function () {
                _this3.toggleMaximize();
            });
            $__default["default"](this).find(this._settings.removeTrigger).click(function () {
                _this3.remove();
            });
        } // Static
        ;

        CardWidget._jQueryInterface = function _jQueryInterface(config) {
            let data = $__default["default"](this).data(DATA_KEY$d);

            const _options = $__default["default"].extend({}, Default$b, $__default["default"](this).data());

            if (!data) {
                data = new CardWidget($__default["default"](this), _options);
                $__default["default"](this).data(DATA_KEY$d, typeof config === 'string' ? data : config);
            }

            if (typeof config === 'string' && /collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/.test(config)) {
                data[config]();
            } else if (typeof config === 'object') {
                data._init($__default["default"](this));
            }
        };

        return CardWidget;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_DATA_COLLAPSE, function (event) {
        if (event) {
            event.preventDefault();
        }

        CardWidget._jQueryInterface.call($__default["default"](this), 'toggle');
    });
    $__default["default"](document).on('click', SELECTOR_DATA_REMOVE, function (event) {
        if (event) {
            event.preventDefault();
        }

        CardWidget._jQueryInterface.call($__default["default"](this), 'remove');
    });
    $__default["default"](document).on('click', SELECTOR_DATA_MAXIMIZE, function (event) {
        if (event) {
            event.preventDefault();
        }

        CardWidget._jQueryInterface.call($__default["default"](this), 'toggleMaximize');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$d] = CardWidget._jQueryInterface;
    $__default["default"].fn[NAME$d].Constructor = CardWidget;

    $__default["default"].fn[NAME$d].noConflict = function () {
        $__default["default"].fn[NAME$d] = JQUERY_NO_CONFLICT$d;
        return CardWidget._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE ControlSidebar.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$c = 'ControlSidebar';
    const DATA_KEY$c = 'lte.controlsidebar';
    const EVENT_KEY$5 = "." + DATA_KEY$c;
    const JQUERY_NO_CONFLICT$c = $__default["default"].fn[NAME$c];
    const EVENT_COLLAPSED$3 = "collapsed" + EVENT_KEY$5;
    const EVENT_COLLAPSED_DONE$1 = "collapsed-done" + EVENT_KEY$5;
    const EVENT_EXPANDED$2 = "expanded" + EVENT_KEY$5;
    const SELECTOR_CONTROL_SIDEBAR = '.control-sidebar';
    const SELECTOR_CONTROL_SIDEBAR_CONTENT$1 = '.control-sidebar-content';
    const SELECTOR_DATA_TOGGLE$4 = '[data-widget="control-sidebar"]';
    const SELECTOR_HEADER$1 = '.main-header';
    const SELECTOR_FOOTER$1 = '.main-footer';
    const CLASS_NAME_CONTROL_SIDEBAR_ANIMATE = 'control-sidebar-animate';
    const CLASS_NAME_CONTROL_SIDEBAR_OPEN$1 = 'control-sidebar-open';
    const CLASS_NAME_CONTROL_SIDEBAR_SLIDE = 'control-sidebar-slide-open';
    const CLASS_NAME_LAYOUT_FIXED$1 = 'layout-fixed';
    const CLASS_NAME_NAVBAR_FIXED = 'layout-navbar-fixed';
    const CLASS_NAME_NAVBAR_SM_FIXED = 'layout-sm-navbar-fixed';
    const CLASS_NAME_NAVBAR_MD_FIXED = 'layout-md-navbar-fixed';
    const CLASS_NAME_NAVBAR_LG_FIXED = 'layout-lg-navbar-fixed';
    const CLASS_NAME_NAVBAR_XL_FIXED = 'layout-xl-navbar-fixed';
    const CLASS_NAME_FOOTER_FIXED = 'layout-footer-fixed';
    const CLASS_NAME_FOOTER_SM_FIXED = 'layout-sm-footer-fixed';
    const CLASS_NAME_FOOTER_MD_FIXED = 'layout-md-footer-fixed';
    const CLASS_NAME_FOOTER_LG_FIXED = 'layout-lg-footer-fixed';
    const CLASS_NAME_FOOTER_XL_FIXED = 'layout-xl-footer-fixed';
    const Default$a = {
        controlsidebarSlide: true,
        scrollbarTheme: 'os-theme-light',
        scrollbarAutoHide: 'l',
        target: SELECTOR_CONTROL_SIDEBAR,
        animationSpeed: 300
    };
    /**
     * Class Definition
     * ====================================================
     */
    const ControlSidebar = /*#__PURE__*/function () {
        function ControlSidebar(element, config) {
            this._element = element;
            this._config = config;
        } // Public


        const _proto = ControlSidebar.prototype;

        _proto.collapse = function collapse() {
            const _this = this;

            const $body = $__default["default"]('body');
            const $html = $__default["default"]('html'); // Show the control sidebar

            if (this._config.controlsidebarSlide) {
                $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
                $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
                    $__default["default"](SELECTOR_CONTROL_SIDEBAR).hide();
                    $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
                    $__default["default"](this).dequeue();
                });
            } else {
                $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1);
            }

            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_COLLAPSED$3));
            setTimeout(function () {
                $__default["default"](_this._element).trigger($__default["default"].Event(EVENT_COLLAPSED_DONE$1));
            }, this._config.animationSpeed);
        };

        _proto.show = function show(toggle) {
            if (toggle === void 0) {
                toggle = false;
            }

            const $body = $__default["default"]('body');
            const $html = $__default["default"]('html');

            if (toggle) {
                $__default["default"](SELECTOR_CONTROL_SIDEBAR).hide();
            } // Collapse the control sidebar


            if (this._config.controlsidebarSlide) {
                $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
                $__default["default"](this._config.target).show().delay(10).queue(function () {
                    $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
                        $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
                        $__default["default"](this).dequeue();
                    });
                    $__default["default"](this).dequeue();
                });
            } else {
                $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1);
            }

            this._fixHeight();

            this._fixScrollHeight();

            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_EXPANDED$2));
        };

        _proto.toggle = function toggle() {
            const $body = $__default["default"]('body');
            const target = this._config.target;
            const notVisible = !$__default["default"](target).is(':visible');
            const shouldClose = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);
            const shouldToggle = notVisible && ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE));

            if (notVisible || shouldToggle) {
                // Open the control sidebar
                this.show(notVisible);
            } else if (shouldClose) {
                // Close the control sidebar
                this.collapse();
            }
        } // Private
        ;

        _proto._init = function _init() {
            const _this2 = this;

            const $body = $__default["default"]('body');
            const shouldNotHideAll = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);

            if (shouldNotHideAll) {
                $__default["default"](SELECTOR_CONTROL_SIDEBAR).not(this._config.target).hide();
                $__default["default"](this._config.target).css('display', 'block');
            } else {
                $__default["default"](SELECTOR_CONTROL_SIDEBAR).hide();
            }

            this._fixHeight();

            this._fixScrollHeight();

            $__default["default"](window).resize(function () {
                _this2._fixHeight();

                _this2._fixScrollHeight();
            });
            $__default["default"](window).scroll(function () {
                const $body = $__default["default"]('body');
                const shouldFixHeight = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);

                if (shouldFixHeight) {
                    _this2._fixScrollHeight();
                }
            });
        };

        _proto._isNavbarFixed = function _isNavbarFixed() {
            const $body = $__default["default"]('body');
            return $body.hasClass(CLASS_NAME_NAVBAR_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_SM_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_MD_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_LG_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_XL_FIXED);
        };

        _proto._isFooterFixed = function _isFooterFixed() {
            const $body = $__default["default"]('body');
            return $body.hasClass(CLASS_NAME_FOOTER_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED);
        };

        _proto._fixScrollHeight = function _fixScrollHeight() {
            const $body = $__default["default"]('body');
            const $controlSidebar = $__default["default"](this._config.target);

            if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED$1)) {
                return;
            }

            const heights = {
                scroll: $__default["default"](document).height(),
                window: $__default["default"](window).height(),
                header: $__default["default"](SELECTOR_HEADER$1).outerHeight(),
                footer: $__default["default"](SELECTOR_FOOTER$1).outerHeight()
            };
            const positions = {
                bottom: Math.abs(heights.window + $__default["default"](window).scrollTop() - heights.scroll),
                top: $__default["default"](window).scrollTop()
            };
            const navbarFixed = this._isNavbarFixed() && $__default["default"](SELECTOR_HEADER$1).css('position') === 'fixed';
            const footerFixed = this._isFooterFixed() && $__default["default"](SELECTOR_FOOTER$1).css('position') === 'fixed';
            const $controlsidebarContent = $__default["default"](this._config.target + ", " + this._config.target + " " + SELECTOR_CONTROL_SIDEBAR_CONTENT$1);

            if (positions.top === 0 && positions.bottom === 0) {
                $controlSidebar.css({
                    bottom: heights.footer,
                    top: heights.header
                });
                $controlsidebarContent.css('height', heights.window - (heights.header + heights.footer));
            } else if (positions.bottom <= heights.footer) {
                if (footerFixed === false) {
                    const top = heights.header - positions.top;
                    $controlSidebar.css('bottom', heights.footer - positions.bottom).css('top', top >= 0 ? top : 0);
                    $controlsidebarContent.css('height', heights.window - (heights.footer - positions.bottom));
                } else {
                    $controlSidebar.css('bottom', heights.footer);
                }
            } else if (positions.top <= heights.header) {
                if (navbarFixed === false) {
                    $controlSidebar.css('top', heights.header - positions.top);
                    $controlsidebarContent.css('height', heights.window - (heights.header - positions.top));
                } else {
                    $controlSidebar.css('top', heights.header);
                }
            } else if (navbarFixed === false) {
                $controlSidebar.css('top', 0);
                $controlsidebarContent.css('height', heights.window);
            } else {
                $controlSidebar.css('top', heights.header);
            }

            if (footerFixed && navbarFixed) {
                $controlsidebarContent.css('height', '100%');
                $controlSidebar.css('height', '');
            } else if (footerFixed || navbarFixed) {
                $controlsidebarContent.css('height', '100%');
                $controlsidebarContent.css('height', '');
            }
        };

        _proto._fixHeight = function _fixHeight() {
            const $body = $__default["default"]('body');
            const $controlSidebar = $__default["default"](this._config.target + " " + SELECTOR_CONTROL_SIDEBAR_CONTENT$1);

            if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED$1)) {
                $controlSidebar.attr('style', '');
                return;
            }

            const heights = {
                window: $__default["default"](window).height(),
                header: $__default["default"](SELECTOR_HEADER$1).outerHeight(),
                footer: $__default["default"](SELECTOR_FOOTER$1).outerHeight()
            };
            let sidebarHeight = heights.window - heights.header;

            if (this._isFooterFixed() && $__default["default"](SELECTOR_FOOTER$1).css('position') === 'fixed') {
                sidebarHeight = heights.window - heights.header - heights.footer;
            }

            $controlSidebar.css('height', sidebarHeight);

            if (typeof $__default["default"].fn.overlayScrollbars !== 'undefined') {
                $controlSidebar.overlayScrollbars({
                    className: this._config.scrollbarTheme,
                    sizeAutoCapable: true,
                    scrollbars: {
                        autoHide: this._config.scrollbarAutoHide,
                        clickScrolling: true
                    }
                });
            }
        } // Static
        ;

        ControlSidebar._jQueryInterface = function _jQueryInterface(operation) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$c);

                const _options = $__default["default"].extend({}, Default$a, $__default["default"](this).data());

                if (!data) {
                    data = new ControlSidebar(this, _options);
                    $__default["default"](this).data(DATA_KEY$c, data);
                }

                if (data[operation] === 'undefined') {
                    throw new Error(operation + " is not a function");
                }

                data[operation]();
            });
        };

        return ControlSidebar;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_DATA_TOGGLE$4, function (event) {
        event.preventDefault();

        ControlSidebar._jQueryInterface.call($__default["default"](this), 'toggle');
    });
    $__default["default"](document).ready(function () {
        ControlSidebar._jQueryInterface.call($__default["default"](SELECTOR_DATA_TOGGLE$4), '_init');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$c] = ControlSidebar._jQueryInterface;
    $__default["default"].fn[NAME$c].Constructor = ControlSidebar;

    $__default["default"].fn[NAME$c].noConflict = function () {
        $__default["default"].fn[NAME$c] = JQUERY_NO_CONFLICT$c;
        return ControlSidebar._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE DirectChat.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$b = 'DirectChat';
    const DATA_KEY$b = 'lte.directchat';
    const EVENT_KEY$4 = "." + DATA_KEY$b;
    const JQUERY_NO_CONFLICT$b = $__default["default"].fn[NAME$b];
    const EVENT_TOGGLED = "toggled" + EVENT_KEY$4;
    const SELECTOR_DATA_TOGGLE$3 = '[data-widget="chat-pane-toggle"]';
    const SELECTOR_DIRECT_CHAT = '.direct-chat';
    const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open';
    /**
     * Class Definition
     * ====================================================
     */
    const DirectChat = /*#__PURE__*/function () {
        function DirectChat(element) {
            this._element = element;
        }

        const _proto = DirectChat.prototype;

        _proto.toggle = function toggle() {
            $__default["default"](this._element).parents(SELECTOR_DIRECT_CHAT).first().toggleClass(CLASS_NAME_DIRECT_CHAT_OPEN);
            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_TOGGLED));
        } // Static
        ;

        DirectChat._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$b);

                if (!data) {
                    data = new DirectChat($__default["default"](this));
                    $__default["default"](this).data(DATA_KEY$b, data);
                }

                data[config]();
            });
        };

        return DirectChat;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_DATA_TOGGLE$3, function (event) {
        if (event) {
            event.preventDefault();
        }

        DirectChat._jQueryInterface.call($__default["default"](this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$b] = DirectChat._jQueryInterface;
    $__default["default"].fn[NAME$b].Constructor = DirectChat;

    $__default["default"].fn[NAME$b].noConflict = function () {
        $__default["default"].fn[NAME$b] = JQUERY_NO_CONFLICT$b;
        return DirectChat._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE Dropdown.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$a = 'Dropdown';
    const DATA_KEY$a = 'lte.dropdown';
    const JQUERY_NO_CONFLICT$a = $__default["default"].fn[NAME$a];
    const SELECTOR_NAVBAR = '.navbar';
    const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
    const SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show';
    const SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]';
    const CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right';
    const CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'; // TODO: this is unused; should be removed along with the extend?

    const Default$9 = {};
    /**
     * Class Definition
     * ====================================================
     */
    const Dropdown = /*#__PURE__*/function () {
        function Dropdown(element, config) {
            this._config = config;
            this._element = element;
        } // Public


        const _proto = Dropdown.prototype;

        _proto.toggleSubmenu = function toggleSubmenu() {
            this._element.siblings().show().toggleClass('show');

            if (!this._element.next().hasClass('show')) {
                this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide();
            }

            this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
                $__default["default"]('.dropdown-submenu .show').removeClass('show').hide();
            });
        };

        _proto.fixPosition = function fixPosition() {
            const $element = $__default["default"](SELECTOR_DROPDOWN_MENU_ACTIVE);

            if ($element.length === 0) {
                return;
            }

            if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
                $element.css({
                    left: 'inherit',
                    right: 0
                });
            } else {
                $element.css({
                    left: 0,
                    right: 'inherit'
                });
            }

            const offset = $element.offset();
            const width = $element.width();
            const visiblePart = $__default["default"](window).width() - offset.left;

            if (offset.left < 0) {
                $element.css({
                    left: 'inherit',
                    right: offset.left - 5
                });
            } else if (visiblePart < width) {
                $element.css({
                    left: 'inherit',
                    right: 0
                });
            }
        } // Static
        ;

        Dropdown._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$a);

                const _config = $__default["default"].extend({}, Default$9, $__default["default"](this).data());

                if (!data) {
                    data = new Dropdown($__default["default"](this), _config);
                    $__default["default"](this).data(DATA_KEY$a, data);
                }

                if (config === 'toggleSubmenu' || config === 'fixPosition') {
                    data[config]();
                }
            });
        };

        return Dropdown;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](SELECTOR_DROPDOWN_MENU + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        Dropdown._jQueryInterface.call($__default["default"](this), 'toggleSubmenu');
    });
    $__default["default"](SELECTOR_NAVBAR + " " + SELECTOR_DROPDOWN_TOGGLE).on('click', function (event) {
        event.preventDefault();

        if ($__default["default"](event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
            return;
        }

        setTimeout(function () {
            Dropdown._jQueryInterface.call($__default["default"](this), 'fixPosition');
        }, 1);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$a] = Dropdown._jQueryInterface;
    $__default["default"].fn[NAME$a].Constructor = Dropdown;

    $__default["default"].fn[NAME$a].noConflict = function () {
        $__default["default"].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
        return Dropdown._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE ExpandableTable.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$9 = 'ExpandableTable';
    const DATA_KEY$9 = 'lte.expandableTable';
    const EVENT_KEY$3 = "." + DATA_KEY$9;
    const JQUERY_NO_CONFLICT$9 = $__default["default"].fn[NAME$9];
    const EVENT_EXPANDED$1 = "expanded" + EVENT_KEY$3;
    const EVENT_COLLAPSED$2 = "collapsed" + EVENT_KEY$3;
    const SELECTOR_TABLE = '.expandable-table';
    const SELECTOR_EXPANDABLE_BODY = '.expandable-body';
    const SELECTOR_DATA_TOGGLE$2 = '[data-widget="expandable-table"]';
    const SELECTOR_ARIA_ATTR = 'aria-expanded';
    /**
     * Class Definition
     * ====================================================
     */
    const ExpandableTable = /*#__PURE__*/function () {
        function ExpandableTable(element, options) {
            this._options = options;
            this._element = element;
        } // Public


        const _proto = ExpandableTable.prototype;

        _proto.init = function init() {
            $__default["default"](SELECTOR_DATA_TOGGLE$2).each(function (_, $header) {
                const $type = $__default["default"]($header).attr(SELECTOR_ARIA_ATTR);
                const $body = $__default["default"]($header).next(SELECTOR_EXPANDABLE_BODY).children().first().children();

                if ($type === 'true') {
                    $body.show();
                } else if ($type === 'false') {
                    $body.hide();
                    $body.parent().parent().addClass('d-none');
                }
            });
        };

        _proto.toggleRow = function toggleRow() {
            let $element = this._element;

            if ($element[0].nodeName !== 'TR') {
                $element = $element.parent();

                if ($element[0].nodeName !== 'TR') {
                    $element = $element.parent();
                }
            }

            const time = 500;
            const $type = $element.attr(SELECTOR_ARIA_ATTR);
            const $body = $element.next(SELECTOR_EXPANDABLE_BODY).children().first().children();
            $body.stop();

            if ($type === 'true') {
                $body.slideUp(time, function () {
                    $element.next(SELECTOR_EXPANDABLE_BODY).addClass('d-none');
                });
                $element.attr(SELECTOR_ARIA_ATTR, 'false');
                $element.trigger($__default["default"].Event(EVENT_COLLAPSED$2));
            } else if ($type === 'false') {
                $element.next(SELECTOR_EXPANDABLE_BODY).removeClass('d-none');
                $body.slideDown(time);
                $element.attr(SELECTOR_ARIA_ATTR, 'true');
                $element.trigger($__default["default"].Event(EVENT_EXPANDED$1));
            }
        } // Static
        ;

        ExpandableTable._jQueryInterface = function _jQueryInterface(operation) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$9);

                if (!data) {
                    data = new ExpandableTable($__default["default"](this));
                    $__default["default"](this).data(DATA_KEY$9, data);
                }

                if (typeof operation === 'string' && /init|toggleRow/.test(operation)) {
                    data[operation]();
                }
            });
        };

        return ExpandableTable;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](SELECTOR_TABLE).ready(function () {
        ExpandableTable._jQueryInterface.call($__default["default"](this), 'init');
    });
    $__default["default"](document).on('click', SELECTOR_DATA_TOGGLE$2, function () {
        ExpandableTable._jQueryInterface.call($__default["default"](this), 'toggleRow');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$9] = ExpandableTable._jQueryInterface;
    $__default["default"].fn[NAME$9].Constructor = ExpandableTable;

    $__default["default"].fn[NAME$9].noConflict = function () {
        $__default["default"].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
        return ExpandableTable._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE Fullscreen.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$8 = 'Fullscreen';
    const DATA_KEY$8 = 'lte.fullscreen';
    const JQUERY_NO_CONFLICT$8 = $__default["default"].fn[NAME$8];
    const SELECTOR_DATA_WIDGET$2 = '[data-widget="fullscreen"]';
    const SELECTOR_ICON = SELECTOR_DATA_WIDGET$2 + " i";
    const EVENT_FULLSCREEN_CHANGE = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange';
    const Default$8 = {
        minimizeIcon: 'fa-compress-arrows-alt',
        maximizeIcon: 'fa-expand-arrows-alt'
    };
    /**
     * Class Definition
     * ====================================================
     */
    const Fullscreen = /*#__PURE__*/function () {
        function Fullscreen(_element, _options) {
            this.element = _element;
            this.options = $__default["default"].extend({}, Default$8, _options);
        } // Public


        const _proto = Fullscreen.prototype;

        _proto.toggle = function toggle() {
            if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
                this.windowed();
            } else {
                this.fullscreen();
            }
        };

        _proto.toggleIcon = function toggleIcon() {
            if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
                $__default["default"](SELECTOR_ICON).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon);
            } else {
                $__default["default"](SELECTOR_ICON).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon);
            }
        };

        _proto.fullscreen = function fullscreen() {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        };

        _proto.windowed = function windowed() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } // Static
        ;

        Fullscreen._jQueryInterface = function _jQueryInterface(config) {
            let data = $__default["default"](this).data(DATA_KEY$8);

            if (!data) {
                data = $__default["default"](this).data();
            }

            const _options = $__default["default"].extend({}, Default$8, typeof config === 'object' ? config : data);

            const plugin = new Fullscreen($__default["default"](this), _options);
            $__default["default"](this).data(DATA_KEY$8, typeof config === 'object' ? config : data);

            if (typeof config === 'string' && /toggle|toggleIcon|fullscreen|windowed/.test(config)) {
                plugin[config]();
            } else {
                plugin.init();
            }
        };

        return Fullscreen;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_DATA_WIDGET$2, function () {
        Fullscreen._jQueryInterface.call($__default["default"](this), 'toggle');
    });
    $__default["default"](document).on(EVENT_FULLSCREEN_CHANGE, function () {
        Fullscreen._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$2), 'toggleIcon');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$8] = Fullscreen._jQueryInterface;
    $__default["default"].fn[NAME$8].Constructor = Fullscreen;

    $__default["default"].fn[NAME$8].noConflict = function () {
        $__default["default"].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
        return Fullscreen._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE IFrame.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$7 = 'IFrame';
    const DATA_KEY$7 = 'lte.iframe';
    const JQUERY_NO_CONFLICT$7 = $__default["default"].fn[NAME$7];
    const SELECTOR_DATA_TOGGLE$1 = '[data-widget="iframe"]';
    const SELECTOR_DATA_TOGGLE_CLOSE = '[data-widget="iframe-close"]';
    const SELECTOR_DATA_TOGGLE_SCROLL_LEFT = '[data-widget="iframe-scrollleft"]';
    const SELECTOR_DATA_TOGGLE_SCROLL_RIGHT = '[data-widget="iframe-scrollright"]';
    const SELECTOR_DATA_TOGGLE_FULLSCREEN = '[data-widget="iframe-fullscreen"]';
    const SELECTOR_CONTENT_WRAPPER = '.content-wrapper';
    const SELECTOR_CONTENT_IFRAME = SELECTOR_CONTENT_WRAPPER + " iframe";
    const SELECTOR_TAB_NAV = SELECTOR_CONTENT_WRAPPER + ".iframe-mode .nav";
    const SELECTOR_TAB_NAVBAR_NAV = SELECTOR_CONTENT_WRAPPER + ".iframe-mode .navbar-nav";
    const SELECTOR_TAB_NAVBAR_NAV_ITEM = SELECTOR_TAB_NAVBAR_NAV + " .nav-item";
    const SELECTOR_TAB_NAVBAR_NAV_LINK = SELECTOR_TAB_NAVBAR_NAV + " .nav-link";
    const SELECTOR_TAB_CONTENT = SELECTOR_CONTENT_WRAPPER + ".iframe-mode .tab-content";
    const SELECTOR_TAB_EMPTY = SELECTOR_TAB_CONTENT + " .tab-empty";
    const SELECTOR_TAB_LOADING = SELECTOR_TAB_CONTENT + " .tab-loading";
    const SELECTOR_TAB_PANE = SELECTOR_TAB_CONTENT + " .tab-pane";
    const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item > a.nav-link';
    const SELECTOR_SIDEBAR_SEARCH_ITEM = '.sidebar-search-results .list-group-item';
    const SELECTOR_HEADER_MENU_ITEM = '.main-header .nav-item a.nav-link';
    const SELECTOR_HEADER_DROPDOWN_ITEM = '.main-header a.dropdown-item';
    const CLASS_NAME_IFRAME_MODE$1 = 'iframe-mode';
    const CLASS_NAME_FULLSCREEN_MODE = 'iframe-mode-fullscreen';
    const Default$7 = {
        onTabClick: function onTabClick(item) {
            return item;
        },
        onTabChanged: function onTabChanged(item) {
            return item;
        },
        onTabCreated: function onTabCreated(item) {
            return item;
        },
        autoIframeMode: true,
        autoItemActive: true,
        autoShowNewTab: true,
        autoDarkMode: false,
        allowDuplicates: false,
        allowReload: true,
        loadingScreen: true,
        useNavbarItems: true,
        scrollOffset: 40,
        scrollBehaviorSwap: false,
        iconMaximize: 'fa-expand',
        iconMinimize: 'fa-compress'
    };
    /**
     * Class Definition
     * ====================================================
     */
    const IFrame = /*#__PURE__*/function () {
        function IFrame(element, config) {
            this._config = config;
            this._element = element;

            this._init();
        } // Public


        const _proto = IFrame.prototype;

        _proto.onTabClick = function onTabClick(item) {
            this._config.onTabClick(item);
        };

        _proto.onTabChanged = function onTabChanged(item) {
            this._config.onTabChanged(item);
        };

        _proto.onTabCreated = function onTabCreated(item) {
            this._config.onTabCreated(item);
        };

        _proto.createTab = function createTab(title, link, uniqueName, autoOpen) {
            const _this = this;

            let tabId = "panel-" + uniqueName;
            let navId = "tab-" + uniqueName;

            if (this._config.allowDuplicates) {
                tabId += "-" + Math.floor(Math.random() * 1000);
                navId += "-" + Math.floor(Math.random() * 1000);
            }

            const newNavItem = "<li class=\"nav-item\" role=\"presentation\"><a href=\"#\" class=\"btn-iframe-close\" data-widget=\"iframe-close\" data-type=\"only-this\"><i class=\"fas fa-times\"></i></a><a class=\"nav-link\" data-toggle=\"row\" id=\"" + navId + "\" href=\"#" + tabId + "\" role=\"tab\" aria-controls=\"" + tabId + "\" aria-selected=\"false\">" + title + "</a></li>";
            $__default["default"](SELECTOR_TAB_NAVBAR_NAV).append(unescape(escape(newNavItem)));
            const newTabItem = "<div class=\"tab-pane fade\" id=\"" + tabId + "\" role=\"tabpanel\" aria-labelledby=\"" + navId + "\"><iframe src=\"" + link + "\"></iframe></div>";
            $__default["default"](SELECTOR_TAB_CONTENT).append(unescape(escape(newTabItem)));

            if (autoOpen) {
                if (this._config.loadingScreen) {
                    const $loadingScreen = $__default["default"](SELECTOR_TAB_LOADING);
                    $loadingScreen.fadeIn();
                    $__default["default"](tabId + " iframe").ready(function () {
                        if (typeof _this._config.loadingScreen === 'number') {
                            _this.switchTab("#" + navId);

                            setTimeout(function () {
                                $loadingScreen.fadeOut();
                            }, _this._config.loadingScreen);
                        } else {
                            _this.switchTab("#" + navId);

                            $loadingScreen.fadeOut();
                        }
                    });
                } else {
                    this.switchTab("#" + navId);
                }
            }

            this.onTabCreated($__default["default"]("#" + navId));
        };

        _proto.openTabSidebar = function openTabSidebar(item, autoOpen) {
            if (autoOpen === void 0) {
                autoOpen = this._config.autoShowNewTab;
            }

            let $item = $__default["default"](item).clone();

            if ($item.attr('href') === undefined) {
                $item = $__default["default"](item).parent('a').clone();
            }

            $item.find('.right, .search-path').remove();
            let title = $item.find('p').text();

            if (title === '') {
                title = $item.text();
            }

            const link = $item.attr('href');

            if (link === '#' || link === '' || link === undefined) {
                return;
            }

            const uniqueName = unescape(link).replace('./', '').replace(/["#&'./:=?[\]]/gi, '-').replace(/(--)/gi, '');
            const navId = "tab-" + uniqueName;

            if (!this._config.allowDuplicates && $__default["default"]("#" + navId).length > 0) {
                return this.switchTab("#" + navId, this._config.allowReload);
            }

            if (!this._config.allowDuplicates && $__default["default"]("#" + navId).length === 0 || this._config.allowDuplicates) {
                this.createTab(title, link, uniqueName, autoOpen);
            }
        };

        _proto.switchTab = function switchTab(item, reload) {
            const _this2 = this;

            if (reload === void 0) {
                reload = false;
            }

            const $item = $__default["default"](item);
            const tabId = $item.attr('href');
            $__default["default"](SELECTOR_TAB_EMPTY).hide();

            if (reload) {
                const $loadingScreen = $__default["default"](SELECTOR_TAB_LOADING);

                if (this._config.loadingScreen) {
                    $loadingScreen.show(0, function () {
                        $__default["default"](tabId + " iframe").attr('src', $__default["default"](tabId + " iframe").attr('src')).ready(function () {
                            if (_this2._config.loadingScreen) {
                                if (typeof _this2._config.loadingScreen === 'number') {
                                    setTimeout(function () {
                                        $loadingScreen.fadeOut();
                                    }, _this2._config.loadingScreen);
                                } else {
                                    $loadingScreen.fadeOut();
                                }
                            }
                        });
                    });
                } else {
                    $__default["default"](tabId + " iframe").attr('src', $__default["default"](tabId + " iframe").attr('src'));
                }
            }

            $__default["default"](SELECTOR_TAB_NAVBAR_NAV + " .active").tab('dispose').removeClass('active');

            this._fixHeight();

            $item.tab('show');
            $item.parents('li').addClass('active');
            this.onTabChanged($item);

            if (this._config.autoItemActive) {
                this._setItemActive($__default["default"](tabId + " iframe").attr('src'));
            }
        };

        _proto.removeActiveTab = function removeActiveTab(type, element) {
            if (type == 'all') {
                $__default["default"](SELECTOR_TAB_NAVBAR_NAV_ITEM).remove();
                $__default["default"](SELECTOR_TAB_PANE).remove();
                $__default["default"](SELECTOR_TAB_EMPTY).show();
            } else if (type == 'all-other') {
                $__default["default"](SELECTOR_TAB_NAVBAR_NAV_ITEM + ":not(.active)").remove();
                $__default["default"](SELECTOR_TAB_PANE + ":not(.active)").remove();
            } else if (type == 'only-this') {
                const $navClose = $__default["default"](element);
                const $navItem = $navClose.parent('.nav-item');
                const $navItemParent = $navItem.parent();
                const navItemIndex = $navItem.index();
                const tabId = $navClose.siblings('.nav-link').attr('aria-controls');
                $navItem.remove();
                $__default["default"]("#" + tabId).remove();

                if ($__default["default"](SELECTOR_TAB_CONTENT).children().length == $__default["default"](SELECTOR_TAB_EMPTY + ", " + SELECTOR_TAB_LOADING).length) {
                    $__default["default"](SELECTOR_TAB_EMPTY).show();
                } else {
                    const prevNavItemIndex = navItemIndex - 1;
                    this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a.nav-link'));
                }
            } else {
                const _$navItem = $__default["default"](SELECTOR_TAB_NAVBAR_NAV_ITEM + ".active");

                const _$navItemParent = _$navItem.parent();

                const _navItemIndex = _$navItem.index();

                _$navItem.remove();

                $__default["default"](SELECTOR_TAB_PANE + ".active").remove();

                if ($__default["default"](SELECTOR_TAB_CONTENT).children().length == $__default["default"](SELECTOR_TAB_EMPTY + ", " + SELECTOR_TAB_LOADING).length) {
                    $__default["default"](SELECTOR_TAB_EMPTY).show();
                } else {
                    const _prevNavItemIndex = _navItemIndex - 1;

                    this.switchTab(_$navItemParent.children().eq(_prevNavItemIndex).find('a.nav-link'));
                }
            }
        };

        _proto.toggleFullscreen = function toggleFullscreen() {
            if ($__default["default"]('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
                $__default["default"](SELECTOR_DATA_TOGGLE_FULLSCREEN + " i").removeClass(this._config.iconMinimize).addClass(this._config.iconMaximize);
                $__default["default"]('body').removeClass(CLASS_NAME_FULLSCREEN_MODE);
                $__default["default"](SELECTOR_TAB_EMPTY + ", " + SELECTOR_TAB_LOADING).height('100%');
                $__default["default"](SELECTOR_CONTENT_WRAPPER).height('100%');
                $__default["default"](SELECTOR_CONTENT_IFRAME).height('100%');
            } else {
                $__default["default"](SELECTOR_DATA_TOGGLE_FULLSCREEN + " i").removeClass(this._config.iconMaximize).addClass(this._config.iconMinimize);
                $__default["default"]('body').addClass(CLASS_NAME_FULLSCREEN_MODE);
            }

            $__default["default"](window).trigger('resize');

            this._fixHeight(true);
        } // Private
        ;

        _proto._init = function _init() {
            const usingDefTab = $__default["default"](SELECTOR_TAB_CONTENT).children().length > 2;

            this._setupListeners();

            this._fixHeight(true);

            if (usingDefTab) {
                const $el = $__default["default"]("" + SELECTOR_TAB_PANE).first(); // eslint-disable-next-line no-console

                console.log($el);
                const uniqueName = $el.attr('id').replace('panel-', '');
                const navId = "#tab-" + uniqueName;
                this.switchTab(navId, true);
            }
        };

        _proto._initFrameElement = function _initFrameElement() {
            if (window.frameElement && this._config.autoIframeMode) {
                const $body = $__default["default"]('body');
                $body.addClass(CLASS_NAME_IFRAME_MODE$1);

                if (this._config.autoDarkMode) {
                    $body.addClass('dark-mode');
                }
            }
        };

        _proto._navScroll = function _navScroll(offset) {
            const leftPos = $__default["default"](SELECTOR_TAB_NAVBAR_NAV).scrollLeft();
            $__default["default"](SELECTOR_TAB_NAVBAR_NAV).animate({
                scrollLeft: leftPos + offset
            }, 250, 'linear');
        };

        _proto._setupListeners = function _setupListeners() {
            const _this3 = this;

            $__default["default"](window).on('resize', function () {
                setTimeout(function () {
                    _this3._fixHeight();
                }, 1);
            });

            if ($__default["default"](SELECTOR_CONTENT_WRAPPER).hasClass(CLASS_NAME_IFRAME_MODE$1)) {
                $__default["default"](document).on('click', SELECTOR_SIDEBAR_MENU_ITEM + ", " + SELECTOR_SIDEBAR_SEARCH_ITEM, function (e) {
                    e.preventDefault();

                    _this3.openTabSidebar(e.target);
                });

                if (this._config.useNavbarItems) {
                    $__default["default"](document).on('click', SELECTOR_HEADER_MENU_ITEM + ", " + SELECTOR_HEADER_DROPDOWN_ITEM, function (e) {
                        e.preventDefault();

                        _this3.openTabSidebar(e.target);
                    });
                }
            }

            $__default["default"](document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, function (e) {
                e.preventDefault();

                _this3.onTabClick(e.target);

                _this3.switchTab(e.target);
            });
            $__default["default"](document).on('click', SELECTOR_TAB_NAVBAR_NAV_LINK, function (e) {
                e.preventDefault();

                _this3.onTabClick(e.target);

                _this3.switchTab(e.target);
            });
            $__default["default"](document).on('click', SELECTOR_DATA_TOGGLE_CLOSE, function (e) {
                e.preventDefault();
                let target = e.target;

                if (target.nodeName == 'I') {
                    target = e.target.offsetParent;
                }

                _this3.removeActiveTab(target.attributes['data-type'] ? target.attributes['data-type'].nodeValue : null, target);
            });
            $__default["default"](document).on('click', SELECTOR_DATA_TOGGLE_FULLSCREEN, function (e) {
                e.preventDefault();

                _this3.toggleFullscreen();
            });
            let mousedown = false;
            let mousedownInterval = null;
            $__default["default"](document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_LEFT, function (e) {
                e.preventDefault();
                clearInterval(mousedownInterval);
                let scrollOffset = _this3._config.scrollOffset;

                if (!_this3._config.scrollBehaviorSwap) {
                    scrollOffset = -scrollOffset;
                }

                mousedown = true;

                _this3._navScroll(scrollOffset);

                mousedownInterval = setInterval(function () {
                    _this3._navScroll(scrollOffset);
                }, 250);
            });
            $__default["default"](document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_RIGHT, function (e) {
                e.preventDefault();
                clearInterval(mousedownInterval);
                let scrollOffset = _this3._config.scrollOffset;

                if (_this3._config.scrollBehaviorSwap) {
                    scrollOffset = -scrollOffset;
                }

                mousedown = true;

                _this3._navScroll(scrollOffset);

                mousedownInterval = setInterval(function () {
                    _this3._navScroll(scrollOffset);
                }, 250);
            });
            $__default["default"](document).on('mouseup', function () {
                if (mousedown) {
                    mousedown = false;
                    clearInterval(mousedownInterval);
                    mousedownInterval = null;
                }
            });
        };

        _proto._setItemActive = function _setItemActive(href) {
            $__default["default"](SELECTOR_SIDEBAR_MENU_ITEM + ", " + SELECTOR_HEADER_DROPDOWN_ITEM).removeClass('active');
            $__default["default"](SELECTOR_HEADER_MENU_ITEM).parent().removeClass('active');
            const $headerMenuItem = $__default["default"](SELECTOR_HEADER_MENU_ITEM + "[href$=\"" + href + "\"]");
            const $headerDropdownItem = $__default["default"](SELECTOR_HEADER_DROPDOWN_ITEM + "[href$=\"" + href + "\"]");
            const $sidebarMenuItem = $__default["default"](SELECTOR_SIDEBAR_MENU_ITEM + "[href$=\"" + href + "\"]");
            $headerMenuItem.each(function (i, e) {
                $__default["default"](e).parent().addClass('active');
            });
            $headerDropdownItem.each(function (i, e) {
                $__default["default"](e).addClass('active');
            });
            $sidebarMenuItem.each(function (i, e) {
                $__default["default"](e).addClass('active');
                $__default["default"](e).parents('.nav-treeview').prevAll('.nav-link').addClass('active');
            });
        };

        _proto._fixHeight = function _fixHeight(tabEmpty) {
            if (tabEmpty === void 0) {
                tabEmpty = false;
            }

            if ($__default["default"]('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
                const windowHeight = $__default["default"](window).height();
                const navbarHeight = $__default["default"](SELECTOR_TAB_NAV).outerHeight();
                $__default["default"](SELECTOR_TAB_EMPTY + ", " + SELECTOR_TAB_LOADING + ", " + SELECTOR_CONTENT_IFRAME).height(windowHeight - navbarHeight);
                $__default["default"](SELECTOR_CONTENT_WRAPPER).height(windowHeight);
            } else {
                const contentWrapperHeight = parseFloat($__default["default"](SELECTOR_CONTENT_WRAPPER).css('height'));

                const _navbarHeight = $__default["default"](SELECTOR_TAB_NAV).outerHeight();

                if (tabEmpty == true) {
                    setTimeout(function () {
                        $__default["default"](SELECTOR_TAB_EMPTY + ", " + SELECTOR_TAB_LOADING).height(contentWrapperHeight - _navbarHeight);
                    }, 50);
                } else {
                    $__default["default"](SELECTOR_CONTENT_IFRAME).height(contentWrapperHeight - _navbarHeight);
                }
            }
        } // Static
        ;

        IFrame._jQueryInterface = function _jQueryInterface(config) {
            if ($__default["default"](SELECTOR_DATA_TOGGLE$1).length > 0) {
                let data = $__default["default"](this).data(DATA_KEY$7);

                if (!data) {
                    data = $__default["default"](this).data();
                }

                const _options = $__default["default"].extend({}, Default$7, typeof config === 'object' ? config : data);

                localStorage.setItem('AdminLTE:IFrame:Options', JSON.stringify(_options));
                const plugin = new IFrame($__default["default"](this), _options);
                $__default["default"](this).data(DATA_KEY$7, typeof config === 'object' ? config : data);

                if (typeof config === 'string' && /createTab|openTabSidebar|switchTab|removeActiveTab/.test(config)) {
                    plugin[config]();
                }
            } else {
                new IFrame($__default["default"](this), JSON.parse(localStorage.getItem('AdminLTE:IFrame:Options')))._initFrameElement();
            }
        };

        return IFrame;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](window).on('load', function () {
        IFrame._jQueryInterface.call($__default["default"](SELECTOR_DATA_TOGGLE$1));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$7] = IFrame._jQueryInterface;
    $__default["default"].fn[NAME$7].Constructor = IFrame;

    $__default["default"].fn[NAME$7].noConflict = function () {
        $__default["default"].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
        return IFrame._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE Layout.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$6 = 'Layout';
    const DATA_KEY$6 = 'lte.layout';
    const JQUERY_NO_CONFLICT$6 = $__default["default"].fn[NAME$6];
    const SELECTOR_HEADER = '.main-header';
    const SELECTOR_MAIN_SIDEBAR = '.main-sidebar';
    const SELECTOR_SIDEBAR$1 = '.main-sidebar .sidebar';
    const SELECTOR_CONTENT = '.content-wrapper';
    const SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content';
    const SELECTOR_CONTROL_SIDEBAR_BTN = '[data-widget="control-sidebar"]';
    const SELECTOR_FOOTER = '.main-footer';
    const SELECTOR_PUSHMENU_BTN = '[data-widget="pushmenu"]';
    const SELECTOR_LOGIN_BOX = '.login-box';
    const SELECTOR_REGISTER_BOX = '.register-box';
    const SELECTOR_PRELOADER = '.preloader';
    const CLASS_NAME_SIDEBAR_COLLAPSED$1 = 'sidebar-collapse';
    const CLASS_NAME_SIDEBAR_FOCUSED = 'sidebar-focused';
    const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed';
    const CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN = 'control-sidebar-slide-open';
    const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open';
    const CLASS_NAME_IFRAME_MODE = 'iframe-mode';
    const Default$6 = {
        scrollbarTheme: 'os-theme-light',
        scrollbarAutoHide: 'l',
        panelAutoHeight: true,
        panelAutoHeightMode: 'min-height',
        preloadDuration: 200,
        loginRegisterAutoHeight: true
    };
    /**
     * Class Definition
     * ====================================================
     */
    const Layout = /*#__PURE__*/function () {
        function Layout(element, config) {
            this._config = config;
            this._element = element;
        } // Public


        const _proto = Layout.prototype;

        _proto.fixLayoutHeight = function fixLayoutHeight(extra) {
            if (extra === void 0) {
                extra = null;
            }

            const $body = $__default["default"]('body');
            let controlSidebar = 0;

            if ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || extra === 'control_sidebar') {
                controlSidebar = $__default["default"](SELECTOR_CONTROL_SIDEBAR_CONTENT).outerHeight();
            }

            const heights = {
                window: $__default["default"](window).height(),
                header: $__default["default"](SELECTOR_HEADER).length > 0 ? $__default["default"](SELECTOR_HEADER).outerHeight() : 0,
                footer: $__default["default"](SELECTOR_FOOTER).length > 0 ? $__default["default"](SELECTOR_FOOTER).outerHeight() : 0,
                sidebar: $__default["default"](SELECTOR_SIDEBAR$1).length > 0 ? $__default["default"](SELECTOR_SIDEBAR$1).height() : 0,
                controlSidebar: controlSidebar
            };

            const max = this._max(heights);

            let offset = this._config.panelAutoHeight;

            if (offset === true) {
                offset = 0;
            }

            const $contentSelector = $__default["default"](SELECTOR_CONTENT);

            if (offset !== false) {
                if (max === heights.controlSidebar) {
                    $contentSelector.css(this._config.panelAutoHeightMode, max + offset);
                } else if (max === heights.window) {
                    $contentSelector.css(this._config.panelAutoHeightMode, max + offset - heights.header - heights.footer);
                } else {
                    $contentSelector.css(this._config.panelAutoHeightMode, max + offset - heights.header);
                }

                if (this._isFooterFixed()) {
                    $contentSelector.css(this._config.panelAutoHeightMode, parseFloat($contentSelector.css(this._config.panelAutoHeightMode)) + heights.footer);
                }
            }

            if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
                return;
            }

            if (typeof $__default["default"].fn.overlayScrollbars !== 'undefined') {
                $__default["default"](SELECTOR_SIDEBAR$1).overlayScrollbars({
                    className: this._config.scrollbarTheme,
                    sizeAutoCapable: true,
                    scrollbars: {
                        autoHide: this._config.scrollbarAutoHide,
                        clickScrolling: true
                    }
                });
            } else {
                $__default["default"](SELECTOR_SIDEBAR$1).css('overflow-y', 'auto');
            }
        };

        _proto.fixLoginRegisterHeight = function fixLoginRegisterHeight() {
            const $body = $__default["default"]('body');
            const $selector = $__default["default"](SELECTOR_LOGIN_BOX + ", " + SELECTOR_REGISTER_BOX);

            if ($body.hasClass(CLASS_NAME_IFRAME_MODE)) {
                $body.css('height', '100%');
                $__default["default"]('.wrapper').css('height', '100%');
                $__default["default"]('html').css('height', '100%');
            } else if ($selector.length === 0) {
                $body.css('height', 'auto');
                $__default["default"]('html').css('height', 'auto');
            } else {
                const boxHeight = $selector.height();

                if ($body.css(this._config.panelAutoHeightMode) !== boxHeight) {
                    $body.css(this._config.panelAutoHeightMode, boxHeight);
                }
            }
        } // Private
        ;

        _proto._init = function _init() {
            const _this = this;

            // Activate layout height watcher
            this.fixLayoutHeight();

            if (this._config.loginRegisterAutoHeight === true) {
                this.fixLoginRegisterHeight();
            } else if (this._config.loginRegisterAutoHeight === parseInt(this._config.loginRegisterAutoHeight, 10)) {
                setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
            }

            $__default["default"](SELECTOR_SIDEBAR$1).on('collapsed.lte.treeview expanded.lte.treeview', function () {
                _this.fixLayoutHeight();
            });
            $__default["default"](SELECTOR_MAIN_SIDEBAR).on('mouseenter mouseleave', function () {
                if ($__default["default"]('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED$1)) {
                    _this.fixLayoutHeight();
                }
            });
            $__default["default"](SELECTOR_PUSHMENU_BTN).on('collapsed.lte.pushmenu shown.lte.pushmenu', function () {
                setTimeout(function () {
                    _this.fixLayoutHeight();
                }, 300);
            });
            $__default["default"](SELECTOR_CONTROL_SIDEBAR_BTN).on('collapsed.lte.controlsidebar', function () {
                _this.fixLayoutHeight();
            }).on('expanded.lte.controlsidebar', function () {
                _this.fixLayoutHeight('control_sidebar');
            });
            $__default["default"](window).resize(function () {
                _this.fixLayoutHeight();
            });
            setTimeout(function () {
                $__default["default"]('body.hold-transition').removeClass('hold-transition');
            }, 50);
            setTimeout(function () {
                const $preloader = $__default["default"](SELECTOR_PRELOADER);

                if ($preloader) {
                    $preloader.css('height', 0);
                    setTimeout(function () {
                        $preloader.children().hide();
                    }, 200);
                }
            }, this._config.preloadDuration);
        };

        _proto._max = function _max(numbers) {
            // Calculate the maximum number in a list
            let max = 0;
            Object.keys(numbers).forEach(function (key) {
                if (numbers[key] > max) {
                    max = numbers[key];
                }
            });
            return max;
        };

        _proto._isFooterFixed = function _isFooterFixed() {
            return $__default["default"](SELECTOR_FOOTER).css('position') === 'fixed';
        } // Static
        ;

        Layout._jQueryInterface = function _jQueryInterface(config) {
            if (config === void 0) {
                config = '';
            }

            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$6);

                const _options = $__default["default"].extend({}, Default$6, $__default["default"](this).data());

                if (!data) {
                    data = new Layout($__default["default"](this), _options);
                    $__default["default"](this).data(DATA_KEY$6, data);
                }

                if (config === 'init' || config === '') {
                    data._init();
                } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
                    data[config]();
                }
            });
        };

        return Layout;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](window).on('load', function () {
        Layout._jQueryInterface.call($__default["default"]('body'));
    });
    $__default["default"](SELECTOR_SIDEBAR$1 + " a").on('focusin', function () {
        $__default["default"](SELECTOR_MAIN_SIDEBAR).addClass(CLASS_NAME_SIDEBAR_FOCUSED);
    }).on('focusout', function () {
        $__default["default"](SELECTOR_MAIN_SIDEBAR).removeClass(CLASS_NAME_SIDEBAR_FOCUSED);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$6] = Layout._jQueryInterface;
    $__default["default"].fn[NAME$6].Constructor = Layout;

    $__default["default"].fn[NAME$6].noConflict = function () {
        $__default["default"].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
        return Layout._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE PushMenu.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$5 = 'PushMenu';
    const DATA_KEY$5 = 'lte.pushmenu';
    const EVENT_KEY$2 = "." + DATA_KEY$5;
    const JQUERY_NO_CONFLICT$5 = $__default["default"].fn[NAME$5];
    const EVENT_COLLAPSED$1 = "collapsed" + EVENT_KEY$2;
    const EVENT_COLLAPSED_DONE = "collapsed-done" + EVENT_KEY$2;
    const EVENT_SHOWN = "shown" + EVENT_KEY$2;
    const SELECTOR_TOGGLE_BUTTON$1 = '[data-widget="pushmenu"]';
    const SELECTOR_BODY = 'body';
    const SELECTOR_OVERLAY = '#sidebar-overlay';
    const SELECTOR_WRAPPER = '.wrapper';
    const CLASS_NAME_COLLAPSED = 'sidebar-collapse';
    const CLASS_NAME_OPEN$3 = 'sidebar-open';
    const CLASS_NAME_IS_OPENING$1 = 'sidebar-is-opening';
    const CLASS_NAME_CLOSED = 'sidebar-closed';
    const Default$5 = {
        autoCollapseSize: 992,
        enableRemember: false,
        noTransitionAfterReload: true,
        animationSpeed: 300
    };
    /**
     * Class Definition
     * ====================================================
     */
    const PushMenu = /*#__PURE__*/function () {
        function PushMenu(element, options) {
            this._element = element;
            this._options = $__default["default"].extend({}, Default$5, options);

            if ($__default["default"](SELECTOR_OVERLAY).length === 0) {
                this._addOverlay();
            }

            this._init();
        } // Public


        const _proto = PushMenu.prototype;

        _proto.expand = function expand() {
            const $bodySelector = $__default["default"](SELECTOR_BODY);

            if (this._options.autoCollapseSize && $__default["default"](window).width() <= this._options.autoCollapseSize) {
                $bodySelector.addClass(CLASS_NAME_OPEN$3);
            }

            $bodySelector.addClass(CLASS_NAME_IS_OPENING$1).removeClass(CLASS_NAME_COLLAPSED + " " + CLASS_NAME_CLOSED).delay(50).queue(function () {
                $bodySelector.removeClass(CLASS_NAME_IS_OPENING$1);
                $__default["default"](this).dequeue();
            });

            if (this._options.enableRemember) {
                localStorage.setItem("remember" + EVENT_KEY$2, CLASS_NAME_OPEN$3);
            }

            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_SHOWN));
        };

        _proto.collapse = function collapse() {
            const _this = this;

            const $bodySelector = $__default["default"](SELECTOR_BODY);

            if (this._options.autoCollapseSize && $__default["default"](window).width() <= this._options.autoCollapseSize) {
                $bodySelector.removeClass(CLASS_NAME_OPEN$3).addClass(CLASS_NAME_CLOSED);
            }

            $bodySelector.addClass(CLASS_NAME_COLLAPSED);

            if (this._options.enableRemember) {
                localStorage.setItem("remember" + EVENT_KEY$2, CLASS_NAME_COLLAPSED);
            }

            $__default["default"](this._element).trigger($__default["default"].Event(EVENT_COLLAPSED$1));
            setTimeout(function () {
                $__default["default"](_this._element).trigger($__default["default"].Event(EVENT_COLLAPSED_DONE));
            }, this._options.animationSpeed);
        };

        _proto.toggle = function toggle() {
            if ($__default["default"](SELECTOR_BODY).hasClass(CLASS_NAME_COLLAPSED)) {
                this.expand();
            } else {
                this.collapse();
            }
        };

        _proto.autoCollapse = function autoCollapse(resize) {
            if (resize === void 0) {
                resize = false;
            }

            if (!this._options.autoCollapseSize) {
                return;
            }

            const $bodySelector = $__default["default"](SELECTOR_BODY);

            if ($__default["default"](window).width() <= this._options.autoCollapseSize) {
                if (!$bodySelector.hasClass(CLASS_NAME_OPEN$3)) {
                    this.collapse();
                }
            } else if (resize === true) {
                if ($bodySelector.hasClass(CLASS_NAME_OPEN$3)) {
                    $bodySelector.removeClass(CLASS_NAME_OPEN$3);
                } else if ($bodySelector.hasClass(CLASS_NAME_CLOSED)) {
                    this.expand();
                }
            }
        };

        _proto.remember = function remember() {
            if (!this._options.enableRemember) {
                return;
            }

            const $body = $__default["default"]('body');
            const toggleState = localStorage.getItem("remember" + EVENT_KEY$2);

            if (toggleState === CLASS_NAME_COLLAPSED) {
                if (this._options.noTransitionAfterReload) {
                    $body.addClass('hold-transition').addClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
                        $__default["default"](this).removeClass('hold-transition');
                        $__default["default"](this).dequeue();
                    });
                } else {
                    $body.addClass(CLASS_NAME_COLLAPSED);
                }
            } else if (this._options.noTransitionAfterReload) {
                $body.addClass('hold-transition').removeClass(CLASS_NAME_COLLAPSED).delay(50).queue(function () {
                    $__default["default"](this).removeClass('hold-transition');
                    $__default["default"](this).dequeue();
                });
            } else {
                $body.removeClass(CLASS_NAME_COLLAPSED);
            }
        } // Private
        ;

        _proto._init = function _init() {
            const _this2 = this;

            this.remember();
            this.autoCollapse();
            $__default["default"](window).resize(function () {
                _this2.autoCollapse(true);
            });
        };

        _proto._addOverlay = function _addOverlay() {
            const _this3 = this;

            const overlay = $__default["default"]('<div />', {
                id: 'sidebar-overlay'
            });
            overlay.on('click', function () {
                _this3.collapse();
            });
            $__default["default"](SELECTOR_WRAPPER).append(overlay);
        } // Static
        ;

        PushMenu._jQueryInterface = function _jQueryInterface(operation) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$5);

                const _options = $__default["default"].extend({}, Default$5, $__default["default"](this).data());

                if (!data) {
                    data = new PushMenu(this, _options);
                    $__default["default"](this).data(DATA_KEY$5, data);
                }

                if (typeof operation === 'string' && /collapse|expand|toggle/.test(operation)) {
                    data[operation]();
                }
            });
        };

        return PushMenu;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_TOGGLE_BUTTON$1, function (event) {
        event.preventDefault();
        let button = event.currentTarget;

        if ($__default["default"](button).data('widget') !== 'pushmenu') {
            button = $__default["default"](button).closest(SELECTOR_TOGGLE_BUTTON$1);
        }

        PushMenu._jQueryInterface.call($__default["default"](button), 'toggle');
    });
    $__default["default"](window).on('load', function () {
        PushMenu._jQueryInterface.call($__default["default"](SELECTOR_TOGGLE_BUTTON$1));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$5] = PushMenu._jQueryInterface;
    $__default["default"].fn[NAME$5].Constructor = PushMenu;

    $__default["default"].fn[NAME$5].noConflict = function () {
        $__default["default"].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
        return PushMenu._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE SidebarSearch.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$4 = 'SidebarSearch';
    const DATA_KEY$4 = 'lte.sidebar-search';
    const JQUERY_NO_CONFLICT$4 = $__default["default"].fn[NAME$4];
    const CLASS_NAME_OPEN$2 = 'sidebar-search-open';
    const CLASS_NAME_ICON_SEARCH = 'fa-search';
    const CLASS_NAME_ICON_CLOSE = 'fa-times';
    const CLASS_NAME_HEADER = 'nav-header';
    const CLASS_NAME_SEARCH_RESULTS = 'sidebar-search-results';
    const CLASS_NAME_LIST_GROUP = 'list-group';
    const SELECTOR_DATA_WIDGET$1 = '[data-widget="sidebar-search"]';
    const SELECTOR_SIDEBAR = '.main-sidebar .nav-sidebar';
    const SELECTOR_NAV_LINK = '.nav-link';
    const SELECTOR_NAV_TREEVIEW = '.nav-treeview';
    const SELECTOR_SEARCH_INPUT$1 = SELECTOR_DATA_WIDGET$1 + " .form-control";
    const SELECTOR_SEARCH_BUTTON = SELECTOR_DATA_WIDGET$1 + " .btn";
    const SELECTOR_SEARCH_ICON = SELECTOR_SEARCH_BUTTON + " i";
    const SELECTOR_SEARCH_LIST_GROUP = "." + CLASS_NAME_LIST_GROUP;
    const SELECTOR_SEARCH_RESULTS = "." + CLASS_NAME_SEARCH_RESULTS;
    const SELECTOR_SEARCH_RESULTS_GROUP = SELECTOR_SEARCH_RESULTS + " ." + CLASS_NAME_LIST_GROUP;
    const Default$4 = {
        arrowSign: '->',
        minLength: 3,
        maxResults: 7,
        highlightName: true,
        highlightPath: false,
        highlightClass: 'text-light',
        notFoundText: 'No element found!'
    };
    const SearchItems = [];
    /**
     * Class Definition
     * ====================================================
     */
    const SidebarSearch = /*#__PURE__*/function () {
        function SidebarSearch(_element, _options) {
            this.element = _element;
            this.options = $__default["default"].extend({}, Default$4, _options);
            this.items = [];
        } // Public


        const _proto = SidebarSearch.prototype;

        _proto.init = function init() {
            const _this = this;

            if ($__default["default"](SELECTOR_DATA_WIDGET$1).length === 0) {
                return;
            }

            if ($__default["default"](SELECTOR_DATA_WIDGET$1).next(SELECTOR_SEARCH_RESULTS).length === 0) {
                $__default["default"](SELECTOR_DATA_WIDGET$1).after($__default["default"]('<div />', {
                    class: CLASS_NAME_SEARCH_RESULTS
                }));
            }

            if ($__default["default"](SELECTOR_SEARCH_RESULTS).children(SELECTOR_SEARCH_LIST_GROUP).length === 0) {
                $__default["default"](SELECTOR_SEARCH_RESULTS).append($__default["default"]('<div />', {
                    class: CLASS_NAME_LIST_GROUP
                }));
            }

            this._addNotFound();

            $__default["default"](SELECTOR_SIDEBAR).children().each(function (i, child) {
                _this._parseItem(child);
            });
        };

        _proto.search = function search() {
            const _this2 = this;

            const searchValue = $__default["default"](SELECTOR_SEARCH_INPUT$1).val().toLowerCase();

            if (searchValue.length < this.options.minLength) {
                $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).empty();

                this._addNotFound();

                this.close();
                return;
            }

            const searchResults = SearchItems.filter(function (item) {
                return item.name.toLowerCase().includes(searchValue);
            });
            const endResults = $__default["default"](searchResults.slice(0, this.options.maxResults));
            $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).empty();

            if (endResults.length === 0) {
                this._addNotFound();
            } else {
                endResults.each(function (i, result) {
                    $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).append(_this2._renderItem(escape(result.name), encodeURI(result.link), result.path));
                });
            }

            this.open();
        };

        _proto.open = function open() {
            $__default["default"](SELECTOR_DATA_WIDGET$1).parent().addClass(CLASS_NAME_OPEN$2);
            $__default["default"](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_SEARCH).addClass(CLASS_NAME_ICON_CLOSE);
        };

        _proto.close = function close() {
            $__default["default"](SELECTOR_DATA_WIDGET$1).parent().removeClass(CLASS_NAME_OPEN$2);
            $__default["default"](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_CLOSE).addClass(CLASS_NAME_ICON_SEARCH);
        };

        _proto.toggle = function toggle() {
            if ($__default["default"](SELECTOR_DATA_WIDGET$1).parent().hasClass(CLASS_NAME_OPEN$2)) {
                this.close();
            } else {
                this.open();
            }
        } // Private
        ;

        _proto._parseItem = function _parseItem(item, path) {
            const _this3 = this;

            if (path === void 0) {
                path = [];
            }

            if ($__default["default"](item).hasClass(CLASS_NAME_HEADER)) {
                return;
            }

            const itemObject = {};
            const navLink = $__default["default"](item).clone().find("> " + SELECTOR_NAV_LINK);
            const navTreeview = $__default["default"](item).clone().find("> " + SELECTOR_NAV_TREEVIEW);
            const link = navLink.attr('href');
            const name = navLink.find('p').children().remove().end().text();
            itemObject.name = this._trimText(name);
            itemObject.link = link;
            itemObject.path = path;

            if (navTreeview.length === 0) {
                SearchItems.push(itemObject);
            } else {
                const newPath = itemObject.path.concat([itemObject.name]);
                navTreeview.children().each(function (i, child) {
                    _this3._parseItem(child, newPath);
                });
            }
        };

        _proto._trimText = function _trimText(text) {
            return $.trim(text.replace(/(\r\n|\n|\r)/gm, ' '));
        };

        _proto._renderItem = function _renderItem(name, link, path) {
            const _this4 = this;

            path = path.join(" " + this.options.arrowSign + " ");
            name = unescape(name);
            link = decodeURI(link);

            if (this.options.highlightName || this.options.highlightPath) {
                const searchValue = $__default["default"](SELECTOR_SEARCH_INPUT$1).val().toLowerCase();
                const regExp = new RegExp(searchValue, 'gi');

                if (this.options.highlightName) {
                    name = name.replace(regExp, function (str) {
                        return "<strong class=\"" + _this4.options.highlightClass + "\">" + str + "</strong>";
                    });
                }

                if (this.options.highlightPath) {
                    path = path.replace(regExp, function (str) {
                        return "<strong class=\"" + _this4.options.highlightClass + "\">" + str + "</strong>";
                    });
                }
            }

            const groupItemElement = $__default["default"]('<a/>', {
                href: decodeURIComponent(link),
                class: 'list-group-item'
            });
            const searchTitleElement = $__default["default"]('<div/>', {
                class: 'search-title'
            }).html(name);
            const searchPathElement = $__default["default"]('<div/>', {
                class: 'search-path'
            }).html(path);
            groupItemElement.append(searchTitleElement).append(searchPathElement);
            return groupItemElement;
        };

        _proto._addNotFound = function _addNotFound() {
            $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).append(this._renderItem(this.options.notFoundText, '#', []));
        } // Static
        ;

        SidebarSearch._jQueryInterface = function _jQueryInterface(config) {
            let data = $__default["default"](this).data(DATA_KEY$4);

            if (!data) {
                data = $__default["default"](this).data();
            }

            const _options = $__default["default"].extend({}, Default$4, typeof config === 'object' ? config : data);

            const plugin = new SidebarSearch($__default["default"](this), _options);
            $__default["default"](this).data(DATA_KEY$4, typeof config === 'object' ? config : data);

            if (typeof config === 'string' && /init|toggle|close|open|search/.test(config)) {
                plugin[config]();
            } else {
                plugin.init();
            }
        };

        return SidebarSearch;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_SEARCH_BUTTON, function (event) {
        event.preventDefault();

        SidebarSearch._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$1), 'toggle');
    });
    $__default["default"](document).on('keyup', SELECTOR_SEARCH_INPUT$1, function (event) {
        if (event.keyCode == 38) {
            event.preventDefault();
            $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).children().last().focus();
            return;
        }

        if (event.keyCode == 40) {
            event.preventDefault();
            $__default["default"](SELECTOR_SEARCH_RESULTS_GROUP).children().first().focus();
            return;
        }

        setTimeout(function () {
            SidebarSearch._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$1), 'search');
        }, 100);
    });
    $__default["default"](document).on('keydown', SELECTOR_SEARCH_RESULTS_GROUP, function (event) {
        const $focused = $__default["default"](':focus');

        if (event.keyCode == 38) {
            event.preventDefault();

            if ($focused.is(':first-child')) {
                $focused.siblings().last().focus();
            } else {
                $focused.prev().focus();
            }
        }

        if (event.keyCode == 40) {
            event.preventDefault();

            if ($focused.is(':last-child')) {
                $focused.siblings().first().focus();
            } else {
                $focused.next().focus();
            }
        }
    });
    $__default["default"](window).on('load', function () {
        SidebarSearch._jQueryInterface.call($__default["default"](SELECTOR_DATA_WIDGET$1), 'init');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$4] = SidebarSearch._jQueryInterface;
    $__default["default"].fn[NAME$4].Constructor = SidebarSearch;

    $__default["default"].fn[NAME$4].noConflict = function () {
        $__default["default"].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
        return SidebarSearch._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE NavbarSearch.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$3 = 'NavbarSearch';
    const DATA_KEY$3 = 'lte.navbar-search';
    const JQUERY_NO_CONFLICT$3 = $__default["default"].fn[NAME$3];
    const SELECTOR_TOGGLE_BUTTON = '[data-widget="navbar-search"]';
    const SELECTOR_SEARCH_BLOCK = '.navbar-search-block';
    const SELECTOR_SEARCH_INPUT = '.form-control';
    const CLASS_NAME_OPEN$1 = 'navbar-search-open';
    const Default$3 = {
        resetOnClose: true,
        target: SELECTOR_SEARCH_BLOCK
    };
    /**
     * Class Definition
     * ====================================================
     */
    const NavbarSearch = /*#__PURE__*/function () {
        function NavbarSearch(_element, _options) {
            this._element = _element;
            this._config = $__default["default"].extend({}, Default$3, _options);
        } // Public


        const _proto = NavbarSearch.prototype;

        _proto.open = function open() {
            $__default["default"](this._config.target).css('display', 'flex').hide().fadeIn().addClass(CLASS_NAME_OPEN$1);
            $__default["default"](this._config.target + " " + SELECTOR_SEARCH_INPUT).focus();
        };

        _proto.close = function close() {
            $__default["default"](this._config.target).fadeOut().removeClass(CLASS_NAME_OPEN$1);

            if (this._config.resetOnClose) {
                $__default["default"](this._config.target + " " + SELECTOR_SEARCH_INPUT).val('');
            }
        };

        _proto.toggle = function toggle() {
            if ($__default["default"](this._config.target).hasClass(CLASS_NAME_OPEN$1)) {
                this.close();
            } else {
                this.open();
            }
        } // Static
        ;

        NavbarSearch._jQueryInterface = function _jQueryInterface(options) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$3);

                const _options = $__default["default"].extend({}, Default$3, $__default["default"](this).data());

                if (!data) {
                    data = new NavbarSearch(this, _options);
                    $__default["default"](this).data(DATA_KEY$3, data);
                }

                if (!/toggle|close|open/.test(options)) {
                    throw new Error("Undefined method " + options);
                }

                data[options]();
            });
        };

        return NavbarSearch;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](document).on('click', SELECTOR_TOGGLE_BUTTON, function (event) {
        event.preventDefault();
        let button = $__default["default"](event.currentTarget);

        if (button.data('widget') !== 'navbar-search') {
            button = button.closest(SELECTOR_TOGGLE_BUTTON);
        }

        NavbarSearch._jQueryInterface.call(button, 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$3] = NavbarSearch._jQueryInterface;
    $__default["default"].fn[NAME$3].Constructor = NavbarSearch;

    $__default["default"].fn[NAME$3].noConflict = function () {
        $__default["default"].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
        return NavbarSearch._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE Toasts.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$2 = 'Toasts';
    const DATA_KEY$2 = 'lte.toasts';
    const EVENT_KEY$1 = "." + DATA_KEY$2;
    const JQUERY_NO_CONFLICT$2 = $__default["default"].fn[NAME$2];
    const EVENT_INIT = "init" + EVENT_KEY$1;
    const EVENT_CREATED = "created" + EVENT_KEY$1;
    const EVENT_REMOVED = "removed" + EVENT_KEY$1;
    const SELECTOR_CONTAINER_TOP_RIGHT = '#toastsContainerTopRight';
    const SELECTOR_CONTAINER_TOP_LEFT = '#toastsContainerTopLeft';
    const SELECTOR_CONTAINER_BOTTOM_RIGHT = '#toastsContainerBottomRight';
    const SELECTOR_CONTAINER_BOTTOM_LEFT = '#toastsContainerBottomLeft';
    const CLASS_NAME_TOP_RIGHT = 'toasts-top-right';
    const CLASS_NAME_TOP_LEFT = 'toasts-top-left';
    const CLASS_NAME_BOTTOM_RIGHT = 'toasts-bottom-right';
    const CLASS_NAME_BOTTOM_LEFT = 'toasts-bottom-left';
    const POSITION_TOP_RIGHT = 'topRight';
    const POSITION_TOP_LEFT = 'topLeft';
    const POSITION_BOTTOM_RIGHT = 'bottomRight';
    const POSITION_BOTTOM_LEFT = 'bottomLeft';
    const Default$2 = {
        position: POSITION_TOP_RIGHT,
        fixed: true,
        autohide: false,
        autoremove: true,
        delay: 1000,
        fade: true,
        icon: null,
        image: null,
        imageAlt: null,
        imageHeight: '25px',
        title: null,
        subtitle: null,
        close: true,
        body: null,
        class: null
    };
    /**
     * Class Definition
     * ====================================================
     */
    const Toasts = /*#__PURE__*/function () {
        function Toasts(element, config) {
            this._config = config;

            this._prepareContainer();

            $__default["default"]('body').trigger($__default["default"].Event(EVENT_INIT));
        } // Public


        const _proto = Toasts.prototype;

        _proto.create = function create() {
            const toast = $__default["default"]('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
            toast.data('autohide', this._config.autohide);
            toast.data('animation', this._config.fade);

            if (this._config.class) {
                toast.addClass(this._config.class);
            }

            if (this._config.delay && this._config.delay != 500) {
                toast.data('delay', this._config.delay);
            }

            const toastHeader = $__default["default"]('<div class="toast-header">');

            if (this._config.image != null) {
                const toastImage = $__default["default"]('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt);

                if (this._config.imageHeight != null) {
                    toastImage.height(this._config.imageHeight).width('auto');
                }

                toastHeader.append(toastImage);
            }

            if (this._config.icon != null) {
                toastHeader.append($__default["default"]('<i />').addClass('mr-2').addClass(this._config.icon));
            }

            if (this._config.title != null) {
                toastHeader.append($__default["default"]('<strong />').addClass('mr-auto').html(this._config.title));
            }

            if (this._config.subtitle != null) {
                toastHeader.append($__default["default"]('<small />').html(this._config.subtitle));
            }

            if (this._config.close == true) {
                const toastClose = $__default["default"]('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>');

                if (this._config.title == null) {
                    toastClose.toggleClass('ml-2 ml-auto');
                }

                toastHeader.append(toastClose);
            }

            toast.append(toastHeader);

            if (this._config.body != null) {
                toast.append($__default["default"]('<div class="toast-body" />').html(this._config.body));
            }

            $__default["default"](this._getContainerId()).prepend(toast);
            const $body = $__default["default"]('body');
            $body.trigger($__default["default"].Event(EVENT_CREATED));
            toast.toast('show');

            if (this._config.autoremove) {
                toast.on('hidden.bs.toast', function () {
                    $__default["default"](this).delay(200).remove();
                    $body.trigger($__default["default"].Event(EVENT_REMOVED));
                });
            }
        } // Static
        ;

        _proto._getContainerId = function _getContainerId() {
            if (this._config.position == POSITION_TOP_RIGHT) {
                return SELECTOR_CONTAINER_TOP_RIGHT;
            }

            if (this._config.position == POSITION_TOP_LEFT) {
                return SELECTOR_CONTAINER_TOP_LEFT;
            }

            if (this._config.position == POSITION_BOTTOM_RIGHT) {
                return SELECTOR_CONTAINER_BOTTOM_RIGHT;
            }

            if (this._config.position == POSITION_BOTTOM_LEFT) {
                return SELECTOR_CONTAINER_BOTTOM_LEFT;
            }
        };

        _proto._prepareContainer = function _prepareContainer() {
            if ($__default["default"](this._getContainerId()).length === 0) {
                const container = $__default["default"]('<div />').attr('id', this._getContainerId().replace('#', ''));

                if (this._config.position == POSITION_TOP_RIGHT) {
                    container.addClass(CLASS_NAME_TOP_RIGHT);
                } else if (this._config.position == POSITION_TOP_LEFT) {
                    container.addClass(CLASS_NAME_TOP_LEFT);
                } else if (this._config.position == POSITION_BOTTOM_RIGHT) {
                    container.addClass(CLASS_NAME_BOTTOM_RIGHT);
                } else if (this._config.position == POSITION_BOTTOM_LEFT) {
                    container.addClass(CLASS_NAME_BOTTOM_LEFT);
                }

                $__default["default"]('body').append(container);
            }

            if (this._config.fixed) {
                $__default["default"](this._getContainerId()).addClass('fixed');
            } else {
                $__default["default"](this._getContainerId()).removeClass('fixed');
            }
        } // Static
        ;

        Toasts._jQueryInterface = function _jQueryInterface(option, config) {
            return this.each(function () {
                const _options = $__default["default"].extend({}, Default$2, config);

                const toast = new Toasts($__default["default"](this), _options);

                if (option === 'create') {
                    toast[option]();
                }
            });
        };

        return Toasts;
    }();
    /**
     * jQuery API
     * ====================================================
     */


    $__default["default"].fn[NAME$2] = Toasts._jQueryInterface;
    $__default["default"].fn[NAME$2].Constructor = Toasts;

    $__default["default"].fn[NAME$2].noConflict = function () {
        $__default["default"].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
        return Toasts._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE TodoList.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME$1 = 'TodoList';
    const DATA_KEY$1 = 'lte.todolist';
    const JQUERY_NO_CONFLICT$1 = $__default["default"].fn[NAME$1];
    const SELECTOR_DATA_TOGGLE = '[data-widget="todo-list"]';
    const CLASS_NAME_TODO_LIST_DONE = 'done';
    const Default$1 = {
        onCheck: function onCheck(item) {
            return item;
        },
        onUnCheck: function onUnCheck(item) {
            return item;
        }
    };
    /**
     * Class Definition
     * ====================================================
     */
    const TodoList = /*#__PURE__*/function () {
        function TodoList(element, config) {
            this._config = config;
            this._element = element;

            this._init();
        } // Public


        const _proto = TodoList.prototype;

        _proto.toggle = function toggle(item) {
            item.parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE);

            if (!$__default["default"](item).prop('checked')) {
                this.unCheck($__default["default"](item));
                return;
            }

            this.check(item);
        };

        _proto.check = function check(item) {
            this._config.onCheck.call(item);
        };

        _proto.unCheck = function unCheck(item) {
            this._config.onUnCheck.call(item);
        } // Private
        ;

        _proto._init = function _init() {
            const _this = this;

            const $toggleSelector = this._element;
            $toggleSelector.find('input:checkbox:checked').parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE);
            $toggleSelector.on('change', 'input:checkbox', function (event) {
                _this.toggle($__default["default"](event.target));
            });
        } // Static
        ;

        TodoList._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY$1);

                if (!data) {
                    data = $__default["default"](this).data();
                }

                const _options = $__default["default"].extend({}, Default$1, typeof config === 'object' ? config : data);

                const plugin = new TodoList($__default["default"](this), _options);
                $__default["default"](this).data(DATA_KEY$1, typeof config === 'object' ? config : data);

                if (config === 'init') {
                    plugin[config]();
                }
            });
        };

        return TodoList;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](window).on('load', function () {
        TodoList._jQueryInterface.call($__default["default"](SELECTOR_DATA_TOGGLE));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME$1] = TodoList._jQueryInterface;
    $__default["default"].fn[NAME$1].Constructor = TodoList;

    $__default["default"].fn[NAME$1].noConflict = function () {
        $__default["default"].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
        return TodoList._jQueryInterface;
    };

    /**
     * --------------------------------------------
     * AdminLTE Treeview.js
     * License MIT
     * --------------------------------------------
     */
    /**
     * Constants
     * ====================================================
     */
    const NAME = 'Treeview';
    const DATA_KEY = 'lte.treeview';
    const EVENT_KEY = "." + DATA_KEY;
    const JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
    const EVENT_EXPANDED = "expanded" + EVENT_KEY;
    const EVENT_COLLAPSED = "collapsed" + EVENT_KEY;
    const EVENT_LOAD_DATA_API = "load" + EVENT_KEY;
    const SELECTOR_LI = '.nav-item';
    const SELECTOR_LINK = '.nav-link';
    const SELECTOR_TREEVIEW_MENU = '.nav-treeview';
    const SELECTOR_OPEN = '.menu-open';
    const SELECTOR_DATA_WIDGET = '[data-widget="treeview"]';
    const CLASS_NAME_OPEN = 'menu-open';
    const CLASS_NAME_IS_OPENING = 'menu-is-opening';
    const CLASS_NAME_SIDEBAR_COLLAPSED = 'sidebar-collapse';
    const Default = {
        trigger: SELECTOR_DATA_WIDGET + " " + SELECTOR_LINK,
        animationSpeed: 300,
        accordion: true,
        expandSidebar: false,
        sidebarButtonSelector: '[data-widget="pushmenu"]'
    };
    /**
     * Class Definition
     * ====================================================
     */
    const Treeview = /*#__PURE__*/function () {
        function Treeview(element, config) {
            this._config = config;
            this._element = element;
        } // Public


        const _proto = Treeview.prototype;

        _proto.init = function init() {
            $__default["default"]("" + SELECTOR_LI + SELECTOR_OPEN + " " + SELECTOR_TREEVIEW_MENU + SELECTOR_OPEN).css('display', 'block');

            this._setupListeners();
        };

        _proto.expand = function expand(treeviewMenu, parentLi) {
            const _this = this;

            const expandedEvent = $__default["default"].Event(EVENT_EXPANDED);

            if (this._config.accordion) {
                const openMenuLi = parentLi.siblings(SELECTOR_OPEN).first();
                const openTreeview = openMenuLi.find(SELECTOR_TREEVIEW_MENU).first();
                this.collapse(openTreeview, openMenuLi);
            }

            parentLi.addClass(CLASS_NAME_IS_OPENING);
            treeviewMenu.stop().slideDown(this._config.animationSpeed, function () {
                parentLi.addClass(CLASS_NAME_OPEN);
                $__default["default"](_this._element).trigger(expandedEvent);
            });

            if (this._config.expandSidebar) {
                this._expandSidebar();
            }
        };

        _proto.collapse = function collapse(treeviewMenu, parentLi) {
            const _this2 = this;

            const collapsedEvent = $__default["default"].Event(EVENT_COLLAPSED);
            parentLi.removeClass(CLASS_NAME_IS_OPENING + " " + CLASS_NAME_OPEN);
            treeviewMenu.stop().slideUp(this._config.animationSpeed, function () {
                $__default["default"](_this2._element).trigger(collapsedEvent);
                treeviewMenu.find(SELECTOR_OPEN + " > " + SELECTOR_TREEVIEW_MENU).slideUp();
                treeviewMenu.find(SELECTOR_OPEN).removeClass(CLASS_NAME_IS_OPENING + " " + CLASS_NAME_OPEN);
            });
        };

        _proto.toggle = function toggle(event) {
            const $relativeTarget = $__default["default"](event.currentTarget);
            const $parent = $relativeTarget.parent();
            let treeviewMenu = $parent.find("> " + SELECTOR_TREEVIEW_MENU);

            if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
                if (!$parent.is(SELECTOR_LI)) {
                    treeviewMenu = $parent.parent().find("> " + SELECTOR_TREEVIEW_MENU);
                }

                if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
                    return;
                }
            }

            event.preventDefault();
            const parentLi = $relativeTarget.parents(SELECTOR_LI).first();
            const isOpen = parentLi.hasClass(CLASS_NAME_OPEN);

            if (isOpen) {
                this.collapse($__default["default"](treeviewMenu), parentLi);
            } else {
                this.expand($__default["default"](treeviewMenu), parentLi);
            }
        } // Private
        ;

        _proto._setupListeners = function _setupListeners() {
            const _this3 = this;

            const elementId = this._element.attr('id') !== undefined ? "#" + this._element.attr('id') : '';
            $__default["default"](document).on('click', "" + elementId + this._config.trigger, function (event) {
                _this3.toggle(event);
            });
        };

        _proto._expandSidebar = function _expandSidebar() {
            if ($__default["default"]('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED)) {
                $__default["default"](this._config.sidebarButtonSelector).PushMenu('expand');
            }
        } // Static
        ;

        Treeview._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                let data = $__default["default"](this).data(DATA_KEY);

                const _options = $__default["default"].extend({}, Default, $__default["default"](this).data());

                if (!data) {
                    data = new Treeview($__default["default"](this), _options);
                    $__default["default"](this).data(DATA_KEY, data);
                }

                if (config === 'init') {
                    data[config]();
                }
            });
        };

        return Treeview;
    }();
    /**
     * Data API
     * ====================================================
     */


    $__default["default"](window).on(EVENT_LOAD_DATA_API, function () {
        $__default["default"](SELECTOR_DATA_WIDGET).each(function () {
            Treeview._jQueryInterface.call($__default["default"](this), 'init');
        });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $__default["default"].fn[NAME] = Treeview._jQueryInterface;
    $__default["default"].fn[NAME].Constructor = Treeview;

    $__default["default"].fn[NAME].noConflict = function () {
        $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
        return Treeview._jQueryInterface;
    };

    exports.CardRefresh = CardRefresh;
    exports.CardWidget = CardWidget;
    exports.ControlSidebar = ControlSidebar;
    exports.DirectChat = DirectChat;
    exports.Dropdown = Dropdown;
    exports.ExpandableTable = ExpandableTable;
    exports.Fullscreen = Fullscreen;
    exports.IFrame = IFrame;
    exports.Layout = Layout;
    exports.NavbarSearch = NavbarSearch;
    exports.PushMenu = PushMenu;
    exports.SidebarSearch = SidebarSearch;
    exports.Toasts = Toasts;
    exports.TodoList = TodoList;
    exports.Treeview = Treeview;

    Object.defineProperty(exports, '__esModule', {value: true});

}));
//# sourceMappingURL=adminlte.js.map
