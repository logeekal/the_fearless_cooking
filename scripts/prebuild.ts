import { logger } from '../utils/logger'
import { genIndex } from './createIndex'
import { downloadData } from './downloadData'
import { checkEnvs } from './env-checker'

checkEnvs({})

downloadData()
  .then(() => {
    return genIndex()
  })
  .then(() => logger.info('Index generation complete'))
  .catch((err) => console.error(err))
