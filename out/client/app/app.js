'use strict';

angular.module('qixi2016App', [
// 'qixi2016App.constants',
'ngResource', 'ngSanitize', 'ngAnimate', 'ngTouch', 'angular-loading-bar', 'ui.router']).config(function ($urlRouterProvider) {

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main");
  });
})

// loading bar
.config(function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 50;
});
//# sourceMappingURL=app.js.map

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (window, document, Math) {
  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };var utils = function () {
    var me = {};var _elementStyle = document.createElement('div').style;var _vendor = function () {
      var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
          transform,
          i = 0,
          l = vendors.length;for (; i < l; i++) {
        transform = vendors[i] + 'ransform';if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
      }return false;
    }();function _prefixStyle(style) {
      if (_vendor === false) return false;if (_vendor === '') return style;return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }me.getTime = Date.now || function getTime() {
      return new Date().getTime();
    };me.extend = function (target, obj) {
      for (var i in obj) {
        target[i] = obj[i];
      }
    };me.addEvent = function (el, type, fn, capture) {
      el.addEventListener(type, fn, !!capture);
    };me.removeEvent = function (el, type, fn, capture) {
      el.removeEventListener(type, fn, !!capture);
    };me.prefixPointerEvent = function (pointerEvent) {
      return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
    };me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
      var distance = current - start,
          speed = Math.abs(distance) / time,
          destination,
          duration;deceleration = deceleration === undefined ? 0.0006 : deceleration;destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);duration = speed / deceleration;if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;distance = Math.abs(destination - current);duration = distance / speed;
      } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;distance = Math.abs(current) + destination;duration = distance / speed;
      }return { destination: Math.round(destination), duration: duration };
    };var _transform = _prefixStyle('transform');me.extend(me, { hasTransform: _transform !== false, hasPerspective: _prefixStyle('perspective') in _elementStyle, hasTouch: 'ontouchstart' in window, hasPointer: window.PointerEvent || window.MSPointerEvent, hasTransition: _prefixStyle('transition') in _elementStyle });me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);me.extend(me.style = {}, { transform: _transform, transitionTimingFunction: _prefixStyle('transitionTimingFunction'), transitionDuration: _prefixStyle('transitionDuration'), transitionDelay: _prefixStyle('transitionDelay'), transformOrigin: _prefixStyle('transformOrigin') });me.hasClass = function (e, c) {
      var re = new RegExp("(^|\\s)" + c + "(\\s|$)");return re.test(e.className);
    };me.addClass = function (e, c) {
      if (me.hasClass(e, c)) {
        return;
      }var newclass = e.className.split(' ');newclass.push(c);e.className = newclass.join(' ');
    };me.removeClass = function (e, c) {
      if (!me.hasClass(e, c)) {
        return;
      }var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');e.className = e.className.replace(re, ' ');
    };me.offset = function (el) {
      var left = -el.offsetLeft,
          top = -el.offsetTop;while (el = el.offsetParent) {
        left -= el.offsetLeft;top -= el.offsetTop;
      }return { left: left, top: top };
    };me.preventDefaultException = function (el, exceptions) {
      for (var i in exceptions) {
        if (exceptions[i].test(el[i])) {
          return true;
        }
      }return false;
    };me.extend(me.eventType = {}, { touchstart: 1, touchmove: 1, touchend: 1, mousedown: 2, mousemove: 2, mouseup: 2, pointerdown: 3, pointermove: 3, pointerup: 3, MSPointerDown: 3, MSPointerMove: 3, MSPointerUp: 3 });me.extend(me.ease = {}, { quadratic: { style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fn: function fn(k) {
          return k * (2 - k);
        } }, circular: { style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', fn: function fn(k) {
          return Math.sqrt(1 - --k * k);
        } }, back: { style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fn: function fn(k) {
          var b = 4;return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        } }, bounce: { style: '', fn: function fn(k) {
          if ((k /= 1) < 1 / 2.75) {
            return 7.5625 * k * k;
          } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
          } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
          } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
          }
        } }, elastic: { style: '', fn: function fn(k) {
          var f = 0.22,
              e = 0.4;if (k === 0) {
            return 0;
          }if (k == 1) {
            return 1;
          }return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
        } } });me.tap = function (e, eventName) {
      var ev = document.createEvent('Event');ev.initEvent(eventName, true, true);ev.pageX = e.pageX;ev.pageY = e.pageY;e.target.dispatchEvent(ev);
    };me.click = function (e) {
      var target = e.target,
          ev;if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
        ev = document.createEvent('MouseEvents');ev.initMouseEvent('click', true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);ev._constructed = true;target.dispatchEvent(ev);
      }
    };return me;
  }();function IScroll(el, options) {
    this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;this.scroller = this.wrapper.children[0];this.scrollerStyle = this.scroller.style;this.options = { resizeScrollbars: true, mouseWheelSpeed: 20, snapThreshold: 0.334, startX: 0, startY: 0, scrollY: true, directionLockThreshold: 5, momentum: true, bounce: true, bounceTime: 600, bounceEasing: '', preventDefault: true, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, HWCompositing: true, useTransition: true, useTransform: true };for (var i in options) {
      this.options[i] = options[i];
    }this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';this.options.useTransition = utils.hasTransition && this.options.useTransition;this.options.useTransform = utils.hasTransform && this.options.useTransform;this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;if (this.options.tap === true) {
      this.options.tap = 'tap';
    }if (this.options.shrinkScrollbars == 'scale') {
      this.options.useTransition = false;
    }this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;this.x = 0;this.y = 0;this.directionX = 0;this.directionY = 0;this._events = {};this._init();this.refresh();this.scrollTo(this.options.startX, this.options.startY);this.enable();
  }IScroll.prototype = { version: '5.1.3', _init: function _init() {
      this._initEvents();if (this.options.scrollbars || this.options.indicators) {
        this._initIndicators();
      }if (this.options.mouseWheel) {
        this._initWheel();
      }if (this.options.snap) {
        this._initSnap();
      }if (this.options.keyBindings) {
        this._initKeys();
      }
    }, destroy: function destroy() {
      this._initEvents(true);this._execEvent('destroy');
    }, _transitionEnd: function _transitionEnd(e) {
      if (e.target != this.scroller || !this.isInTransition) {
        return;
      }this._transitionTime();if (!this.resetPosition(this.options.bounceTime)) {
        this.isInTransition = false;this._execEvent('scrollEnd');
      }
    }, _start: function _start(e) {
      if (utils.eventType[e.type] != 1) {
        if (e.button !== 0) {
          return;
        }
      }if (!this.enabled || this.initiated && utils.eventType[e.type] !== this.initiated) {
        return;
      }if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault();
      }var point = e.touches ? e.touches[0] : e,
          pos;this.initiated = utils.eventType[e.type];this.moved = false;this.distX = 0;this.distY = 0;this.directionX = 0;this.directionY = 0;this.directionLocked = 0;this._transitionTime();this.startTime = utils.getTime();if (this.options.useTransition && this.isInTransition) {
        this.isInTransition = false;pos = this.getComputedPosition();this._translate(Math.round(pos.x), Math.round(pos.y));this._execEvent('scrollEnd');
      } else if (!this.options.useTransition && this.isAnimating) {
        this.isAnimating = false;this._execEvent('scrollEnd');
      }this.startX = this.x;this.startY = this.y;this.absStartX = this.x;this.absStartY = this.y;this.pointX = point.pageX;this.pointY = point.pageY;this._execEvent('beforeScrollStart');
    }, _move: function _move(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }if (this.options.preventDefault) {
        e.preventDefault();
      }var point = e.touches ? e.touches[0] : e,
          deltaX = point.pageX - this.pointX,
          deltaY = point.pageY - this.pointY,
          timestamp = utils.getTime(),
          newX,
          newY,
          absDistX,
          absDistY;this.pointX = point.pageX;this.pointY = point.pageY;this.distX += deltaX;this.distY += deltaY;absDistX = Math.abs(this.distX);absDistY = Math.abs(this.distY);if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
        return;
      }if (!this.directionLocked && !this.options.freeScroll) {
        if (absDistX > absDistY + this.options.directionLockThreshold) {
          this.directionLocked = 'h';
        } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
          this.directionLocked = 'v';
        } else {
          this.directionLocked = 'n';
        }
      }if (this.directionLocked == 'h') {
        if (this.options.eventPassthrough == 'vertical') {
          e.preventDefault();
        } else if (this.options.eventPassthrough == 'horizontal') {
          this.initiated = false;return;
        }deltaY = 0;
      } else if (this.directionLocked == 'v') {
        if (this.options.eventPassthrough == 'horizontal') {
          e.preventDefault();
        } else if (this.options.eventPassthrough == 'vertical') {
          this.initiated = false;return;
        }deltaX = 0;
      }deltaX = this.hasHorizontalScroll ? deltaX : 0;deltaY = this.hasVerticalScroll ? deltaY : 0;newX = this.x + deltaX;newY = this.y + deltaY;if (newX > 0 || newX < this.maxScrollX) {
        newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
      }if (newY > 0 || newY < this.maxScrollY) {
        newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
      }this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;if (!this.moved) {
        this._execEvent('scrollStart');
      }this.moved = true;this._translate(newX, newY);if (timestamp - this.startTime > 300) {
        this.startTime = timestamp;this.startX = this.x;this.startY = this.y;
      }
    }, _end: function _end(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault();
      }var point = e.changedTouches ? e.changedTouches[0] : e,
          momentumX,
          momentumY,
          duration = utils.getTime() - this.startTime,
          newX = Math.round(this.x),
          newY = Math.round(this.y),
          distanceX = Math.abs(newX - this.startX),
          distanceY = Math.abs(newY - this.startY),
          time = 0,
          easing = '';this.isInTransition = 0;this.initiated = 0;this.endTime = utils.getTime();if (this.resetPosition(this.options.bounceTime)) {
        return;
      }this.scrollTo(newX, newY);if (!this.moved) {
        if (this.options.tap) {
          utils.tap(e, this.options.tap);
        }if (this.options.click) {
          utils.click(e);
        }this._execEvent('scrollCancel');return;
      }if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
        this._execEvent('flick');return;
      }if (this.options.momentum && duration < 300) {
        momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };newX = momentumX.destination;newY = momentumY.destination;time = Math.max(momentumX.duration, momentumY.duration);this.isInTransition = 1;
      }if (this.options.snap) {
        var snap = this._nearestSnap(newX, newY);this.currentPage = snap;time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);newX = snap.x;newY = snap.y;this.directionX = 0;this.directionY = 0;easing = this.options.bounceEasing;
      }if (newX != this.x || newY != this.y) {
        if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
          easing = utils.ease.quadratic;
        }this.scrollTo(newX, newY, time, easing);return;
      }this._execEvent('scrollEnd');
    }, _resize: function _resize() {
      var that = this;clearTimeout(this.resizeTimeout);this.resizeTimeout = setTimeout(function () {
        that.refresh();
      }, this.options.resizePolling);
    }, resetPosition: function resetPosition(time) {
      var x = this.x,
          y = this.y;time = time || 0;if (!this.hasHorizontalScroll || this.x > 0) {
        x = 0;
      } else if (this.x < this.maxScrollX) {
        x = this.maxScrollX;
      }if (!this.hasVerticalScroll || this.y > 0) {
        y = 0;
      } else if (this.y < this.maxScrollY) {
        y = this.maxScrollY;
      }if (x == this.x && y == this.y) {
        return false;
      }this.scrollTo(x, y, time, this.options.bounceEasing);return true;
    }, disable: function disable() {
      this.enabled = false;
    }, enable: function enable() {
      this.enabled = true;
    }, refresh: function refresh() {
      var rf = this.wrapper.offsetHeight;this.wrapperWidth = this.wrapper.clientWidth;this.wrapperHeight = this.wrapper.clientHeight;this.scrollerWidth = this.scroller.offsetWidth;this.scrollerHeight = this.scroller.offsetHeight;this.maxScrollX = this.wrapperWidth - this.scrollerWidth;this.maxScrollY = this.wrapperHeight - this.scrollerHeight;this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;if (!this.hasHorizontalScroll) {
        this.maxScrollX = 0;this.scrollerWidth = this.wrapperWidth;
      }if (!this.hasVerticalScroll) {
        this.maxScrollY = 0;this.scrollerHeight = this.wrapperHeight;
      }this.endTime = 0;this.directionX = 0;this.directionY = 0;this.wrapperOffset = utils.offset(this.wrapper);this._execEvent('refresh');this.resetPosition();
    }, on: function on(type, fn) {
      if (!this._events[type]) {
        this._events[type] = [];
      }this._events[type].push(fn);
    }, off: function off(type, fn) {
      if (!this._events[type]) {
        return;
      }var index = this._events[type].indexOf(fn);if (index > -1) {
        this._events[type].splice(index, 1);
      }
    }, _execEvent: function _execEvent(type) {
      if (!this._events[type]) {
        return;
      }var i = 0,
          l = this._events[type].length;if (!l) {
        return;
      }for (; i < l; i++) {
        this._events[type][i].apply(this, [].slice.call(arguments, 1));
      }
    }, scrollBy: function scrollBy(x, y, time, easing) {
      x = this.x + x;y = this.y + y;time = time || 0;this.scrollTo(x, y, time, easing);
    }, scrollTo: function scrollTo(x, y, time, easing) {
      easing = easing || utils.ease.circular;this.isInTransition = this.options.useTransition && time > 0;if (!time || this.options.useTransition && easing.style) {
        this._transitionTimingFunction(easing.style);this._transitionTime(time);this._translate(x, y);
      } else {
        this._animate(x, y, time, easing.fn);
      }
    }, scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
      el = el.nodeType ? el : this.scroller.querySelector(el);if (!el) {
        return;
      }var pos = utils.offset(el);pos.left -= this.wrapperOffset.left;pos.top -= this.wrapperOffset.top;if (offsetX === true) {
        offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
      }if (offsetY === true) {
        offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
      }pos.left -= offsetX || 0;pos.top -= offsetY || 0;pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;this.scrollTo(pos.left, pos.top, time, easing);
    }, _transitionTime: function _transitionTime(time) {
      time = time || 0;this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';if (!time && utils.isBadAndroid) {
        this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
      }if (this.indicators) {
        for (var i = this.indicators.length; i--;) {
          this.indicators[i].transitionTime(time);
        }
      }
    }, _transitionTimingFunction: function _transitionTimingFunction(easing) {
      this.scrollerStyle[utils.style.transitionTimingFunction] = easing;if (this.indicators) {
        for (var i = this.indicators.length; i--;) {
          this.indicators[i].transitionTimingFunction(easing);
        }
      }
    }, _translate: function _translate(x, y) {
      if (this.options.useTransform) {
        this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
      } else {
        x = Math.round(x);y = Math.round(y);this.scrollerStyle.left = x + 'px';this.scrollerStyle.top = y + 'px';
      }this.x = x;this.y = y;if (this.indicators) {
        for (var i = this.indicators.length; i--;) {
          this.indicators[i].updatePosition();
        }
      }
    }, _initEvents: function _initEvents(remove) {
      var eventType = remove ? utils.removeEvent : utils.addEvent,
          target = this.options.bindToWrapper ? this.wrapper : window;eventType(window, 'orientationchange', this);eventType(window, 'resize', this);if (this.options.click) {
        eventType(this.wrapper, 'click', this, true);
      }if (!this.options.disableMouse) {
        eventType(this.wrapper, 'mousedown', this);eventType(target, 'mousemove', this);eventType(target, 'mousecancel', this);eventType(target, 'mouseup', this);
      }if (utils.hasPointer && !this.options.disablePointer) {
        eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);eventType(target, utils.prefixPointerEvent('pointermove'), this);eventType(target, utils.prefixPointerEvent('pointercancel'), this);eventType(target, utils.prefixPointerEvent('pointerup'), this);
      }if (utils.hasTouch && !this.options.disableTouch) {
        eventType(this.wrapper, 'touchstart', this);eventType(target, 'touchmove', this);eventType(target, 'touchcancel', this);eventType(target, 'touchend', this);
      }eventType(this.scroller, 'transitionend', this);eventType(this.scroller, 'webkitTransitionEnd', this);eventType(this.scroller, 'oTransitionEnd', this);eventType(this.scroller, 'MSTransitionEnd', this);
    }, getComputedPosition: function getComputedPosition() {
      var matrix = window.getComputedStyle(this.scroller, null),
          x,
          y;if (this.options.useTransform) {
        matrix = matrix[utils.style.transform].split(')')[0].split(', ');x = +(matrix[12] || matrix[4]);y = +(matrix[13] || matrix[5]);
      } else {
        x = +matrix.left.replace(/[^-\d.]/g, '');y = +matrix.top.replace(/[^-\d.]/g, '');
      }return { x: x, y: y };
    }, _initIndicators: function _initIndicators() {
      var interactive = this.options.interactiveScrollbars,
          customStyle = typeof this.options.scrollbars != 'string',
          indicators = [],
          indicator;var that = this;this.indicators = [];if (this.options.scrollbars) {
        if (this.options.scrollY) {
          indicator = { el: createDefaultScrollbar('v', interactive, this.options.scrollbars), interactive: interactive, defaultScrollbars: true, customStyle: customStyle, resize: this.options.resizeScrollbars, shrink: this.options.shrinkScrollbars, fade: this.options.fadeScrollbars, listenX: false };this.wrapper.appendChild(indicator.el);indicators.push(indicator);
        }if (this.options.scrollX) {
          indicator = { el: createDefaultScrollbar('h', interactive, this.options.scrollbars), interactive: interactive, defaultScrollbars: true, customStyle: customStyle, resize: this.options.resizeScrollbars, shrink: this.options.shrinkScrollbars, fade: this.options.fadeScrollbars, listenY: false };this.wrapper.appendChild(indicator.el);indicators.push(indicator);
        }
      }if (this.options.indicators) {
        indicators = indicators.concat(this.options.indicators);
      }for (var i = indicators.length; i--;) {
        this.indicators.push(new Indicator(this, indicators[i]));
      }function _indicatorsMap(fn) {
        for (var i = that.indicators.length; i--;) {
          fn.call(that.indicators[i]);
        }
      }if (this.options.fadeScrollbars) {
        this.on('scrollEnd', function () {
          _indicatorsMap(function () {
            this.fade();
          });
        });this.on('scrollCancel', function () {
          _indicatorsMap(function () {
            this.fade();
          });
        });this.on('scrollStart', function () {
          _indicatorsMap(function () {
            this.fade(1);
          });
        });this.on('beforeScrollStart', function () {
          _indicatorsMap(function () {
            this.fade(1, true);
          });
        });
      }this.on('refresh', function () {
        _indicatorsMap(function () {
          this.refresh();
        });
      });this.on('destroy', function () {
        _indicatorsMap(function () {
          this.destroy();
        });delete this.indicators;
      });
    }, _initWheel: function _initWheel() {
      utils.addEvent(this.wrapper, 'wheel', this);utils.addEvent(this.wrapper, 'mousewheel', this);utils.addEvent(this.wrapper, 'DOMMouseScroll', this);this.on('destroy', function () {
        utils.removeEvent(this.wrapper, 'wheel', this);utils.removeEvent(this.wrapper, 'mousewheel', this);utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
      });
    }, _wheel: function _wheel(e) {
      if (!this.enabled) {
        return;
      }e.preventDefault();e.stopPropagation();var wheelDeltaX,
          wheelDeltaY,
          newX,
          newY,
          that = this;if (this.wheelTimeout === undefined) {
        that._execEvent('scrollStart');
      }clearTimeout(this.wheelTimeout);this.wheelTimeout = setTimeout(function () {
        that._execEvent('scrollEnd');that.wheelTimeout = undefined;
      }, 400);if ('deltaX' in e) {
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
        } else {
          wheelDeltaX = -e.deltaX;wheelDeltaY = -e.deltaY;
        }
      } else if ('wheelDeltaX' in e) {
        wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
      } else if ('wheelDelta' in e) {
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
      } else if ('detail' in e) {
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
      } else {
        return;
      }wheelDeltaX *= this.options.invertWheelDirection;wheelDeltaY *= this.options.invertWheelDirection;if (!this.hasVerticalScroll) {
        wheelDeltaX = wheelDeltaY;wheelDeltaY = 0;
      }if (this.options.snap) {
        newX = this.currentPage.pageX;newY = this.currentPage.pageY;if (wheelDeltaX > 0) {
          newX--;
        } else if (wheelDeltaX < 0) {
          newX++;
        }if (wheelDeltaY > 0) {
          newY--;
        } else if (wheelDeltaY < 0) {
          newY++;
        }this.goToPage(newX, newY);return;
      }newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);if (newX > 0) {
        newX = 0;
      } else if (newX < this.maxScrollX) {
        newX = this.maxScrollX;
      }if (newY > 0) {
        newY = 0;
      } else if (newY < this.maxScrollY) {
        newY = this.maxScrollY;
      }this.scrollTo(newX, newY, 0);
    }, _initSnap: function _initSnap() {
      this.currentPage = {};if (typeof this.options.snap == 'string') {
        this.options.snap = this.scroller.querySelectorAll(this.options.snap);
      }this.on('refresh', function () {
        var i = 0,
            l,
            m = 0,
            n,
            cx,
            cy,
            x = 0,
            y,
            stepX = this.options.snapStepX || this.wrapperWidth,
            stepY = this.options.snapStepY || this.wrapperHeight,
            el;this.pages = [];if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
          return;
        }if (this.options.snap === true) {
          cx = Math.round(stepX / 2);cy = Math.round(stepY / 2);while (x > -this.scrollerWidth) {
            this.pages[i] = [];l = 0;y = 0;while (y > -this.scrollerHeight) {
              this.pages[i][l] = { x: Math.max(x, this.maxScrollX), y: Math.max(y, this.maxScrollY), width: stepX, height: stepY, cx: x - cx, cy: y - cy };y -= stepY;l++;
            }x -= stepX;i++;
          }
        } else {
          el = this.options.snap;l = el.length;n = -1;for (; i < l; i++) {
            if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
              m = 0;n++;
            }if (!this.pages[m]) {
              this.pages[m] = [];
            }x = Math.max(-el[i].offsetLeft, this.maxScrollX);y = Math.max(-el[i].offsetTop, this.maxScrollY);cx = x - Math.round(el[i].offsetWidth / 2);cy = y - Math.round(el[i].offsetHeight / 2);this.pages[m][n] = { x: x, y: y, width: el[i].offsetWidth, height: el[i].offsetHeight, cx: cx, cy: cy };if (x > this.maxScrollX) {
              m++;
            }
          }
        }this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);if (this.options.snapThreshold % 1 === 0) {
          this.snapThresholdX = this.options.snapThreshold;this.snapThresholdY = this.options.snapThreshold;
        } else {
          this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
        }
      });this.on('flick', function () {
        var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
      });
    }, _nearestSnap: function _nearestSnap(x, y) {
      if (!this.pages.length) {
        return { x: 0, y: 0, pageX: 0, pageY: 0 };
      }var i = 0,
          l = this.pages.length,
          m = 0;if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
        return this.currentPage;
      }if (x > 0) {
        x = 0;
      } else if (x < this.maxScrollX) {
        x = this.maxScrollX;
      }if (y > 0) {
        y = 0;
      } else if (y < this.maxScrollY) {
        y = this.maxScrollY;
      }for (; i < l; i++) {
        if (x >= this.pages[i][0].cx) {
          x = this.pages[i][0].x;break;
        }
      }l = this.pages[i].length;for (; m < l; m++) {
        if (y >= this.pages[0][m].cy) {
          y = this.pages[0][m].y;break;
        }
      }if (i == this.currentPage.pageX) {
        i += this.directionX;if (i < 0) {
          i = 0;
        } else if (i >= this.pages.length) {
          i = this.pages.length - 1;
        }x = this.pages[i][0].x;
      }if (m == this.currentPage.pageY) {
        m += this.directionY;if (m < 0) {
          m = 0;
        } else if (m >= this.pages[0].length) {
          m = this.pages[0].length - 1;
        }y = this.pages[0][m].y;
      }return { x: x, y: y, pageX: i, pageY: m };
    }, goToPage: function goToPage(x, y, time, easing) {
      easing = easing || this.options.bounceEasing;if (x >= this.pages.length) {
        x = this.pages.length - 1;
      } else if (x < 0) {
        x = 0;
      }if (y >= this.pages[x].length) {
        y = this.pages[x].length - 1;
      } else if (y < 0) {
        y = 0;
      }var posX = this.pages[x][y].x,
          posY = this.pages[x][y].y;time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;this.currentPage = { x: posX, y: posY, pageX: x, pageY: y };this.scrollTo(posX, posY, time, easing);
    }, next: function next(time, easing) {
      var x = this.currentPage.pageX,
          y = this.currentPage.pageY;x++;if (x >= this.pages.length && this.hasVerticalScroll) {
        x = 0;y++;
      }this.goToPage(x, y, time, easing);
    }, prev: function prev(time, easing) {
      var x = this.currentPage.pageX,
          y = this.currentPage.pageY;x--;if (x < 0 && this.hasVerticalScroll) {
        x = 0;y--;
      }this.goToPage(x, y, time, easing);
    }, _initKeys: function _initKeys(e) {
      var keys = { pageUp: 33, pageDown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40 };var i;if (_typeof(this.options.keyBindings) == 'object') {
        for (i in this.options.keyBindings) {
          if (typeof this.options.keyBindings[i] == 'string') {
            this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
          }
        }
      } else {
        this.options.keyBindings = {};
      }for (i in keys) {
        this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
      }utils.addEvent(window, 'keydown', this);this.on('destroy', function () {
        utils.removeEvent(window, 'keydown', this);
      });
    }, _key: function _key(e) {
      if (!this.enabled) {
        return;
      }var snap = this.options.snap,
          newX = snap ? this.currentPage.pageX : this.x,
          newY = snap ? this.currentPage.pageY : this.y,
          now = utils.getTime(),
          prevTime = this.keyTime || 0,
          acceleration = 0.250,
          pos;if (this.options.useTransition && this.isInTransition) {
        pos = this.getComputedPosition();this._translate(Math.round(pos.x), Math.round(pos.y));this.isInTransition = false;
      }this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;switch (e.keyCode) {case this.options.keyBindings.pageUp:
          if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
            newX += snap ? 1 : this.wrapperWidth;
          } else {
            newY += snap ? 1 : this.wrapperHeight;
          }break;case this.options.keyBindings.pageDown:
          if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
            newX -= snap ? 1 : this.wrapperWidth;
          } else {
            newY -= snap ? 1 : this.wrapperHeight;
          }break;case this.options.keyBindings.end:
          newX = snap ? this.pages.length - 1 : this.maxScrollX;newY = snap ? this.pages[0].length - 1 : this.maxScrollY;break;case this.options.keyBindings.home:
          newX = 0;newY = 0;break;case this.options.keyBindings.left:
          newX += snap ? -1 : 5 + this.keyAcceleration >> 0;break;case this.options.keyBindings.up:
          newY += snap ? 1 : 5 + this.keyAcceleration >> 0;break;case this.options.keyBindings.right:
          newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;break;case this.options.keyBindings.down:
          newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;break;default:
          return;}if (snap) {
        this.goToPage(newX, newY);return;
      }if (newX > 0) {
        newX = 0;this.keyAcceleration = 0;
      } else if (newX < this.maxScrollX) {
        newX = this.maxScrollX;this.keyAcceleration = 0;
      }if (newY > 0) {
        newY = 0;this.keyAcceleration = 0;
      } else if (newY < this.maxScrollY) {
        newY = this.maxScrollY;this.keyAcceleration = 0;
      }this.scrollTo(newX, newY, 0);this.keyTime = now;
    }, _animate: function _animate(destX, destY, duration, easingFn) {
      var that = this,
          startX = this.x,
          startY = this.y,
          startTime = utils.getTime(),
          destTime = startTime + duration;function step() {
        var now = utils.getTime(),
            newX,
            newY,
            easing;if (now >= destTime) {
          that.isAnimating = false;that._translate(destX, destY);if (!that.resetPosition(that.options.bounceTime)) {
            that._execEvent('scrollEnd');
          }return;
        }now = (now - startTime) / duration;easing = easingFn(now);newX = (destX - startX) * easing + startX;newY = (destY - startY) * easing + startY;that._translate(newX, newY);if (that.isAnimating) {
          rAF(step);
        }
      }this.isAnimating = true;step();
    }, handleEvent: function handleEvent(e) {
      switch (e.type) {case 'touchstart':case 'pointerdown':case 'MSPointerDown':case 'mousedown':
          this._start(e);break;case 'touchmove':case 'pointermove':case 'MSPointerMove':case 'mousemove':
          this._move(e);break;case 'touchend':case 'pointerup':case 'MSPointerUp':case 'mouseup':case 'touchcancel':case 'pointercancel':case 'MSPointerCancel':case 'mousecancel':
          this._end(e);break;case 'orientationchange':case 'resize':
          this._resize();break;case 'transitionend':case 'webkitTransitionEnd':case 'oTransitionEnd':case 'MSTransitionEnd':
          this._transitionEnd(e);break;case 'wheel':case 'DOMMouseScroll':case 'mousewheel':
          this._wheel(e);break;case 'keydown':
          this._key(e);break;case 'click':
          if (!e._constructed) {
            e.preventDefault();e.stopPropagation();
          }break;}
    } };function createDefaultScrollbar(direction, interactive, type) {
    var scrollbar = document.createElement('div'),
        indicator = document.createElement('div');if (type === true) {
      scrollbar.style.cssText = 'position:absolute;z-index:9999';indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
    }indicator.className = 'iScrollIndicator';if (direction == 'h') {
      if (type === true) {
        scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';indicator.style.height = '100%';
      }scrollbar.className = 'iScrollHorizontalScrollbar';
    } else {
      if (type === true) {
        scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';indicator.style.width = '100%';
      }scrollbar.className = 'iScrollVerticalScrollbar';
    }scrollbar.style.cssText += ';overflow:hidden';if (!interactive) {
      scrollbar.style.pointerEvents = 'none';
    }scrollbar.appendChild(indicator);return scrollbar;
  }function Indicator(scroller, options) {
    this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;this.wrapperStyle = this.wrapper.style;this.indicator = this.wrapper.children[0];this.indicatorStyle = this.indicator.style;this.scroller = scroller;this.options = { listenX: true, listenY: true, interactive: false, resize: true, defaultScrollbars: false, shrink: false, fade: false, speedRatioX: 0, speedRatioY: 0 };for (var i in options) {
      this.options[i] = options[i];
    }this.sizeRatioX = 1;this.sizeRatioY = 1;this.maxPosX = 0;this.maxPosY = 0;if (this.options.interactive) {
      if (!this.options.disableTouch) {
        utils.addEvent(this.indicator, 'touchstart', this);utils.addEvent(window, 'touchend', this);
      }if (!this.options.disablePointer) {
        utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
      }if (!this.options.disableMouse) {
        utils.addEvent(this.indicator, 'mousedown', this);utils.addEvent(window, 'mouseup', this);
      }
    }if (this.options.fade) {
      this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';this.wrapperStyle.opacity = '0';
    }
  }Indicator.prototype = { handleEvent: function handleEvent(e) {
      switch (e.type) {case 'touchstart':case 'pointerdown':case 'MSPointerDown':case 'mousedown':
          this._start(e);break;case 'touchmove':case 'pointermove':case 'MSPointerMove':case 'mousemove':
          this._move(e);break;case 'touchend':case 'pointerup':case 'MSPointerUp':case 'mouseup':case 'touchcancel':case 'pointercancel':case 'MSPointerCancel':case 'mousecancel':
          this._end(e);break;}
    }, destroy: function destroy() {
      if (this.options.interactive) {
        utils.removeEvent(this.indicator, 'touchstart', this);utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);utils.removeEvent(this.indicator, 'mousedown', this);utils.removeEvent(window, 'touchmove', this);utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);utils.removeEvent(window, 'mousemove', this);utils.removeEvent(window, 'touchend', this);utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);utils.removeEvent(window, 'mouseup', this);
      }if (this.options.defaultScrollbars) {
        this.wrapper.parentNode.removeChild(this.wrapper);
      }
    }, _start: function _start(e) {
      var point = e.touches ? e.touches[0] : e;e.preventDefault();e.stopPropagation();this.transitionTime();this.initiated = true;this.moved = false;this.lastPointX = point.pageX;this.lastPointY = point.pageY;this.startTime = utils.getTime();if (!this.options.disableTouch) {
        utils.addEvent(window, 'touchmove', this);
      }if (!this.options.disablePointer) {
        utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
      }if (!this.options.disableMouse) {
        utils.addEvent(window, 'mousemove', this);
      }this.scroller._execEvent('beforeScrollStart');
    }, _move: function _move(e) {
      var point = e.touches ? e.touches[0] : e,
          deltaX,
          deltaY,
          newX,
          newY,
          timestamp = utils.getTime();if (!this.moved) {
        this.scroller._execEvent('scrollStart');
      }this.moved = true;deltaX = point.pageX - this.lastPointX;this.lastPointX = point.pageX;deltaY = point.pageY - this.lastPointY;this.lastPointY = point.pageY;newX = this.x + deltaX;newY = this.y + deltaY;this._pos(newX, newY);e.preventDefault();e.stopPropagation();
    }, _end: function _end(e) {
      if (!this.initiated) {
        return;
      }this.initiated = false;e.preventDefault();e.stopPropagation();utils.removeEvent(window, 'touchmove', this);utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);utils.removeEvent(window, 'mousemove', this);if (this.scroller.options.snap) {
        var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
          this.scroller.directionX = 0;this.scroller.directionY = 0;this.scroller.currentPage = snap;this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
        }
      }if (this.moved) {
        this.scroller._execEvent('scrollEnd');
      }
    }, transitionTime: function transitionTime(time) {
      time = time || 0;this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';if (!time && utils.isBadAndroid) {
        this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
      }
    }, transitionTimingFunction: function transitionTimingFunction(easing) {
      this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
    }, refresh: function refresh() {
      this.transitionTime();if (this.options.listenX && !this.options.listenY) {
        this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
      } else if (this.options.listenY && !this.options.listenX) {
        this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
      } else {
        this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
      }if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
        utils.addClass(this.wrapper, 'iScrollBothScrollbars');utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');if (this.options.defaultScrollbars && this.options.customStyle) {
          if (this.options.listenX) {
            this.wrapper.style.right = '8px';
          } else {
            this.wrapper.style.bottom = '8px';
          }
        }
      } else {
        utils.removeClass(this.wrapper, 'iScrollBothScrollbars');utils.addClass(this.wrapper, 'iScrollLoneScrollbar');if (this.options.defaultScrollbars && this.options.customStyle) {
          if (this.options.listenX) {
            this.wrapper.style.right = '2px';
          } else {
            this.wrapper.style.bottom = '2px';
          }
        }
      }var r = this.wrapper.offsetHeight;if (this.options.listenX) {
        this.wrapperWidth = this.wrapper.clientWidth;if (this.options.resize) {
          this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);this.indicatorStyle.width = this.indicatorWidth + 'px';
        } else {
          this.indicatorWidth = this.indicator.clientWidth;
        }this.maxPosX = this.wrapperWidth - this.indicatorWidth;if (this.options.shrink == 'clip') {
          this.minBoundaryX = -this.indicatorWidth + 8;this.maxBoundaryX = this.wrapperWidth - 8;
        } else {
          this.minBoundaryX = 0;this.maxBoundaryX = this.maxPosX;
        }this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX;
      }if (this.options.listenY) {
        this.wrapperHeight = this.wrapper.clientHeight;if (this.options.resize) {
          this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);this.indicatorStyle.height = this.indicatorHeight + 'px';
        } else {
          this.indicatorHeight = this.indicator.clientHeight;
        }this.maxPosY = this.wrapperHeight - this.indicatorHeight;if (this.options.shrink == 'clip') {
          this.minBoundaryY = -this.indicatorHeight + 8;this.maxBoundaryY = this.wrapperHeight - 8;
        } else {
          this.minBoundaryY = 0;this.maxBoundaryY = this.maxPosY;
        }this.maxPosY = this.wrapperHeight - this.indicatorHeight;this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY;
      }this.updatePosition();
    }, updatePosition: function updatePosition() {
      var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
          y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;if (!this.options.ignoreBoundaries) {
        if (x < this.minBoundaryX) {
          if (this.options.shrink == 'scale') {
            this.width = Math.max(this.indicatorWidth + x, 8);this.indicatorStyle.width = this.width + 'px';
          }x = this.minBoundaryX;
        } else if (x > this.maxBoundaryX) {
          if (this.options.shrink == 'scale') {
            this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);this.indicatorStyle.width = this.width + 'px';x = this.maxPosX + this.indicatorWidth - this.width;
          } else {
            x = this.maxBoundaryX;
          }
        } else if (this.options.shrink == 'scale' && this.width != this.indicatorWidth) {
          this.width = this.indicatorWidth;this.indicatorStyle.width = this.width + 'px';
        }if (y < this.minBoundaryY) {
          if (this.options.shrink == 'scale') {
            this.height = Math.max(this.indicatorHeight + y * 3, 8);this.indicatorStyle.height = this.height + 'px';
          }y = this.minBoundaryY;
        } else if (y > this.maxBoundaryY) {
          if (this.options.shrink == 'scale') {
            this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);this.indicatorStyle.height = this.height + 'px';y = this.maxPosY + this.indicatorHeight - this.height;
          } else {
            y = this.maxBoundaryY;
          }
        } else if (this.options.shrink == 'scale' && this.height != this.indicatorHeight) {
          this.height = this.indicatorHeight;this.indicatorStyle.height = this.height + 'px';
        }
      }this.x = x;this.y = y;if (this.scroller.options.useTransform) {
        this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
      } else {
        this.indicatorStyle.left = x + 'px';this.indicatorStyle.top = y + 'px';
      }
    }, _pos: function _pos(x, y) {
      if (x < 0) {
        x = 0;
      } else if (x > this.maxPosX) {
        x = this.maxPosX;
      }if (y < 0) {
        y = 0;
      } else if (y > this.maxPosY) {
        y = this.maxPosY;
      }x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;this.scroller.scrollTo(x, y);
    }, fade: function fade(val, hold) {
      if (hold && !this.visible) {
        return;
      }clearTimeout(this.fadeTimeout);this.fadeTimeout = null;var time = val ? 250 : 500,
          delay = val ? 0 : 300;val = val ? '1' : '0';this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';this.fadeTimeout = setTimeout(function (val) {
        this.wrapperStyle.opacity = val;this.visible = +val;
      }.bind(this, val), delay);
    } };IScroll.utils = utils;if (typeof module != 'undefined' && module.exports) {
    module.exports = IScroll;
  } else {
    window.IScroll = IScroll;
  }
})(window, document, Math);
//# sourceMappingURL=iscroll.js.map

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */
var Zepto = function () {
	function L(t) {
		return null == t ? String(t) : j[S.call(t)] || "object";
	}function Z(t) {
		return "function" == L(t);
	}function $(t) {
		return null != t && t == t.window;
	}function _(t) {
		return null != t && t.nodeType == t.DOCUMENT_NODE;
	}function D(t) {
		return "object" == L(t);
	}function R(t) {
		return D(t) && !$(t) && Object.getPrototypeOf(t) == Object.prototype;
	}function M(t) {
		return "number" == typeof t.length;
	}function k(t) {
		return s.call(t, function (t) {
			return null != t;
		});
	}function z(t) {
		return t.length > 0 ? n.fn.concat.apply([], t) : t;
	}function F(t) {
		return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
	}function q(t) {
		return t in f ? f[t] : f[t] = new RegExp("(^|\\s)" + t + "(\\s|$)");
	}function H(t, e) {
		return "number" != typeof e || c[F(t)] ? e : e + "px";
	}function I(t) {
		var e, n;return u[t] || (e = a.createElement(t), a.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), u[t] = n), u[t];
	}function V(t) {
		return "children" in t ? o.call(t.children) : n.map(t.childNodes, function (t) {
			return 1 == t.nodeType ? t : void 0;
		});
	}function B(n, i, r) {
		for (e in i) {
			r && (R(i[e]) || A(i[e])) ? (R(i[e]) && !R(n[e]) && (n[e] = {}), A(i[e]) && !A(n[e]) && (n[e] = []), B(n[e], i[e], r)) : i[e] !== t && (n[e] = i[e]);
		}
	}function U(t, e) {
		return null == e ? n(t) : n(t).filter(e);
	}function J(t, e, n, i) {
		return Z(e) ? e.call(t, n, i) : e;
	}function X(t, e, n) {
		null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
	}function W(e, n) {
		var i = e.className,
		    r = i && i.baseVal !== t;return n === t ? r ? i.baseVal : i : void (r ? i.baseVal = n : e.className = n);
	}function Y(t) {
		var e;try {
			return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? n.parseJSON(t) : t : e) : t;
		} catch (i) {
			return t;
		}
	}function G(t, e) {
		e(t);for (var n = 0, i = t.childNodes.length; i > n; n++) {
			G(t.childNodes[n], e);
		}
	}var t,
	    e,
	    n,
	    i,
	    C,
	    N,
	    r = [],
	    o = r.slice,
	    s = r.filter,
	    a = window.document,
	    u = {},
	    f = {},
	    c = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 },
	    l = /^\s*<(\w+|!)[^>]*>/,
	    h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	    d = /^(?:body|html)$/i,
	    m = /([A-Z])/g,
	    g = ["val", "css", "html", "text", "data", "width", "height", "offset"],
	    v = ["after", "prepend", "before", "append"],
	    y = a.createElement("table"),
	    x = a.createElement("tr"),
	    b = { tr: a.createElement("tbody"), tbody: y, thead: y, tfoot: y, td: x, th: x, "*": a.createElement("div") },
	    w = /complete|loaded|interactive/,
	    E = /^[\w-]*$/,
	    j = {},
	    S = j.toString,
	    T = {},
	    O = a.createElement("div"),
	    P = { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" },
	    A = Array.isArray || function (t) {
		return t instanceof Array;
	};return T.matches = function (t, e) {
		if (!e || !t || 1 !== t.nodeType) return !1;var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;if (n) return n.call(t, e);var i,
		    r = t.parentNode,
		    o = !r;return o && (r = O).appendChild(t), i = ~T.qsa(r, e).indexOf(t), o && O.removeChild(t), i;
	}, C = function C(t) {
		return t.replace(/-+(.)?/g, function (t, e) {
			return e ? e.toUpperCase() : "";
		});
	}, N = function N(t) {
		return s.call(t, function (e, n) {
			return t.indexOf(e) == n;
		});
	}, T.fragment = function (e, i, r) {
		var s, u, f;return h.test(e) && (s = n(a.createElement(RegExp.$1))), s || (e.replace && (e = e.replace(p, "<$1></$2>")), i === t && (i = l.test(e) && RegExp.$1), i in b || (i = "*"), f = b[i], f.innerHTML = "" + e, s = n.each(o.call(f.childNodes), function () {
			f.removeChild(this);
		})), R(r) && (u = n(s), n.each(r, function (t, e) {
			g.indexOf(t) > -1 ? u[t](e) : u.attr(t, e);
		})), s;
	}, T.Z = function (t, e) {
		return t = t || [], t.__proto__ = n.fn, t.selector = e || "", t;
	}, T.isZ = function (t) {
		return t instanceof T.Z;
	}, T.init = function (e, i) {
		var r;if (!e) return T.Z();if ("string" == typeof e) {
			if (e = e.trim(), "<" == e[0] && l.test(e)) r = T.fragment(e, RegExp.$1, i), e = null;else {
				if (i !== t) return n(i).find(e);r = T.qsa(a, e);
			}
		} else {
			if (Z(e)) return n(a).ready(e);if (T.isZ(e)) return e;if (A(e)) r = k(e);else if (D(e)) r = [e], e = null;else if (l.test(e)) r = T.fragment(e.trim(), RegExp.$1, i), e = null;else {
				if (i !== t) return n(i).find(e);r = T.qsa(a, e);
			}
		}return T.Z(r, e);
	}, n = function n(t, e) {
		return T.init(t, e);
	}, n.extend = function (t) {
		var e,
		    n = o.call(arguments, 1);return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
			B(t, n, e);
		}), t;
	}, T.qsa = function (t, e) {
		var n,
		    i = "#" == e[0],
		    r = !i && "." == e[0],
		    s = i || r ? e.slice(1) : e,
		    a = E.test(s);return _(t) && a && i ? (n = t.getElementById(s)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : o.call(a && !i ? r ? t.getElementsByClassName(s) : t.getElementsByTagName(e) : t.querySelectorAll(e));
	}, n.contains = a.documentElement.contains ? function (t, e) {
		return t !== e && t.contains(e);
	} : function (t, e) {
		for (; e && (e = e.parentNode);) {
			if (e === t) return !0;
		}return !1;
	}, n.type = L, n.isFunction = Z, n.isWindow = $, n.isArray = A, n.isPlainObject = R, n.isEmptyObject = function (t) {
		var e;for (e in t) {
			return !1;
		}return !0;
	}, n.inArray = function (t, e, n) {
		return r.indexOf.call(e, t, n);
	}, n.camelCase = C, n.trim = function (t) {
		return null == t ? "" : String.prototype.trim.call(t);
	}, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function (t, e) {
		var n,
		    r,
		    o,
		    i = [];if (M(t)) for (r = 0; r < t.length; r++) {
			n = e(t[r], r), null != n && i.push(n);
		} else for (o in t) {
			n = e(t[o], o), null != n && i.push(n);
		}return z(i);
	}, n.each = function (t, e) {
		var n, i;if (M(t)) {
			for (n = 0; n < t.length; n++) {
				if (e.call(t[n], n, t[n]) === !1) return t;
			}
		} else for (i in t) {
			if (e.call(t[i], i, t[i]) === !1) return t;
		}return t;
	}, n.grep = function (t, e) {
		return s.call(t, e);
	}, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
		j["[object " + e + "]"] = e.toLowerCase();
	}), n.fn = { forEach: r.forEach, reduce: r.reduce, push: r.push, sort: r.sort, indexOf: r.indexOf, concat: r.concat, map: function map(t) {
			return n(n.map(this, function (e, n) {
				return t.call(e, n, e);
			}));
		}, slice: function slice() {
			return n(o.apply(this, arguments));
		}, ready: function ready(t) {
			return w.test(a.readyState) && a.body ? t(n) : a.addEventListener("DOMContentLoaded", function () {
				t(n);
			}, !1), this;
		}, get: function get(e) {
			return e === t ? o.call(this) : this[e >= 0 ? e : e + this.length];
		}, toArray: function toArray() {
			return this.get();
		}, size: function size() {
			return this.length;
		}, remove: function remove() {
			return this.each(function () {
				null != this.parentNode && this.parentNode.removeChild(this);
			});
		}, each: function each(t) {
			return r.every.call(this, function (e, n) {
				return t.call(e, n, e) !== !1;
			}), this;
		}, filter: function filter(t) {
			return Z(t) ? this.not(this.not(t)) : n(s.call(this, function (e) {
				return T.matches(e, t);
			}));
		}, add: function add(t, e) {
			return n(N(this.concat(n(t, e))));
		}, is: function is(t) {
			return this.length > 0 && T.matches(this[0], t);
		}, not: function not(e) {
			var i = [];if (Z(e) && e.call !== t) this.each(function (t) {
				e.call(this, t) || i.push(this);
			});else {
				var r = "string" == typeof e ? this.filter(e) : M(e) && Z(e.item) ? o.call(e) : n(e);this.forEach(function (t) {
					r.indexOf(t) < 0 && i.push(t);
				});
			}return n(i);
		}, has: function has(t) {
			return this.filter(function () {
				return D(t) ? n.contains(this, t) : n(this).find(t).size();
			});
		}, eq: function eq(t) {
			return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
		}, first: function first() {
			var t = this[0];return t && !D(t) ? t : n(t);
		}, last: function last() {
			var t = this[this.length - 1];return t && !D(t) ? t : n(t);
		}, find: function find(t) {
			var e,
			    i = this;return e = t ? "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? n(t).filter(function () {
				var t = this;return r.some.call(i, function (e) {
					return n.contains(e, t);
				});
			}) : 1 == this.length ? n(T.qsa(this[0], t)) : this.map(function () {
				return T.qsa(this, t);
			}) : [];
		}, closest: function closest(t, e) {
			var i = this[0],
			    r = !1;for ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (r = n(t)); i && !(r ? r.indexOf(i) >= 0 : T.matches(i, t));) {
				i = i !== e && !_(i) && i.parentNode;
			}return n(i);
		}, parents: function parents(t) {
			for (var e = [], i = this; i.length > 0;) {
				i = n.map(i, function (t) {
					return (t = t.parentNode) && !_(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0;
				});
			}return U(e, t);
		}, parent: function parent(t) {
			return U(N(this.pluck("parentNode")), t);
		}, children: function children(t) {
			return U(this.map(function () {
				return V(this);
			}), t);
		}, contents: function contents() {
			return this.map(function () {
				return o.call(this.childNodes);
			});
		}, siblings: function siblings(t) {
			return U(this.map(function (t, e) {
				return s.call(V(e.parentNode), function (t) {
					return t !== e;
				});
			}), t);
		}, empty: function empty() {
			return this.each(function () {
				this.innerHTML = "";
			});
		}, pluck: function pluck(t) {
			return n.map(this, function (e) {
				return e[t];
			});
		}, show: function show() {
			return this.each(function () {
				"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = I(this.nodeName));
			});
		}, replaceWith: function replaceWith(t) {
			return this.before(t).remove();
		}, wrap: function wrap(t) {
			var e = Z(t);if (this[0] && !e) var i = n(t).get(0),
			    r = i.parentNode || this.length > 1;return this.each(function (o) {
				n(this).wrapAll(e ? t.call(this, o) : r ? i.cloneNode(!0) : i);
			});
		}, wrapAll: function wrapAll(t) {
			if (this[0]) {
				n(this[0]).before(t = n(t));for (var e; (e = t.children()).length;) {
					t = e.first();
				}n(t).append(this);
			}return this;
		}, wrapInner: function wrapInner(t) {
			var e = Z(t);return this.each(function (i) {
				var r = n(this),
				    o = r.contents(),
				    s = e ? t.call(this, i) : t;o.length ? o.wrapAll(s) : r.append(s);
			});
		}, unwrap: function unwrap() {
			return this.parent().each(function () {
				n(this).replaceWith(n(this).children());
			}), this;
		}, clone: function clone() {
			return this.map(function () {
				return this.cloneNode(!0);
			});
		}, hide: function hide() {
			return this.css("display", "none");
		}, toggle: function toggle(e) {
			return this.each(function () {
				var i = n(this);(e === t ? "none" == i.css("display") : e) ? i.show() : i.hide();
			});
		}, prev: function prev(t) {
			return n(this.pluck("previousElementSibling")).filter(t || "*");
		}, next: function next(t) {
			return n(this.pluck("nextElementSibling")).filter(t || "*");
		}, html: function html(t) {
			return 0 in arguments ? this.each(function (e) {
				var i = this.innerHTML;n(this).empty().append(J(this, t, e, i));
			}) : 0 in this ? this[0].innerHTML : null;
		}, text: function text(t) {
			return 0 in arguments ? this.each(function (e) {
				var n = J(this, t, e, this.textContent);this.textContent = null == n ? "" : "" + n;
			}) : 0 in this ? this[0].textContent : null;
		}, attr: function attr(n, i) {
			var r;return "string" != typeof n || 1 in arguments ? this.each(function (t) {
				if (1 === this.nodeType) if (D(n)) for (e in n) {
					X(this, e, n[e]);
				} else X(this, n, J(this, i, t, this.getAttribute(n)));
			}) : this.length && 1 === this[0].nodeType ? !(r = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : r : t;
		}, removeAttr: function removeAttr(t) {
			return this.each(function () {
				1 === this.nodeType && X(this, t);
			});
		}, prop: function prop(t, e) {
			return t = P[t] || t, 1 in arguments ? this.each(function (n) {
				this[t] = J(this, e, n, this[t]);
			}) : this[0] && this[0][t];
		}, data: function data(e, n) {
			var i = "data-" + e.replace(m, "-$1").toLowerCase(),
			    r = 1 in arguments ? this.attr(i, n) : this.attr(i);return null !== r ? Y(r) : t;
		}, val: function val(t) {
			return 0 in arguments ? this.each(function (e) {
				this.value = J(this, t, e, this.value);
			}) : this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function () {
				return this.selected;
			}).pluck("value") : this[0].value);
		}, offset: function offset(t) {
			if (t) return this.each(function (e) {
				var i = n(this),
				    r = J(this, t, e, i.offset()),
				    o = i.offsetParent().offset(),
				    s = { top: r.top - o.top, left: r.left - o.left };"static" == i.css("position") && (s.position = "relative"), i.css(s);
			});if (!this.length) return null;var e = this[0].getBoundingClientRect();return { left: e.left + window.pageXOffset, top: e.top + window.pageYOffset, width: Math.round(e.width), height: Math.round(e.height) };
		}, css: function css(t, i) {
			if (arguments.length < 2) {
				var r = this[0],
				    o = getComputedStyle(r, "");if (!r) return;if ("string" == typeof t) return r.style[C(t)] || o.getPropertyValue(t);if (A(t)) {
					var s = {};return n.each(A(t) ? t : [t], function (t, e) {
						s[e] = r.style[C(e)] || o.getPropertyValue(e);
					}), s;
				}
			}var a = "";if ("string" == L(t)) i || 0 === i ? a = F(t) + ":" + H(t, i) : this.each(function () {
				this.style.removeProperty(F(t));
			});else for (e in t) {
				t[e] || 0 === t[e] ? a += F(e) + ":" + H(e, t[e]) + ";" : this.each(function () {
					this.style.removeProperty(F(e));
				});
			}return this.each(function () {
				this.style.cssText += ";" + a;
			});
		}, index: function index(t) {
			return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0]);
		}, hasClass: function hasClass(t) {
			return t ? r.some.call(this, function (t) {
				return this.test(W(t));
			}, q(t)) : !1;
		}, addClass: function addClass(t) {
			return t ? this.each(function (e) {
				i = [];var r = W(this),
				    o = J(this, t, e, r);o.split(/\s+/g).forEach(function (t) {
					n(this).hasClass(t) || i.push(t);
				}, this), i.length && W(this, r + (r ? " " : "") + i.join(" "));
			}) : this;
		}, removeClass: function removeClass(e) {
			return this.each(function (n) {
				return e === t ? W(this, "") : (i = W(this), J(this, e, n, i).split(/\s+/g).forEach(function (t) {
					i = i.replace(q(t), " ");
				}), void W(this, i.trim()));
			});
		}, toggleClass: function toggleClass(e, i) {
			return e ? this.each(function (r) {
				var o = n(this),
				    s = J(this, e, r, W(this));s.split(/\s+/g).forEach(function (e) {
					(i === t ? !o.hasClass(e) : i) ? o.addClass(e) : o.removeClass(e);
				});
			}) : this;
		}, scrollTop: function scrollTop(e) {
			if (this.length) {
				var n = "scrollTop" in this[0];return e === t ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
					this.scrollTop = e;
				} : function () {
					this.scrollTo(this.scrollX, e);
				});
			}
		}, scrollLeft: function scrollLeft(e) {
			if (this.length) {
				var n = "scrollLeft" in this[0];return e === t ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
					this.scrollLeft = e;
				} : function () {
					this.scrollTo(e, this.scrollY);
				});
			}
		}, position: function position() {
			if (this.length) {
				var t = this[0],
				    e = this.offsetParent(),
				    i = this.offset(),
				    r = d.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();return i.top -= parseFloat(n(t).css("margin-top")) || 0, i.left -= parseFloat(n(t).css("margin-left")) || 0, r.top += parseFloat(n(e[0]).css("border-top-width")) || 0, r.left += parseFloat(n(e[0]).css("border-left-width")) || 0, { top: i.top - r.top, left: i.left - r.left };
			}
		}, offsetParent: function offsetParent() {
			return this.map(function () {
				for (var t = this.offsetParent || a.body; t && !d.test(t.nodeName) && "static" == n(t).css("position");) {
					t = t.offsetParent;
				}return t;
			});
		} }, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function (e) {
		var i = e.replace(/./, function (t) {
			return t[0].toUpperCase();
		});n.fn[e] = function (r) {
			var o,
			    s = this[0];return r === t ? $(s) ? s["inner" + i] : _(s) ? s.documentElement["scroll" + i] : (o = this.offset()) && o[e] : this.each(function (t) {
				s = n(this), s.css(e, J(this, r, t, s[e]()));
			});
		};
	}), v.forEach(function (t, e) {
		var i = e % 2;n.fn[t] = function () {
			var t,
			    o,
			    r = n.map(arguments, function (e) {
				return t = L(e), "object" == t || "array" == t || null == e ? e : T.fragment(e);
			}),
			    s = this.length > 1;return r.length < 1 ? this : this.each(function (t, u) {
				o = i ? u : u.parentNode, u = 0 == e ? u.nextSibling : 1 == e ? u.firstChild : 2 == e ? u : null;var f = n.contains(a.documentElement, o);r.forEach(function (t) {
					if (s) t = t.cloneNode(!0);else if (!o) return n(t).remove();o.insertBefore(t, u), f && G(t, function (t) {
						null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML);
					});
				});
			});
		}, n.fn[i ? t + "To" : "insert" + (e ? "Before" : "After")] = function (e) {
			return n(e)[t](this), this;
		};
	}), T.Z.prototype = n.fn, T.uniq = N, T.deserializeValue = Y, n.zepto = T, n;
}();window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
	function l(t) {
		return t._zid || (t._zid = e++);
	}function h(t, e, n, i) {
		if (e = p(e), e.ns) var r = d(e.ns);return (s[l(t)] || []).filter(function (t) {
			return !(!t || e.e && t.e != e.e || e.ns && !r.test(t.ns) || n && l(t.fn) !== l(n) || i && t.sel != i);
		});
	}function p(t) {
		var e = ("" + t).split(".");return { e: e[0], ns: e.slice(1).sort().join(" ") };
	}function d(t) {
		return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)");
	}function m(t, e) {
		return t.del && !u && t.e in f || !!e;
	}function g(t) {
		return c[t] || u && f[t] || t;
	}function v(e, i, r, o, a, u, f) {
		var h = l(e),
		    d = s[h] || (s[h] = []);i.split(/\s/).forEach(function (i) {
			if ("ready" == i) return t(document).ready(r);var s = p(i);s.fn = r, s.sel = a, s.e in c && (r = function r(e) {
				var n = e.relatedTarget;return !n || n !== this && !t.contains(this, n) ? s.fn.apply(this, arguments) : void 0;
			}), s.del = u;var l = u || r;s.proxy = function (t) {
				if (t = j(t), !t.isImmediatePropagationStopped()) {
					t.data = o;var i = l.apply(e, t._args == n ? [t] : [t].concat(t._args));return i === !1 && (t.preventDefault(), t.stopPropagation()), i;
				}
			}, s.i = d.length, d.push(s), "addEventListener" in e && e.addEventListener(g(s.e), s.proxy, m(s, f));
		});
	}function y(t, e, n, i, r) {
		var o = l(t);(e || "").split(/\s/).forEach(function (e) {
			h(t, e, n, i).forEach(function (e) {
				delete s[o][e.i], "removeEventListener" in t && t.removeEventListener(g(e.e), e.proxy, m(e, r));
			});
		});
	}function j(e, i) {
		return (i || !e.isDefaultPrevented) && (i || (i = e), t.each(E, function (t, n) {
			var r = i[t];e[t] = function () {
				return this[n] = x, r && r.apply(i, arguments);
			}, e[n] = b;
		}), (i.defaultPrevented !== n ? i.defaultPrevented : "returnValue" in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (e.isDefaultPrevented = x)), e;
	}function S(t) {
		var e,
		    i = { originalEvent: t };for (e in t) {
			w.test(e) || t[e] === n || (i[e] = t[e]);
		}return j(i, t);
	}var n,
	    e = 1,
	    i = Array.prototype.slice,
	    r = t.isFunction,
	    o = function o(t) {
		return "string" == typeof t;
	},
	    s = {},
	    a = {},
	    u = "onfocusin" in window,
	    f = { focus: "focusin", blur: "focusout" },
	    c = { mouseenter: "mouseover", mouseleave: "mouseout" };a.click = a.mousedown = a.mouseup = a.mousemove = "MouseEvents", t.event = { add: v, remove: y }, t.proxy = function (e, n) {
		var s = 2 in arguments && i.call(arguments, 2);if (r(e)) {
			var a = function a() {
				return e.apply(n, s ? s.concat(i.call(arguments)) : arguments);
			};return a._zid = l(e), a;
		}if (o(n)) return s ? (s.unshift(e[n], e), t.proxy.apply(null, s)) : t.proxy(e[n], e);throw new TypeError("expected function");
	}, t.fn.bind = function (t, e, n) {
		return this.on(t, e, n);
	}, t.fn.unbind = function (t, e) {
		return this.off(t, e);
	}, t.fn.one = function (t, e, n, i) {
		return this.on(t, e, n, i, 1);
	};var x = function x() {
		return !0;
	},
	    b = function b() {
		return !1;
	},
	    w = /^([A-Z]|returnValue$|layer[XY]$)/,
	    E = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" };t.fn.delegate = function (t, e, n) {
		return this.on(e, t, n);
	}, t.fn.undelegate = function (t, e, n) {
		return this.off(e, t, n);
	}, t.fn.live = function (e, n) {
		return t(document.body).delegate(this.selector, e, n), this;
	}, t.fn.die = function (e, n) {
		return t(document.body).undelegate(this.selector, e, n), this;
	}, t.fn.on = function (e, s, a, u, f) {
		var c,
		    l,
		    h = this;return e && !o(e) ? (t.each(e, function (t, e) {
			h.on(t, s, a, e, f);
		}), h) : (o(s) || r(u) || u === !1 || (u = a, a = s, s = n), (r(a) || a === !1) && (u = a, a = n), u === !1 && (u = b), h.each(function (n, r) {
			f && (c = function c(t) {
				return y(r, t.type, u), u.apply(this, arguments);
			}), s && (l = function l(e) {
				var n,
				    o = t(e.target).closest(s, r).get(0);return o && o !== r ? (n = t.extend(S(e), { currentTarget: o, liveFired: r }), (c || u).apply(o, [n].concat(i.call(arguments, 1)))) : void 0;
			}), v(r, e, u, a, s, l || c);
		}));
	}, t.fn.off = function (e, i, s) {
		var a = this;return e && !o(e) ? (t.each(e, function (t, e) {
			a.off(t, i, e);
		}), a) : (o(i) || r(s) || s === !1 || (s = i, i = n), s === !1 && (s = b), a.each(function () {
			y(this, e, s, i);
		}));
	}, t.fn.trigger = function (e, n) {
		return e = o(e) || t.isPlainObject(e) ? t.Event(e) : j(e), e._args = n, this.each(function () {
			"dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n);
		});
	}, t.fn.triggerHandler = function (e, n) {
		var i, r;return this.each(function (s, a) {
			i = S(o(e) ? t.Event(e) : e), i._args = n, i.target = a, t.each(h(a, e.type || e), function (t, e) {
				return r = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0;
			});
		}), r;
	}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
		t.fn[e] = function (t) {
			return t ? this.bind(e, t) : this.trigger(e);
		};
	}), ["focus", "blur"].forEach(function (e) {
		t.fn[e] = function (t) {
			return t ? this.bind(e, t) : this.each(function () {
				try {
					this[e]();
				} catch (t) {}
			}), this;
		};
	}), t.Event = function (t, e) {
		o(t) || (e = t, t = e.type);var n = document.createEvent(a[t] || "Events"),
		    i = !0;if (e) for (var r in e) {
			"bubbles" == r ? i = !!e[r] : n[r] = e[r];
		}return n.initEvent(t, i, !0), j(n);
	};
}(Zepto), function (t) {
	function l(e, n, i) {
		var r = t.Event(n);return t(e).trigger(r, i), !r.isDefaultPrevented();
	}function h(t, e, i, r) {
		return t.global ? l(e || n, i, r) : void 0;
	}function p(e) {
		e.global && 0 === t.active++ && h(e, null, "ajaxStart");
	}function d(e) {
		e.global && ! --t.active && h(e, null, "ajaxStop");
	}function m(t, e) {
		var n = e.context;return e.beforeSend.call(n, t, e) === !1 || h(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void h(e, n, "ajaxSend", [t, e]);
	}function g(t, e, n, i) {
		var r = n.context,
		    o = "success";n.success.call(r, t, o, e), i && i.resolveWith(r, [t, o, e]), h(n, r, "ajaxSuccess", [e, n, t]), y(o, e, n);
	}function v(t, e, n, i, r) {
		var o = i.context;i.error.call(o, n, e, t), r && r.rejectWith(o, [n, e, t]), h(i, o, "ajaxError", [n, i, t || e]), y(e, n, i);
	}function y(t, e, n) {
		var i = n.context;n.complete.call(i, e, t), h(n, i, "ajaxComplete", [e, n]), d(n);
	}function x() {}function b(t) {
		return t && (t = t.split(";", 2)[0]), t && (t == f ? "html" : t == u ? "json" : s.test(t) ? "script" : a.test(t) && "xml") || "text";
	}function w(t, e) {
		return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
	}function E(e) {
		e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = w(e.url, e.data), e.data = void 0);
	}function j(e, n, i, r) {
		return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), { url: e, data: n, success: i, dataType: r };
	}function T(e, n, i, r) {
		var o,
		    s = t.isArray(n),
		    a = t.isPlainObject(n);t.each(n, function (n, u) {
			o = t.type(u), r && (n = i ? r : r + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !r && s ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? T(e, u, i, n) : e.add(n, u);
		});
	}var i,
	    r,
	    e = 0,
	    n = window.document,
	    o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	    s = /^(?:text|application)\/javascript/i,
	    a = /^(?:text|application)\/xml/i,
	    u = "application/json",
	    f = "text/html",
	    c = /^\s*$/;t.active = 0, t.ajaxJSONP = function (i, r) {
		if (!("type" in i)) return t.ajax(i);var f,
		    h,
		    o = i.jsonpCallback,
		    s = (t.isFunction(o) ? o() : o) || "jsonp" + ++e,
		    a = n.createElement("script"),
		    u = window[s],
		    c = function c(e) {
			t(a).triggerHandler("error", e || "abort");
		},
		    l = { abort: c };return r && r.promise(l), t(a).on("load error", function (e, n) {
			clearTimeout(h), t(a).off().remove(), "error" != e.type && f ? g(f[0], l, i, r) : v(null, n || "error", l, i, r), window[s] = u, f && t.isFunction(u) && u(f[0]), u = f = void 0;
		}), m(l, i) === !1 ? (c("abort"), l) : (window[s] = function () {
			f = arguments;
		}, a.src = i.url.replace(/\?(.+)=\?/, "?$1=" + s), n.head.appendChild(a), i.timeout > 0 && (h = setTimeout(function () {
			c("timeout");
		}, i.timeout)), l);
	}, t.ajaxSettings = { type: "GET", beforeSend: x, success: x, error: x, complete: x, context: null, global: !0, xhr: function xhr() {
			return new window.XMLHttpRequest();
		}, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: u, xml: "application/xml, text/xml", html: f, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0 }, t.ajax = function (e) {
		var n = t.extend({}, e || {}),
		    o = t.Deferred && t.Deferred();for (i in t.ajaxSettings) {
			void 0 === n[i] && (n[i] = t.ajaxSettings[i]);
		}p(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), E(n);var s = n.dataType,
		    a = /\?.+=\?/.test(n.url);if (a && (s = "jsonp"), n.cache !== !1 && (e && e.cache === !0 || "script" != s && "jsonp" != s) || (n.url = w(n.url, "_=" + Date.now())), "jsonp" == s) return a || (n.url = w(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, o);var j,
		    u = n.accepts[s],
		    f = {},
		    l = function l(t, e) {
			f[t.toLowerCase()] = [t, e];
		},
		    h = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
		    d = n.xhr(),
		    y = d.setRequestHeader;if (o && o.promise(d), n.crossDomain || l("X-Requested-With", "XMLHttpRequest"), l("Accept", u || "*/*"), (u = n.mimeType || u) && (u.indexOf(",") > -1 && (u = u.split(",", 2)[0]), d.overrideMimeType && d.overrideMimeType(u)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && l("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers) for (r in n.headers) {
			l(r, n.headers[r]);
		}if (d.setRequestHeader = l, d.onreadystatechange = function () {
			if (4 == d.readyState) {
				d.onreadystatechange = x, clearTimeout(j);var e,
				    i = !1;if (d.status >= 200 && d.status < 300 || 304 == d.status || 0 == d.status && "file:" == h) {
					s = s || b(n.mimeType || d.getResponseHeader("content-type")), e = d.responseText;try {
						"script" == s ? (1, eval)(e) : "xml" == s ? e = d.responseXML : "json" == s && (e = c.test(e) ? null : t.parseJSON(e));
					} catch (r) {
						i = r;
					}i ? v(i, "parsererror", d, n, o) : g(e, d, n, o);
				} else v(d.statusText || null, d.status ? "error" : "abort", d, n, o);
			}
		}, m(d, n) === !1) return d.abort(), v(null, "abort", d, n, o), d;if (n.xhrFields) for (r in n.xhrFields) {
			d[r] = n.xhrFields[r];
		}var S = "async" in n ? n.async : !0;d.open(n.type, n.url, S, n.username, n.password);for (r in f) {
			y.apply(d, f[r]);
		}return n.timeout > 0 && (j = setTimeout(function () {
			d.onreadystatechange = x, d.abort(), v(null, "timeout", d, n, o);
		}, n.timeout)), d.send(n.data ? n.data : null), d;
	}, t.get = function () {
		return t.ajax(j.apply(null, arguments));
	}, t.post = function () {
		var e = j.apply(null, arguments);return e.type = "POST", t.ajax(e);
	}, t.getJSON = function () {
		var e = j.apply(null, arguments);return e.dataType = "json", t.ajax(e);
	}, t.fn.load = function (e, n, i) {
		if (!this.length) return this;var a,
		    r = this,
		    s = e.split(/\s/),
		    u = j(e, n, i),
		    f = u.success;return s.length > 1 && (u.url = s[0], a = s[1]), u.success = function (e) {
			r.html(a ? t("<div>").html(e.replace(o, "")).find(a) : e), f && f.apply(r, arguments);
		}, t.ajax(u), this;
	};var S = encodeURIComponent;t.param = function (t, e) {
		var n = [];return n.add = function (t, e) {
			this.push(S(t) + "=" + S(e));
		}, T(n, t, e), n.join("&").replace(/%20/g, "+");
	};
}(Zepto), function (t) {
	t.fn.serializeArray = function () {
		var n,
		    e = [];return t([].slice.call(this.get(0).elements)).each(function () {
			n = t(this);var i = n.attr("type");"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && e.push({ name: n.attr("name"), value: n.val() });
		}), e;
	}, t.fn.serialize = function () {
		var t = [];return this.serializeArray().forEach(function (e) {
			t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
		}), t.join("&");
	}, t.fn.submit = function (e) {
		if (e) this.bind("submit", e);else if (this.length) {
			var n = t.Event("submit");this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit();
		}return this;
	};
}(Zepto), function (t) {
	"__proto__" in {} || t.extend(t.zepto, { Z: function Z(e, n) {
			return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e;
		}, isZ: function isZ(e) {
			return "array" === t.type(e) && "__Z" in e;
		} });try {
		getComputedStyle(void 0);
	} catch (e) {
		var n = getComputedStyle;window.getComputedStyle = function (t) {
			try {
				return n(t);
			} catch (e) {
				return null;
			}
		};
	}
}(Zepto);

//event.js
(function (d) {
	function n(a) {
		return a._zid || (a._zid = E++);
	}function x(a, b, c, e) {
		b = y(b);if (b.ns) var d = new RegExp("(?:^| )" + b.ns.replace(" ", " .* ?") + "(?: |$)");return (p[n(a)] || []).filter(function (a) {
			return a && (!b.e || a.e == b.e) && (!b.ns || d.test(a.ns)) && (!c || n(a.fn) === n(c)) && (!e || a.sel == e);
		});
	}function y(a) {
		a = ("" + a).split(".");return { e: a[0], ns: a.slice(1).sort().join(" ") };
	}function z(a) {
		return A[a] || s && t[a] || a;
	}function B(a, b, c, e, f, m, g) {
		var l = n(a),
		    h = p[l] || (p[l] = []);b.split(/\s/).forEach(function (b) {
			if ("ready" == b) return d(document).ready(c);var k = y(b);k.fn = c;k.sel = f;k.e in A && (c = function c(a) {
				var b = a.relatedTarget;if (!b || b !== this && !d.contains(this, b)) return k.fn.apply(this, arguments);
			});var l = (k.del = m) || c;k.proxy = function (b) {
				b = q(b);if (!b.isImmediatePropagationStopped()) {
					b.data = e;var c = l.apply(a, void 0 == b._args ? [b] : [b].concat(b._args));!1 === c && (b.preventDefault(), b.stopPropagation());return c;
				}
			};k.i = h.length;h.push(k);"addEventListener" in a && a.addEventListener(z(k.e), k.proxy, k.del && !s && k.e in t || !!g);
		});
	}function u(a, b, c, d, f) {
		var m = n(a);(b || "").split(/\s/).forEach(function (b) {
			x(a, b, c, d).forEach(function (b) {
				delete p[m][b.i];"removeEventListener" in a && a.removeEventListener(z(b.e), b.proxy, b.del && !s && b.e in t || !!f);
			});
		});
	}function q(a, b) {
		if (b || !a.isDefaultPrevented) if (b || (b = a), d.each(F, function (c, d) {
			var f = b[c];a[c] = function () {
				this[d] = C;return f && f.apply(b, arguments);
			};a[d] = v;
		}), void 0 !== b.defaultPrevented ? b.defaultPrevented : "returnValue" in b ? !1 === b.returnValue : b.getPreventDefault && b.getPreventDefault()) a.isDefaultPrevented = C;return a;
	}function D(a) {
		var b,
		    c = { originalEvent: a };for (b in a) {
			G.test(b) || void 0 === a[b] || (c[b] = a[b]);
		}return q(c, a);
	}var E = 1,
	    w = Array.prototype.slice,
	    r = d.isFunction,
	    g = function g(a) {
		return "string" == typeof a;
	},
	    p = {},
	    h = {},
	    s = "onfocusin" in window,
	    t = { focus: "focusin", blur: "focusout" },
	    A = { mouseenter: "mouseover", mouseleave: "mouseout" };h.click = h.mousedown = h.mouseup = h.mousemove = "MouseEvents";d.event = { add: B, remove: u };d.proxy = function (a, b) {
		var c = 2 in arguments && w.call(arguments, 2);if (r(a)) {
			var e = function e() {
				return a.apply(b, c ? c.concat(w.call(arguments)) : arguments);
			};e._zid = n(a);return e;
		}if (g(b)) return c ? (c.unshift(a[b], a), d.proxy.apply(null, c)) : d.proxy(a[b], a);throw new TypeError("expected function");
	};d.fn.bind = function (a, b, c) {
		return this.on(a, b, c);
	};d.fn.unbind = function (a, b) {
		return this.off(a, b);
	};d.fn.one = function (a, b, c, d) {
		return this.on(a, b, c, d, 1);
	};var C = function C() {
		return !0;
	},
	    v = function v() {
		return !1;
	},
	    G = /^([A-Z]|returnValue$|layer[XY]$)/,
	    F = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped",
		stopPropagation: "isPropagationStopped" };d.fn.delegate = function (a, b, c) {
		return this.on(b, a, c);
	};d.fn.undelegate = function (a, b, c) {
		return this.off(b, a, c);
	};d.fn.live = function (a, b) {
		d(document.body).delegate(this.selector, a, b);return this;
	};d.fn.die = function (a, b) {
		d(document.body).undelegate(this.selector, a, b);return this;
	};d.fn.on = function (a, b, c, e, f) {
		var m,
		    h,
		    l = this;if (a && !g(a)) return d.each(a, function (a, d) {
			l.on(a, b, c, d, f);
		}), l;g(b) || r(e) || !1 === e || (e = c, c = b, b = void 0);if (r(c) || !1 === c) e = c, c = void 0;!1 === e && (e = v);
		return l.each(function (l, g) {
			f && (m = function m(a) {
				u(g, a.type, e);return e.apply(this, arguments);
			});b && (h = function h(a) {
				var c,
				    f = d(a.target).closest(b, g).get(0);if (f && f !== g) return c = d.extend(D(a), { currentTarget: f, liveFired: g }), (m || e).apply(f, [c].concat(w.call(arguments, 1)));
			});B(g, a, e, c, b, h || m);
		});
	};d.fn.off = function (a, b, c) {
		var e = this;if (a && !g(a)) return d.each(a, function (a, c) {
			e.off(a, b, c);
		}), e;g(b) || r(c) || !1 === c || (c = b, b = void 0);!1 === c && (c = v);return e.each(function () {
			u(this, a, c, b);
		});
	};d.fn.trigger = function (a, b) {
		a = g(a) || d.isPlainObject(a) ? d.Event(a) : q(a);a._args = b;return this.each(function () {
			"dispatchEvent" in this ? this.dispatchEvent(a) : d(this).triggerHandler(a, b);
		});
	};d.fn.triggerHandler = function (a, b) {
		var c, e;this.each(function (f, h) {
			c = D(g(a) ? d.Event(a) : a);c._args = b;c.target = h;d.each(x(h, a.type || a), function (a, b) {
				e = b.proxy(c);if (c.isImmediatePropagationStopped()) return !1;
			});
		});return e;
	};"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (a) {
		d.fn[a] = function (b) {
			return b ? this.bind(a, b) : this.trigger(a);
		};
	});["focus", "blur"].forEach(function (a) {
		d.fn[a] = function (b) {
			b ? this.bind(a, b) : this.each(function () {
				try {
					this[a]();
				} catch (b) {}
			});return this;
		};
	});d.Event = function (a, b) {
		g(a) || (b = a, a = b.type);var c = document.createEvent(h[a] || "Events"),
		    d = !0;if (b) for (var f in b) {
			"bubbles" == f ? d = !!b[f] : c[f] = b[f];
		}c.initEvent(a, d, !0);return q(c);
	};
})(Zepto);

