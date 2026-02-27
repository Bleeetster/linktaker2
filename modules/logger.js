export class iLoger {
	log(string) { throw new Error('loger is not implemented') };
}
export class iErrorHandler {
	logError(error) { throw new Error('ErrorHandler is not implemented') }
}

export class Loger extends iLoger {
	log(string) {
		const time = new Date();
		const timeStr = time.toDateString() + " " + time.toTimeString().slice(0,8);
		console.log(`[${timeStr}] ${string}`);
	}
}
export class ErrorHandler extends iErrorHandler {
	logError(err) {
		const time = new Date();
		const timeStr = time.toDateString() + " " + time.toTimeString().slice(0,8);
		console.error(`[${timeStr}]`, err);
		throw err
	}
}
