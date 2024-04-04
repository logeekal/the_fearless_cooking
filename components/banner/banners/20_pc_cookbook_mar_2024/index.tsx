import React from 'react'

import { Banner } from '../..'
import { CAMPAIGN_ID } from './common'
import { FreeCookbookBannerContent } from './content'
import { freeCookbookBannerContainer } from './styles.css'

export const FreeCookbookBanner = () => {
  return (
    <Banner
      isOpen={true}
      bannerId={CAMPAIGN_ID}
      maxHideDuration={{
        hours: 1,
      }}
    >
      <div
        className={`freeCookbook_banner__container ${freeCookbookBannerContainer}`}
      >
        <FreeCookbookBannerContent />
      </div>
    </Banner>
  )
}
