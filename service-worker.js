import { saveUrl } from './modules/saveLink.js'
import { Downloader } from './modules/downloader.js'
import { Storage } from './modules/storage.js' 
import { mainController } from './modules/controller.js'
import { Logger, ErrorHandler } from './modules/logger.js'

const logger = new Logger()
const errorHandler = new ErrorHandler()
const storage = new Storage(logger, errorHandler)
const saver = new saveUrl(logger, errorHandler, storage)
const downloader = new Downloader(logger, errorHandler, storage)

new mainController(saver, downloader)
