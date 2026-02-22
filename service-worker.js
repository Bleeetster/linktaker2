import { saveUrl } from './modules/saveLink.js'
import { Downloader } from './modules/downloader.js'
import { Storage } from './modules/storage.js' 
import { mainController } from './modules/controller.js'
import { Logger, ErrorHandler } from './modules/logger.js'

const logger = new Logger()
const errorHandler = new ErrorHandler()
const saver = new saveUrl(logger, errorHandler)
const downloader = new Downloader(logger, errorHandler)
const storage = new Storage(logger, errorHandler)

new mainController(saver, downloader, storage)
