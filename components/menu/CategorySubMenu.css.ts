import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'
import { globalVars } from '../../styles/vars.css'

export const categoryTitle = style({
  color: globalVars.colors.gray.normal,
  fontSize: vars.fontSize.heading,
})

export const categoryMenuItems = style({
  fontSize: vars.fontSize.para,
  textDecoration: 'none',
  textTransform: 'none',
})

export const categoryMenuText = style({
  color: vars.colors.bgPrimary,
  marginBlock: vars.space.xs,
})

export const categoryContainer = style({
  paddingTop: vars.space.l,
})
