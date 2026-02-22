class IsaveLink {
	constructor (logger, errorHandler, storage) {
		this.logger = logger;
		this.errorHandler = errorHandler;
		this.storage = storage;
	}
	async saveUrls() { throw new Error("Not implemented")}
	async saveUrl() { throw new Error("Not implemented")}
	async queryTabs() { throw new Error("Not implemented")}
}
export class saveUrl extends IsaveLink {
	async saveUrl() {
		try {
			const tab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
			const output = {title: tab[0].title, url: tab[0].url};
			await this.storage.add(output);
		} 
		catch (err) {
			console.error(err)
			this.errorHandler.logError(err)
		}
	}
}

