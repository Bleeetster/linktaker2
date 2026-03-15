export class mainController {
  constructor(saver_, downloader_) {
    this.saver = saver_;
    this.downloader = downloader_;

    this.main()
  }
  async main() {
    chrome.runtime.onMessage.addListener((message, sender, sendRes) => {
      switch (message) {
        case "SaveUrl":
          this.saver.saveUrl()
            .then(() => sendRes({ returnCode: 0 }))
            .catch(() => sendRes({ returnCode: 1 }));
          break;
        case "downloadList":
          this.downloader.downloadURLList()
            .then(() => sendRes({ returnCode: 0 }))
            .catch(() => sendRes({ returnCode: 1 }));
          break;
        case "SaveUrls":
          this.saver.saveUrls()
            .then(() => sendRes({ returnCode: 0 }))
            .catch(() => sendRes({ returnCode: 1 }));
      }
      return true;
    })
  }
}
