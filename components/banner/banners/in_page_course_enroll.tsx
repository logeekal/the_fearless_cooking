import { usePlausible } from 'next-plausible'
import React, { useCallback } from 'react'

import { SiteMeta } from '../../../utils/config'
import { ANALYTICS } from '../../../utils/constants'
import { Button } from '../../button'
import {
  recipePageCourseEnrollBannerImg,
  recipePageCourseEnrollBannerTextContainer,
  recipePageCourseEnrollContainer,
} from './course_enroll_top_banner.css'

export const InPageCourseEnrollBanner = () => {
  const plausible = usePlausible()

  const handleButtonClick = useCallback(() => {
    plausible(ANALYTICS.EVENTS.IN_PAGE_FREEDOM_COURSE_CTA, {
      props: {
        id: ANALYTICS.CTA_IDS.COURSE_PAGE,
      },
    })
  }, [plausible])

  return (
    <div className={`${recipePageCourseEnrollContainer} "banner-course"`}>
      <img
        className={`${recipePageCourseEnrollBannerImg}`}
        src="https://wp-backend.thefearlesscooking.com/wp-content/uploads/2024/11/freedom_from_deficiency-e1730592131278.jpg"
        alt="freedom from deficiency"
        style={{}}
      />
      <div className={`${recipePageCourseEnrollBannerTextContainer}`}>
        <p style={{ width: '90%' }}>
          <strong className="accent">Reach vibrant health </strong>, stable
          energy levels, <strong className="accent">hormonal balance</strong>,
          and beauty with a{' '}
          <strong className="accent">scientifically proven</strong> systematic
          approach to nutrition and extra delicious, easy-to-implement recipes.
        </p>
        <Button
          target="_blank"
          href={SiteMeta.targets.freedomFromDeficiency.course}
          variant="primary"
          style={{ width: '90%' }}
          onClick={handleButtonClick}
        >
          <p>Join the course</p>
        </Button>
      </div>
    </div>
  )
}
