import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars } from '../../styles/themes.css'

const iconHeight = '40px'

export const socialIcons = style({
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.l,
  width: '100%',
})

export const icon = style({
  height: iconHeight,
  width: iconHeight,
})

export const youtube = style({
  width: calc.multiply(iconHeight, 1.2),
  height: iconHeight,
})

export const iconImage = style({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
})
