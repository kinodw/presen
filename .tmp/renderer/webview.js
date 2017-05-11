"use strict";

var _require = require('electron'),
    ipcRenderer = _require.ipcRenderer;

var emoji = require("remark-emoji");
var remark = require("remark");
var emojify = require("emojify.js");

// エディター更新時の受信
ipcRenderer.on('update-markdown', function (event, markdown) {
  var source = document.getElementById('source');
  // 絵文字表示処理
  markdown = remark().use(emoji).process(markdown).contents;
  //console.log(markdown);

  // imgタグがそのまま表示され、絵文字が表示されない
  // markdown = emojify.replace(markdown);

  source.innerHTML = markdown;
  slideshow.loadFromString(source.innerHTML);
});