//fx.js
(function (b, C) {
	function n(b) {
		return g ? g + b : b.toLowerCase();
	}var c = "",
	    g,
	    l = window.document.createElement("div"),
	    B = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
	    s,
	    t,
	    u,
	    v,
	    w,
	    x,
	    y,
	    z,
	    A,
	    d = {};b.each({ Webkit: "webkit", Moz: "", O: "o" }, function (b, a) {
		if (void 0 !== l.style[b + "TransitionProperty"]) return c = "-" + b.toLowerCase() + "-", g = a, !1;
	});s = c + "transform";d[t = c + "transition-property"] = d[u = c + "transition-duration"] = d[w = c + "transition-delay"] = d[v = c + "transition-timing-function"] = d[x = c + "animation-name"] = d[y = c + "animation-duration"] = d[A = c + "animation-delay"] = d[z = c + "animation-timing-function"] = "";b.fx = { off: void 0 === g && void 0 === l.style.transitionProperty, speeds: { _default: 400, fast: 200, slow: 600 }, cssPrefix: c, transitionEnd: n("TransitionEnd"), animationEnd: n("AnimationEnd") };b.fn.animate = function (c, a, d, h, f) {
		b.isFunction(a) && (h = a, a = d = void 0);b.isFunction(d) && (h = d, d = void 0);b.isPlainObject(a) && (d = a.easing, h = a.complete, f = a.delay, a = a.duration);a && (a = ("number" == typeof a ? a : b.fx.speeds[a] || b.fx.speeds._default) / 1E3);
		f && (f = parseFloat(f) / 1E3);return this.anim(c, a, d, h, f);
	};b.fn.anim = function (c, a, g, h, f) {
		var k,
		    e = {},
		    p,
		    q = "",
		    l = this,
		    _m,
		    r = b.fx.transitionEnd,
		    n = !1;void 0 === a && (a = b.fx.speeds._default / 1E3);void 0 === f && (f = 0);b.fx.off && (a = 0);if ("string" == typeof c) e[x] = c, e[y] = a + "s", e[A] = f + "s", e[z] = g || "linear", r = b.fx.animationEnd;else {
			p = [];for (k in c) {
				B.test(k) ? q += k + "(" + c[k] + ") " : (e[k] = c[k], p.push(k.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()));
			}q && (e[s] = q, p.push(s));0 < a && "object" === (typeof c === "undefined" ? "undefined" : _typeof(c)) && (e[t] = p.join(", "), e[u] = a + "s", e[w] = f + "s", e[v] = g || "linear");
		}_m = function m(a) {
			if ("undefined" !== typeof a) {
				if (a.target !== a.currentTarget) return;b(a.target).unbind(r, _m);
			} else b(this).unbind(r, _m);n = !0;b(this).css(d);h && h.call(this);
		};0 < a && (this.bind(r, _m), setTimeout(function () {
			n || _m.call(l);
		}, 1E3 * a + 25));this.size() && this.get(0).clientLeft;this.css(e);0 >= a && setTimeout(function () {
			l.each(function () {
				_m.call(this);
			});
		}, 0);return this;
	};l = null;
})(Zepto);

