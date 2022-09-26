import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const about = style({
  background: vars.colors.greenLight,
  padding: vars.space.normal,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space.l,
  paddingBlock: vars.space.l,
})

export const aboutHeading = style({
  fontFamily: vars.font.cursive,
  fontSize: vars.fontSize.cursiveHeading,
})

export const aboutImage = style({
  borderRadius: vars.border.circular,
  objectFit: 'cover',
  objectPosition: 'center',
})

export const aboutText = style({
  width: '75%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
  color: vars.colors.textSecondary,
})

export const cookbook = style({
  background: 'transparent',
  paddingInline: vars.space.l,
})

export const cookbookText = style({
  color: vars.colors.textSecondary,
})
