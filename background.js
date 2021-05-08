chrome.runtime.onInstalled.addListener(() => {
	logger.log('Extention Installed');
	chrome.storage.sync.set({"enableMute": true});
});

chrome.tabs.onUpdated.addListener(async function (event) {

	let [activeTab] = await chrome.tabs.query({active: true});

	if(activeTab.audible == true) {
		let tabs = await chrome.tabs.query({audible : true});
		tabs.forEach(tab => {
			if(tab.id !== activeTab.id) {
				chrome.tabs.sendMessage(tab.id, {text: 'pause'}, function(message) {
					if(message && message.mute === true) {
						chrome.tabs.update(tab.id, { muted : true });
						logger.log(`${tab.id} ${message.site} muted`);
					} else {
						logger.log(`${tab.id} ${message.site} paused`);
					}
				});
			}
		});    	                 
	}
	
});


let logger = {
	enabled : true,
	log : function(...args) {
			if(this.enabled) 
				console.log(...args);
		 }
}