import { keyframes, style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

const loadingAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const tickBaseGrow = keyframes({
  '0%': {
    width: 0,
  },
  '90%': {
    width: 0,
  },
  '100%': {
    width: '2.5rem',
  },
})

const tickTipGrow = keyframes({
  '0%': {
    width: '0px',
    left: 0,
    top: 0,
  },
  '25%': {
    width: '0px',
    left: 0,
    top: 0,
  },
  '50%': {
    top: '0',
    left: 0,
    width: 0,
  },
  '75%': {
    top: 0,
    left: 0,
    width: '0rem',
  },
  '100%': {
    top: '65%',
    left: '50%',
    width: '1.5rem',
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
  borderRight: vars.colors.brand,
  borderRadius: vars.border.circular,
  borderTopWidth: '2px',
  borderStyle: 'solid',
  width: '100%',
  height: '100%',
  maxWidth: '50px',
  maxHeight: '50px',
  position: 'relative',
  selectors: {
    '&.loading': {
      animationName: loadingAnimation,
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationDirection: 'initial',
      animationTimingFunction: 'ease',
    },
    '&.success': {
      backgroundColor: vars.colors.brand,
      borderWidth: 0,
    },
    '&.success::before': {
      height: '4px',
      width: '2.5rem',
      position: 'absolute',
      top: '65%',
      left: '44%',
      backgroundColor: vars.colors.card,
      transform: 'rotate(-45deg)',
      transformOrigin: '0% 50%',
      borderRadius: '5px',
      animation: `${tickBaseGrow} 1s`,
      content: '',
    },
    '&.success::after': {
      height: '4px',
      width: '1rem',
      position: 'absolute',
      top: '65%',
      left: '50%',
      backgroundColor: vars.colors.card,
      transform: 'rotate(-135deg)',
      transformOrigin: '0% 50%',
      borderRadius: '5px',
      animation: `${tickTipGrow} 1s`,
      content: '',
    },
  },
})
