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

export const container = style({
  backgroundColor: vars.colors.card,
  display: 'flex',
  gap: vars.space.s,
  '@media': {
    [breakPoints.tablet]: {
      height: '600px',
      width: '300px',
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
  objectFit: 'cover',
})

export const artworkContent = style({
  flex: '0.5 1 50%',
  display: 'inline-flex',
  flexDirection: 'column',
  gap: vars.space.s,
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
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

export const submitButton = style({
  width: '100%',
  backgroundColor: vars.colors.brand,
  padding: vars.space.s,
  color: vars.colors.card,
  cursor: 'pointer',
  border: `1px solid ${vars.colors.card}`,
  transition: '0.4s ease-in-out',
  transform: 'rotate(0deg)',
  selectors: {
    '&:hover': {
      border: `1px solid ${vars.colors.brand}`,
      backgroundColor: vars.colors.card,
    },

    '&.pending': {
      backgroundColor: vars.colors.lightgray,
    },
  },
})
