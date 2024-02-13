import { useState } from 'react'

type UseSubscribeArgs = {
  email: string
  tags?: string[]
}

export const useSubscribe = () => {
  const [submitRequestState, setSubmitReqState] = useState<
    'IDLE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS' | 'EXIST'
  >('IDLE')

  async function submitHandler(args: UseSubscribeArgs): Promise<void> {
    const { email, tags } = args
    if (typeof window === 'undefined') return

    setSubmitReqState('SUBMITTING')

    if (email) {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          tags: [
            process.env.NODE_ENV,
            typeof window === 'undefined'
              ? 'backend'
              : window.location.pathname,
            ...(tags ?? []),
          ],
        }),
      })

      const resJSON = (await response.json()) as { title: string }
      if (response.status === 200) {
        setSubmitReqState('SUCCESS')
        return
      } else {
        if (resJSON.title === 'Member Exists') {
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
