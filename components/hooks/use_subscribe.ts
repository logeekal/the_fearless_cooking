import { useState } from 'react'

import { SubscriberInfo } from '../../server/services/types'

type UseSubscribeArgs = SubscriberInfo

const BASE_URL = '/api'

export const useSubscribe = () => {
  const [submitRequestState, setSubmitReqState] = useState<
    'IDLE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS' | 'EXIST'
  >('IDLE')

  async function submitHandler(args: UseSubscribeArgs): Promise<void> {
    const { email, tags, campaign, instance } = args
    if (typeof window === 'undefined') return

    setSubmitReqState('SUBMITTING')

    const subscriberInfo: SubscriberInfo = {
      email: email,
      campaign,
      instance,
      tags: [
        process.env.NODE_ENV,
        typeof window === 'undefined' ? 'backend' : window.location.pathname,
        ...(tags ?? []),
      ],
    }

    if (email) {
      const response = await fetch(`${BASE_URL}/subscribe`, {
        method: 'POST',
        body: JSON.stringify(subscriberInfo),
      })

      const resJSON = (await response.json()) as { title: string }
      if (response.status === 200) {
        setSubmitReqState('SUCCESS')
        return
      } else {
        if ('title' in resJSON && resJSON.title === 'Member Exists') {
          setSubmitReqState('EXIST')
          return
        }
        console.error('Some error while subscribing')
        console.error(resJSON)
        setSubmitReqState('ERROR')
      }
    }
  }

  return {
    submitRequestState,
    submitHandler,
  }
}
