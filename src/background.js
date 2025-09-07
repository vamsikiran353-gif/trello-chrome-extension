
// Handles Trello OAuth authentication and messaging from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === 'trello-auth') {
		const redirectUri = chrome.identity.getRedirectURL('trello');
		const authUrl = `https://trello.com/1/authorize?expiration=never&name=TrelloBoardManager&scope=read,write&response_type=token&key=${request.apiKey}&return_url=${encodeURIComponent(redirectUri)}`;

		chrome.identity.launchWebAuthFlow({
			url: authUrl,
			interactive: true
		}, (responseUrl) => {
			if (chrome.runtime.lastError || !responseUrl) {
				sendResponse({ success: false, error: chrome.runtime.lastError });
				return;
			}
			const token = responseUrl.split("token=")[1];
			if (!token) {
				sendResponse({ success: false, error: 'Token not found.' });
				return;
			}
            console.log('OAuth successful, token:', token);
			sendResponse({ success: true, token });
		});
		// Indicate async response
		return true;
	}
});
