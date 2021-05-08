let switchCheckbox = document.getElementById("switch");

chrome.storage.sync.get(['enableMute'], function(result) {
	switchCheckbox.checked = result.enableMute;
});

switchCheckbox.addEventListener("change", function() {
	chrome.storage.sync.set({"enableMute": switchCheckbox.checked});
});	