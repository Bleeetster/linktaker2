export class mainController {
	constructor(saver_, downloader_) {
		this.saver = saver_;
		this.downloader = downloader_;
		
		this.main()
	}
	async main() {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message === "SaveUrl") {
				const isSaved = this.saver.saveUrl();
				sendResponse({ returnCode: isSaved })
			}
		})
	}
}