//ajax.js
eval(function (p, a, c, k, _e, r) {
	_e = function e(c) {
		return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e(c)] = k[c] || _e(c);
		}k = [function (e) {
			return r[e];
		}];_e = function _e() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
	}return p;
}('(3(d){3 n(b,a,c,f){9(b.14)5 b=a||t,c=d.1Z(c),d(b).23(c,f),!c.2I()}3 A(b){b.14&&0===d.1e++&&n(b,8,"2K")}3 v(b,a){6 c=a.Y;9(!1===a.1o.17(c,b,a)||!1===n(a,c,"1P",[b,a]))5!1;n(a,c,"1T",[b,a])}3 w(b,a,c,f){6 d=c.Y;c.M.17(d,b,"M",a);f&&f.2c(d,[b,"M",a]);n(c,d,"2i",[a,c,b]);x("M",a,c)}3 q(b,a,c,d,g){6 h=d.Y;d.Q.17(h,c,a,b);g&&g.1U(h,[c,a,b]);n(d,h,"1W",[c,d,b||a]);x(a,c,d)}3 x(b,a,c){6 f=c.Y;c.1G.17(f,a,b);n(c,f,"21",[a,c]);c.14&&!--d.1e&&n(c,8,"22")}3 p(){}3 B(b){b&&(b=b.1m(";",2)[0]);5 b&&("I/T"==b?"T":"K/W"==b?"W":C.S(b)?"L":D.S(b)&&"V")||"I"}3 u(b,a){5""==a?b:(b+"&"+a).15(/[&?]{1,2}/,"?")}3 E(b){b.1s&&b.o&&"2U"!=d.j(b.o)&&(b.o=d.1q(b.o,b.1Q));!b.o||b.j&&"1c"!=b.j.1D()||(b.7=u(b.7,b.o),b.o=12 0)}3 r(b,a,c,f){d.18(a)&&(f=c,c=a,a=12 0);d.18(c)||(f=c,c=12 0);5{7:b,o:a,M:c,1d:f}}3 y(b,a,c,f){6 g,h=d.2g(a),l=d.2j(a);d.2q(a,3(a,k){g=d.j(k);f&&(a=c?f:f+"["+(l||"1E"==g||"1n"==g?a:"")+"]");!f&&h?b.1b(k.1K,k.1O):"1n"==g||!c&&"1E"==g?y(b,k,c,a):b.1b(a,k)})}6 F=0,t=J.1R,s,m,G=/<L\\b[^<]*(?:(?!<\\/L>)<[^<]*)*<\\/L>/1X,C=/^(?:I|K)\\/16/i,D=/^(?:I|K)\\/V/i,H=/^\\s*$/;d.1e=0;d.1C=3(b,a){9(!("j"R b))5 d.U(b);6 c=b.32,f=(d.18(c)?c():c)||"P"+ ++F,g=t.2p("L"),h=J[f],l,e=3(a){d(g).2t("Q",a||"N")},k={N:e},m;a&&a.1p(k);d(g).2N("1I Q",3(c,e){1r(m);d(g).2Y().1J();"Q"!=c.j&&l?w(l[0],k,b,a):q(8,e||"Q",k,b,a);J[f]=h;l&&d.18(h)&&h(l[0]);h=l=12 0});9(!1===v(k,b))5 e("N"),k;J[f]=3(){l=11};g.1L=b.7.15(/\\?(.+)=\\?/,"?$1="+f);t.1M.1N(g);0<b.O&&(m=1t(3(){e("O")},b.O));5 k};d.1f={j:"1c",1o:p,M:p,Q:p,1G:p,Y:8,14:!0,1u:3(){5 1S J.1v},1w:{L:"I/16, K/16, K/x-16",W:"K/W",V:"K/V, I/V",T:"I/T",I:"I/1V"},19:!1,O:0,1s:!0,1g:!0};d.U=3(b){6 a=d.1Y({},b||{}),c=d.1x&&d.1x();1a(s R d.1f)12 0===a[s]&&(a[s]=d.1f[s]);A(a);a.19||(a.19=/^([\\w-]+:)?\\/\\/([^\\/]+)/.S(a.7)&&1y.$2!=J.1h.24);a.7||(a.7=J.1h.25());E(a);6 f=a.1d,g=/\\?.+=\\?/.S(a.7);g&&(f="P");!1!==a.1g&&(b&&!0===b.1g||"L"!=f&&"P"!=f)||(a.7=u(a.7,"26="+27.28()));9("P"==f)5 g||(a.7=u(a.7,a.P?a.P+"=?":!1===a.P?"":"29=?")),d.1C(a,c);b=a.1w[f];6 h={},g=3(a,b){h[a.2a()]=[a,b]},l=/^([\\w-]+:)\\/\\//.S(a.7)?1y.$1:J.1h.2b,e=a.1u(),k=e.1z,n;c&&c.1p(e);a.19||g("X-2d-2e","1v");g("2f",b||"*/*");9(b=a.1A||b)-1<b.2h(",")&&(b=b.1m(",",2)[0]),e.1B&&e.1B(b);(a.1i||!1!==a.1i&&a.o&&"1c"!=a.j.1D())&&g("2k-2l",a.1i||"K/x-2m-2n-2o");9(a.1j)1a(m R a.1j)g(m,a.1j[m]);e.1z=g;e.1k=3(){9(4==e.2r){e.1k=p;1r(n);6 b,g=!1;9(2s<=e.13&&2u>e.13||2v==e.13||0==e.13&&"2w:"==l){f=f||B(a.1A||e.2x("2y-j"));b=e.2z;2A{"L"==f?(0,2B)(b):"V"==f?b=e.2C:"W"==f&&(b=H.S(b)?8:d.2D(b))}2E(h){g=h}g?q(g,"2F",e,a,c):w(b,e,a,c)}2G q(e.2H||8,e.13?"Q":"N",e,a,c)}};9(!1===v(e,a))5 e.N(),q(8,"N",e,a,c),e;9(a.1l)1a(m R a.1l)e[m]=a.1l[m];e.2J(a.j,a.7,"1F"R a?a.1F:!0,a.2L,a.2M);1a(m R h)k.10(e,h[m]);0<a.O&&(n=1t(3(){e.1k=p;e.N();q(8,"O",e,a,c)},a.O));e.2O(a.o?a.o:8);5 e};d.2P=3(){5 d.U(r.10(8,11))};d.2Q=3(){6 b=r.10(8,11);b.j="2R";5 d.U(b)};d.2S=3(){6 b=r.10(8,11);b.1d="W";5 d.U(b)};d.2T.1I=3(b,a,c){9(!Z.1H)5 Z;6 f=Z,g=b.1m(/\\s/),h;b=r(b,a,c);6 l=b.M;1<g.1H&&(b.7=g[0],h=g[1]);b.M=3(a){f.T(h?d("<2W>").T(a.15(G,"")).2X(h):a);l&&l.10(f,11)};d.U(b);5 Z};6 z=2Z;d.1q=3(b,a){6 c=[];c.1b=3(a,b){Z.30(z(a)+"="+z(b))};y(c,b,a);5 c.31("&").15(/%20/g,"+")}})(2V);', 62, 189, '|||function||return|var|url|null|if||||||||||type|||||data||||||||||||||||||||text|window|application|script|success|abort|timeout|jsonp|error|in|test|html|ajax|xml|json||context|this|apply|arguments|void|status|global|replace|javascript|call|isFunction|crossDomain|for|add|GET|dataType|active|ajaxSettings|cache|location|contentType|headers|onreadystatechange|xhrFields|split|array|beforeSend|promise|param|clearTimeout|processData|setTimeout|xhr|XMLHttpRequest|accepts|Deferred|RegExp|setRequestHeader|mimeType|overrideMimeType|ajaxJSONP|toUpperCase|object|async|complete|length|load|remove|name|src|head|appendChild|value|ajaxBeforeSend|traditional|document|new|ajaxSend|rejectWith|plain|ajaxError|gi|extend|Event||ajaxComplete|ajaxStop|trigger|host|toString|_|Date|now|callback|toLowerCase|protocol|resolveWith|Requested|With|Accept|isArray|indexOf|ajaxSuccess|isPlainObject|Content|Type|www|form|urlencoded|createElement|each|readyState|200|triggerHandler|300|304|file|getResponseHeader|content|responseText|try|eval|responseXML|parseJSON|catch|parsererror|else|statusText|isDefaultPrevented|open|ajaxStart|username|password|on|send|get|post|POST|getJSON|fn|string|Zepto|div|find|off|encodeURIComponent|push|join|jsonpCallback'.split('|'), 0, {}));

