import * as fs from 'fs'
import * as path from 'path'

import { logger } from '../utils/logger'

const CACHE_FOLDER = '.cache'

export type ICacheService = {
    set(name: string, value: string): void
    get(name: string): Buffer | undefined
}

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
            logger.info(`Setting cache for ${name}`)
            fs.writeFileSync(fileHandler, value, {})
        }
    }

    get(name: string): Buffer | undefined {
        try {
            const fileHandler = path.join(this.cacheDir, name)
            return fs.readFileSync(fileHandler)
        } catch (e) {
            return undefined
        }
    }
}
