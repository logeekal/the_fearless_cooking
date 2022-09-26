import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const ytFeed = style({
  color: vars.colors.text,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.normal,
  background: vars.colors.greenLight,
})

export const ytFeedText = style({
  paddingInline: '12.5%',
  color: vars.colors.textSecondary,
})

export const ytFeedSubImgContainer = style({
  width: '160px',
  height: '40px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url("/images/yt_subscribe.png")',
})

export const ytFeedSubImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
})
