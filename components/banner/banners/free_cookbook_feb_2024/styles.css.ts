import { keyframes, style } from '@vanilla-extract/css'

import { breakPoints } from '../../../../styles/breakpoints.css'
import { vars } from '../../../../styles/themes.css'

const buttonRotateAnimation = keyframes({
  '0%': {
    transform: 'rotate(0)',
  },

  '1%': {
    transform: 'rotate(1deg)',
  },

  '25%': {
    transform: 'rotate(90deg)',
  },

  '50%': {
    transform: 'rotate(180deg)',
  },

  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const freeCookbookBannerContainer = style({
  position: 'relative',
  backgroundColor: vars.colors.card,
})

export const container = style({
  background: 'transparent',
  width: '100%',
  height: '100%',
  display: 'flex',
  gap: vars.space.l,
  '@media': {
    [breakPoints.tablet]: {
      maxHeight: '600px',
      minWidth: '300px',
      flexDirection: 'column',
    },
    [breakPoints.desktop]: {
      flexDirection: 'row',
      height: '300px',
      width: '600px',
    },
  },
})

export const artworkContainer = style({
  flex: '0.5 0 50%',
  '@media': {
    [breakPoints.tablet]: {
      width: '100%',
      maxHeight: '50%',
    },
    [breakPoints.desktop]: {
      height: '100%',
      maxWidth: '50%',
    },
  },
})

export const artworkImg = style({
  width: '100% !important',
  height: '100% !important',
  objectFit: 'cover',
})

export const artworkContent = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: vars.space.s,
})

export const content = style({
  flex: '1 1 50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media': {
    [breakPoints.tablet]: {
      gap: vars.space.s,
    },
    [breakPoints.desktop]: {
      gap: vars.space.normal,
    },
  },
})

export const subscriptionForm = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.s,
  justifyContent: 'center',
  alignItems: 'center',
})

export const contentFooter = style({
  width: '80%',
})

export const emailInput = style({
  width: '100%',
  padding: vars.space.s,
  border: `1px solid ${vars.colors.lightgray}`,
  transition: '0.1s ease-in-out',
  selectors: {
    '&:focus': {
      border: `2px solid ${vars.colors.brand}`,
    },

    '&:focus:invalid': {
      border: '2px solid red',
    },
  },
})
