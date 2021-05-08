chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) { 
    if (message.text == 'pause') {
    	sendResponse({ mute: true });
    }
    return true;
});