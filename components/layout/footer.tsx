import React from 'react'

import SocialIcons from '../social_icons'
import YoutubeFeed from '../youtube/feed'
import { footer, footerCTA } from './footer.css'

const Footer = () => {
  return (
    <div>
      <YoutubeFeed />

      <div className={`footer__main ${footer}`}>
        <div className="footer__logo">
          <img
            height="80px"
            width={'200px'}
            className="img nav__logo--img"
            alt="TFC logo"
            src="/images/logo_complete_green.svg"
          />
        </div>

        <div className={`footer__cta ${footerCTA}`}>
          <div className="footer__tagline cursive heading text_center">
            Every good recipe is the result of some fearless kitchen experiments
          </div>

          <div className="footer__social">
            <SocialIcons />
          </div>
        </div>
      </div>
      <div className="footer__nav"></div>
    </div>
  )
}

export default Footer
