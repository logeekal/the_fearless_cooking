import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

export const rootBannerContainer = style({
  position: 'fixed',
  zIndex: calc.add(vars.zIndex.highest, 1),
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

export const rootBannerBackground = style({
  position: 'relative',
  backgroundColor: vars.colors.lightgray,
  width: '100%',
  height: '100%',
})

export const rootBannerContentCloseBtnContainer = style({
  cursor: 'pointer',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: calc.multiply(1, vars.space.xl),
  height: calc.multiply(1, vars.space.xl),
  padding: vars.space.xs,
  backgroundColor: 'transparent',
  transform: 'translateX(-50%)',
  '@media': {
    [breakPoints.tablet]: {
      top: '-34px',
      left: '50%',
    },
    [breakPoints.desktop]: {
      top: '-32px',
      right: '-10px',
    },
  },
})

export const rootBannerContentCloseBtn = style({
  fontSize: vars.fontSize.heading,
  color: vars.colors.brand,
})

const bgGradiant = {
  background:
    'radial-gradient(circle, hsla(0, 0%, 100%, 1) 1%, hsla(195, 21%, 93%, 1) 100%)',

  // background: 'hsla(0, 0%, 100%, 1)',
  //
  // background:
  //   '-moz-radial-gradient(circle, hsla(0, 0%, 100%, 1) 1%, hsla(195, 21%, 93%, 1) 100%)',
  //
  // background:
  //   '-webkit-radial-gradient(circle, hsla(0, 0%, 100%, 1) 1%, hsla(195, 21%, 93%, 1) 100%)',
}

export const rootBannerContent = style({
  ...bgGradiant,
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  padding: vars.space.l,
  paddingTop: calc.multiply(vars.space.xl, 2),
  overflow: 'auto',
  '@media': {
    [breakPoints.tablet]: {
      height: '100%',
      width: '100%',
    },
  },
})
