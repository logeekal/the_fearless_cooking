import { ComponentProps, ComponentType } from 'react'

import { ABTestingTrafficSplitterProvider } from '../ABSplitter'
import { SafeFingerprintProvider } from './provider'

export function withFingerprint(Component: ComponentType) {
  return function WithFingerprint(props: ComponentProps<typeof Component>) {
    return (
      <SafeFingerprintProvider
        userAgent={
          typeof window !== 'undefined'
            ? window?.navigator?.userAgent
            : undefined
        }
      >
        <ABTestingTrafficSplitterProvider>
          <Component {...props} />
        </ABTestingTrafficSplitterProvider>
      </SafeFingerprintProvider>
    )
  }
}