//touch
eval(function (p, a, c, k, _e2, r) {
	_e2 = function e(c) {
		return (c < a ? '' : _e2(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e2(c)] = k[c] || _e2(c);
		}k = [function (e) {
			return r[e];
		}];_e2 = function _e2() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e2(c) + '\\b', 'g'), k[c]);
	}return p;
}('(2(g){2 u(a,c,d,f){y j.i(a-c)>=j.i(d-f)?0<a-c?"W":"V":0<d-f?"S":"Q"}2 v(){c=8;a.A&&(a.3.4("X"),a={})}2 r(){d&&6(d);m&&6(m);n&&6(n);c&&6(c);d=m=n=c=8;a={}}2 s(a){y("15"==a.10||a.10==a.1x)&&a.1w}2 t(a,c){y a.O=="1u"+c||a.O.1s()=="1g"+c}H a={},d,m,n,c,p;g(G).1f(2(){H k,q,l=0,f=0,e,h;"J"F L&&(p=1e J,p.C=G.1d);g(G).1c("1b",2(b){B(b=1<b.T?"V":-1>b.T?"W":1<b.U?"Q":-1>b.U?"S":8)a.3.4("o"),a.3.4("o"+b)}).7("1a 14 13",2(b){B(!(h=t(b,"12"))||s(b))e=h?b:b.E[0],b.E&&1===b.E.1o&&a.5&&(a.5=Y 0,a.9=Y 0),k=16.17(),q=k-(a.A||k),a.3=g("18"F e.C?e.C:e.C.19),d&&6(d),a.z=e.P,a.D=e.N,0<q&&M>=q&&(a.R=!0),a.A=k,c=x(v,1h),p&&h&&p.1i(b.1j)}).7("1k 1l 1m",2(b){B(!(h=t(b,"1n"))||s(b))e=h?b:b.E[0],c&&6(c),c=8,a.5=e.P,a.9=e.N,l+=j.i(a.z-a.5),f+=j.i(a.D-a.9)}).7("11 1p 1q",2(b){B(!(h=t(b,"1r"))||s(b))c&&6(c),c=8,a.5&&w<j.i(a.z-a.5)||a.9&&w<j.i(a.D-a.9)?n=x(2(){a.3.4("o");a.3.4("o"+u(a.z,a.5,a.D,a.9));a={}},0):"A"F a&&(w>l&&w>f?m=x(2(){H b=g.1t("Z");b.1v=r;a.3.4(b);a.R?(a.3&&a.3.4("K"),a={}):d=x(2(){d=8;a.3&&a.3.4("I");a={}},M)},0):a={}),l=f=0}).7("1y 1z 1A",r);g(L).7("1B",r)});"o 1C 1D 1E 1F K Z I X".1G(" ").1H(2(a){g.1I[a]=2(c){y 1J.7(a,c)}})})(1K);', 62, 109, '||function|el|trigger|x2|clearTimeout|on|null|y2|||||||||abs|Math|||||swipe||||||||30|setTimeout|return|x1|last|if|target|y1|touches|in|document|var|singleTap|MSGesture|doubleTap|window|250|pageY|type|pageX|Down|isDoubleTap|Up|velocityX|velocityY|Right|Left|longTap|void|tap|pointerType|touchend|down|pointerdown|MSPointerDown|touch|Date|now|tagName|parentNode|touchstart|MSGestureEnd|bind|body|new|ready|mspointer|750|addPointer|pointerId|touchmove|MSPointerMove|pointermove|move|length|MSPointerUp|pointerup|up|toLowerCase|Event|pointer|cancelTouch|isPrimary|MSPOINTER_TYPE_TOUCH|touchcancel|MSPointerCancel|pointercancel|scroll|swipeLeft|swipeRight|swipeUp|swipeDown|split|forEach|fn|this|Zepto'.split('|'), 0, {}));

