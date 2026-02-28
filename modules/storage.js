export class iStorage {
	constructor( loger, errorhandler) {
		this.loger = loger;
		this.errorhandler = errorhandler;
	}
	async add(...urls) { throw new Error('Storage is not implemented') }
	async insert(id, ...urls) { throw new Error('Storage is not implemented') }
	async get() { throw new Error('Storage is not implemented') }
	async remove(...keys) { throw new Error('Storage is not implemented') }
	async clear() { throw new Error('Storage is not implemented') }
	async observe() { throw new Error('Storage is not implemented') }
}

export class Storage extends iStorage {
	constructor( loger, errorhandler) {
		super(loger,errorhandler);

		this.observe();
	}
	async observe() {
		chrome.storage.onChanged.addListener( (changes, namespace) => {
			console.log(changes) // temporary replacement for proper loging
		})
	}
	async add(...urls) {
		try {
			for (let i = 0; i < urls.length; i++) {
				const keysArray = await chrome.storage.local.getKeys()
				let len = keysArray.length
				await chrome.storage.local.set({[len]: urls[i] });
			}
		}
		catch (err) {
			this.errorhandler.logError(err)
		}
	}
	async get() {
		try {
			const urls = await chrome.storage.local.get(null);
			return Object.values(urls);
		}
		catch (err) {
			this.errorhandler.logError(err)
		}
	}
	async remove(...keys) {
		try {
			let urls = await this.get();
			let output = new Array()
			urls.forEach( (url, index) => {
				if (keys.find( (idx) => index === idx))
					return;
				output.push(url)
			})
			this.clear();
			this.add(...output);
		}
		catch (err) {
			this.errorhandler.logError(err)
		}
	}
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
	async clear() {
		await chrome.storage.local.clear();
	}
}
