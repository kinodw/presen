"use strict";

var _electron = require("electron");

var _emojify = require("emojify.js");

var _emojify2 = _interopRequireDefault(_emojify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener("DOMContentLoaded", function () {
  $ = window.jQuery = window.$ = require("jquery");
});

// markdown-it initialization
var md = require("markdown-it")();
md.renderer.rules.hr = function (token, idx) {
  return '</div><div class="slidePage">';
};

var slide = function slide(text) {
  _classCallCheck(this, slide);

  this.text = text;
};

// export default slide;

_electron.ipcRenderer.on("TEXT", function (e, text) {
  jQuery(function ($) {
    $("#markdown").html(markdownText2html(text));
  });
});

// add id to class of "slidePage"
function addIdToSlide() {
  jQuery(function ($) {
    $(".slidePage").each(function (index, elem) {
      $(elem).attr("id", "slide" + (index + 1));
    });
  });
}

// markdown => HTML and emojify
function markdownText2html(text) {
  var HTMLText = "<div class='slidePage'>" + md.render(text) + "</div>";

  // emojify processing
  HTMLText = HTMLText.replace(/(:[0-9a-zA-Z_\+\-]+?:)/g, " $1 ");
  HTMLText = _emojify2.default.replace(HTMLText);
  return HTMLText;
}