//view
var standardDpi, dpi, w, scale;
var w = window.screen.width;
var contentWidth = 640;
var minScale = 0.25;
var maxScale = 4.0;
var userScale = 0;
var dpi, scale, viewport, mobileOptimized, appleCapable, appleTouchFullScreen;

if (window.screen.width > 0 && /android/.test(navigator.userAgent.toLowerCase())) {
	var orientationChange = function orientationChange() {
		window.location.reload();
		//		setTimeout(function(){
		//
		//			w = window.screen.width;
		//			dpi = contentWidth*standardDpi/w;
		//			dpi = Math.floor(dpi);
		//			scale = w/contentWidth;
		//			if(/chrome/.test(navigator.userAgent.toLowerCase()) && !/micromessenger/.test(navigator.userAgent.toLowerCase()))
		//			{
		//				if(!document.querySelector("meta[name=viewport]"))
		//				{
		//					viewport = document.createElement('meta');
		//					viewport.setAttribute('name','viewport');
		//					viewport.setAttribute('content','width='+contentWidth+',initial-scale='+scale+', maximum-scale='+maxScale+', minimum-scale='+minScale+', user-scalable='+userScale);
		//					document.getElementsByTagName('head')[0].appendChild(viewport);
		//				}else{
		//					document.querySelector("meta[name=viewport]").setAttribute('content','width='+contentWidth+',initial-scale='+scale+', maximum-scale='+maxScale+', minimum-scale='+minScale+', user-scalable='+userScale);
		//				}
		//			}else{
		//				if(!document.querySelector("meta[name=viewport]"))
		//				{
		//					viewport = document.createElement('meta');
		//					viewport.setAttribute('name','viewport');
		//					viewport.setAttribute('content','width='+contentWidth+',initial-scale=1.0, maximum-scale='+maxScale+', minimum-scale='+minScale+',target-densitydpi='+dpi+', user-scalable='+userScale);
		//					document.getElementsByTagName('head')[0].appendChild(viewport);
		//				}else{
		//					document.querySelector("meta[name=viewport]").setAttribute('content','width='+contentWidth+',initial-scale=1.0, maximum-scale='+maxScale+', minimum-scale='+minScale+',target-densitydpi='+dpi+', user-scalable='+userScale);
		//				}
		//			}
		//
		//		},100);
	};

	///android\s/.test(navigator.userAgent.toLowerCase())

	if (w > 0) {
		if (w < 320) {
			standardDpi = 120;
		} else if (w < 480) {
			standardDpi = 160;
		} else if (w < 640) {
			standardDpi = 240;
		} else if (w < 960) {
			standardDpi = 320;
		} else if (w < 1280) {
			standardDpi = 480;
		} else {
			standardDpi = 640;
		}
	}

	dpi = contentWidth * standardDpi / w;
	dpi = Math.floor(dpi);
	scale = w / contentWidth;

	if (/chrome/.test(navigator.userAgent.toLowerCase()) && !/micromessenger/.test(navigator.userAgent.toLowerCase()) && !/browser/.test(navigator.userAgent.toLowerCase())) {

		if (!document.querySelector("meta[name=viewport]")) {
			viewport = document.createElement('meta');
			viewport.setAttribute('name', 'viewport');
			viewport.setAttribute('content', 'width=' + contentWidth + ',initial-scale=' + scale + ', maximum-scale=' + maxScale + ', minimum-scale=' + minScale + ', user-scalable=' + userScale);
			document.getElementsByTagName('head')[0].appendChild(viewport);
		} else {
			document.querySelector("meta[name=viewport]").setAttribute('content', 'width=' + contentWidth + ',initial-scale=' + scale + ', maximum-scale=' + maxScale + ', minimum-scale=' + minScale + ', user-scalable=' + userScale);
		}
	} else {
		if (!document.querySelector("meta[name=viewport]")) {
			viewport = document.createElement('meta');
			viewport.setAttribute('name', 'viewport');
			viewport.setAttribute('content', 'width=' + contentWidth + ',initial-scale=1.0, maximum-scale=' + maxScale + ', minimum-scale=' + minScale + ',target-densitydpi=' + dpi + ', user-scalable=' + userScale);
			document.getElementsByTagName('head')[0].appendChild(viewport);
		} else {
			document.querySelector("meta[name=viewport]").setAttribute('content', 'width=' + contentWidth + ',initial-scale=1.0, maximum-scale=' + maxScale + ', minimum-scale=' + minScale + ',target-densitydpi=' + dpi + ', user-scalable=' + userScale);
		}
	}

	window.onorientationchange = orientationChange;
}

if ("-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement("style");
	msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important;height:auto!important}"));
	document.getElementsByTagName("head")[0].appendChild(msViewportStyle);

	if (!document.querySelector("meta[name=MobileOptimized]")) {
		mobileOptimized = document.createElement('meta');
		mobileOptimized.setAttribute('name', 'MobileOptimized');
		mobileOptimized.setAttribute('content', contentWidth);
		document.getElementsByTagName('head')[0].appendChild(mobileOptimized);
		document.write('<meta name="MobileOptimized" content="640">');
	} else {
		document.querySelector("meta[name=MobileOptimized]").setAttribute('content', contentWidth);
	}
}

