import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const bannerText = style({
  paddingInline: '12.5%',
  color: vars.colors.textSecondary,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
})

export const banner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
})
