import { useLocalStorage } from '@react-hooks-library/core'
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Duration } from 'tinyduration'

import { getMilliSecondsFromDuration } from '../../utils/time_utils'
import {
  rootBannerBackground,
  rootBannerContainer,
  rootBannerContent,
  rootBannerContentCloseBtn,
  rootBannerContentCloseBtnContainer,
} from './banner.css'

type BannerProps = {
  mode?: 'top' | 'modal'
  isOpen?: boolean
  maxHideDuration?: Duration
  bannerId: string
}

export function Banner({
  mode = 'modal',
  isOpen = false,
  maxHideDuration = {
    days: 1,
  },
  bannerId,
  children,
}: PropsWithChildren<BannerProps>) {
  const [bannerVisibilityState, setBannerVisibilityState] = useState<
    'open' | 'opening' | 'closing' | 'closed'
  >('closed')

  const localStorageKey = useRef(`bannerBlackList-${bannerId}`)

  const [, setBannerBlackListTime] = useLocalStorage<number>(
    localStorageKey.current,
    new Date().getTime() - 100000
  )

  const handleBannerOpen = useCallback(() => {
    const hideBannerTillTimeStorage = localStorage.getItem(
      localStorageKey.current
    )
    const hideBannerTillTime = parseInt(
      hideBannerTillTimeStorage ?? String(new Date().getTime() - 3600000)
    )
    const currentTime = new Date().getTime()
    const shouldBannerOpen = currentTime > hideBannerTillTime
    if (shouldBannerOpen) {
      setBannerVisibilityState('opening')
      setTimeout(() => setBannerVisibilityState('open'), 300)
    }
  }, [])

  useEffect(() => {
    // to open the banner
    if (!isOpen || ['opening', 'open'].includes(bannerVisibilityState ?? ''))
      return
    handleBannerOpen()
  }, [isOpen, handleBannerOpen, bannerVisibilityState])

  useEffect(() => {
    if (bannerVisibilityState == 'closed') {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [bannerVisibilityState])

  const handleHideBannerTillMaxDuration = useCallback(() => {
    const currentTime = new Date().getTime()
    const hideBannerMaxDuration = getMilliSecondsFromDuration(maxHideDuration)
    const hideTill = currentTime + hideBannerMaxDuration
    setBannerBlackListTime(hideTill)
  }, [maxHideDuration, setBannerBlackListTime])

  const handleClose = useCallback(() => {
    handleHideBannerTillMaxDuration()
    setBannerVisibilityState('closing')
    setTimeout(() => setBannerVisibilityState('closed'), 300)
  }, [handleHideBannerTillMaxDuration])

  return (
    <div
      className={`rootBanner__container ${rootBannerContainer} ${
        bannerVisibilityState ?? ''
      }`}
    >
      <div className={`rootBanner__background ${rootBannerBackground}`}>
        <div className={`rootBanner__content ${rootBannerContent}`}>
          <div style={{ position: 'relative' }}>
            <div
              className={`rootBanner__content-close-container ${rootBannerContentCloseBtnContainer}`}
            >
              <div
                className={`rootBanner__content-close ${rootBannerContentCloseBtn}`}
                onClick={handleClose}
              >
                {'x'}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
