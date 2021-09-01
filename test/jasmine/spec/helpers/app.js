"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FeedbackWidget = /*#__PURE__*/function () {
  function FeedbackWidget(elementId) {
    _classCallCheck(this, FeedbackWidget);

    this._elementId = elementId;
  }

  _createClass(FeedbackWidget, [{
    key: "elementId",
    get: function get() {
      return this._elementId;
    }
  }, {
    key: "show",
    value: function show(message, type) {
      var element = document.getElementById(this._elementId);
      $(element).text(message);

      if (element.style.display === "none") {
        element.style.display = "block";
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var element = document.getElementById(this._elementId);

      if (element.style.display === "block") {
        element.style.display = "none";
      }
    }
  }]);

  return FeedbackWidget;
}();