"use strict";

var _electron = require("electron");

var _slide = require("./.tmp/renderer/slide");

var _slide2 = _interopRequireDefault(_slide);

var _createEditor = require("./.tmp/renderer/createEditor");

var _createEditor2 = _interopRequireDefault(_createEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Editor initialization
var editor = (0, _createEditor2.default)();

// saving file and opening file
_electron.ipcRenderer.on("REQUEST_TEXT", function () {
    _electron.ipcRenderer.send("REPLY_TEXT", editor.getValue());
});

_electron.ipcRenderer.on("SEND_TEXT", function (_e, text) {
    editor.setValue(text);
});

var webview = document.getElementById('preview');
if (process.env.DEBUG_GUEST) {
    webview.addEventListener('dom-ready', function () {
        webview.openDevTools();
    });
}
// editor reflesh
editor.on("change", function (e) {
    webview.send("TEXT", editor.getValue());
});