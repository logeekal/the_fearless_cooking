import { createContext, useContext } from 'react'
import UAParser from 'ua-parser-js'

export type SafeFingerprintContext = {
  ip: string
  ua: {
    os?: UAParser.IOS
    browser?: UAParser.IBrowser
    cpu?: UAParser.ICPU
    device?: UAParser.IDevice
    engine?: UAParser.IEngine
  }
  compiled_ua: string
}

export const SafeFingerprintContext =
  createContext<SafeFingerprintContext | null>(null)

export const useFingerprint = () => {
  const data = useContext(SafeFingerprintContext)
  if (!data) {
    throw new Error(
      'Should be called inside the SafeFingerprintContext Provider'
    )
  }
  return data
}
