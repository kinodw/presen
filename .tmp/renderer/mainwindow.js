"use strict";

var _electron = require("electron");

var _slide = require("./.tmp/renderer/slide");

var _slide2 = _interopRequireDefault(_slide);

var _createEditor = require("./.tmp/renderer/createEditor");

var _createEditor2 = _interopRequireDefault(_createEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// markdown parser initialization
// page parser  =>  "---"
var md = require("markdown-it")();
md.renderer.rules.hr = function (token, idx) {
    return '</div><div class="slidePage">';
};

// Editor initialization
var editor = (0, _createEditor2.default)();

// saving file and opening file
_electron.ipcRenderer.on("REQUEST_TEXT", function () {
    _electron.ipcRenderer.send("REPLY_TEXT", editor.getValue());
});

_electron.ipcRenderer.on("SEND_TEXT", function (_e, text) {
    editor.setValue(text);
});

var container = document.querySelector(".container");

// エディターが更新されたらプレビュー更新
editor.on("change", function (e) {
    // markdown => HTML
    var text = "<div class='slidePage'>" + md.render(editor.getValue()) + "</div>";
    container.innerHTML = text;
});