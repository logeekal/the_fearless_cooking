import { ComplexStyleRule, style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'
import { colFlex, rowFlex } from '../../styles/vars.css'

export const form = style({
  ...colFlex,
  gap: vars.space.s,
  marginBottom: vars.space.normal,
  marginTop: vars.space.l,
})

export const fieldSet = style({
  ...rowFlex,
  justifyContent: 'space-between',
  gap: vars.space.s,
  flexGrow: 1,
  alignItems: 'center',
})

export const field = style({
  position: 'relative',
  width: '50%',
})

export const input = style({
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.s,
  width: '100%',
  border: `1px solid ${vars.colors.brand}`,
  ':invalid': { borderBottom: '2px solid red' },
})

export const label = style({
  position: 'absolute',
  transition: 'all .2s ease-out',
  top: '50%',
  left: vars.space.s,
  transform: 'translateY(-50%)',
  'input:focus+&,input.populated+&': {
    top: '-25px',
    left: 0,
    transform: 'translateY(0)',
    fontSize: vars.fontSize.subHeading,
  },
} as ComplexStyleRule)
