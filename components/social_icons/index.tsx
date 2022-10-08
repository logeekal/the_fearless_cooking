import React, { forwardRef, HTMLProps } from 'react'

import { SOCIALS } from '../../utils/config'
import { icon, iconImage, socialIcons } from './index.css'

//type Props = {}
type IconProps = {
  src: string
  alt: string
  href: string
} & HTMLProps<HTMLAnchorElement>

export const Icon = forwardRef<HTMLAnchorElement, IconProps>((props, ref) => {
  const { src, alt, href, className } = props
  return (
    <a className={`socialicons__icon ${className ?? ''}`} href={href} ref={ref}>
      <img className={`${iconImage}`} src={src} alt={alt} />
    </a>
  )
})

Icon.displayName = 'Icon'

const SocialIcons = () => {
  return (
    <div className={`socialicons ${socialIcons}`}>
      <Icon
        target="_blank"
        href={SOCIALS.youtube}
        className={`${icon}`}
        src={'/images/youtube.svg'}
        alt="Follow Us on Youtube"
      />
      <Icon
        target="_blank"
        href={SOCIALS.insta}
        className={`${icon}`}
        src={'/images/insta.svg'}
        alt="Follow Us on instagram"
      />
      <Icon
        target="_blank"
        href={SOCIALS.facebook}
        className={`${icon}`}
        src={'/images/facebook.svg'}
        alt="Follow Us on Facebook"
      />
      <Icon
        href={SOCIALS.email}
        target="_blank"
        className={`${icon}`}
        src={'/images/email.svg'}
        alt="Write us an email"
      />
    </div>
  )
}

export default SocialIcons
