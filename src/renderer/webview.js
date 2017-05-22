import { ipcRenderer } from "electron";
import emojify from "emojify.js";

document.addEventListener("DOMContentLoaded", () => {
	$ = window.jQuery = window.$ = require("jquery");
});

// markdown-it initialization
let md = require("markdown-it")();
md.renderer.rules.hr = (token, idx) => {
    return ('</div><div class="slidePage">');
};

class slide {
	constructor(text) {
		this.text = text;
	}
}


// export default slide;

ipcRenderer.on("TEXT", (e, text) => {
	jQuery( function($) {
		$("#markdown").html(markdownText2html(text));
	});
});




 // add id to class of "slidePage"
function addIdToSlide() {
 jQuery( function($) {
        $(".slidePage").each(function(index,elem) {
            $(elem).attr("id", "slide" + (index + 1));
        });
    });
}


    // markdown => HTML and emojify
function markdownText2html(text) {
    let HTMLText = "<div class='slidePage'>" + md.render(text) + "</div>";

    // emojify processing
    HTMLText = HTMLText.replace(/(:[0-9a-zA-Z_\+\-]+?:)/g, " $1 ");
    HTMLText = emojify.replace(HTMLText);
    return HTMLText;
}