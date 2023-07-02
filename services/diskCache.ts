import { ICacheService } from './CacheService'
const CACHE_FOLDER = '.cache'
import * as fs from 'fs'
import * as path from 'path'

import { logger } from '../utils/logger'

export default class DiskCacheService implements ICacheService {
  cacheDir: string
  constructor() {
    const rootDir = '/tmp'
    this.cacheDir = path.join(rootDir, CACHE_FOLDER)
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir)
    }
  }

  set(name: string, value: string): void {
    logger.debug(`Setting Cache : ${name}`)
    const fileHandler = path.join(this.cacheDir, name)
    if (!fs.existsSync(fileHandler)) {
      logger.trace(`Setting cache for ${name}`)
      fs.writeFileSync(fileHandler, value, {})
      logger.debug
    }
  }

  get(name: string): Buffer | undefined {
    try {
      const fileHandler = path.join(this.cacheDir, name)
      const result = fs.readFileSync(fileHandler)
      if (!result) throw new Error('No Cache found')
      logger.debug(`Returning ${name} from cache`)
      return result
    } catch (e) {
      const cacheFiles = fs.readdirSync(this.cacheDir)
      logger.debug(
        `${name} Cache not found in \n\n\n ${JSON.stringify(cacheFiles)} \n\n`
      )
      return undefined
    }
  }
}
