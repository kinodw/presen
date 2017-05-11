"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require("electron");

function showSaveAsNewFileDialog() {
	return new Promise(function (resolve, reject) {
		var file = _electron.dialog.showSaveDialog({
			title: "save",
			filters: [{ name: "markdown file", extensions: ["md"] }]
		});
		if (file) {
			resolve(file);
		} else {
			reject();
		}
	});
}

exports.default = showSaveAsNewFileDialog;