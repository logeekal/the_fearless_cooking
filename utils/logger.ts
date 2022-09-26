import { pino } from 'pino'

export const logger = pino({
  name: 'SSR',
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
export const devLogger = pino(
  {
    name: 'dev',
    enabled: process.env.NODE_ENV !== 'production',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        customColors: 'info:yellow',
      },
    },
  },
  prodDestination
)
