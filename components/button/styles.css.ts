import { keyframes, style, styleVariants } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

const buttonShine = keyframes({
  '0%': {
    left: 0,
  },

  '100%': {
    left: '110%',
  },
})

export const base = style({
  width: '100%',
  cursor: 'pointer',
  padding: vars.space.s,
  fontWeight: 'bolder',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: vars.space.xs,
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

export const buttonVariants = styleVariants({
  text: [
    base,
    {
      border: '0px',
      padding: '0px',
      fontWeight: '400',
      '&::after': {
        display: 'none',
      },
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  ],
  primary: [
    base,
    {
      color: vars.colors.card,
      border: `1px solid ${vars.colors.card}`,
      backgroundColor: vars.colors.brand,
      selectors: {
        '&:after': {
          backgroundColor: vars.colors.card,
        },
      },
    },
  ],
  ghost: [
    base,
    {
      color: vars.colors.brand,
      border: `1px solid ${vars.colors.brand}`,
      backgroundColor: vars.colors.card,
      selectors: {
        '&:after': {
          backgroundColor: vars.colors.brand,
        },
      },
    },
  ],
})
