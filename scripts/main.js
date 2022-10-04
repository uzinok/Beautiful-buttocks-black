"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// спойлеры, готовый плагин
var Details = /*#__PURE__*/function () {
  function Details(details, transitionDuration) {
    _classCallCheck(this, Details);

    this._details = details;
    this._summary = details.querySelector('.details__summary');
    this._content = details.querySelector('.details__content');
    this.transitionDuration = transitionDuration;
    this.initD();
  }

  _createClass(Details, [{
    key: "initD",
    value: function initD() {
      var _this = this;

      if (!this._details.open) this.closeD();else this.openD();
      window.addEventListener('resize', function () {
        if (_this._details.open) _this._details.style.height = _this._summary.offsetHeight + _this._content.offsetHeight + 'px';
      });

      this._summary.addEventListener('click', function (event) {
        event.preventDefault();
        if (_this._details.open) _this.closeD();else _this.openD();
      });
    }
  }, {
    key: "closeD",
    value: function closeD() {
      var _this2 = this;

      this._details.style.height = this._summary.offsetHeight + 'px';

      this._details.classList.remove('details--open');

      this._details.classList.add('details--close');

      setTimeout(function () {
        _this2._details.open = false;
      }, this.transitionDuration);
    }
  }, {
    key: "openD",
    value: function openD() {
      this._details.open = true;

      this._details.classList.add('details--open');

      this._details.classList.remove('details--close');

      this._details.style.height = this._summary.offsetHeight + this._content.offsetHeight + 'px';
    }
  }]);

  return Details;
}();

if (document.querySelector('.details')) {
  document.querySelectorAll('.details').forEach(function (elem) {
    var details = new Details(elem, 300);
  });
} // скролл сертификатов


var about = document.querySelector('.about');
var scrollList = document.querySelector('.about__list');

function elementInViewport(el) {
  var top = el.offsetTop;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }

  return top < window.pageYOffset + window.innerHeight && top + height > window.pageYOffset;
}

if (elementInViewport(scrollList)) scrollList.style.transform = 'translateX(-' + scrollList.getBoundingClientRect().top / window.innerHeight * 100 + '%)';
document.addEventListener('scroll', function () {
  if (elementInViewport(scrollList)) scrollList.style.transform = 'translateX(-' + scrollList.getBoundingClientRect().top / window.innerHeight * 100 + '%)';
});