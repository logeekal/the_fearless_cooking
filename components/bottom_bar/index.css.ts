import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { colFlex, rowFlex } from '../../styles/vars.css'

export const bottomBar = style({
  display: 'none',
  position: 'fixed',
  width: '100vw',
  minHeight: '10px',
  background: vars.colors.card,
  bottom: 0,
  paddingBlock: vars.space.normal,
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  paddingInline: vars.space.l,
  borderTop: '2px solid green',
  boxShadow: '0px -5px 15px 5px rgba(0,0,0,0.2)',
  '@media': {
    [breakPoints.mobile]: {
      ...rowFlex,
      justifyContent: 'space-between',
      gap: vars.space.normal,
    },
    [breakPoints.desktop]: {
      display: 'none',
    },
  },
})

export const bottomBarSection = style({
  ...colFlex,
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.xs,
  cursor: 'pointer',
  color: vars.colors.brand,
})

export const icon = style({
  selectors: {
    '.selected &': {
      color: vars.colors.greenLight,
    },

    '.disabled &': {
      color: vars.colors.textSecondary,
      opacity: 0.5,
    },
  },
})

export const text = style({
  selectors: {
    '.disabled &': {
      color: vars.colors.textSecondary,
      opacity: 0.5,
    },
  },
})
