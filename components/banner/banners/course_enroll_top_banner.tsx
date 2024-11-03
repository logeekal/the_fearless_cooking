import { usePlausible } from 'next-plausible'
import { FC, useCallback } from 'react'

import { Button } from '../../button'
import * as styles from './course_enroll_top_banner.css'

export const CourseEnrollTopBannerContent: FC = () => {
  const plausible = usePlausible()

  const handleButtonClick = useCallback(() => {
    plausible('courseEnrollClickTopBanner')
  }, [plausible])

  return (
    <div className={`${styles.courseEnrollTopBannerContainer}`}>
      <p>
        🔈 🔈 Ready to Ditch Deficiencies and Thrive 🖖? No Pills 💊 . No
        Gimmicks. Just Real Food 🥦. Learn More?
      </p>

      <Button
        href="https://school.thefearlesscooking.com"
        variant="ghost"
        style={{ width: 'fit-content', height: '30px' }}
        onClick={handleButtonClick}
      >
        <p>Okay</p>
      </Button>
    </div>
  )
}
