import { ipcRenderer } from "electron";
import slide from "./.tmp/renderer/slide";
import createEditor from "./.tmp/renderer/createEditor";

// Editor initialization
let editor = createEditor();


// saving file and opening file
ipcRenderer.on("REQUEST_TEXT", () => {
    ipcRenderer.send("REPLY_TEXT", editor.getValue());
});

ipcRenderer.on("SEND_TEXT", (_e, text) => {
    editor.setValue(text);
});





var webview = document.getElementById('preview');
if (process.env.DEBUG_GUEST) {
  webview.addEventListener('dom-ready', () => {
    webview.openDevTools();
  });
}
// editor reflesh
editor.on("change", (e) => {
    webview.send("TEXT", editor.getValue());
});


