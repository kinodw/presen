"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // load app and BrowserWindow


var _electron = require("electron");

var _setAppMenu = require("./setAppMenu.js");

var _setAppMenu2 = _interopRequireDefault(_setAppMenu);

var _createFileManager = require("./createFileManager.js");

var _createFileManager2 = _interopRequireDefault(_createFileManager);

var _showOpenFileDialog = require("./showOpenFileDialog.js");

var _showOpenFileDialog2 = _interopRequireDefault(_showOpenFileDialog);

var _showSaveAsNewFileDialog = require("./showSaveAsNewFileDialog.js");

var _showSaveAsNewFileDialog2 = _interopRequireDefault(_showSaveAsNewFileDialog);

var _createMainWindow = require("./createMainWindow.js");

var _createMainWindow2 = _interopRequireDefault(_createMainWindow);

var _showExportPDFDialog = require("./showExportPDFDialog.js");

var _showExportPDFDialog2 = _interopRequireDefault(_showExportPDFDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var win = null;
var fileManager = null;

// // create main window
// function createWindow() {
//    // win = new BrowserWindow({width: 800, height: 600});
//     win = createMainWindow();
//     //win.loadURL(`file://${__dirname}/../../mainwindow.html`);

// }
// create main window when application ready
_electron.app.on('ready', function () {
    win = (0, _createMainWindow2.default)();
    fileManager = (0, _createFileManager2.default)();
    (0, _setAppMenu2.default)({ openFile: openFile, saveFile: saveFile, saveAsNewFile: saveAsNewFile, exportPDF: exportPDF });
});
// finish application when all window was closed for macOS
_electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') _electron.app.quit();
});

function openFile() {
    (0, _showOpenFileDialog2.default)().then(function (filePath) {
        return fileManager.readFile(filePath);
    }).then(function (text) {
        return win.sendText(text);
    }).catch(function (error) {
        console.log(error);
    });
    console.log("openFile");
}

function saveFile() {
    if (!fileManager.filePath) {
        saveAsNewFile();
        return;
    }
    win.requestText().then(function (text) {
        return fileManager.overwriteFile(text);
    }).catch(function (error) {
        console.log(error);
    });
    console.log("saveFile");
}

function saveAsNewFile() {
    Promise.all([(0, _showSaveAsNewFileDialog2.default)(), win.requestText()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            filePath = _ref2[0],
            text = _ref2[1];

        fileManager.saveFile(filePath, text);
    }).catch(function (error) {
        console.log(error);
    });
    console.log("saveAsNewFile");
}

function exportPDF() {
    (0, _showExportPDFDialog2.default)().then(function (filePath) {
        win.generatePDF().then(function (pdf) {
            return fileManager.writePdf(filePath, pdf);
        }).catch(function (error) {
            console.log(error);
        });
    }).catch(function (error) {
        console.log(error);
    });

    console.log("exportPDF");
}