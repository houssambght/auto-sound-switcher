chrome.runtime.onInstalled.addListener(() => {
	logger.log('Extention Installed');
	chrome.storage.sync.set({"enableMute": true});
});

chrome.tabs.onUpdated.addListener(async function (event) {
		
	let [activeTab] = await chrome.tabs.query({active: true, currentWindow: true});
	
	if(activeTab && activeTab.audible == true) {
			
		chrome.windows.getAll({"populate" : true}, function(windows) {
			
			windows
			.flatMap(window => window.tabs)
			.filter(tab => tab.audible == true)
			.filter(tab => tab.id !== activeTab.id)
			.forEach(tab => {
				chrome.tabs.sendMessage(tab.id, {text: 'pause'}, function(message) {
					if(message && message.mute === true) {
						chrome.tabs.update(tab.id, { muted : true });
						logger.log(`${tab.id} ${message.site} muted`);
					} else {
						logger.log(`${tab.id} ${message.site} paused`);
					}
				});
			});
			
		});
								
	}
	
});

chrome.tabs.onActivated.addListener(async function(event) {

	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
	if(tab.mutedInfo.muted) {
		chrome.tabs.update(tab.id, { muted : false });
	}

});

let logger = {
	enabled : false,
	log : function(...args) {
			if(this.enabled) 
				console.log(...args);
		 }
}