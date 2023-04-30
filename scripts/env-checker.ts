import { logger } from '../utils/logger'

const MANDATORY_ENVS = [
  'MAILCHIMP_KEY',
  'MAILCHIMP_LIST_ID',
  'MF_HOST',
  'TOKEN',
  'USERNAME',
  'YT_API_KEY',
  'OPEN_AI_KEY',
  'OPEN_AI_TEST_KEY',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USERNAME',
  'SMTP_PASSWORD',
  'EMAIL_SENDER',
  'EMAIL_RECIPIENTS',
  'FROM_NAME',
]

const OPTIONAL_ENVS: string[] = []

const isStringInvalid = (str: string | undefined) => {
  const result =
    !str ||
    str.length === 0 ||
    typeof str === undefined ||
    ['null', 'undefined'].includes(String(str))
  return result
}

export function checkEnvs() {
  let envsMissingError = false

  logger.info('=====> Mandatory envs \n')

  MANDATORY_ENVS.forEach((envVar) => {
    if (!(envVar in process.env) || isStringInvalid(process.env[envVar])) {
      logger.info(`${envVar} : 🔥`)
      envsMissingError = true
    } else {
      logger.info(`${envVar} : ✅`)
    }
  })

  if (OPTIONAL_ENVS.length > 0) {
    logger.info('=====> Optional envs \n')

    OPTIONAL_ENVS.forEach((envVar) => {
      if (!process.env[envVar]) {
        logger.info(`${envVar} : 🔥`)
      } else {
        logger.info(`${envVar} : ✅`)
      }
    })
  }
  logger.info('========================\n')

  if (envsMissingError)
    throw new Error(
      'Some Environment variables are missing. Please add those to continue'
    )
}
