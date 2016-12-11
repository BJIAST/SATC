// ==UserScript==
// @name         AutoTrade Confirm
// @namespace    https://github.com/BJIAST/SATC/
// @version      2
// @description  try to take over the world!
// @author       BJIAST
// @match        https://steamcommunity.com/tradeoffer/*
// @match        https://steamcommunity.com/trade/*
// @match        http://cs.money/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    include("https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/<jquery class="cookie "></jquery>min.js");

    var soundAccept = new Audio('https://raw.githubusercontent.com/BJIAST/SATC/master/sounds/done.mp3'),
    web = location.href,
    fromWeb = document.referrer,
    steamsite = location.href.split("/receipt"),
    sendoffer = location.href.split("/new/"),
    tradeoffer = location.href.split("tradeoffer/"),
    version = 2;
    versionLog();

// accept conditions
if (web == tradeoffer[0] + "tradeoffer/" + tradeoffer[1] && web != sendoffer[0] + "/new/" + sendoffer[1] && !jQuery("#your_slot_0 .slot_inner").html()){
    offerAccept();

}else if (web == tradeoffer[0] + "tradeoffer/" + tradeoffer[1] && fromWeb == "https://opskins.com/?loc=sell" || web == tradeoffer[0] + "tradeoffer/" + tradeoffer[1] && fromWeb == "http://cs.money/"){
    if (jQuery('.error_page_content h3').html() == "О не-е-е-е-е-е-е-т!"){
        setTimeout(function(){
            window.close();
        }, 300);
        chromemes("Оффер не действителен!");
    }
}else{
    console.log("Я это не приму или сайт не подходит!");
}
if(web == steamsite[0] + "/receipt" && fromWeb == fromCut[0] + "tradeoffer/" + fromCut[1]){
    soundAccept.play();
    setTimeout(function(){
        window.close();
    }, 3000);
    chromemes("Скин забрал!");
}


// cs.money fixes
$(".navbar-brand").attr("href" , "/"); // fix main logo

function versionLog(){


    // logblock
    $("body").prepend("<div class='logve'><h1>ChangeLog v2.0</h1><p></p><span class='fa fa-times></span></div>");
    $(".logve").css({
        "position" : "absolute",
        "top" : "50%",
        "left" : "40%",
        "z-index" : "9999",
        "background": "#fff",
        "width" : "400px",
        "height" : "200px",
        "border": "1px solid #026194"

    });
}

// Main function
function offerAccept(){
    setInterval(function(){
      if (jQuery('.newmodal_content>div').html() == "Для завершения обмена подтвердите его на странице подтверждений в мобильном приложении Steam."){
        soundAccept.play();
        window.close();
    }else{
        jQuery(".newmodal").remove();
        ToggleReady(true);
        if(jQuery(".newmodal_buttons .btn_green_white_innerfade span")){
            jQuery(".newmodal_buttons .btn_green_white_innerfade span").click();                
        }
        ConfirmTradeOffer();
    }
},3000);
}
// func to include another js
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
// chrome messages
function chromemes(mesbody){
    var currentPermission;
    Notification.requestPermission( function(result) { currentPermission = result } );
    mailNotification = new Notification("Steam Auto Trade Confirm", {
        body : mesbody,
        icon : "https://pp.vk.me/c7004/v7004148/23616/XwoiYEex0CQ.jpg"
    });
}
// inside div with message
function showlogs(logmes){
    $(".logmessage").remove();
    $("body").append("<div class='fa fa-check-circle logmessage'><span>" + " " + logmes + "</span></div>");
    $(".logmessage").css({
        "position" : "fixed",
        "bottom" : "20px",
        "right" : "10px",
        "font-size" : "16px",
        "padding": "10px 29px 8px 40px",
        "border": "1px solid #026194",
        "border-radius": "10px",
        "-moz-border-radius": "10px",
        "-webkit-border-radius": "10px",
        "box-shadow": "2px 2px 3px #bbb",
        "-moz-box-shadow": "2px 2px 3px #bbb",
        "-webkit-box-shadow": "2px 2px 3px #bbb",
        "background": "#fff",
        "text-align":"justify",
        "color": "#000"
    });
    $(".logmessage").fadeIn(300).delay(4500).fadeToggle(300);
}
})();