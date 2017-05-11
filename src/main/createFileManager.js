import fs from "fs";

class FileManager {

	constructor() {
		this.filePath = "";
	}
	// ファイルを開いたとき、閉じたときのパスを保持しておき、上書き保存に利用
	saveFile(filePath, text) {
		return new Promise((resolve) => {
			fs.writeFileSync(filePath, text);
			this.filePath = filePath;
			resolve();
		});
	}

	readFile(filePath) {
		return new Promise((resolve) => {
			const text = fs.readFileSync(filePath, "utf8");
			this.filePath = filePath;
			resolve(text);
		});
	}

	overwriteFile(text) {
		return this.saveFile(this.filePath, text);
	}

	writePdf(filePath, pdf) {
		return new Promise((resolve) => {
			fs.writeFileSync(filePath, pdf);
			resolve();
		});
	}
}

function createFileManager() {
	return new FileManager();
}

export default createFileManager;