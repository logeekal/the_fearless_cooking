import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars } from '../../styles/themes.css'
import { colFlex, rowFlex } from '../../styles/vars.css'

export const commentRepliesContainer = style({
  ...colFlex,
  gap: vars.space.s,
})

export const singleCommentContainerStyle = style({
  backgroundColor: vars.colors.card,
  paddingBlock: calc.multiply(vars.space.s, 1),
  paddingInline: vars.space.s,
  ...colFlex,
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: vars.space.s,
})

export const commentHeader = style({
  ...rowFlex,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: vars.space.s,
  width: '100%',
  maxHeight: '10rem',
})

export const commentHeaderLeft = style({
  flex: '1 1 70%',
  ...colFlex,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: '100%',
  paddingBlock: vars.space.xs,
})

export const commentHeaderRight = style({
  flex: '1 1 30%',
  height: '100%',
  ...colFlex,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  gap: vars.space.xs,
})

export const commentHeaderName = style({
  fontSize: vars.fontSize.para,
  fontWeight: 700,
  color: vars.colors.text,
})

export const commentHeaderReplies = style({
  fontSize: vars.fontSize.subHeading,
  color: vars.colors.textSecondary,
  fontWeight: 700,
  ...rowFlex,
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: vars.space.xs,
  textAlign: 'start',
  cursor: 'pointer',
})

export const commentHeaderBody = style({
  fontSize: vars.fontSize.para,
  color: vars.colors.text,
  fontWeight: 500,
})

export const commentHeaderDate = style({
  fontSize: vars.fontSize.subText,
  color: 'darkgray',
  fontWeight: 500,
})

export const repliesContainer = style({
  marginLeft: calc.multiply(vars.space.l, 3),
  ...colFlex,
  gap: vars.space.s,
})
