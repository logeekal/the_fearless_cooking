import { usePlausible } from 'next-plausible'
import { FC, useCallback } from 'react'

import { SiteMeta } from '../../../utils/config'
import { ANALYTICS } from '../../../utils/constants'
import { Button } from '../../button'
import * as styles from './course_enroll_top_banner.css'

export const CourseEnrollTopBannerContent: FC = () => {
  const plausible = usePlausible()

  const handleButtonClick = useCallback(() => {
    plausible(ANALYTICS.EVENTS.TOP_BANNER_FREEDOM_COURSE_CTA, {
      props: {
        id: ANALYTICS.CTA_IDS.FREE_PRODUCT,
      },
    })
  }, [plausible])

  return (
    <div className={`${styles.courseEnrollTopBannerContainer}`}>
      <p>
        🔈 🔈 Ready to Ditch Deficiencies and Thrive 🖖? No Pills 💊 . No
        Gimmicks. Just Real Food 🥦. Learn More?
      </p>

      <Button
        href={SiteMeta.targets.freedomFromDeficiency.freeProduct}
        variant="ghost"
        style={{ width: 'fit-content', height: '30px' }}
        onClick={handleButtonClick}
      >
        <p>Okay</p>
      </Button>
    </div>
  )
}
