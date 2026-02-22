export class mainController {
	constructor(saver_, downloader_) {
		this.saver = saver_;
		this.downloader = downloader_;
		
		this.main()
	}
	async main() {
		chrome.runtime.onMessage.addListener((message, sender, sendRes) => {
			if (message === "SaveUrl") {
				this.saver.saveUrl()
					.then(res => sendRes({ returnCode: 0}))
					.catch(res => sendRes({ returnCode: 1}));
				return true;
			}
		})
	}
}
