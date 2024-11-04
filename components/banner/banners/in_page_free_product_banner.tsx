import { usePlausible } from 'next-plausible'
import React, { useCallback } from 'react'

import { SiteMeta } from '../../../utils/config'
import { ANALYTICS } from '../../../utils/constants'
import { Button } from '../../button'
import {
  recipePageCourseFreeProductBannerTextContainer,
  recipePageFreeProductContainer,
} from './course_enroll_top_banner.css'

export const InPageCourseFreeProductBanner = () => {
  const plausible = usePlausible()

  const handleButtonClick = useCallback(() => {
    plausible(ANALYTICS.EVENTS.IN_PAGE_FREEDOM_COURSE_CTA, {
      props: {
        id: ANALYTICS.CTA_IDS.FREE_PRODUCT,
      },
    })
  }, [plausible])

  return (
    <div className={`${recipePageFreeProductContainer} "banner-course"`}>
      <img
        src="https://wp-backend.thefearlesscooking.com/wp-content/uploads/2024/11/freedom_deficiency_free_product.jpg"
        alt="freedom from deficiency"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundColor: 'white',
        }}
      />
      <div className={`${recipePageCourseFreeProductBannerTextContainer}`}>
        <p style={{ width: '80%' }}>
          <strong className="accent">Uncover</strong> the Surprising Truths
          Behind Deficiencies.{' '}
          <strong className="accent"> Download Your Free Guide</strong> to the
          Top 3 Overlooked Reasons Today!
        </p>
        <Button
          target="_blank"
          href={SiteMeta.targets.freedomFromDeficiency.freeProduct}
          variant="primary"
          style={{ width: '80%', backgroundColor: '#7c6b59' }}
          onClick={handleButtonClick}
        >
          <p>Download Free Guide</p>
        </Button>
      </div>
    </div>
  )
}
