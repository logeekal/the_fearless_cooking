import { keyframes, style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

const loadingAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '50%': {
    transform: 'rotate(360deg)',
  },
  '100%': {
    transform: 'rotate(0deg)',
  },
})

export const loaderContainer = style({
  width: '100%',
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  selectors: {
    '&.full': {
      display: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
    },
  },
})

export const loader = style({
  borderTop: vars.colors.brand,
  borderRadius: vars.border.circular,
  borderTopWidth: '2px',
  borderStyle: 'solid',
  width: '100%',
  height: '100%',
  maxWidth: '50px',
  maxHeight: '50px',
  animationName: loadingAnimation,
  animationDuration: '0.5s',
  animationIterationCount: 'infinite',
  animationDirection: 'initial',
})
