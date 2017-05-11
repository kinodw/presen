const {ipcRenderer} = require('electron');
const emoji = require("remark-emoji");
const remark = require("remark");
const emojify = require("emojify.js");

// エディター更新時の受信
ipcRenderer.on('update-markdown', (event,markdown) => {
  let source = document.getElementById('source');
  // 絵文字表示処理
  markdown = (remark().use(emoji).process(markdown).contents);
  //console.log(markdown);

  // imgタグがそのまま表示され、絵文字が表示されない
 // markdown = emojify.replace(markdown);

  source.innerHTML = markdown;
  slideshow.loadFromString(source.innerHTML);
});

