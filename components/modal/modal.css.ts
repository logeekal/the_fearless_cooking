import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const modalBg = style({
  position: 'fixed',
  background: 'rgb(0,0,0,0.3)',
  backdropFilter: 'blur(2px)',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  zIndex: vars.zIndex.highest,
})

export const modalContent = style({
  position: 'relative',
  width: '100%',
  height: '100%',
})

export const modal = style({
  selectors: {
    '&.hidden': {
      display: 'none',
    },
  },
})
