import { saveUrl } from './modules/saveLink.js'
import { iDownloader } from './modules/downloader.js'
import { iStorage } from './modules/storage.js' 
import { mainController } from './modules/controller.js'
import { Logger, ErrorHandler } from './modules/logger.js'

const logger = new Logger()
const errorHandler = new ErrorHandler()
const saver = new saveUrl(logger, errorHandler)
const downloader = new iDownloader(logger, errorHandler)
const storage = new iStorage(logger, errorHandler)


new mainController(saver, downloader, storage)


