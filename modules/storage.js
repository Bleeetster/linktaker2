export class iStorage {
	constructor( logger, errorhandler) {
		this.logger = logger;
		this.errorhandler = errorhandler;

		this.observe();
	}
	async add(...urls) { throw new Error('Storage is not implemented') }
	async insert(id, url) { throw new Error('Storage is not implemented') }
	async get(key) { throw new Error('Storage is not implemented') }
	async remove(key) { throw new Error('Storage is not implemented') }
	async clear() { throw new Error('Storage is not implemented') }
	async observe() { throw new Error('Storage is not implemented') }
}

export class Storage extends iStorage {
	// async observe() {
	// 	chrome.storage.onChanged.addListener( (changes, namespace) => {
	// 	})
	// }
	async add(...urls) {
		urls.forEach( async (url) => {
			const len = await chrome.storage.local.getKeys()
			len = len.length
			await chrome.storage.local.set({[len+1]: url });
		})
	}
// 	async remove(...keys) {
// 		await chrome.storage.local.remove(keys.map((key) => String(key)));
// 	}
// 	usefull function might use later
// 	async switch(key1, key2) {
// 		console.log('test');
// 		key1 = new String(key1);
// 		key2 = new String(key2);
// 		console.log(`switching ${key1} and ${key2}`)
// 		const value1 = await chrome.storage.local.get(key1);
// 		const value2 = await chrome.storage.local.get(key2);
// 		await chrome.storage.local.set({[key1]: value2});
// 		await chrome.storage.local.set({[key2]: value1});
// 	}
// 	async clear() {
// 		await chrome.storage.local.clear();
// 	}
}
