import { saveUrl } from './modules/saveLink.js'
import { Downloader } from './modules/downloader.js'
import { Storage } from './modules/storage.js' 
import { mainController } from './modules/controller.js'
import { Loger, ErrorHandler } from './modules/logger.js'

const loger = new Loger()
const errorHandler = new ErrorHandler()
const storage = new Storage(loger, errorHandler)
const saver = new saveUrl(loger, errorHandler, storage)
const downloader = new Downloader(loger, errorHandler, storage)

new mainController(saver, downloader)
