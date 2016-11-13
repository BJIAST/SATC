// ==UserScript==
// @name         AutoTrade Confirm
// @namespace    https://github.com/BJIAST/SATC/
// @version      1.4
// @description  try to take over the world!
// @author       BJIAST
// @match        https://steamcommunity.com/tradeoffer/*
// @match 		 https://steamcommunity.com/trade/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	var soundAccept = new Audio('https://raw.githubusercontent.com/BJIAST/SATC/master/sounds/done.mp3'),
	site = location.href,
	steamsite = location.href.split("trade/"),
	websendoff = location.href.split("tradeoffer/new");

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
	if (document.referrer == "http://cs.money/"){

		if(jQuery('.error_page_content h3').html() == "О не-е-е-е-е-е-е-т!"){
			window.close();
			chromemes("Оффер не действителен!");
		}else{
			if (confirm('Принять этот трейд?')){
				acceptSteamTrade();
			}
		}

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
	else if (site == websendoff[0] + "tradeoffer/new" + websendoff[1]){
		console.log("Do nothing!");
	}
	else if(document.referrer == "https://opskins.com/?loc=sell"){
		acceptSteamTrade();
	}else{
		console.log("Что то не так!");
	}

	// accept function
	function acceptSteamTrade(){
		setInterval(function(){
			if (jQuery('.newmodal_content div').html() == "Для завершения обмена подтвердите его на странице подтверждений в мобильном приложении Steam."){
				window.close();
				console.log("Должен закрыть страницу!");
				chromemes("Подтверди оффер в телефоне!");

			}else{
				jQuery(".newmodal").remove();
				ToggleReady(true);
				jQuery(".newmodal_buttons .btn_green_white_innerfade span").click();
				ConfirmTradeOffer();
			}
		},2000);
	};

})();