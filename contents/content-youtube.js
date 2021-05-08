chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {  

    if (message.text == 'pause') {
    	let video = document.getElementsByTagName("video")[0];
		if (video)
			video.pause();
    }

    sendResponse({site : "youtube"});

    return true;
});
