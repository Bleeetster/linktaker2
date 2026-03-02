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

		this.head = null;
		this.current = null;
		this.observe();
	}
	async observe() {
		chrome.storage.onChanged.addListener( (changes, namespace) => {
			console.log(changes) // temporary replacement for proper loging
		})
	}
	_generateUUID() {
		return Date.now().toString();
	}
	async _getHead() {
		const response = await chrome.storage.local.get(["head","current"]);
		if (!(response.hasOwnProperty("head") & response.hasOwnProperty("current")))
			return;
		this.head = response["head"];
		this.current = response["current"];
	}
	async _setHead() {
		await chrome.storage.local.set({head: this.head, current: this.current});
	}
	async add(...urls) {
		try {
			await this._getHead();
			for (let i = 0; i < urls.length; i++) {
				const uuid = this._generateUUID();
				if (this.head == null) {
					this.head = uuid;
				}
				else {
					const cur = await chrome.storage.local.get(this.current.toString());
					for (let [key, value] of Object.entries(cur)) {
						value.next = uuid;
						await chrome.storage.local.set({[key]: value});
					}
				}
				await chrome.storage.local.set({[uuid]: { url: urls[i], next: null}});
				this.current = uuid;
				await this._setHead();
			}
		}
		catch (err) {
			this.errorhandler.logError(err)
		}
	}
	async get() {
		try {
			await this._getHead();
			const urls = await chrome.storage.local.get(null);
			let arr = new Array();
			let i = this.head;
			while (i != null) {
				console.log(urls[i]);
				arr.push(urls[i].url)
				i = urls[i].next
			}
			return arr;
		}
		catch (err) {
			this.errorhandler.logError(err)
		}
	}
	async remove(...keys) {
		await this._getHead();
		try {
			const urls = await chrome.storage.local.get(null);
			console.log(urls);
			let pointer = this.head;
			for (const key of keys) {
				let tail;
				for (let i = 0; i < key; i++)
				{
					tail = pointer;
					pointer = urls[pointer].next;
				}
				if (tail)
				{
					if ( pointer === this.current )
						this.current = tail
					await chrome.storage.local.set({ [tail]: {next: urls[pointer].next, url: urls[pointer].url}});
				}
				if ( pointer === this.head )
					this.head = urls[pointer].next;
				await chrome.storage.local.remove(pointer);
				await this._setHead();
			}
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
