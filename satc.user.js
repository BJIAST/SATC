// ==UserScript==
// @name         AutoTrade Confirm
// @namespace    https://github.com/BJIAST/SATC/
// @version      1.531
// @description  try to take over the world!
// @author       BJIAST
// @match        https://steamcommunity.com/tradeoffer/*
// @match        https://steamcommunity.com/trade/*
// @match        http://cs.money/
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	include("https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js");

	var soundAccept = new Audio('https://raw.githubusercontent.com/BJIAST/SATC/master/sounds/done.mp3'),
	site = location.href,
	steamsite = location.href.split("trade/"),
	websendoff = location.href.split("tradeoffer/new"),
	x,
	csmanyaccept = location.href.split("tradeoffer/");

	setTimeout(function(){
		if ($.cookie("selection") == "off"){
			$("#favorite").css({"display":"none"});         
			$("#sorting").css({"display":"none"});              
			$("#sort_inputs").css({"display":"none"});          
			$("#sticker_sort").css({"display":"none"});
			$("#backBtns").css({"display":"block"});
			$("#delBackBtns").css({"display":"none"});
			$("#sticker_count").css({"display":"none"});
			$("#sticker_names").css({"display":"none"});
		}
	},2000);
	(function () {
		   if (site == "http://cs.money/"){

			$(".trade_lg").append("<div class='btn btn-info' id='delBackBtns'>Убрать кнопки</div>");
			$(".trade_lg").append("<div class='btn btn-info' id='backBtns'>Вернуть кнопки</div>");
			$("#backBtns").css({"display":"none"});
			$("#delBackBtns").css({
				"margin": "20px 35px auto"
			});
			$("#backBtns").css({
				"margin": "20px 35px auto"
			});
			$("#delBackBtns")['on']("click", function(){
				$.cookie('selection', "off");
				$("#backBtns").css({"display":"block"});
				$("#delBackBtns").css({"display":"none"});
				$("#favorite").css({"display":"none"});         
				$("#sorting").css({"display":"none"});          
				$("#sort_inputs").css({"display":"none"});          
				$("#sticker_sort").css({"display":"none"});
				$("#sticker_count").css({"display":"none"});
				$("#sticker_names").css({"display":"none"});

			});
			$("#backBtns")['on']("click", function(){
				$.cookie('selection', null);
				$("#backBtns").css({"display":"none"});
				$("#delBackBtns").css({"display":"block"});
				$("#favorite").css({"display":"block"});            
				$("#sorting").css({"display":"block"});         
				$("#sort_inputs").css({"display":"block"});         
				$("#sticker_sort").css({"display":"block"});
				$("#sticker_count").css({"display":"inline-block"});
				$("#sticker_names").css({"display":"inline-block"});
			});
		}
	 }());


// chrome messages
function chromemes(mesbody){
	var currentPermission;
	Notification.requestPermission( function(result) { currentPermission = result } );
	mailNotification = new Notification("SATC", {
		body : mesbody,
		icon : "https://pp.vk.me/c7004/v7004148/23616/XwoiYEex0CQ.jpg"
	});
}

// accept conditions
if(site != "http://cs.money/"){
	if(document.referrer == "http://cs.money/" && site == websendoff[0] + "tradeoffer/new" + websendoff[1] && site != "http://cs.money/#"){

		console.log("Do nothing!");

	}else if (document.referrer == "http://cs.money/"){

		if(jQuery('.error_page_content h3').html() == "О не-е-е-е-е-е-е-т!"){
			window.close();
			chromemes("Оффер не действителен!");
		}else if(site == csmanyaccept[0] + "tradeoffer/" + csmanyaccept[1] + "/"){
			if (confirm('Принять этот трейд?')){
				acceptSteamTrade();
                // testclosing
                // setTimeout(function(){
                // 	if (x === "true"){
                // 		window.close();
                // 	}
                // },4000);
            }
        }
    }
    else if (site == websendoff[0] + "tradeoffer/new" + websendoff[1]){
    	console.log("Do nothing!");
    }
    else if (jQuery("#your_slot_0 .slot_inner").html() == ''){
    	acceptSteamTrade();
    }
    else if(site == steamsite[0] + "trade/" + steamsite[1]){
    	soundAccept.play();
    	setTimeout(function(){
    		window.close();
    	}, 3000);
    }
    else if(document.referrer == "https://opskins.com/?loc=sell"){
    	acceptSteamTrade();
    }else{
    	console.log("Что то не так!");
    }
}


// accept function
function acceptSteamTrade(){
	setInterval(function(){
		if (jQuery('.newmodal_content div').html() != "Для завершения обмена подтвердите его на странице подтверждений в мобильном приложении Steam."){
			jQuery(".newmodal").remove();
			ToggleReady(true);
			jQuery(".newmodal_buttons .btn_green_white_innerfade span").click();
			ConfirmTradeOffer();
		
		}else{
            window.open('', '_self', ''); //bug fix
            window.close();
            soundAccept.play();
            chromemes("Подтверди оффер в телефоне!");
			return x = true;
        }
    },3000);
};

function include(url) {
	var script = document.createElement('script');
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
})();