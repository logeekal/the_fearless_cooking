import React, { PropsWithChildren, useMemo } from 'react'
import UAParser from 'ua-parser-js'

import { SafeFingerprintContext } from './context'

type Props = {
  userAgent?: string
}

export const SafeFingerprintProvider = ({
  userAgent,
  children,
}: PropsWithChildren<Props>) => {
  const ua = useMemo(() => {
    const uaParser = new UAParser()
    if (!userAgent) return
    return uaParser.setUA(userAgent)
  }, [userAgent])

  return (
    <SafeFingerprintContext.Provider
      value={{
        ip: '0.0.0.0',
        ua: {
          os: ua?.getOS(),
          browser: ua?.getBrowser(),
          cpu: ua?.getCPU(),
          device: ua?.getDevice(),
          engine: ua?.getEngine(),
        },
        compiled_ua: `${ua?.getBrowser().name ?? ''} //// ${
          ua?.getOS().name ?? ''
        } /// ${ua?.getDevice().vendor ?? 'unkown-device-vendor'} - ${
          ua?.getDevice().model ?? ''
        } `,
      }}
    >
      {children}
    </SafeFingerprintContext.Provider>
  )
}
