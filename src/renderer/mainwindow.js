import { ipcRenderer } from "electron";
import slide from "./.tmp/renderer/slide";
import createEditor from "./.tmp/renderer/createEditor";

// markdown parser initialization
// page parser  =>  "---"
let md = require("markdown-it")();
md.renderer.rules.hr = (token, idx) => {
    return ('</div><div class="slidePage">');
};

// Editor initialization
let editor = createEditor();


// saving file and opening file
ipcRenderer.on("REQUEST_TEXT", () => {
    ipcRenderer.send("REPLY_TEXT", editor.getValue());
});

ipcRenderer.on("SEND_TEXT", (_e, text) => {
    editor.setValue(text);
});

let container = document.querySelector(".container");

// エディターが更新されたらプレビュー更新
editor.on("change", (e) => {
    // markdown => HTML
    let text = "<div class='slidePage'>" + md.render(editor.getValue()) + "</div>";
    container.innerHTML = text;
});
