import pino from 'pino'

export const logger = pino({
  name: 'SSR',
  level: process.env.LOG_LEVEL ?? 'info',
  browser: {
    serialize: true,
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

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
