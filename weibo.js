// ==UserScript==
// @name         WeiboBlocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       yuyue9284@gmail.com
// @include      http://weibo.com*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

(function() {
    'use strict';

    // gn_header clearfix
    var block = [];
    var init = function() {
        if (localStorage.block !== undefined) {
            block = JSON.parse(localStorage.block);
        } else {
            block = ['tf', 'TF', 'Tf', '王源', '易烊千玺', '王俊凯'];
            localStorage.block = JSON.stringify(block);
            console.log(localStorage.block);
        }
        $(".gn_header.clearfix").off('click', add_word).on('click', add_word);
    };

    function add_word() {
        var word = prompt('请输入');
        switch (word) {
            case "clear":
                localStorage.removeItem('block');
                block = [];
                break;
            case "show":
                alert(block);
                break;
            default:
                block = block.concat(word);
                localStorage.block = block;
        }
        action();
    }

    $(document).ready(init);

    var action = function() {
        var lst = $(".WB_cardwrap.WB_feed_type.S_bg2").map(function() {
            return $(this);
        });
        for (var i = lst.length - 1; i >= 0; i--) {
            for (var j = block.length - 1; j >= 0; j--) {
                var content = lst[i].text();
                if (content.includes(block[j])) {
                    lst[i].css("display", "none");
                    // console.log(content);
                    break;
                }
            }
        }
    };
    waitForKeyElements(".WB_cardwrap.WB_feed_type.S_bg2", action);
})();
