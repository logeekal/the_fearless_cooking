import { useEffect } from 'react'

export const Captcha = () => {
  useEffect(() => {
    const turnstileScriptEl = document.createElement('script')
    const callbackScriptEl = document.createElement('script')
    callbackScriptEl.src = `
          function _turnstileOnLoadCallback() {
          global.turnstile.render('#turnstile-container', {
            sitekey: '0x4AAAAAAANKStAZSqyBCdYE',
            callback: function (token: string) {
              console.log('Challenge Success', token)
            },
          })
        } `
    turnstileScriptEl.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js'

    turnstileScriptEl.async = true

    document.body.appendChild(callbackScriptEl)
    document.body.appendChild(turnstileScriptEl)
  }, [])

  return null
}
