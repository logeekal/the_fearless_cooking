import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const bannerContainer = style({
  position: 'absolute',
  zIndex: vars.zIndex.highest,
  width: '100vw',
  height: '100vh',
  transition: '0.3s ease-in-out',
  selectors: {
    '&.opening': {
      display: 'block',
      transform: 'translateY(-100%)',
    },
    '&.open': {
      transition: '0.3s ease-in-out',
      transform: 'translateY(0)',
    },
    '&.closing': {
      transform: 'translateY(-100%)',
    },
    '&.closed': {
      display: 'none',
    },
  },
})

export const bannerBackground = style({
  position: 'relative',
  backgroundColor: vars.colors.lightgray,
  width: '100%',
  height: '100%',
})

export const bannerContentCloseBtn = style({
  cursor: 'pointer',
  position: 'absolute',
  right: vars.space.s,
  top: vars.space.xs,
  transform: 'rotate(45deg)',
})

export const bannerContent = style({
  backgroundColor: 'white',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  padding: vars.space.l,
})
