import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const faq = style({
  background: vars.colors.yellowLight,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.s,
  color: vars.colors.text,
  marginBottom: vars.space.normal,
})

export const faqAnswer = style({
  marginTop: vars.space.s,
})
