export class iDownloader {
	constructor(logger, errorHandler, storage) {
		this.logger = logger;
		this.errorHandler = errorHandler;
		this.storage = storage;
	}
	async downloadURLList(storage) { throw new Error('Downloader is not implemented') }
}
export class Downloader extends iDownloader {
}
