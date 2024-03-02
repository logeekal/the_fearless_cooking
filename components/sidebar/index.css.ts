import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { colFlex, flexCenter } from '../../styles/vars.css'

export const sideBar = style({
  '@media': {
    [breakPoints.large]: {
      minWidth: '350px',
      maxWidth: '400px',
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

export const cookbookList = style({
  marginBlock: vars.space.normal,
})

export const cookbookListItem = style({
  listStyle: 'none',
  fontWeight: 700,
  color: vars.colors.text,
  selectors: {
    '&:not(:last-child)': {
      marginBottom: vars.space.s,
    },
  },
})

export const cookbookFooter = style({
  ...colFlex,
  ...flexCenter,
  width: '100%',
  gap: vars.space.s,
})
