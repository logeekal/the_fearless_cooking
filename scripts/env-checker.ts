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

const OPTIONAL_ENVS: string[] = ['LOG_LEVEL']

const isStringInvalid = (str: string | undefined) => {
  const result =
    !str ||
    str.length === 0 ||
    typeof str === undefined ||
    ['null', 'undefined'].includes(String(str))
  return result
}

interface CheckEnvArgs {
  mandatory_envs?: Array<string>
  optional_envs?: Array<string>
}

export function checkEnvs({
  mandatory_envs = MANDATORY_ENVS,
  optional_envs = OPTIONAL_ENVS,
}: CheckEnvArgs) {
  let envsMissingError = false

  logger.info('=====> Mandatory envs \n')

  const mandatory_envs_local = mandatory_envs

  const optional_envs_local = optional_envs

  mandatory_envs_local.forEach((envVar) => {
    if (!(envVar in process.env) || isStringInvalid(process.env[envVar])) {
      logger.info(`${envVar} : 🔥`)
      envsMissingError = true
    } else {
      logger.info(`${envVar} : ✅`)
    }
  })

  if (optional_envs_local.length > 0) {
    logger.info('=====> Optional envs \n')

    optional_envs_local.forEach((envVar) => {
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
