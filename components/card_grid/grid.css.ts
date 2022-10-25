import { keyframes, style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

const upDown = keyframes({
  '0%': {
    transform: 'translateY(0px)',
  },

  '50%': {
    transform: 'translateY(10px)',
  },

  '100%': {
    transform: 'translateY(0px)',
  },
})

export const grid = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'stretch',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  minWidth: '350px',
  gap: vars.space.s,
})

export const gridContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.normal,
  paddingBlock: vars.space.l,
})

export const gridHeading = style({
  fontFamily: vars.font.cursive,
  fontSize: vars.fontSize.cursiveHeading,
})

export const gridFooter = style({
  display: 'block',
})

export const footerImg = style({
  animationName: upDown,
  animationDuration: '1s',
  animationIterationCount: 'infinite',
})
