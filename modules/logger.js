export class iLogger {
	log(string) { throw new Error('logger is not implemented') };
}
export class iErrorHandler {
	logError(error) { throw new Error('ErrorHandler is not implemented') }
}

export class Logger extends iLogger {
	log(string) {
		const time = new Date();
		console.log(`[${time.getTime()}] ${string}`);
	}
}
export class ErrorHandler extends iErrorHandler {
}
