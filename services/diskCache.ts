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
    const fileHandler = path.join(this.cacheDir, name)
    if (!fs.existsSync(fileHandler)) {
      logger.debug(`Setting cache for ${name}`)
      fs.writeFileSync(fileHandler, value, {})
    }
  }

  get(name: string): Buffer | undefined {
    try {
      const fileHandler = path.join(this.cacheDir, name)
      const result = fs.readFileSync(fileHandler)
      logger.debug(`Returning ${name} from cache`)
      return result
    } catch (e) {
      return undefined
    }
  }
}
