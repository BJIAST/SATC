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
    $('head').append('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">');
     $("link[href='css/all.min.css?v=8']").attr("href", "https://raw.githubusercontent.com/BJIAST/SATC/develop/css/csm.css");
    include("https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js");

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
    $("body").prepend("<div class='logve'><h1>ChangeLog v2.0</h1><p>12312312321</p><span class='close fa fa-times'></span></div>");
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
})();