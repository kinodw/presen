"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createEditor;
// Editor initialization
function createEditor() {
    // Initialize Codemirror Editor
    var CodeMirror = require("codemirror");
    require("../../node_modules/codemirror/mode/markdown/markdown.js");
    require("../../node_modules/codemirror/addon/lint/lint.js");
    require("../../node_modules/codemirror/addon/edit/closebrackets.js");
    require("../../node_modules/codemirror/addon/edit/matchtags.js");
    require("../../node_modules/codemirror/addon/edit/continuelist.js");

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
        theme: "default",
        gutters: ["CodeMirror-lint-markers"],
        lint: {
            "getAnnotations": validator,
            "async": true
        },
        autoCloseBrackets: true,
        matchTags: true,
        newlineAndIndentContinueMarkdownList: true
    });
    return editor;
}