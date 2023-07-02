import { pino } from 'pino'

export const logger = pino({
  name: 'SSR',
  level: process.env.LOG_LEVEL ?? 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

const prodDestination = pino.destination(
  process.env.NODE_ENV === 'production' ? 0 : 1
)

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
