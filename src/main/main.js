// load app and BrowserWindow
import { app, BrowserWindow } from "electron";
import setAppMenu from "./setAppMenu.js";
import createFileManager from "./createFileManager.js";
import showOpenFileDialog from "./showOpenFileDialog.js";
import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog.js";
import createMainWindow from "./createMainWindow.js";
import showExportPDFDialog from "./showExportPDFDialog.js";


let win = null;
let fileManager = null;

// // create main window
// function createWindow() {
//    // win = new BrowserWindow({width: 800, height: 600});
//     win = createMainWindow();
//     //win.loadURL(`file://${__dirname}/../../mainwindow.html`);

// }
// create main window when application ready
app.on('ready',() => {
    win = createMainWindow();
    fileManager = createFileManager();
    setAppMenu({ openFile, saveFile, saveAsNewFile, exportPDF });
});
// finish application when all window was closed for macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


function openFile() {
    showOpenFileDialog()
    .then( (filePath) => fileManager.readFile(filePath))
    .then( (text) => win.sendText(text))
    .catch( (error) => {
        console.log(error);
    });
    console.log("openFile");
}

function saveFile() {
    if (!fileManager.filePath) {
        saveAsNewFile();
        return;
    }
    win.requestText()
     .then((text) => fileManager.overwriteFile(text))
     .catch((error) => {
        console.log(error);
     });
    console.log("saveFile");
}

function saveAsNewFile() {
    Promise.all([ showSaveAsNewFileDialog(), win.requestText() ])
    .then(([filePath, text]) => {
        fileManager.saveFile(filePath, text);
    })
    .catch((error) => {
        console.log(error);
    })
    console.log("saveAsNewFile");
}



function exportPDF() {
    win.window.webContents.send("PRESENTATION");
    // showExportPDFDialog()
    // .then((filePath) => {
    //     win.generatePDF()
    //     .then( (pdf) => fileManager.writePdf(filePath,pdf))
    //     .catch( (error) => {
    //         console.log(error);
    //     })
    // })
    // .catch((error) => {
    //     console.log(error);
    // })

    // console.log("exportPDF");
}
