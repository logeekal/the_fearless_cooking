import dotenv from 'dotenv'
import path from 'path'

import { logger } from '../utils/logger'
import { genIndex } from './createIndex'
import { downloadData } from './downloadData'
import { checkEnvs } from './env-checker'

dotenv.config({
  path: path.join(process.cwd(), '.env.local'),
})

checkEnvs()

downloadData()
  .then(() => {
    return genIndex()
  })
  .then(() => logger.info('Index generation complete'))
  .catch((err) => console.error(err))
