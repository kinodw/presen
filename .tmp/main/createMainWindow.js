"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require("electron");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainWindow = function () {
    function MainWindow() {
        var _this = this;

        _classCallCheck(this, MainWindow);

        this.window = new _electron.BrowserWindow({ width: 800, height: 600 });
        this.window.loadURL("file://" + __dirname + "/../../mainwindow.html");
        this.window.on("closed", function () {
            _this.window = null;
        });
        this.window.webContents.on("will-navigate", function (e, url) {
            e.preventDefault();
            _electron.shell.openExternal(url);
        });
    }

    _createClass(MainWindow, [{
        key: "requestText",
        value: function requestText() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.window.webContents.send("REQUEST_TEXT");
                _electron.ipcMain.once("REPLY_TEXT", function (_e, text) {
                    resolve(text);
                });
            });
        }
    }, {
        key: "sendText",
        value: function sendText(text) {
            this.window.webContents.send("SEND_TEXT", text);
        }
    }, {
        key: "generatePDF",
        value: function generatePDF() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.window.webContents.printToPDF({
                    //printBackground : true,
                    // 960px x 720px
                    //pageSize:{ width: 254000, height: 190500},
                }, function (error, data) {
                    if (error) {
                        console.log("generatePDF");
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
    }]);

    return MainWindow;
}();

function createMainWindow() {
    return new MainWindow();
}

exports.default = createMainWindow;