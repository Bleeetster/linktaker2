import { urlObject } from "./urlObject.js";

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
			this.logger.log(`Saving [${tab[0].url}] into storage`)
			const output = new urlObject(tab[0].title, tab[0].url);
			await this.storage.add(output);
			await chrome.tabs.remove(tab[0].id);
		} 
		catch (err) {
			console.error(err)
			this.errorHandler.logError(err)
		}
	}
}

