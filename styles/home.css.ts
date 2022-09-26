import { style } from '@vanilla-extract/css'

import { vars } from '../styles/themes.css'

export const styleClass = style({
  background: vars.colors.bgPrimary,
  color: vars.colors.text,
  fontFamily: vars.font.normal,
  fontWeight: 400,
})
