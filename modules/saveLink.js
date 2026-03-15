import { urlObject } from "./urlObject.js";

class IsaveLink {
  constructor(logger, errorHandler, storage) {
    this.logger = logger;
    this.errorHandler = errorHandler;
    this.storage = storage;
  }
  async saveUrls() { throw new Error("Not implemented") }
  async saveUrl() { throw new Error("Not implemented") }
}
export class saveUrl extends IsaveLink {
  async saveUrls() {
    try {
      const tabs = await chrome.tabs.query({ highlighted: true, lastFocusedWindow: true })
      for (let tab of tabs) {
        this.logger.log(`Saving [${tab.url}] into storage`)
        const output = new urlObject(tab.title, tab.url);
        await this.storage.add(output);
        chrome.tabs.remove(tab.id);
      }
    }
    catch (err) {
      this.errorHandler.logError(err)
    }
  }
  async saveUrl() {
    try {
      const tab = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      this.logger.log(`Saving [${tab[0].url}] into storage`)
      const output = new urlObject(tab[0].title, tab[0].url);
      await this.storage.add(output);
      chrome.tabs.remove(tab[0].id);
    }
    catch (err) {
      this.errorHandler.logError(err)
    }
  }
}

