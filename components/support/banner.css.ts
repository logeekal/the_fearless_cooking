import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const support = style({
  paddingInline: '12.5%',
  paddingBlock: vars.space.normal,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
  background: vars.colors.yellowLight,
})

export const supportContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
  background: vars.colors.yellowLight,
})
