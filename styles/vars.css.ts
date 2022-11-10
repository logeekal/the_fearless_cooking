import { StyleRule } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars } from './themes.css'

export const globalVars = {
  height: {
    header: '5rem',
  },
  curve: {
    easeOut: 'cubic-bezier(.22,.61,.36,1)',
  },
  colors: {
    gray: {
      normal: 'rgba(255,255,255,.5)',
    },
  },
}

export const BREAKPOINTS = {
  mobile: {
    max: 430,
  },
  tablet: {
    max: 768,
  },
  desktop: {
    min: 768,
    max: 1000,
  },
  large: {
    min: 1000,
  },
}

export const bodyWidthRule: StyleRule = {
  maxWidth: '1200px',
  margin: '0 auto',
  width: calc.subtract('100vw', calc.multiply(vars.space.l, 2)),
}

export const rowFlex: StyleRule = {
  display: 'flex',
  flexDirection: 'row',
}

export const colFlex: StyleRule = {
  display: 'flex',
  flexDirection: 'column',
}

export const flexCenter: StyleRule = {
  justifyContent: 'center',
  alignItems: 'center',
}
