"use strict";

var _electron = require("electron");

// Initialize Codemirror Editor
var CodeMirror = require("codemirror");
require("./node_modules/codemirror/mode/markdown/markdown.js");
require("./node_modules/codemirror/addon/lint/lint.js");
require("./node_modules/codemirror/addon/edit/closebrackets.js");
require("./node_modules/codemirror/addon/edit/matchtags.js");
require("./node_modules/codemirror/addon/edit/continuelist.js");

var createValidator = require("codemirror-textlint");
// rules
var noTodo = require("textlint-rule-no-todo");
// 一文中にある逆接の接続詞「が」の個数が複数あるかどうか
var noGa = require("textlint-rule-no-doubled-conjunctive-particle-ga");
// 技術用語スペルチェック
var techWord = require("textlint-rule-spellcheck-tech-word");
// 二重助詞の検出
var nijuJoshi = require("textlint-rule-no-doubled-joshi");
// ら抜き言葉の検出
var ranuki = require("textlint-rule-no-dropping-the-ra");
// 一文中の「、」が３つ以上あるかチェック
var maxTen = require("textlint-rule-max-ten");

var validator = createValidator({
    rules: {
        "no-todo": noTodo,
        "no-ga": noGa,
        "spellcheck-tech-word": techWord,
        "no-doubled-joshi": nijuJoshi,
        "no-dropping-the-ra": ranuki,
        "max-ten": maxTen
    }
});
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    mode: "markdown",
    theme: "base16-light",
    gutters: ["CodeMirror-lint-markers"],
    lint: {
        "getAnnotations": validator,
        "async": true
    },
    autoCloseBrackets: true,
    matchTags: true,
    newlineAndIndentContinueMarkdownList: true
});

// Webviewのデバッグ用
var webview = document.getElementById('webview');
if (process.env.DEBUG_GUEST) {
    webview.addEventListener('dom-ready', function () {
        webview.openDevTools();
    });
}

_electron.ipcRenderer.on("REQUEST_TEXT", function () {
    _electron.ipcRenderer.send("REPLY_TEXT", editor.getValue());
});

_electron.ipcRenderer.on("SEND_TEXT", function (_e, text) {
    editor.setValue(text);
});

// エディターが更新されたらプレビューに送信
editor.on("change", function (e) {
    webview.send('update-markdown', editor.getValue());
});

var editorPane = document.getElementById('editorpane');

_electron.ipcRenderer.on("PRESENTATION", function () {
    editorPane.setAttribute("style", "display:none");
    console.log("PRESENTATION");
});

// フルスクリーン時にエディター部分を見えなくする


webview.addEventListener('enter-html-full-screen', function () {
    editorPane.setAttribute('style', 'display:none');
});

webview.addEventListener('leave-html-full-screen', function () {
    editorPane.removeAttribute('style');
});