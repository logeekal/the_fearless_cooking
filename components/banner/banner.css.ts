import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

export const rootBannerContainer = style({
  position: 'fixed',
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

export const rootBannerBackground = style({
  position: 'relative',
  backgroundColor: vars.colors.lightgray,
  width: '100%',
  height: '100%',
})

export const rootBannerContentCloseBtnContainer = style({
  cursor: 'pointer',
  position: 'absolute',
  right: '-38px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: calc.multiply(1, vars.space.xl),
  height: calc.multiply(1, vars.space.xl),
  padding: vars.space.xs,
  backgroundColor: vars.colors.card,
  transform: 'translateX(-50%)',
  fontWeight: 800,
  borderRadius: vars.border.circular,
  '@media': {
    [breakPoints.tablet]: {
      top: '-30px',
    },
    [breakPoints.desktop]: {
      top: '-30px',
    },
  },
})

export const rootBannerContentCloseBtn = style({
  fontSize: vars.fontSize.heading,
  color: vars.colors.brand,
})

export const rootBannerContent = style({
  backgroundColor: 'white',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  padding: vars.space.l,
})
