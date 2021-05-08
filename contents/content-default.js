chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) { 
    
    chrome.storage.sync.get(['enableMute'], function(result) {
  		if (message.text == 'pause') 
    		sendResponse({ mute: result.enableMute, site : "default" });
    });

    return true;
});