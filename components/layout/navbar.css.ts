import { keyframes, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints, sprinkles } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { bodyWidthRule, globalVars } from '../../styles/vars.css'

export const navMenuCloseAnimation = keyframes({
  '0%': {
    transform: 'translate(0,0)',
  },
  '99%': {
    transform: 'translate(-100%,0)',
    display: 'none',
  },
  '100%': {
    transform: 'translate(-100%,0)',
    display: 'none',
  },
})

export const navClass = style({
  height: globalVars.height.header,
  paddingBottom: calc.multiply(vars.space.normal, 2),
  paddingTop: calc.multiply(vars.space.normal, 3),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  //position: 'sticky',
  background: vars.colors.bgPrimary,
})

export const navMenuIconContainer = style([
  sprinkles({
    display: ['flex', 'flex', 'flex'],
  }),
  {
    width: '3rem',
    zIndex: vars.zIndex.highest,
    height: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transitionDuration: '0.5s',
    transitionTimingFunction: globalVars.curve.easeOut,
    selectors: {
      '&::before': {
        content: '',
        display: 'block',
        position: 'absolute',
        top: '1rem',
        width: '100%',
        transitionDuration: '0.5s',
        transitionTimingFunction: globalVars.curve.easeOut,
        borderTop: ` 2px solid ${vars.colors.brand}`,
        color: vars.colors.brand,
      },
      '&::after': {
        content: '',
        position: 'absolute',
        bottom: '1rem',
        width: '100%',
        transitionDuration: '0.5s',
        transitionTimingFunction: globalVars.curve.easeOut,
        borderBottom: `2px solid ${vars.colors.brand}`,
      },
      '&.open::before': {
        transform: 'translate(8px,3px) rotate(45deg)',
        borderColor: vars.colors.bgPrimary,
        width: '60%',
        '@media': {
          [breakPoints.large]: {
            transform: 'translate(8px,3px) rotate(45deg)',
          },
        },
      },
      '&.open::after': {
        transform: 'translate(8px,-3px) rotate(-45deg)',
        borderColor: vars.colors.bgPrimary,
        width: '60%',
      },
      '&.open': {
        transform: 'rotate(180deg)',
        position: 'fixed',

        //top: '1.5rem',
        left: calc.add(vars.space.normal, '.5rem'),
        '@media': {
          [breakPoints.large]: {
            transform: 'rotate(270deg)',
            left: calc.subtract('50vw', '600px'),
          },
        },
      },
    },
  },
])
export const navMenuIconClass = style([
  {
    borderBottom: `2px solid ${vars.colors.brand}`,
    width: '100vw',
    height: '0px',
    selectors: {
      '&.open': {
        borderBottom: ` 1px solid ${vars.colors.bgPrimary}`,
        color: vars.colors.bgPrimary,
      },
    },
  },
])

export const navAddendumClass = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
})

export const navLeft = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
})

export const navMenuList = style([
  sprinkles({
    flexDirection: ['column', 'column', 'column'],
    position: ['fixed', 'fixed', 'relative'],
    background: ['brand', 'brand', 'brand'],
  }),
  {
    display: 'flex',
    position: 'relative',
    gap: '1.5rem',
    width: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    selectors: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '@media': {
      [breakPoints.large]: {
        ...bodyWidthRule,
        paddingInline: calc.multiply(vars.space.l, 3),
      },
    },
  },
])

export const navMenu = style([
  sprinkles({
    flexDirection: ['column', 'column', 'column'],
    position: ['fixed', 'fixed', 'fixed'],
    background: ['brand', 'brand', 'brand'],
  }),
  {
    paddingTop: calc.multiply(globalVars.height.header, 2),
    paddingInline: vars.space.l,
    paddingBottom: vars.space.l,
    maxWidth: '30rem',
    display: 'flex',
    gap: '15px',
    zIndex: vars.zIndex.high,
    transition: '0.5s ease-in-out',
    transform: 'translate(0,0)',
    selectors: {
      '&.closed': {
        transform: 'translate(-100%,0)',
      },
    },
    height: '100vh',
    overflow: 'auto',
    top: '0px',
    left: '0px',
    width: '80%',
    '@media': {
      [breakPoints.large]: {
        width: '100%',
        maxWidth: '100%',
        selectors: {
          '&.closed': {
            transform: 'translate(0,-100%)',
          },
        },
      },
    },
  },
])

export const navMenuItem = style({
  cursor: 'pointer',
  color: vars.colors.card,
  selectors: {
    '&.desktop': {
      display: 'none',
    },
    '&.disabled': {
      display: 'none',
    },
  },
  '@media': {
    [breakPoints.desktop]: {
      selectors: {
        '&.desktop': {
          // currently making menu on mobile and desktop as same.
          display: 'none',
        },
      },
    },
  },
})

export const navMenuItemTitle = style({
  color: vars.colors.card,
})

export const navLogo = style({
  selectors: {
    '&.mobile': {
      '@media': {
        [breakPoints.large]: {
          display: 'none',
        },
      },
    },

    '&.desktop': {
      display: 'none',
      '@media': {
        [breakPoints.large]: {
          display: 'block',
          position: 'relative',
        },
      },
    },
  },
})
