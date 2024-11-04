import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js'
import React, { useMemo } from 'react'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

export type ABTestingTrafficSplitterContextType = {
  variant: 'A' | 'B' | undefined
}

export const ABTestingTrafficSplitterContext =
  createContext<ABTestingTrafficSplitterContextType | null>(null)

export type ABTestingTrafficSplitterContextProps = PropsWithChildren<object>

export const useABTestingTrafficSplitter = () => {
  const context = React.useContext(ABTestingTrafficSplitterContext)
  if (context == null) {
    throw new Error(
      'useABTestingTrafficSplitter must be used within ABTestingTrafficSplitterProvider'
    )
  }
  return useMemo(() => context, [context])
}

export const ABTestingTrafficSplitterProvider = ({
  children,
}: ABTestingTrafficSplitterContextProps) => {
  const [variant, setVariant] = useState<
    ABTestingTrafficSplitterContextType['variant'] | undefined
  >(undefined)

  useEffect(() => {
    if (variant) return
    getCurrentBrowserFingerPrint()
      .then((fingerprint) => {
        const numFingerPrint = parseInt(fingerprint, 16)
        const variant =
          Math.floor(numFingerPrint / 100000) % 2 === 0 ? 'A' : 'B'
        setVariant(variant)
      })
      .catch(() => {
        setVariant('A')
      })
  }, [variant])

  return (
    <ABTestingTrafficSplitterContext.Provider value={{ variant }}>
      {children}
    </ABTestingTrafficSplitterContext.Provider>
  )
}
