import Image from 'next/image'
import React from 'react'

import SocialIcons from '../social_icons'
import YoutubeFeed from '../youtube/feed'
import { footer } from './footer.css'

//type Props = {}

const Footer = () => {
    return (
        <div>
            <YoutubeFeed />

            <div className={`footer__main ${footer}`}>
                <Image
                    height="80px"
                    width={'200px'}
                    className="img nav__logo--img"
                    alt="TFC logo"
                    src="/images/logo_complete_green.svg"
                ></Image>

                <div className="footer__tagline cursive heading text_center">
                    Every good recipe is the result of some fearless kitchen
                    experiments
                </div>

                <div className="footer__social">
                    <SocialIcons />
                </div>

                <div className="footer__nav"></div>
            </div>
        </div>
    )
}

export default Footer
