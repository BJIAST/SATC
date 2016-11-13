// ==UserScript==
// @name         AutoTrade Accept
// @namespace    https://github.com/BJIAST/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://steamcommunity.com/tradeoffer/*
// @match 		 https://steamcommunity.com/trade/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	(function () {
		var soundAccept = new Audio('/done.wav');
		var site = location.href,
		steamsite = location.href.split("trade/");
		if (document.referrer == "http://cs.money/"){
			if (confirm('Принять этот трейд?')){
				acceptSteamTrade();
			}
		}else if (jQuery("#your_slot_0 .slot_inner").html() == ''){
			acceptSteamTrade();
		}else if(site == steamsite[0] + "trade/" + steamsite[1]){
			soundAccept.play();
			// setTimeout(function(){
			// 	window.close();
			// }, 3000);
		}else{
			console.log("Что то не так!");
		}
	}());
	function acceptSteamTrade(){
		var offerWindow = location.href;
		setInterval(function(){
			ToggleReady(true);
			jQuery(".newmodal_buttons .btn_green_white_innerfade span").click();
			ConfirmTradeOffer();
			if (offerWindow !== location.href){
			window.close();
		}else {
			console.log('Возможно что то не так');
		}
	},2000);
	};

})();