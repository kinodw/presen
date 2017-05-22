"use strict";

var _electron = require("electron");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var md = require("markdown-it")();

var slide = function slide(text) {
	_classCallCheck(this, slide);

	this.text = text;
};

// export default slide;

_electron.ipcRenderer.on("TEXT", function (e, text) {
	var source = document.querySelector("#markdown");
	source.innerHTML = md.render(text);
});