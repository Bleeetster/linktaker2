export class iDownloader {
	constructor(logger, errorHandler, storage) {
		this.logger = logger;
		this.errorHandler = errorHandler;
		this.storage = storage;
	}
	async downloadURLList() { throw new Error('Downloader is not implemented') }
}
export class Downloader extends iDownloader {
	async downloadURLList() {
		try {
			const storageOutput = await this.storage.get();
			let urls = new String();
			const filename = `sites-${new Date().toISOString().replace(/[:.]/g, '-').slice(0,-5)}.txt`;
			storageOutput.forEach( (obj) => {
				urls += `${obj.url}\n`
			})
			const download = await chrome.downloads.download({
				url: 'data:text/plain,' + encodeURIComponent(urls),
				filename: filename,
				saveAs: false
			})
			this.logger.log(`File was saved as [${filename}]`);
			this.storage.clear();
		}
		catch (err) {
			this.errorHandler.logError(err);
		}
	}
}
