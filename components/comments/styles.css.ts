import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars } from '../../styles/themes.css'

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

  ':hover': {
    cursor: 'pointer',
    backgroundColor: vars.colors.yellowLight,
  },

  ':active': {
    backgroundColor: vars.colors.yellowLight,
  },

  ':focus': {
    backgroundColor: vars.colors.yellowLight,
  },
})

export const commentEditorClass = style({
  position: 'relative',
  border: `1px solid ${vars.colors.lightgray}`,
  padding: vars.space.normal,
  paddingBottom: calc.multiply(vars.space.normal, 3),
  minHeight: '150px',
})

export const submitButton = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.s,
  backgroundColor: vars.colors.brand,
  width: '100%',
  color: vars.colors.card,
  paddingBlock: vars.space.s,
  paddingInline: vars.space.normal,
  height: '48px',
  minWidth: '100px',
  cursor: 'pointer',
})
