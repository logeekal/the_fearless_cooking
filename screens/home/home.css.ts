import { style } from '@vanilla-extract/css'

import { bodyWidthRule, BREAKPOINTS } from '../../styles/vars.css'

export const homeContainerClass = style({
  '@media': {
    [`screen and (max-width : ${BREAKPOINTS.large.min}px)`]: {
      ...bodyWidthRule,
    },
  },
})
