export class iStorage {
	constructor( logger, errorhandler) {
		this.logger = logger;
		this.errorhandler = errorhandler;
	}
	async push(key, value) { throw new Error('Storage is not implemented') }
	async get(key) { throw new Error('Storage is not implemented') }
	async remove(key) { throw new Error('Storage is not implemented') }
	async clear() { throw new Error('Storage is not implemented') }
}

export class Storage extends iStorage {
}
