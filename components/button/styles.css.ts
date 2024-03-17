import { keyframes, style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

const buttonShine = keyframes({
  '0%': {
    left: 0,
  },

  '100%': {
    left: '110%',
  },
})

export const button = style({
  width: '100%',
  cursor: 'pointer',
  padding: vars.space.s,
  transition: '0.4s ease-in-out',
  transform: 'rotate(0deg)',
  fontWeight: 'bolder',
  position: 'relative',
  overflow: 'hidden',
  selectors: {
    '&::after': {
      width: '100px',
      height: '500px',
      position: 'absolute',
      display: 'block',
      content: '',
      top: '-300px',
      left: '-150px',
      backgroundColor: 'red',
      transform: 'rotate(45deg)',
      opacity: '0.3',
    },
    '&.primary': {
      color: vars.colors.card,
      border: `1px solid ${vars.colors.card}`,
      backgroundColor: vars.colors.brand,
    },
    '&.primary:after': {
      backgroundColor: vars.colors.card,
    },
    '&.ghost': {
      color: vars.colors.brand,
      border: `1px solid ${vars.colors.brand}`,
      backgroundColor: vars.colors.card,
    },
    '&.ghost:after': {
      backgroundColor: vars.colors.brand,
    },
    '&:hover:after': {
      animationName: buttonShine,
      animationDuration: '0.15s',
      animationTimingFunction: 'ease-in-out',
      animationDirection: 'alternate',
    },

    '&.pending': {
      backgroundColor: vars.colors.lightgray,
    },
  },
})
