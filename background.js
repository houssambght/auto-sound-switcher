chrome.runtime.onInstalled.addListener(() => {});

chrome.tabs.onUpdated.addListener(async function (event) {

	let [activeTab] = await chrome.tabs.query({active: true});
	
	if(activeTab.audible == true) {
		let tabs = await chrome.tabs.query({audible : true});
		tabs.forEach(tab => {
			if(tab.id !== activeTab.id) {
				chrome.tabs.sendMessage(tab.id, {text: 'pause'}, function(message) {
					if(message && message.mute === true)
						chrome.tabs.update(tab.id, { muted: true });
				});
			}
		});    	                 
	}
	
});