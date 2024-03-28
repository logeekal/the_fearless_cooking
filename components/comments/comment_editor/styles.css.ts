import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints } from '../../../styles/breakpoints.css'
import { vars } from '../../../styles/themes.css'

export const toolbarControlClass = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: vars.colors.card,
  width: '100%',
})

export const toolbarIconClass = style({
  paddingInline: vars.space.s,
  paddingBlock: vars.space.s,
  display: 'inline-grid',
  placeItems: 'center',
  maxHeight: '48px',
  height: '40px',
  width: '40px',
  '@media': {
    [breakPoints.mobile]: {
      height: '35px',
      width: '35px',
    },
  },

  selectors: {
    '.active.&': {
      backgroundColor: vars.colors.yellowLight,
    },
  },

  ':hover': {
    cursor: 'pointer',
    backgroundColor: vars.colors.yellowLight,
  },

  ':active': {
    backgroundColor: vars.colors.yellowLight,
  },

  ':focus': {
    backgroundColor: vars.colors.yellowLight,
    outline: `1px solid ${vars.colors.brand}`,
  },
})

export const commentEditorClass = style({
  position: 'relative',
  // border: `1px solid ${vars.colors.brand}`,
  padding: vars.space.normal,
  paddingBottom: calc.multiply(vars.space.normal, 4),
  backgroundColor: vars.colors.greenLight,
  minHeight: '150px',
})
