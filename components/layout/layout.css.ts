import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { bodyWidthRule } from '../../styles/vars.css'

export const layoutClass = style({
  //padding: vars.space.normal,
  background: vars.colors.bgPrimary,
  width: '100%',
})

export const footerBy = style({
  background: vars.colors.brand,
  color: vars.colors.card,
  width: '100%',
  paddingBlock: vars.space.s,
})

export const mainContent = style({
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [breakPoints.large]: {
      ...bodyWidthRule,
      display: 'flex',
      flexDirection: 'row',
      gap: vars.space.l,
      marginTop: vars.space.l,
    },
  },
})
