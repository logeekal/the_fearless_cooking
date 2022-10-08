import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'
import { globalVars, rowFlex } from '../../styles/vars.css'

const checkboxColor = vars.colors.brand

export const checkboxContainer = style({
  ...rowFlex,
  width: '100%',
  gap: vars.space.s,
  marginInlineStart: 0,
})

export const checkboxInput = style({
  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  width: '20px',
  height: '20px',
  minWidth: '20px',
  borderRadius: '4px',
  border: ` 1px solid ${checkboxColor}`,
  position: 'relative',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '12px',
      height: '12px',
      borderRadius: '2px',
      background: vars.colors.brand,
      opacity: 0,
      transition: `all 0.3s ${globalVars.curve.easeOut}`,
    },
    '&:checked::after': {
      opacity: 0.7,
    },
  },
})

export const crossPath = style({
  strokeDasharray: 200,
  strokeDashoffset: 200,
  transition: '0.5s all',
  selectors: {
    [`${checkboxInput}:checked + label svg g &`]: {
      strokeDashoffset: 0,
    },
  },
})

export const label = style({
  position: 'relative',
  transition: `all .5s ${globalVars.curve.easeOut}`,
  selectors: {
    [`${checkboxInput}:checked + &`]: {
      textDecoration: 'line-through',
      textDecorationThickness: '2px',
      textDecorationColor: vars.colors.textSecondary,
      color: `${vars.colors.lightgray}`,
    },
  },
})

export const svg = style({
  position: 'absolute',
  left: '-15px',
})