if (/ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase())) {
	if (!document.querySelector("meta[name=viewport]")) {
		viewport = document.createElement('meta');
		viewport.setAttribute('name', 'viewport');
		viewport.setAttribute('content', 'width=' + contentWidth + ',user-scalable=' + userScale);
		document.getElementsByTagName('head')[0].appendChild(viewport);
	} else {
		document.querySelector("meta[name=viewport]").setAttribute('content', 'width=' + contentWidth + ',user-scalable=' + userScale);
	}

	if (!document.querySelector("meta[name=apple-mobile-web-app-capable]")) {
		appleCapable = document.createElement('meta');
		appleCapable.setAttribute('name', 'apple-mobile-web-app-capable');
		appleCapable.setAttribute('content', 'yes');
		document.getElementsByTagName('head')[0].appendChild(appleCapable);
	} else {
		document.querySelector("meta[name=apple-mobile-web-app-capable]").setAttribute('content', 'yes');
	}

	if (!document.querySelector("meta[name=apple-touch-fullscreen]")) {
		appleTouchFullScreen = document.createElement('meta');
		appleTouchFullScreen.setAttribute('name', 'apple-mobile-web-app-capable');
		appleTouchFullScreen.setAttribute('content', 'yes');
		document.getElementsByTagName('head')[0].appendChild(appleTouchFullScreen);
	} else {
		document.querySelector("meta[name=apple-mobile-web-app-capable]").setAttribute('content', 'yes');
	}
}
//# sourceMappingURL=zepto.min.js.map

'use strict';

(function () {
  var $music = $('#music');
  var $audio = $('#audio');
  var audio = $audio.get(0);
  var $play = $('#play');
  $play.on('ontouchstart' in window ? 'tap' : 'click', function () {
    if (audio.paused) {
      audio.play();
      $play.removeClass('musicOn');
    } else {
      audio.pause();
      $play.addClass('musicOn');
    }
  });
})();
//# sourceMappingURL=zmusic.js.map

"use strict";

//引入微信文件
document.write("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");
//记录分享信息

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

function AddPageView(App, URL, OpenID, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        URL: document.URL,
        UrlReferrer: document.referrer,
        Src: getQueryStringByName("src"),
        Remark: Remark
    });

    var host = window.location.host;
    //console.log(host);

    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function success(data) {
            if (data.Success) {
                //console.log(true);
            } else {
                    //console.log(false);
                }
        },
        error: function error(xhr, textStatus) {
            //console.log(xhr);
            //alert(textStatus);
        }
    });
}
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookies
function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
}
//生成guid
function CreateGUID() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
    }
    return guid;
}

//记录日志的URL
var _LogURL = "http://wx2.fractalist.com.cn/hengtian/SystemCommon/Log";
var _PVURL = "http://wx2.fractalist.com.cn/hengtian/SystemCommon/PageView";
var _GUID = getCookie("_GUID");
//console.log("_GUID:" + _GUID);
if (_GUID == "" || _GUID == null) {
    //生成一个guid
    _GUID = CreateGUID();
    //保存到cookie中
    setCookie("_GUID", _GUID);
}

var _App = "雪佛兰";
//没有openid 的时可以使用guid 作为用户id 统计uv
var _OpenID = _GUID;
var _Mobile = "";
var _Type = "";
var _SubType = "";
var _Method = "";
var _Parameter = document.URL;
var _Content = "";
var _Remark = "";
//记录pv_uv
AddPageView(_App, _PVURL, _OpenID, _Remark);

var pengyouquanTitle = "抢位置：七夕情话上震旦，让全中国看见";
var wxtitle = "抢位置：七夕情话上震旦，让全中国看见";

var wxdesc = "抢位置：七夕情话上震旦，让全中国看见";

var wxlink = "http://wx.fractalist.com.cn/chevroletapitest/7-7/index.aspx";
var wximgUrl = "http://wx.fractalist.com.cn/chevroletapitest/7-7/share/share-73a6d37b64.jpg";
window.addEventListener('load', onloadFun, false);

function _Log(URL, App, OpenID, Mobile, Type, SubType, Method, Parameter, Content, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        Mobile: Mobile,
        Type: Type,
        SubType: SubType,
        Method: Method,
        Parameter: Parameter,
        Content: Content,
        Remark: Remark
    });
    //url: "http://" + host + "/SystemCommon/Log",
    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function success(data) {
            if (data.Success) {
                //console.log(true);
            } else {
                    //console.log(false);
                }
        },
        error: function error(xhr, textStatus) {
            //console.log(xhr);
            //alert(textStatus);
        }
    });
}
//分享后记录数据
function RecordShare(type, remark) {
    _Type = type;
    _Remark = remark;
    _Log(_LogURL, _App, _OpenID, _Mobile, _Type, _SubType, _Method, _Parameter, _Content, _Remark);
}

function onloadFun() {
    $.ajax({
        async: false,
        url: 'http://wx.fractalist.com.cn/zhhd/GetWXJsApiByAjax.aspx?urlStr=' + encodeURIComponent(window.location.href),
        type: "GET",
        dataType: 'json',
        timeout: 5000,
        beforeSend: function beforeSend() {},
        success: function success(json) {
            wx.config({
                debug: false,
                appId: json["appId"],
                timestamp: json["timestamp"],
                nonceStr: json["nonceStr"],
                signature: json["signature"],
                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
            });

            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: wxtitle,
                    desc: wxdesc,
                    link: wxlink,
                    imgUrl: wximgUrl,
                    trigger: function trigger(res) {},
                    success: function success(res) {
                        RecordShare("好友", JSON.stringify(res));
                        // alert("分享成功"); 分享给好友
                        // window.location.href = 'info.html';
                    },
                    cancel: function cancel(res) {
                        // alert("cancel");
                    },
                    fail: function fail(res) {}
                });
                wx.onMenuShareTimeline({
                    title: pengyouquanTitle,
                    link: wxlink,
                    desc: wxdesc,
                    imgUrl: wximgUrl,
                    trigger: function trigger(res) {},
                    success: function success(res) {
                        RecordShare("朋友圈", JSON.stringify(res));
                        // alert("分享成功"); 分享给好友
                        // window.location.href = 'info.html';
                    },
                    cancel: function cancel(res) {
                        // alert("cancel");
                    },
                    fail: function fail(res) {
                        // alert("fail");
                    }
                });
            });
        },
        complete: function complete(XMLHttpRequest, textStatus) {},
        error: function error(xhr, textStatus) {
            // alert(textStatus);
            //console.info(xhr);
        }
    });
}
//# sourceMappingURL=zshare.js.map

"use strict";

// var domain = "http://wx.fractalist.com.cn/chevroletapitest";
var domain = 'http://chevrolet.6vi.com';

//数据请求
function upload(url, param, callback) {
    $.ajax({
        type: "post",
        url: url + "&t=" + Math.random(),
        data: param,
        dataType: "json",
        success: function success(data) {
            // console.log(data);
            //回调
            callback(data);
        },
        error: function error(xhr, textStatus) {
            //console.log(xhr);
            //alert(textStatus);
        }
    });
}

//获取用户最新的一条表白，显示在大楼上
function get_user_new_content(callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称"
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_user_new_content";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//获取最新n条表白信息
function get_contents(callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称"
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_contents";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//点赞数量加1
function add_like_count(ContentID, callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        ID: ContentID
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=add_like_count";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//提交表白内容
function add_love_content(Content, From, To, callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        LoveFrom: From,
        LoveTo: To,
        Content: Content
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=add_love_content";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//提交用户信息，并抽取电影票
function submit_userinfo_get_movieticket(realname, mobile, callback) {
    if (realname == "") {
        $("#infoError").html("姓名不能为空！");
        return false;
    };
    if (mobile == "" || mobile.length != 11) {
        $("#infoError").html("手机格式不正确！");
        return false;
    };
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        RealName: realname,
        Mobile: mobile
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=submit_userinfo_get_movieticket";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//获取抽奖失败用户的中奖信息（用户姓名/手机号码）
function get_userinfo(callback) {
    //
    var params = $.param({
        OpenID: "123",
        NickName: "昵称"
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=get_userinfo";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}

//预约赏车
function add_activity_customer_info(realname, mobile, provincename, cityname, carseries, dealer, salesconsultant, ExpectDate, callback) {

    //RealName = "刘涛",
    //Mobile = "13716170047",
    //CityName = "北京",
    //ProvinceName = "北京",
    //CarSeries = "全新科鲁兹",
    //Dealer = "天津市泓德汽车贸易有限公司",
    //ExpectDate = "2",
    //SalesConsultant = "李飞",
    //Remarks = "备注感言"

    if (realname == "") {
        $("#infoError").html("姓名不能为空！");
        return false;
    };
    if (mobile == "" || mobile.length != 11) {
        $("#infoError").html("手机格式不正确！");
        return false;
    };

    var params = $.param({
        OpenID: "123",
        NickName: "昵称",
        ExpectDate: ExpectDate,
        RealName: realname,
        Mobile: mobile,
        ProvinceName: provincename,
        CityName: cityname,
        CarSeries: carseries,
        Dealer: dealer,
        SalesConsultant: salesconsultant,
        Remarks: ''
    });
    var url = domain + "/7-7/CommonHandler.ashx?action=add_activity_customer_info";
    //请求后台
    upload(url, params, function (data) {
        //请求成功
        callback(data);
    });
}
//////////////////////--------------------------------------------////////////////////////////
//抽取电影票
$("#infoSub").click(function () {
    var realname = $("#realname").val();
    var mobile = $("#mobile").val();
    //抽取电影票
    submit_userinfo_get_movieticket(realname, mobile, function (data) {
        if (data.Success) {
            switch (data.ReturnCode) {
                case "000":
                    //---中奖
                    //电影票中奖码
                    var Movie = data.Message;

                    break;
                case "001":
                    //---已经中过奖

                    break;
                case "-001":
                    //---未中奖
                    break;
            }
        } else {
            //console.log(false);
        }
    });
});
//# sourceMappingURL=zzajax.js.map

"use strict";

(function (angular, undefined) {
	angular.module("qixi2016App.constants", []).constant("appConfig", {
		"userRoles": ["guest", "user", "admin"]
	});
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ArmsCtrl = function ArmsCtrl($state) {
    _classCallCheck(this, ArmsCtrl);
  };

  ArmsCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('arms', ArmsCtrl);
})();
//# sourceMappingURL=arms.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('arms', {
    url: '/arms',
    templateUrl: 'app/arms/arms.html',
    controller: 'arms'
  });
});
//# sourceMappingURL=arms.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var CarCtrl = function CarCtrl($state) {
    _classCallCheck(this, CarCtrl);
  };

  CarCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('car', CarCtrl);
})();
//# sourceMappingURL=car.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('car', {
    url: '/car',
    templateUrl: 'app/car/car.html',
    controller: 'car'
  });
});
//# sourceMappingURL=car.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var GoodCtrl = function GoodCtrl($state) {
    _classCallCheck(this, GoodCtrl);
  };

  GoodCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('good', GoodCtrl);
})();
//# sourceMappingURL=good.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('good', {
    url: '/good',
    templateUrl: 'app/good/good.html',
    controller: 'good'
  });
});
//# sourceMappingURL=good.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var InfoCtrl = function InfoCtrl($state) {
    _classCallCheck(this, InfoCtrl);
  };

  InfoCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('info', InfoCtrl);
})();
//# sourceMappingURL=info.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('info', {
    url: '/info',
    templateUrl: 'app/info/info.html',
    controller: 'info'
  });
});
//# sourceMappingURL=info.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var InfoFullCtrl = function InfoFullCtrl($state) {
    _classCallCheck(this, InfoFullCtrl);
  };

  InfoFullCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('infoFull', InfoFullCtrl);
})();
//# sourceMappingURL=infoFull.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('infoFull', {
    url: '/infoFull',
    templateUrl: 'app/infoFull/infoFull.html',
    controller: 'infoFull'
  });
});
//# sourceMappingURL=infoFull.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var LoseCtrl = function LoseCtrl($state) {
    _classCallCheck(this, LoseCtrl);
  };

  LoseCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('lose', LoseCtrl);
})();
//# sourceMappingURL=lose.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('lose', {
    url: '/lose',
    templateUrl: 'app/lose/lose.html',
    controller: 'lose'
  });
});
//# sourceMappingURL=lose.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var LoveCtrl = function LoveCtrl($state) {
    _classCallCheck(this, LoveCtrl);
  };

  LoveCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('love', LoveCtrl);
})();
//# sourceMappingURL=love.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('love', {
    url: '/love',
    templateUrl: 'app/love/love.html',
    controller: 'love'
  });
});
//# sourceMappingURL=love.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var LoveSucCtrl = function LoveSucCtrl($state) {
    _classCallCheck(this, LoveSucCtrl);
  };

  LoveSucCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('loveSuc', LoveSucCtrl);
})();
//# sourceMappingURL=loveSuc.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('loveSuc', {
    url: '/loveSuc',
    templateUrl: 'app/loveSuc/loveSuc.html',
    controller: 'loveSuc'
  });
});
//# sourceMappingURL=loveSuc.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainCtrl = function MainCtrl($state) {
    _classCallCheck(this, MainCtrl);
  };

  MainCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('main', MainCtrl);
})();
//# sourceMappingURL=main.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'main'
  });
});
//# sourceMappingURL=main.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var OrderSucCtrl = function OrderSucCtrl($state) {
    _classCallCheck(this, OrderSucCtrl);
  };

  OrderSucCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('orderSuc', OrderSucCtrl);
})();
//# sourceMappingURL=orderSuc.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('orderSuc', {
    url: '/orderSuc',
    templateUrl: 'app/orderSuc/orderSuc.html',
    controller: 'orderSuc'
  });
});
//# sourceMappingURL=orderSuc.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var RepeatCtrl = function RepeatCtrl($state) {
    _classCallCheck(this, RepeatCtrl);
  };

  RepeatCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('repeat', RepeatCtrl);
})();
//# sourceMappingURL=repeat.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('repeat', {
    url: '/repeat',
    templateUrl: 'app/repeat/repeat.html',
    controller: 'repeat'
  });
});
//# sourceMappingURL=repeat.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var WinCtrl = function WinCtrl($state) {
    _classCallCheck(this, WinCtrl);
  };

  WinCtrl.$inject = ['$state'];
  angular.module('qixi2016App').controller('win', WinCtrl);
})();
//# sourceMappingURL=win.controller.js.map

'use strict';

angular.module('qixi2016App').config(function ($stateProvider) {
  $stateProvider.state('win', {
    url: '/win',
    templateUrl: 'app/win/win.html',
    controller: 'win'
  });
});
//# sourceMappingURL=win.js.map

'use strict';

