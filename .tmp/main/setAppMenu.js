"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require("electron");

function setAppMenu(options) {
	var template = [{
		label: "File",
		submenu: [{ label: "Open", accelerator: "CmdOrCtrl+O", click: function click() {
				return options.openFile();
			} }, { label: "Save", accelerator: "CmdOrCtrl+S", click: function click() {
				return options.saveFile();
			} }, { label: "Save As...", click: function click() {
				return options.saveAsNewFile();
			} }, { label: "Presentation", click: function click() {
				return options.exportPDF();
			} }
		//{ label: "Export PDF", click: () => options.exportPDF() }
		]
	}, {
		label: "Edit",
		submenu: [{ label: "Copy", accelerator: "CmdOrCtrl+C", role: "copy" }, { label: "Paste", accelerator: "CmdOrCtrl+V", role: "paste" }, { label: "Cut", accelerator: "CmdOrCtrl+X", role: "cut" }, { label: "Select All", accelerator: "CmdOrCtrl+A", role: "selectall" }]
	}, {
		label: "View",
		submenu: [{
			label: "Toggle DevTools",
			accelerator: "Alt+Command+I",
			click: function click() {
				return _electron.BrowserWindow.getFocusedWindow().toggleDevTools();
			}
		}]
	}];
	if (process.platform === "darwin") {
		template.unshift({
			label: "MarkdownEditor",
			submenu: [{ label: "Quit", accelerator: "CmdOrCtrl+Q", click: function click() {
					return _electron.app.quit();
				} }]
		});
	}
	_electron.Menu.setApplicationMenu(_electron.Menu.buildFromTemplate(template));
}
exports.default = setAppMenu;