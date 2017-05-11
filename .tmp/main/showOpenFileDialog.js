"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require("electron");

function showOpenFileDialog() {
	return new Promise(function (resolve, reject) {
		var files = _electron.dialog.showOpenDialog({
			title: "open",
			properties: ["openFile"],
			filters: [{ name: "markdown file", extensions: ["md"] }]
		});

		if (files && files.length > 0) {
			resolve(files[0]);
		} else {
			reject();
		}
	});
}

exports.default = showOpenFileDialog;