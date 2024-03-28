import { useEffect } from 'react'

export const Captcha = () => {
  useEffect(() => {
    const turnstileScriptEl = document.createElement('script')
    const callbackScriptEl = document.createElement('script')
    callbackScriptEl.src = `
          function _turnstileCb() {
            console.debug('Rendering turnstile')
            global.turnstile.render('#turnstile-container', {
              sitekey: '0x4AAAAAAANKStAZSqyBCdYE',
              theme: 'light',
              callback: function (token: string) {
                console.log('Challenge Success', token)
              },
            })
        } `
    turnstileScriptEl.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js'
    turnstileScriptEl.defer = true

    turnstileScriptEl.async = true

    document.body.appendChild(callbackScriptEl)
    document.body.appendChild(turnstileScriptEl)
  }, [])

  return null
}
