import { BrowserWindow, ipcMain, shell } from "electron";

class MainWindow {
    constructor() {
        this.window = new BrowserWindow({width:800, height:600});
        this.window.loadURL(`file://${__dirname}/../../mainwindow.html`);
        this.window.on("closed", () => {
            this.window = null;
        });
        this.window.webContents.on("will-navigate", (e, url) => {
            e.preventDefault();
            shell.openExternal(url);
        });
    }

    requestText() {
        return new Promise((resolve) => {
            this.window.webContents.send("REQUEST_TEXT");
            ipcMain.once("REPLY_TEXT", (_e,text) => {
                resolve(text);
            });
        });
    }

    sendText(text) {
        this.window.webContents.send("SEND_TEXT", text);
    }


    generatePDF() {
        return new Promise((resolve, reject) => {
            this.window.webContents.printToPDF({
                //printBackground : true,
                // 960px x 720px
                //pageSize:{ width: 254000, height: 190500},
            }, (error, data) => {
                if(error) {
                    console.log("generatePDF");
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

function createMainWindow() {
    return new MainWindow();
}

export default createMainWindow;