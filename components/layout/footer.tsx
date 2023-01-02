import React from 'react'

import { SiteMeta } from '../../utils/config'
import SocialIcons from '../social_icons'
import YoutubeFeed from '../youtube/feed'
import { footer, footerCTA, footerLogo } from './footer.css'

const Footer = () => {
  return (
    <div>
      <YoutubeFeed />

      <div className={`footer__main ${footer}`}>
        <div className={`footer__logo ${footerLogo}`}>
          <img
            height="50px"
            width={'200px'}
            className="img nav__logo--img"
            alt="TFC logo"
            src={SiteMeta.logo}
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
