import { urlObject } from "./urlObject.js";

export class ContextMenu {
  constructor(storage) {
    chrome.contextMenus.create({
      id: 'save-element',
      title: 'Сохранить элемент',
      contexts: ["all"]
    })
    this.storage = storage;
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === "save-element") {
        const elemTitle = tab.title;
        const elemUrl = info.linkUrl || srcUrl || pageUrl;
        const elem = new urlObject(elemTitle, elemUrl)
        this.storage.add(elem)
      }
    })
  }
}
