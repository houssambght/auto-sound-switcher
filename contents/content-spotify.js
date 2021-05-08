chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {    
    if (message.text == 'pause') {
    	let pauseBtn = document.querySelector('[aria-label="Pause"]');
		if (pauseBtn)
			pauseBtn.click();
    }

    return true;
});
