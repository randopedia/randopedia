// @flow

import winston from 'winston'
import {format} from 'winston'

export class LogService {

  logger: Object

  constructor() {

    const myFormat = format.printf(info => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
    })

    this.logger = winston.createLogger({
      format : format.combine(
        format.label({label:'randopedia-server'}),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
      ),
      transports: [
        new (winston.transports.Console)()
      ]
    })
  }

  getLogger() {
    return this.logger
  }
}

export let logService = new LogService()
