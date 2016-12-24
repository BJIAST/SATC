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


    

    var soundAccept = new Audio('https://raw.githubusercontent.com/BJIAST/SATC/master/sounds/done.mp3'),
    web = location.href,
    fromWeb = document.referrer,
    steamsite = location.href.split("/receipt"),
    sendoffer = location.href.split("/new/"),
    tradeoffer = location.href.split("tradeoffer/"),
    FromCut = document.referrer.split("tradeoffer/"),
    version = 2;

    // onload csmoney use it
    function onloadmod(){
     if ($.cookie("changelog") != version){
        $.removeCookie("changelog");
        $(".logve").show();
    }
    setTimeout(function(){        
        if($.cookie('payblocks') == "hide"){
            $("#payblocks").prop('checked', 'true')
            $("#favorite").css({"display":"none"});         
            $("#sorting").css({"display":"none"});              
            $("#sort_inputs").css({"display":"none"});          
            $("#sticker_sort").css({"display":"none"});
            $("#backBtns").css({"display":"block"});
            $("#delBackBtns").css({"display":"none"});
            $("#sticker_count").css({"display":"none"});
            $("#sticker_names").css({"display":"none"});
            $("#parser_ops").css({"display" : "none"});
            $("#sort_csm_ops").css({"display" : "none"});
            $("#sort_ops_csm").css({"display" : "none"});
        }
    },500)
    setTimeout(function(){
        if ($.cookie('lowprice') == "min"){
            $("#lowprice").prop('checked', 'true')
            $(".bot_sort")[1].click();
        }
    },1000)
}
// cs.money fixes
if(web == "http://cs.money/" || web == "http://cs.money/#"){

$(".navbar-brand").attr("href" , "/"); // fix main logo

//csmoney stylesheets
$('head').append('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">');
$('head').append('<link href="http://satc.usite.pro/csm.css" rel="stylesheet">');
include("https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js");

// csmoney settings button
$(".trade_lg").append("<div class='make_trade_button' id='satcSetBtn'>Настройки</div>");


// csmoney popup's
versionLog();
settingsMod();


// popup mod functions
(function () {
    $(".closeModCL").click(function(){
        $.cookie("changelog", version);
        $(".logve").hide();
    });
    $(".closeModSM").click(function(){
        $(".settingsMod").hide();
    });
    $("#satcSetBtn").click(function(){
        $(".settingsMod").show();
    });
    $(".settingsMod label").click(function(){
        if($("#payblocks").prop('checked')){
            $.cookie('payblocks', "hide");
            $("#favorite").css({"display":"none"});         
            $("#sorting").css({"display":"none"});              
            $("#sort_inputs").css({"display":"none"});          
            $("#sticker_sort").css({"display":"none"});
            $("#backBtns").css({"display":"block"});
            $("#delBackBtns").css({"display":"none"});
            $("#sticker_count").css({"display":"none"});
            $("#sticker_names").css({"display":"none"});
            $("#parser_ops").css({"display" : "none"});
            $("#sort_csm_ops").css({"display" : "none"});
            $("#sort_ops_csm").css({"display" : "none"});
        }else if(!$("#payblocks").prop('checked')){
            $.removeCookie('payblocks');
            $("#delBackBtns").css({"display":"block"});
            $("#favorite").css({"display":"block"});            
            $("#sorting").css({"display":"block"});         
            $("#sort_inputs").css({"display":"block"});         
            $("#sticker_sort").css({"display":"block"});
            $("#sticker_count").css({"display":"inline-block"});
            $("#sticker_names").css({"display":"inline-block"});
            $("#parser_ops").css({"display" : "block"});
            $("#sort_csm_ops").css({"display" : "inline-block"});
            $("#sort_ops_csm").css({"display" : "inline-block"});
        }
        if($("#lowprice").prop('checked')){
            $.cookie('lowprice', "min");
        }else if(!$("#lowprice").prop('checked')){
            $.removeCookie('lowprice');
        }
    });
}());
$( document ).ready(function() {
   setTimeout(onloadmod(),1000);
});
}




// accept conditions
if (web == tradeoffer[0] + "tradeoffer/" + tradeoffer[1] && web != sendoffer[0] + "/new/" + sendoffer[1] && !jQuery("#your_slot_0 .slot_inner").html()){
    offerAccept();

}else if (web == tradeoffer[0] + "tradeoffer/" + tradeoffer[1] && fromWeb == "https://opskins.com/?loc=sell" || web == tradeoffer[0] + "tradeoffer/" + tradeoffer[1] && fromWeb == "http://cs.money/"){
    if (jQuery('.error_page_content h3').html() == "О не-е-е-е-е-е-е-т!"){
        setTimeout(function(){
            window.close();
        }, 300);
        chromemes("Оффер не действителен!");
    }else if(fromWeb == "https://opskins.com/?loc=sell"){
        offerAccept();        
    }
}else if(web == steamsite[0] + "/receipt" && fromWeb == FromCut[0] + "tradeoffer/" + FromCut[1]){
    soundAccept.play();
    setTimeout(function(){
        window.close();
    }, 3000);
    chromemes("Скин забрал!");
}else{
    console.log("Я это не приму или сайт не подходит!");
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

// functions with modal windows

function settingsMod(){
    $("body").prepend("<div class='settingsMod' style='display:none'>"+
        '<span class="closeModSM fa fa-times"></span>'+
        '<div class="offer_head"><h3 class="offer_header">Настройки</h3></div>'+
        '<ul>'+
        '<li><label>'+
        '<input class="checkbox" type="checkbox" id="payblocks" name="checkbox-test">'+
        '<span class="checkbox-custom"></span>'+
        '<span class="label">Скрыть платные функции</span>'+
        '</label></li>'+
        '<li><label>'+
        '<input class="checkbox" type="checkbox" id="lowprice" name="checkbox-test">'+
        '<span class="checkbox-custom"></span>'+
        '<span class="label">Задать сортировку по Мин. цене по умолчанию.</span>'+
        '</label></li>'+
        '</ul>'+
        '<span class="author">by BJIAST</span>'+
        "</div>");
}
function versionLog(){
    // logblock
    $("body").prepend("<div class='logve' style='display:none'><span class='closeModCL fa fa-times'></span><h1>ChangeLog v2.0</h1>"+
        '<ul><li><span>Переделана логика функций.</span></li>'+
        '<li><span>Добавлены настройки сохраняемые в куки.</span></li>'+
        '<li><span>Добавлены модальные окна.</span></li></ul>'+ 
        '<span class="author">by BJIAST</span>'+
        "</div>");
}
})();
