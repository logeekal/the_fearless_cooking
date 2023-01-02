import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

export const footer = style({
  background: 'transparent',
  paddingInline: '12.5%',
  paddingBlock: vars.space.normal,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.normal,

  '@media': {
    [breakPoints.desktop]: {
      display: 'flex',
      flexDirection: 'row',
      gap: vars.space.l,
    },
  },
})

export const footerLogo = style({
  padding: vars.space.l,
})

export const footerCTA = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px',
  gap: calc.multiply(vars.space.l, 1),
})
