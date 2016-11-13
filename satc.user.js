// ==UserScript==
// @name         AutoTrade Confirm
// @namespace    https://github.com/BJIAST/SATC/
// @version      1.1
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
	steamsite = location.href.split("trade/");

	// accept conditions
	if (document.referrer == "http://cs.money/"){
		if (confirm('Принять этот трейд?')){
			acceptSteamTrade();
		}
	}else if (jQuery("#your_slot_0 .slot_inner").html() == ''){
		acceptSteamTrade();
	}else if(site == steamsite[0] + "trade/" + steamsite[1]){
		soundAccept.play();
		setTimeout(function(){
			window.close();
		}, 3000);
	}else{
		console.log("Что то не так!");
	}
	
	// accept function
	function acceptSteamTrade(){
		setInterval(function(){
			ToggleReady(true);
			jQuery(".newmodal_buttons .btn_green_white_innerfade span").click();
			ConfirmTradeOffer();
		},2000);
	};

})();