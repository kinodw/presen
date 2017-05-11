"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileManager = function () {
	function FileManager() {
		_classCallCheck(this, FileManager);

		this.filePath = "";
	}
	// ファイルを開いたとき、閉じたときのパスを保持しておき、上書き保存に利用


	_createClass(FileManager, [{
		key: "saveFile",
		value: function saveFile(filePath, text) {
			var _this = this;

			return new Promise(function (resolve) {
				_fs2.default.writeFileSync(filePath, text);
				_this.filePath = filePath;
				resolve();
			});
		}
	}, {
		key: "readFile",
		value: function readFile(filePath) {
			var _this2 = this;

			return new Promise(function (resolve) {
				var text = _fs2.default.readFileSync(filePath, "utf8");
				_this2.filePath = filePath;
				resolve(text);
			});
		}
	}, {
		key: "overwriteFile",
		value: function overwriteFile(text) {
			return this.saveFile(this.filePath, text);
		}
	}, {
		key: "writePdf",
		value: function writePdf(filePath, pdf) {
			return new Promise(function (resolve) {
				_fs2.default.writeFileSync(filePath, pdf);
				resolve();
			});
		}
	}]);

	return FileManager;
}();

function createFileManager() {
	return new FileManager();
}

exports.default = createFileManager;