angular.module('qixi2016App').directive('arms', function () {
  return {
    templateUrl: 'components/arms/arms.html',
    restrict: 'EA',
    link: function link(scope, element, attrs) {

      var $armsMask = $('#armsMask');
      var od = 'ontouchstart' in window ? 'tap' : 'click';

      $('#arms8').addClass('arms8in').on('webkitAnimationEnd', function () {
        $(this).off().removeClass('arms8in').addClass('arms8Loop');
        cClick = true;
      });
      var iNow = 0;
      $('.armsClick').each(function (i, k) {
        $(k).on(od, function (e) {
          if (!cClick) {
            return;
          }
          e.stopPropagation();
          $armsMask.show().addClass('showAnim');
          $('#arms' + (i + 1) + 'Alert').show();
          $('#arm' + (i + 1) + 'Font').addClass('armsFontIn');
          $('#arm' + (i + 1) + 'Img2').addClass('arm' + (i + 1) + 'ImgAnim');
          iNow = i + 1;
        });
      });
      $(document).on(od, function () {
        $armsMask.hide().removeClass('showAnim');
        $('#arms' + iNow + 'Alert').hide();
        $('#arm' + iNow + 'Font').removeClass('armsFontIn');
        $('#arm' + iNow + 'Img2').removeClass('arm' + iNow + 'ImgAnim');
      });

      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=arms.directive.js.map

'use strict';

angular.module('qixi2016App').directive('car', function () {
        return {
                templateUrl: 'components/car/car.html',
                restrict: 'EA',
                link: function link(scope, element, attrs) {

                        var aLoadImgFirst = ['images/loading-2a2ac4484f.jpg'];
                        var aLoadImg = ['images/stars-de7611119f.jpg', 'images/car-63ca676ae1.png', 'images/carIn-b65740aba0.png', 'images/car1-bcdfaff4d9.png', 'images/car2-db3c1f83a5.png', 'images/car3-a392b3d6b1.png'];
                        var $loadingBg = $('#loadingBg');
                        var $carBg = $('#carBg');
                        var $loveSucSun = $('#loveSucSun');
                        var od = 'ontouchstart' in window ? 'tap' : 'click';

                        //真正页面运行
                        $('#carBg').show();
                        jq360();

                        /**
                         * img array 必须 加载的图片
                         * showProgress Boolean 不必须 是否显示进度，默认显示(true)
                         * loadingEnd function 必须 加载完执行的函数
                        */
                        function loading(params) {
                                var iNow = 0,
                                    i = 0,
                                    iLen = params.img.length,
                                    showProgress = typeof params.showProgress === 'undefined' ? true : params.showProgress,
                                    $loading = $('#loading');
                                for (i = 0, l = iLen; i < l; i++) {
                                        (function (i) {
                                                var yImg = new Image();
                                                yImg.onload = function () {
                                                        iNow++;
                                                        if (showProgress) {
                                                                $loading.text(parseInt(iNow / iLen * 100));
                                                        }
                                                        if (iNow === iLen) {
                                                                typeof params.loadingEnd === 'function' && params.loadingEnd();
                                                        }
                                                };
                                                yImg.src = params.img[i];
                                        })(i);
                                }
                        }

                        //360

                        function jq360() {
                                var c_i = 1;
                                var iAllNum = 3;
                                var c1 = new Array();
                                //创建数组，i的数量是图片的总数；进行for循环。
                                for (var i = 1; i <= iAllNum; i++) {
                                        c1[i] = new Image();
                                        c1[i].src = "images/car" + i + ".png";
                                }

                                //定义要360度旋转的对象
                                var $main_swipe = $("#car");

                                //创建滑动的基本距离和滑动方法属性。
                                var defaults = { x: 10, y: 30 };
                                //定义初始坐标
                                var originalCoord = { x: 0, y: 0 };
                                var shiftCoord = { x: 0, y: 0 };
                                var finalCoord = { x: 0, y: 0 };

                                //向左滑动方法
                                var showPicLeft = function showPicLeft() {
                                        c_i--;
                                        if (c_i < 1) {
                                                c_i = iAllNum;
                                        };
                                        $main_swipe.attr({ src: c1[c_i].src });
                                };

                                //向右滑动方法
                                var showPicRight = function showPicRight() {
                                        c_i++;
                                        if (c_i > iAllNum) {
                                                c_i = 1;
                                        };
                                        $main_swipe.attr({ src: c1[c_i].src });
                                };

                                $main_swipe.bind({
                                        "touchstart": function touchstart(ev) {
                                                //定义滑动初始时的坐标
                                                originalCoord.x = event.targetTouches[0].pageX;
                                                originalCoord.y = event.targetTouches[0].pageY;
                                                shiftCoord.x = event.targetTouches[0].pageX;
                                                shiftCoord.y = event.targetTouches[0].pageY;
                                                finalCoord.x = originalCoord.x;
                                                finalCoord.y = originalCoord.y;
                                        },
                                        "touchmove": function touchmove(ev) {

                                                //定义滑动中的坐标
                                                event.preventDefault();
                                                finalCoord.x = event.targetTouches[0].pageX;
                                                finalCoord.y = event.targetTouches[0].pageY;

                                                //当横向滑动距离大于5时，则判断为有效滑动并执行向左滑动的方法。反之则向向右滑动。
                                                if (finalCoord.x - shiftCoord.x > 30) {
                                                        showPicLeft();
                                                        shiftCoord.x = finalCoord.x;
                                                } else if (finalCoord.x - shiftCoord.x < -30) {
                                                        showPicRight();
                                                        shiftCoord.x = finalCoord.x;
                                                }
                                        },
                                        "touchend": function touchend(ev) {

                                                var changeY = originalCoord.y - finalCoord.y;

                                                //滑动结束时，进行坐标判断。并执行向左或是向右的方法
                                                if (changeY < defaults.y && changeY > defaults.y * -1) {

                                                        changeX = originalCoord.x - finalCoord.x;

                                                        if (changeX > defaults.x) {
                                                                showPicRight();
                                                        }

                                                        if (changeX < defaults * -1) {
                                                                showPicLeft();
                                                        }
                                                }
                                        }
                                });
                        };
                        document.addEventListener('touchmove', function (e) {
                                e.preventDefault();
                        }, false);
                }
        };
});
//# sourceMappingURL=car.directive.js.map

'use strict';

angular.module('qixi2016App').directive('firstIndex', function () {
  return {
    templateUrl: 'components/firstIndex/firstIndex.html',
    restrict: 'EA',
    replace: true,
    controller: ['$state', function ($state) {
      this.$state = $state;
    }],
    link: function link(scope, element, attrs, ctrl) {
      var bCanGravity = false;
      var oAutoTime = null;
      var iSpeed = 0.2;
      var time = null;
      var bCanMove = true;

      var aLoadImgFirst = ['./assets/images/loading-2a2ac4484f.jpg'];
      var aLoadImg = ['./assets/images/indexBg-48db4ef63f.jpg', './assets/images/indexFloor-7612e7af08.png', './assets/images/indexCar-a81a5cde4e.png', './assets/images/indexStar1-263b99e361.png', './assets/images/indexStar2-b953082849.png', './assets/images/indexShip0-fbd3ab9aa7.png', './assets/images/indexShip1-e9b6d2f24f.png', './assets/images/indexShip2-5ce2fe438f.png', './assets/images/indexShip3-d9af14eed5.png', './assets/images/indexHeart-0cb259cb66.png', './assets/images/indexBig-8fd9e824ab.png', './assets/images/indexPause-737db27159.png', './assets/images/indexPlay-9ada1b49d5.png', './assets/images/indexView-bba058faed.jpg'];
      var $loadingBg = $('#loadingBg');
      var $indexBg = $('#indexBg');
      var $indexBig = $('#indexBig');
      var $floorBg = $('#floorBg');
      var $indexTip = $('#indexTip');
      var $floorBg = $("#floorBg");
      var $indexHeart = $('#indexHeart');
      var od = 'ontouchstart' in window ? 'tap' : 'click';
      var loadingTime = null;

      loading({
        img: aLoadImgFirst,
        showProgress: false,
        loadingEnd: function loadingEnd() {
          //加载load图片完成
          $loadingBg.addClass('showAnim').on('webkitAnimationEnd', function () {
            $(this).off();
            loading({
              img: aLoadImg,
              loadingEnd: function loadingEnd() {
                //本页所有图片完成
                get_user_new_content(function (data) {
                  if (data.Success) {
                    $indexBg.show();
                    $('#floorBgImg').attr('src', aLoadImg[1]);
                    $loadingBg.addClass('hideAnim').on('webkitAnimationEnd', function () {
                      //真正页面运行
                      $(this).hide().off();
                      $('#indexFontGoContent').html('From ' + data.Data.LoveFrom + '<br />' + data.Message + '<br />' + 'To ' + data.Data.LoveTo);
                      init();
                      clearTimeout(loadingTime);
                    });
                  }
                });
              }
            });
          });
        }
      });

      loadingTime = setTimeout(init, 60000); //60秒若没loading完，自动进页面

      function init() {
        musicFn();
        function musicFn() {
          var $music = $('#music');
          var $audio = $('#audio');
          var audio = $audio.get(0);
          var $play = $('#play');
          $play.on(od, function () {
            if (audio.paused) {
              audio.play();
              $play.removeClass('musicOn');
            } else {
              audio.pause();
              $play.addClass('musicOn');
            }
          });
        }
        //重力
        setTimeout(orientation, 4000);

        //自动走
        autoMove();

        var bOne = false;

        //点击放大镜
        $indexBig.on(od, triggerBig);
        //点击大楼按钮
        $('#indexCircleBox1').on(od, function () {
          toBig(true);
          setTimeout(function () {
            ctrl.$state.go('good');
          }, 2000);
        });

        function toBig(isGoOut) {
          bCanGravity = false;
          clearInterval(time);
          bCanMove = false;

          $indexBig.hide();

          $('#indexTip,#indexHeart,#indexCircleBox1').hide(); //#bigHide,#indexCircleBox1,

          $('.indexCar').css({
            'left': 40,
            'top': 830
          });
          $('.indexShip,.indexShip0').css({
            'top': 807
          });

          $('#floorBgImg').css('left', -240);
          $('#floorBgImg,#indexBgImg').addClass('floorBgImgIn');
          $('#star2Bg,#star1Bg').removeClass('starBgOutAnim').addClass('starBgIn').on('webkitAnimationEnd', function () {
            $(this).off().removeClass('starBgIn').addClass('starBgInAnim');
          });

          $floorBg.css({
            'transform': 'scale(1.9)',
            '-webkit-transform': 'scale(1.9)'
          }).on('webkitTransitionEnd', function () {
            $(this).off();
            if (!isGoOut) {
              $indexBig.css({
                left: 338,
                top: 473
              }).show();
              // $indexBig.addClass('indexBigAnim').show();
            }
            $('#indexView').addClass('showAnim');
          });

          //文字跑马灯
          autoTabFont();
        }
        function triggerBig() {
          bOne = !bOne;

          if (bOne) {
            toBig();
          } else {
            $indexBig.removeClass('indexBigAnim').hide();
            $('#indexView').removeClass('showAnim');
            $('.indexCar').css({
              'left': 0,
              'top': 720
            });
            $('.indexShip').css({
              'top': 637
            });
            $('.indexShip0').css({
              'top': 610
            });
            $('#indexHeart').css('left', 290);
            $('#indexTip').css('left', 404);
            $('#indexCircleBox1').css('left', 338);

            $('#star1Bg,#star2Bg').removeClass('starBgInAnim').addClass('starBgOut');
            setTimeout(function () {
              $('#star1Bg,#star2Bg').off().removeClass('starBgOut').addClass('starBgOutAnim');
            }, 1000);
            $('#floorBgImg,#indexBgImg').removeClass('floorBgImgIn').addClass('floorBgImgOut').on('webkitAnimationEnd', function () {
              $(this).off().removeClass('floorBgImgOut');
            });

            $floorBg.css({
              'left': 0,
              'transform': 'scale(1)',
              '-webkit-transform': 'scale(1)'
            }).on('webkitTransitionEnd', function () {
              $(this).off();
              $indexBig.css({
                left: 339,
                top: 297
              }).show();
              $('#indexTip,#indexHeart,#indexCircleBox1').show();
            });
            bCanGravity = true;
          }
        }
      }

      /**
       * img array 必须 加载的图片
       * showProgress Boolean 不必须 是否显示进度，默认显示(true)
       * loadingEnd function 必须 加载完执行的函数
      */
      function loading(params) {
        var iNow = 0,
            i = 0,
            iLen = params.img.length,
            showProgress = typeof params.showProgress === 'undefined' ? true : params.showProgress,
            $loading = $('#loading');
        for (i = 0; i < iLen; i++) {
          (function (i) {
            var yImg = new Image();
            yImg.onload = function () {
              iNow++;
              if (showProgress) {
                $loading.text(parseInt(iNow / iLen * 100));
              }
              if (iNow === iLen) {
                typeof params.loadingEnd === 'function' && params.loadingEnd();
              }
            };
            yImg.src = params.img[i];
          })(i);
        }
      }

      function orientation() {
        window.addEventListener('deviceorientation', orientationListener, false);
      }

      function orientationListener(evt) {
        if (!bCanGravity) {
          return;
        }
        if (!evt.gamma && !evt.beta) {
          evt.gamma = evt.x * (220 / Math.PI);
          evt.beta = evt.y * (220 / Math.PI);
          evt.alpha = evt.z * (220 / Math.PI);
        }

        var gamma = evt.gamma;
        var beta = evt.beta;
        var alpha = evt.alpha;

        if (evt.accelerationIncludingGravity) {
          gamma = event.accelerationIncludingGravity.x * 10;
          beta = -event.accelerationIncludingGravity.y * 10;
          alpha = event.accelerationIncludingGravity.z * 10;
        }

        gamma = gamma.toFixed(1);
        beta = beta.toFixed(1);
        alpha = alpha.toFixed(1);
        if (this._lastGamma != gamma || this._lastBeta != beta) {
          $('#floorBgImg').css({
            left: gamma / 220 * 140 - 240
          });
          $('#star1Bg,#star2Bg').css({
            left: gamma / 220 * 140 - 240
          });
          $('#indexHeart').css({
            left: gamma / 220 * 140 + 530 - 240
          });
          $('#indexBig').css({
            left: gamma / 220 * 140 + 579 - 240
          });
          $('#indexTip').css({
            left: gamma / 220 * 140 + 664 - 240
          });
          $('#indexCircleBox1').css({
            left: gamma / 220 * 140 + 548 - 240
          });
          this._lastGamma = gamma;
          this._lastBeta = beta;
        }
      };

      //自动走
      function autoMove() {
        var $starBg = $('#star1Bg,#star2Bg');
        var $bg = $('#floorBgImg,#indexBgImg');
        var $indexCircleBox1 = $('#indexCircleBox1');
        var $indexHeart = $('#indexHeart');
        var $indexTip = $('#indexTip');
        var $indexBig = $('#indexBig');
        var gapTime = 1;
        var iNow = 0;

        var winWidth = $(window).width();

        moveFn();
        time = setInterval(moveFn, gapTime);

        function moveFn() {
          if (iNow > 240) {
            clearInterval(time);
            bCanGravity = true;
            iNow = 240;
          } else {
            iNow += iSpeed;
          }
          $bg.css({
            left: -iNow
          });
          $starBg.css({
            left: -iNow
          });
          if (548 - iNow > 10) {
            $indexCircleBox1.css({
              left: 548 - iNow
            });
          }
          if (644 - iNow > 10) {
            $indexTip.css({
              left: 644 - iNow
            });
          }
          if (540 - iNow > 10) {
            $indexHeart.css({
              left: 530 - iNow
            });
          }
          if (579 - iNow > 10) {
            $indexBig.css({
              left: 579 - iNow
            });
          }
        }
      }
      //文字跑马灯
      function autoTabFont() {
        var $indexFontGo = $('#indexFontGo');
        var $indexFontGoScroll = $('#indexFontGoScroll');
        var $indexFontGoContent = $('.indexFontGoContent');
        var indexFontGoHeight = $indexFontGo.height();
        var indexFontGoContentHeight = $indexFontGoContent.height();
        var iNow = 0;

        if (indexFontGoContentHeight <= indexFontGoHeight) {
          //如果内容高度<=外面的高度
          return;
        }

        $indexFontGoScroll.append($indexFontGoContent.clone());

        clearInterval(oAutoTime);
        oAutoTime = setInterval(autoTabGo, 20);

        function autoTabGo() {
          var indexFontGoScrollTop = $indexFontGoScroll.offset().top;
          if (iNow > indexFontGoContentHeight) {
            iNow = 0;
          } else {
            iNow++;
          }
          $indexFontGoScroll.css('top', -iNow);
        }
      }

      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=firstIndex.directive.js.map

'use strict';

angular.module('qixi2016App').directive('good', function () {
  return {
    templateUrl: 'components/good/good.html',
    restrict: 'EA',
    link: function link(scope, element, attrs) {

      var aLoadImgFirst = ['images/loading-2a2ac4484f.jpg'];
      var aLoadImg = ['images/stars-de7611119f.jpg', 'images/good-5f0ea77ede.png'];
      var od = 'ontouchstart' in window ? 'tap' : 'click';
      var listData = [];

      get_contents(function (data) {
        var sHtml = '';
        if (data.Success) {
          data.Data.sort(function (a, b) {
            return b.LoveCount - a.LoveCount;
          });
          listData = data.Data;
          $.each(data.Data, function (i, k) {
            sHtml += '<li class="clear">' + '<div class="goodListL">' + '<h2 class="goodListLh2">From ' + k.LoveFrom + '</h2>' + '<p class="goodListLP">' + k.Content + '</p>' + '<h2 class="goodListLh2 tar">To ' + k.LoveTo + '</h2>' + '</div>' + '<div class="goodListR">';
            if (k.IsClicked) {
              sHtml += '<div class="goodHeart changeWord goodHeartOn">桃心</div>';
            } else {
              sHtml += '<div class="goodHeart changeWord">桃心</div>';
            }
            sHtml += '<p class="tac goodNum">' + k.LoveCount + '</p>' + '</div>' + '</li>';
          });
          $('#goodList').append(sHtml);
          addHeart();
        }
      });

      function addHeart() {
        var $loadingBg = $('#loadingBg');
        var $goodHeart = $('.goodHeart');
        var $goodBg = $('#goodBg');
        var od = 'ontouchstart' in window ? 'tap' : 'click';
        var myScroll = new IScroll('#iWrapper', { mouseWheel: true, click: true });
        $goodHeart.on(od, function () {
          var $next = $(this).next();
          var $closest = $(this).closest('li');

          var nextNum = $next.html();
          var iNowItem = listData[$closest.index()];
          if (!iNowItem.IsClicked) {
            add_like_count(iNowItem.ID, function (data) {
              if (data.ReturnCode === '000') {
                $goodHeart.eq($closest.index()).addClass('goodHeartOn');
                $next.html(++nextNum);
              }
            });
          }
        });
      }

      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=good.directive.js.map

'use strict';

angular.module('qixi2016App').directive('info', function () {
  return {
    templateUrl: 'components/info/info.html',
    restrict: 'EA',
    controller: ['$state', function ($state) {
      this.$state = $state;
    }],
    link: function link(scope, element, attrs, ctrl) {
      var $infoSub = $('#infoSub');
      var $name = $('#name');
      var $infoError = $('#infoError');
      var $tel = $('#tel');
      var od = 'ontouchstart' in window ? 'tap' : 'click';

      $infoSub.on(od, function () {
        var sTel = $tel.val();
        var sName = $name.val();
        submit_userinfo_get_movieticket(sName, sTel, function (data) {
          if (data.Success) {
            if (data.ReturnCode === '001') {
              ctrl.$state.go('repeat');
            } else if (data.ReturnCode === '000') {
              localStorage.WINCODE = data.Message;
              ctrl.$state.go('win');
            } else if (data.ReturnCode === '-001') {
              ctrl.$state.go('lose');
            }
          }
        });
      });
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=info.directive.js.map

'use strict';

angular.module('qixi2016App').directive('infoFull', function () {
  return {
    templateUrl: 'components/infoFull/infoFull.html',
    restrict: 'EA',
    controller: ['$state', function ($state) {
      this.$state = $state;
    }],
    link: function link(scope, element, attrs, ctrl) {
      get_userinfo(function (data) {
        var $name = $('#name');
        var $tel = $('#tel');
        var $time = $('#time');
        var $sales = $('#sales');
        var $dealer = $('#dealer');
        var $infoSub = $('#infoSub');
        var $infoError = $('#infoError');
        var od = 'ontouchstart' in window ? 'tap' : 'click';

        if (data.Success) {

          if (data.ReturnCode === '-001') {
            $name.attr('placeholder', '请输入您的电话');
            $name.attr('placeholder', '请输入您的名字');
          } else {
            $name.val(data.Data.Mobile);
            $name.val(data.Data.RealName);
          }
          $infoSub.on(od, function () {
            var sTimeVal = $time.val();
            var sSalesVal = $sales.val();
            var sDealerVal = $dealer.val();
            var sNameVal = $name.val();
            var sTelVal = $tel.val();

            if (sDealerVal === '0') {
              $infoError.html('请选经销商');
              return;
            }
            if (sSalesVal === '0') {
              $infoError.html('请选择销售顾问');
              return;
            }
            if (sTimeVal === '0') {
              $infoError.html('请选择意向购车时间');
              return;
            }

            add_activity_customer_info(sNameVal, sTelVal, data.Data.ProvinceName, data.Data.CityName, data.Data.CarSeries, sDealerVal, sSalesVal, sTimeVal, function (data) {
              if (data.Success) {
                // window.location.href = 'orderSuc.html';
                ctrl.$state.go('orderSuc');
              }
            });
          });
        }
      });
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=infoFull.directive.js.map

'use strict';

angular.module('qixi2016App').directive('lose', function () {
  return {
    templateUrl: 'components/lose/lose.html',
    restrict: 'EA',
    link: function link(scope, element, attrs) {
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=lose.directive.js.map

'use strict';

angular.module('qixi2016App').directive('love', function () {
  return {
    templateUrl: 'components/love/love.html',
    restrict: 'EA',
    controller: ['$state', function ($state) {
      this.$state = $state;
    }],
    link: function link(scope, element, attrs, ctrl) {
      var od = 'ontouchstart' in window ? 'tap' : 'click';
      var $loveInp = $('#loveInp');
      var $loveFrom = $('#loveFrom');
      var $loveTo = $('#loveTo');

      $('#loveBtn').on(od, function () {
        //上传并抽取电影票点击事件
        var sLoveFromVal = $loveFrom.val();
        var sLoveToVal = $loveTo.val();
        var sLoveInpVal = $loveInp.val();
        if (sLoveFromVal.length <= 0) {
          $('#infoError').html('From不能为空');
          return;
        }
        if (sLoveInpVal.length > 14) {
          $('#infoError').html('您输入的情话大于14字');
          return;
        }

        if (sLoveInpVal.length < 3) {
          $('#infoError').html('您输入的情话小于3字');
          return;
        }
        if (sLoveInpVal.length <= 0) {
          $('#infoError').html('上传情话不能为空');
          return;
        }
        if (sLoveToVal.length <= 0) {
          $('#infoError').html('To不能为空');
          return;
        }
        add_love_content(sLoveInpVal, sLoveFromVal, sLoveToVal, function (data) {
          if (data.Success) {
            $('#lovepreview').show().addClass('showAnim').on('webkitAnimationEnd', function () {
              $(this).off();
              //文字跑马灯
              autoTabFont();
              setTimeout(function () {
                ctrl.$state.go('loveSuc');
              }, 2000);
            });
          }
        });
      });

      //文字跑马灯
      function autoTabFont() {
        var $loveFontGo = $('#loveFontGo');
        var $loveFontGoScroll = $('#loveFontGoScroll');
        var $loveFontGoContent = $('.loveFontGoContent');
        var loveFontGoHeight = $loveFontGo.height();
        $loveFontGoContent.html('From ' + $('#loveFrom').val() + '<br />' + $('#loveInp').val() + '<br />' + 'To ' + $('#loveTo').val()); //赋值
        var loveFontGoContentHeight = $loveFontGoContent.height();
        var iNow = 0;

        if (loveFontGoContentHeight <= loveFontGoHeight) {
          //如果内容高度<=外面的高度
          return;
        }

        $loveFontGoScroll.append($loveFontGoContent.clone());

        oAutoTime = setInterval(autoTabGo, 20);

        function autoTabGo() {
          var loveFontGoScrollTop = $loveFontGoScroll.offset().top;
          if (iNow > loveFontGoContentHeight) {
            iNow = 0;
          } else {
            iNow++;
          }
          $loveFontGoScroll.css('top', -iNow);
        }
      }
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=love.directive.js.map

'use strict';

angular.module('qixi2016App').directive('loveSuc', function () {
  return {
    templateUrl: 'components/loveSuc/loveSuc.html',
    restrict: 'EA',
    link: function link(scope, element, attrs) {

      var aLoadImgFirst = ['images/loading-2a2ac4484f.jpg'];
      var aLoadImg = ['images/stars-de7611119f.jpg', 'images/loveSuc-974c87a1cf.png', 'images/loveSucSun-869c1bd00c.png'];
      var $loadingBg = $('#loadingBg');
      var $loveSucBg = $('#loveSucBg');
      var $loveSucSun = $('#loveSucSun');
      var od = 'ontouchstart' in window ? 'tap' : 'click';
      $('#loveSucBtn').on(od, function (e) {
        e.stopPropagation();
        $loveSucSun.show().addClass('showAnim').on('webkitAnimationEnd', function () {
          $(this).off();
        });
      });
      $(document).on(od, function () {
        $loveSucSun.removeClass('showAnim').hide();
      });

      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=loveSuc.directive.js.map

'use strict';

angular.module('qixi2016App').directive('orderSuc', function () {
  return {
    templateUrl: 'components/orderSuc/orderSuc.html',
    restrict: 'EA',
    link: function link(scope, element, attrs) {
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=orderSuc.directive.js.map

'use strict';

angular.module('qixi2016App').directive('repeat', function () {
  return {
    templateUrl: 'components/repeat/repeat.html',
    restrict: 'EA',
    link: function link(scope, element, attrs) {
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=repeat.directive.js.map

'use strict';

angular.module('qixi2016App').directive('win', function () {
  return {
    templateUrl: 'components/win/win.html',
    restrict: 'EA',
    link: function link(scope, element, attrs) {
      var od = 'ontouchstart' in window ? 'tap' : 'click';
      $('#winCode').html(localStorage.WINCODE);
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  };
});
//# sourceMappingURL=win.directive.js.map

angular.module("qixi2016App").run(["$templateCache", function($templateCache) {$templateCache.put("app/car/car.html","<car></car>\n");
$templateCache.put("app/arms/arms.html","<arms></arms>\n");
$templateCache.put("app/good/good.html","<good></good>\n");
$templateCache.put("app/info/info.html","<info></info>\n");
$templateCache.put("app/infoFull/infoFull.html","<info-full></info-full>\n");
$templateCache.put("app/lose/lose.html","<lose></lose>\n");
$templateCache.put("app/loveSuc/loveSuc.html","<love-suc></love-suc>\n");
$templateCache.put("app/love/love.html","<love></love>\n");
$templateCache.put("app/main/main.html","<first-index></first-index>\n");
$templateCache.put("app/orderSuc/orderSuc.html","<order-suc></order-suc>\n");
$templateCache.put("app/repeat/repeat.html","<repeat></repeat>\n");
$templateCache.put("app/win/win.html","<win></win>\n");
$templateCache.put("components/arms/arms.html","<div class=\"porR wrapper\">\r\n	<div id=\"armsBg\" class=\"posCenter armsBg\">\r\n		<div class=\"porR armsFont\">\r\n			<div id=\"arms8\" class=\"porA armsAll arms8 changeWord\">武器汽车</div>\r\n			<div id=\"arms1\" class=\"porA armsClick armsAll arms1 changeWord\">武器1</div>\r\n			<div class=\"porA armsClick armsAll arms2 changeWord\">武器2</div>\r\n			<div class=\"porA armsClick armsAll arms3 changeWord\">武器3</div>\r\n			<div class=\"porA armsClick armsAll arms4 changeWord\">武器4</div>\r\n			<div class=\"porA armsClick armsAll arms5 changeWord\">武器5</div>\r\n			<div class=\"porA armsClick armsAll arms6 changeWord\">武器6</div>\r\n			<div class=\"porA armsClick armsAll arms7 changeWord\">武器7</div>\r\n			<span class=\"porA changeWord o0 carIn\">箭头</span>\r\n			<a id=\"carLink\" ui-sref=\"infoFull\" class=\"porA carLink changeWord\">预约到店赏车领取电影票</a>\r\n		</div>\r\n	</div>\r\n	<div id=\"armsMask\" class=\"dn o0 porA armsMask changeWord\">遮罩</div>\r\n	<div id=\"arms1Alert\" class=\"dn armsAlert arms1Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms1Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm1Img\">\r\n			<img src=\"images/arm1Font-29b551a8a4.png\" id=\"arm1Font\" class=\"armFont arm1Font\" />\r\n			<img src=\"images/arm1Img2-b2236b98cb.png\" id=\"arm1Img2\" class=\"porA arm1Img2\" />\r\n		</div>\r\n	</div>\r\n\r\n	<div id=\"arms2Alert\" class=\"dn armsAlert arms2Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms2Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm2Img\">\r\n			<img src=\"images/arm2Img-31c02b7071.jpg\" id=\"arm2Img2\" class=\"porA o0 arm2Img2\" />\r\n			<img src=\"images/arm2Font-6a6442308f.png\" id=\"arm2Font\" class=\"armFont arm2Font\" />\r\n		</div>\r\n	</div>\r\n\r\n	<div id=\"arms3Alert\" class=\"dn armsAlert arms3Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms3Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm3Img\">\r\n			<img src=\"images/arm3Img2-5efd10cef9.png\" id=\"arm3Img2\" class=\"porA arm3Img2\" />\r\n			<img src=\"images/arm3Font-e9c7e8d56b.png\" id=\"arm3Font\" class=\"armFont arm3Font\" />\r\n		</div>\r\n	</div>\r\n\r\n	<div id=\"arms4Alert\" class=\"dn armsAlert arms4Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms4Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm4Img\">\r\n			<img src=\"images/arm4Img-405883c381.jpg\" id=\"arm4Img2\" class=\"porA o0 arm4Img2\" />\r\n			<img src=\"images/arm4Font-deca957a72.png\" id=\"arm4Font\" class=\"armFont arm4Font\" />\r\n		</div>\r\n	</div>\r\n\r\n	<div id=\"arms5Alert\" class=\"dn armsAlert arms5Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms5Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm5Img\">\r\n			<img src=\"images/arm5Font-10ae1e808f.png\" id=\"arm5Font\" class=\"armFont arm5Font\" />\r\n			<img src=\"images/arm5Img2-67bcdf1076.png\" id=\"arm5Img2\" class=\"porA arm5Img2\" />\r\n\r\n		</div>\r\n	</div>\r\n\r\n	<div id=\"arms6Alert\" class=\"dn armsAlert arms6Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms6Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm6Img\">\r\n			<img src=\"images/arm6Img-8c9856a8d1.jpg\" id=\"arm6Img2\" class=\"porA o0 arm6Img2\" />\r\n			<img src=\"images/arm6Font-486269baba.png\" id=\"arm6Font\" class=\"armFont arm6Font\" />\r\n		</div>\r\n	</div>\r\n\r\n	<div id=\"arms7Alert\" class=\"dn armsAlert arms7Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms7Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm7Img\">\r\n			<img src=\"images/arm7Img-bd47c28c01.jpg\" id=\"arm7Img2\" class=\"porA o0 arm7Img2\" />\r\n			<img src=\"images/arm7Font-f0b876677a.png\" id=\"arm7Font\" class=\"armFont arm7Font\" />\r\n		</div>\r\n	</div>\r\n\r\n	<div id=\"arms1Alert\" class=\"dn armsAlert arms1Alert changeWord\">\r\n		<a href=\"javascript:;\" id=\"arms1Quit\" class=\"porA armsQuit changeWord\">关闭</a>\r\n		<div class=\"porR armImg arm1Img\">\r\n			<img src=\"images/arm1Font-29b551a8a4.png\" id=\"arm1Font\" class=\"armFont arm1Font\" />\r\n		</div>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/car/car.html","<div class=\"porR wrapper\">\r\n	<div id=\"carBg\" class=\"posCenter carBg\">\r\n		<div class=\"carBg2\">\r\n			<img id=\"car\" class=\"porA car\" src=\"images/car1-bcdfaff4d9.png\" />\r\n			<span class=\"porA changeWord o0 carIn carIn2\">箭头</span>\r\n			<a href=\"arms.html\" class=\"porA carArms changeWord\">七中武器</a>\r\n			<a href=\"infoFull.html\" class=\"porA carLink changeWord\">预约到店赏车领取电影票</a>\r\n		</div>\r\n	</div>\r\n	<div id=\"loveSucSun\" class=\"porA dn o0 loveSucSun changeWord\">\r\n		<img src=\"images/loveSucSun-869c1bd00c.png\" width=\"100%\" />\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/firstIndex/firstIndex.html","<div class=\"porR wrapper indexWraper\">\n	<div id=\"loadingBg\" class=\"o0 loadingBg\">\n		<p class=\"cfff tac loadingTip\">Loading&nbsp;<span id=\"loading\">0</span>%&nbsp;...</p>\n	</div>\n	<div id=\"indexBg\" class=\"dn posCenter indexBg\">\n		<div id=\"indexBgImg\" class=\"porA indexBgImg\"></div>\n		<img id=\"floorBgImg\" class=\"porA floorBgImg\" />\n		<div id=\"floorBg\" class=\"porA floorBg\"><!--楼-->\n			<div id=\"star1Bg\" class=\"porA star1Bg changeWord starBgOutAnim\">星星1</div><!--starBgOutAnim-->\n			<div id=\"star2Bg\" class=\"porA star2Bg o0 changeWord starBgOutAnim\">星星2</div>\n			<div id=\"indexHeart\" class=\"porA indexHeart changeWord\">心</div>\n			<div id=\"indexView\" class=\"o0 porA indexView\"><!--文字跑马灯-->\n					<div id=\"indexFontGo\" class=\"oh porA indexFontGo\">\n						<div id=\"indexFontGoScroll\" class=\"porA indexFontGoScroll\">\n							<div id=\"indexFontGoContent\" class=\"indexFontGoContent\"></div><!--预览文字-->\n						</div>\n					</div>\n			</div>\n			<div class=\"indexBigBox\">\n				<div id=\"indexBig\" class=\"porA indexBig changeWord\">放大镜</div>\n			</div>\n			<div id=\"indexTip\" class=\"porA indexTip changeWord\">七夕让你的表白登上震旦</div>\n			<div class=\"porA indexShip changeWord indexShipAnim\">水波</div>\n			<a id=\"indexShip0\" class=\"porA indexShip0\" href=\"love.html\">\n				<span id=\"indexCircleBox2\" class=\"porA indexCircleBox indexCircleBox2\">\n					<span class=\"o0 indexCircle changeWord\">呼吸按钮-船</span>\n				</span>\n			</a>\n			<a class=\"porA indexCar changeWord arms8Loop\" href=\"car.html\">车\n				<span class=\"porA indexCar1 changeWord\">轮毂</span>\n				<span class=\"porA indexCar2 changeWord\">轮毂</span>\n			</a>\n			<a id=\"indexCircleBox3\" href=\"car.html\" class=\"porA indexCircleBox indexCircleBox3\">\n				<span class=\"o0 indexCircle changeWord\">呼吸按钮-车</span>\n			</a>\n		</div>\n		<div class=\"indexTitle porA changeWord\">把你交给我 把全新科鲁兹交给我</div>\n		<a id=\"indexCircleBox1\" href=\"javascript:;\" class=\"porA indexCircleBox indexCircleBox1\">\n			<span class=\"o0 indexCircle changeWord\">呼吸按钮-楼</span>\n		</a>\n	</div>\n</div>\n");
$templateCache.put("components/good/good.html","<div class=\"porR wrapper\">\r\n	<div id=\"goodBg\" class=\"posCenter goodBg\">\r\n		<h2 class=\"goodH2 changeWord\">为你心中最美情话点个赞</h2>\r\n		<div id=\"iWrapper\" class=\"iWrapper porR\">\r\n			<div class=\"iScroller\">\r\n				<ul id=\"goodList\" class=\"goodList\"></ul>\r\n			</div>\r\n		</div>\r\n		<span class=\"porA goodTo changeWord\">箭头</span>\r\n		<a href=\"love.html\" class=\"goodBtn changeWord\">我也有情话说</a>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/info/info.html","<div class=\"porR wrapper\">\r\n	<div id=\"infoBg\" class=\"posCenter infoBg\">\r\n		<h2 class=\"tac cfff infoTitle changeWord\">个人信息</h2>\r\n		<div class=\"auto info\">\r\n			<div class=\"clear infoBox\">\r\n				<div class=\"infoBoxL fl\">\r\n					<span class=\"fl\">姓</span>\r\n					<span class=\"fr\">名</span>\r\n				</div>\r\n				<span class=\"infoBoxLine tac fl\">|</span>\r\n				<input id=\"name\" type=\"text\" class=\"infoBoxR fl\" placeholder=\"请输入您的名字\" />\r\n			</div>\r\n			<div class=\"clear infoBox\">\r\n				<div class=\"infoBoxL fl\">\r\n					<span class=\"fl\">手</span>\r\n					<span class=\"fl infoSpan1\">机</span>\r\n					<span class=\"fr\">号</span>\r\n				</div>\r\n				<span class=\"infoBoxLine tac fl\">|</span>\r\n				<input id=\"tel\" type=\"tel\" class=\"infoBoxR fl\" placeholder=\"请输入您的电话\" />\r\n			</div>\r\n			<p id=\"infoError\" class=\"cRed tac infoError\"></p>\r\n			<a id=\"infoSub\" href=\"javascript:;\" class=\"changeWord auto db infoSub\">抽取电影票</a>\r\n		</div>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/infoFull/infoFull.html","<div class=\"porR wrapper\">\r\n	<div id=\"infoBg\" class=\"posCenter infoBg\">\r\n		<h2 class=\"tac cfff infoFullTitle changeWord\">个人信息</h2>\r\n		<div class=\"auto info\">\r\n			<div class=\"clear infoBox\">\r\n				<div class=\"infoBoxL fl\">\r\n					<span class=\"fl\">姓</span>\r\n					<span class=\"fr\">名</span>\r\n				</div>\r\n				<span class=\"infoBoxLine tac fl\">|</span>\r\n				<input id=\"name\" type=\"text\" class=\"infoBoxR fl\">\r\n			</div>\r\n			<div class=\"clear infoBox\">\r\n				<div class=\"infoBoxL fl\">\r\n					<span class=\"fl\">手</span>\r\n					<span class=\"fl infoSpan1\">机</span>\r\n					<span class=\"fr\">号</span>\r\n				</div>\r\n				<span class=\"infoBoxLine tac fl\">|</span>\r\n				<input id=\"tel\" type=\"tel\" class=\"infoBoxR fl\">\r\n			</div>\r\n			<div class=\"clear infoBox\">\r\n				<div class=\"infoBoxL infoBoxL2 fl\">\r\n					<span class=\"fl\">经</span>\r\n					<span class=\"fl infoSpan1\">销</span>\r\n					<span class=\"fr\">商</span>\r\n				</div>\r\n				<span class=\"infoBoxLine infoBoxLine2 tac fl\">|</span>\r\n				<div class=\"infoBoxR2 fl\">\r\n					<select id=\"dealer1\" class=\"resetSel infoSel\">\r\n						<option value=\"0\">请选择</option>\r\n						<option value=\"小李\">小李</option>\r\n						<option value=\"小张\">小张</option>\r\n						<option value=\"小红\">小红</option>\r\n					</select>\r\n					<select id=\"dealer2\" class=\"resetSel infoSel\">\r\n						<option value=\"0\">请选择</option>\r\n						<option value=\"小李\">小李</option>\r\n						<option value=\"小张\">小张</option>\r\n						<option value=\"小红\">小红</option>\r\n					</select>\r\n					<select id=\"dealer3\" class=\"resetSel infoSel\">\r\n						<option value=\"0\">请选择</option>\r\n						<option value=\"小李\">小李</option>\r\n						<option value=\"小张\">小张</option>\r\n						<option value=\"小红\">小红</option>\r\n					</select>\r\n				</div>\r\n			</div>\r\n			<div class=\"clear infoBox\">\r\n				<div class=\"infoBoxL fl\">意向购车时间</div>\r\n				<span class=\"infoBoxLine tac fl\">|</span>\r\n				<select id=\"time\" class=\"resetSel infoBoxR fl\">\r\n					<option value=\"0\">请选择</option>\r\n					<option value=\"1\">三个月内</option>\r\n					<option value=\"2\">三到六个月</option>\r\n					<option value=\"3\">六个月以上</option>\r\n				</select>\r\n			</div>\r\n			<p id=\"infoError\" class=\"cRed tac infoError\"></p>\r\n			<a id=\"infoSub\" href=\"javascript:;\" class=\"changeWord auto db infoSub infoSub2\">抽取电影票</a>\r\n		</div>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/lose/lose.html","<div class=\"porR wrapper\">\r\n	<div id=\"loseBg\" class=\"posCenter loseBg\">\r\n		<div class=\"porR lose\">\r\n			<a href=\"infoFull.html\" id=\"loseBtn\" class=\"porA loseBtn changeWord\">直接领取电影票</a>\r\n		</div>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/love/love.html","<div class=\"porR wrapper\">\r\n	<div id=\"loveBg\" class=\"posCenter loveBg\">\r\n		<div class=\"porA changeWord loveFont1\">文字1</div>\r\n		<div class=\"porA changeWord loveFont2\">文字2</div>\r\n		<div class=\"porA changeWord loveFont3\">文字3</div>\r\n		<div class=\"porA changeWord loveStar\">文字4</div>\r\n		<h2 class=\"porA changeWord loveTitle\"></h2>\r\n		<div class=\"porA loveBox\">\r\n			<input id=\"loveFrom\" type=\"text\" class=\"loveInp\" placeholder=\"From\" />\r\n			<input id=\"loveInp\" type=\"text\" class=\"loveInp\" placeholder=\"请填输入您的情话（3-14字）\" />\r\n			<input id=\"loveTo\" type=\"text\" class=\"loveInp\" placeholder=\"To\" />\r\n			<p id=\"infoError\" class=\"cRed tac infoError\"></p>\r\n			<a id=\"loveBtn\" class=\"changeWord loveBtn\" href=\"javascript:;\">上传并抽取电影票</a>\r\n		</div>\r\n		<div id=\"lovepreview\" class=\"dn o0 porA lovepreview\">\r\n			<div id=\"loveFontGo\" class=\"oh porA loveFontGo\">\r\n				<div id=\"loveFontGoScroll\" class=\"porA loveFontGoScroll\">\r\n					<div class=\"loveFontGoContent\"></div><!--预览文字-->\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/loveSuc/loveSuc.html","<div class=\"porR wrapper\">\r\n	<div id=\"loveSucBg\" class=\"posCenter loveSucBg\">\r\n		<div class=\"loveSuc\">\r\n			<a href=\"javascript:;\" id=\"loveSucBtn\" class=\"auto db loveSucBtn changeWord\">晒幸福</a>\r\n		</div>\r\n	</div>\r\n	<div id=\"loveSucSun\" class=\"porA dn o0 loveSucSun changeWord\">\r\n		<img src=\"images/loveSucSun-869c1bd00c.png\" width=\"100%\" />\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/repeat/repeat.html","<div class=\"porR wrapper\">\r\n	<div id=\"repeatBg\" class=\"posCenter repeatBg\">\r\n		<a href=\"index.html\" id=\"repeatBtn\" class=\"porA repeatBtn changeWord\">关闭</a>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/orderSuc/orderSuc.html","<div class=\"porR wrapper\">\r\n	<div id=\"orderSucBg\" class=\"posCenter orderSucBg\">\r\n		<div class=\"orderSuc\">\r\n			<a href=\"index.html\" id=\"orderSucBtn\" class=\"auto db orderSucBtn changeWord\">关闭</a>\r\n		</div>\r\n	</div>\r\n</div>\r\n");
$templateCache.put("components/win/win.html","<div class=\"porR wrapper\">\r\n	<div id=\"winBg\" class=\"posCenter winBg\">\r\n		<div class=\"porR win\">\r\n			<p id=\"winCode\" class=\"porA tac winCode\">d78sd9d78sd9</p>\r\n			<a href=\"car.html\" id=\"winBack\" class=\"porA winBack changeWord\">返回</a>\r\n		</div>\r\n	</div>\r\n</div>\r\n");}]);