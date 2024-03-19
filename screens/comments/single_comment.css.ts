import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars } from '../../styles/themes.css'
import { rowFlex } from '../../styles/vars.css'

export const singleCommentContainerStyle = style({
  backgroundColor: vars.colors.card,
  paddingBlock: calc.multiply(vars.space.normal, 2),
  paddingInline: vars.space.l,
})

export const commentHeader = style({
  ...rowFlex,
  justifyContent: 'space-between',
  alignItems: 'center',
})
