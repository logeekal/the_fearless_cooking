import { randomInt } from 'crypto'

export function getIfExists(val: unknown | undefined, name: string) {
  if (!val) {
    console.debug({ name: val })
    throw new Error(`Missing mandatory param : ${name}`)
  }
  return val as string
}

export const getRandomString = (length: number) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    const randInt = randomInt(0, 100)
    if (randInt % 5 === 0) {
      result += ' '
    } else {
      result += String(randInt)
    }
  }

  return result
}
