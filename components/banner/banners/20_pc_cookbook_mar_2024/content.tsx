import React, { FormEventHandler, useCallback, useState } from 'react'

import { Button } from '../../../button'
import { useSubscribe } from '../../../hooks/use_subscribe'
import Loader from '../../../loading'
import { CAMPAIGN_ID, stylePrefix } from './common'
import * as styles from './styles.css'

export const FreeCookbookBannerContent = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')

  const [userEmail, setUserEmail] = useState('')

  const { submitHandler: subscribe, submitRequestState } = useSubscribe()

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      if (formSubmitStatus !== 'idle') return

      setFormSubmitStatus('pending')
      subscribe({
        email: userEmail,
        campaign: CAMPAIGN_ID,
        instance: process.env.NODE_ENV ?? 'production',
        tags: [],
      })
        .then(() => {
          setFormSubmitStatus('success')
        })
        .catch(() => {
          setFormSubmitStatus('success')
        })
    },
    [formSubmitStatus, subscribe, userEmail]
  )
  return (
    <div className={`${stylePrefix}__container ${styles.container}`}>
      <div className={`${stylePrefix}__art ${styles.artworkContainer}`}>
        <img
          className={`${styles.artworkImg}`}
          alt="Get Free cookbook artwork"
          src="https://i1.wp.com/wp-backend.thefearlesscooking.com/wp-content/uploads/2024/04/20-OFF-Square.jpg?resize=500%2C500&ssl=1"
          width={'100%'}
          height={'100%'}
        />
      </div>
      <div className={`${stylePrefix}__content} ${styles.content}`}>
        <div
          className={`content__heading bold heading text_center 
            stylePrefix__content-heading ${styles.contentHeader}
          `}
        >
          20% OFF 🤘🏼
        </div>
        {formSubmitStatus === 'idle' ? (
          <div className={'content__text text_center'} style={{ width: '95%' }}>
            <p>
              Sign up below to avail this exclusive offer. Valid only for today.
            </p>
          </div>
        ) : null}
        <div className={`content__footer ${styles.contentFooter} text_center `}>
          <form
            className={`subscription-form ${styles.subscriptionForm}`}
            onSubmit={handleSubmit}
          >
            {formSubmitStatus !== 'idle' ? (
              <Loader
                size="60px"
                status={formSubmitStatus === 'pending' ? 'loading' : 'success'}
              />
            ) : null}
            {formSubmitStatus === 'idle' ? (
              <input
                className={`${styles.emailInput}`}
                type="email"
                placeholder="itsme@example.com"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                required
              />
            ) : null}

            {formSubmitStatus === 'success' || formSubmitStatus == 'error'
              ? 'Yayyy 🥳. Please check your inbox.'
              : null}
            {formSubmitStatus === 'idle' ? (
              <Button
                className={styles.submitButton}
                variant="ghost"
                type="submit"
              >
                {'Sign me up'}
              </Button>
            ) : null}
          </form>
        </div>
      </div>{' '}
    </div>
  )
}
