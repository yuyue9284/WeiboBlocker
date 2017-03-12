// ==UserScript==
// @name         WeiboBlocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       yuyue9284@gmail.com
// @include      http://weibo.com*
// @grant        none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

(function() {
    'use strict';
    var action = function(){
        var block = ["BBC","lily"];
        var lst = $(".WB_text").map(function(){return $(this);});
        for (var i = lst.length - 1; i >= 0; i--) {
            for (var j = block.length - 1; j >= 0; j--) {
                var content = lst[i].text();
                if (content.includes(block[j])){
                    lst[i].parents().eq(2).css("display","none");
                    console.log(content);
                    break;
                }
            }
        }
    };
    waitForKeyElements (".WB_text", action);
})();
