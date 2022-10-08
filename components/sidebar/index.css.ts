import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

export const sideBar = style({
  '@media': {
    [breakPoints.large]: {
      minWidth: '350px',
    },
  },
})

export const about = style({
  background: vars.colors.greenLight,
  padding: vars.space.normal,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space.l,
  paddingBlock: vars.space.l,
})

export const genericContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.l,
  maxWidth: 'min(600px, 80%)',
  textAlign: 'center',
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
