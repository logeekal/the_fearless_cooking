import chalk from 'chalk'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import pino from 'pino'

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
}

prefix.reg(log)

if (process.env.NODE_ENV === 'development' || process.env.DEBUG) {
  log.setLevel('trace')
} else {
  log.setLevel('info')
}

prefix.apply(log, {
  format(level: string, name: string | undefined, timestamp: Date) {
    return `${chalk.gray(`[${String(timestamp)}]`)} ${colors[
      level.toUpperCase() as keyof typeof colors
    ](level)} ${chalk.green(`${name ?? ''}:`)}`
  },
})

export const logger1 = pino({
  name: 'SSR',
  level: process.env.LOG_LEVEL ?? 'info',
  browser: {
    serialize: true,
  },
})

export const logger2 = log

export const logger = logger2

export const devLogger = logger

// export const devLogger = pino(
//   {
//     name: 'dev',
//     enabled: Boolean(process.env.DEBUG),
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         colorize: true,
//         customColors: 'info:yellow',
//       },
//     },
//   },
//   prodDestination
// )
