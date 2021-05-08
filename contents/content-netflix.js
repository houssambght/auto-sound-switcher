chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {   
    if (message.text == 'pause') {
    	let pauseBtn = document.querySelector('[aria-label="Pause"]');
    	let muteBtn = document.querySelector('[data-uia="audio-toggle-unmuted"]');
		if (pauseBtn)
			pauseBtn.click();
		if (muteBtn)
			muteBtn.click();
    }

	sendResponse({site : "netflix"});

    return true;
});