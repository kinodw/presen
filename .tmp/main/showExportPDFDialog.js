"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require("electron");

function showExportPDFDialog() {
	return new Promise(function (resolve, reject) {
		var file = _electron.dialog.showSaveDialog({
			title: "export as PDF",
			filters: [{ name: "pdf file", extensions: ["pdf"] }]
		});
		if (file) {
			resolve(file);
		} else {
			reject();
		}
	});
}

exports.default = showExportPDFDialog;