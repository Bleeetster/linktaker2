class IsaveLink {
	constructor (logger, errorHandler) {
		this.logger = logger;
		this.errorHandler = errorHandler;
	}
	async saveUrls() { throw new Error("Not implemented")}
	async saveUrl() { throw new Error("Not implemented")}
	async queryTabs() { throw new Error("Not implemented")}
}
export class saveUrl extends IsaveLink {
	async queryTabs() {
		const queryOptions = { lastFocusedWindow: true };
		let [ tabs ] = await chrome.tabs.query(queryOptions);
		console.log(tabs);
		this.logger.log(tabs)
	}
}

