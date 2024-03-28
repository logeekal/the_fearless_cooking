import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { vars } from '../../styles/themes.css'
import { colFlex, rowFlex } from '../../styles/vars.css'

export const commentRepliesContainer = style({
  ...colFlex,
  // gap: vars.space.s,
  maxWidth: '400px',
  backgroundColor: vars.colors.card,
  position: 'relative',
  selectors: {
    '&:not(:last-child)': {
      // borderBottom: `1px solid ${vars.colors.brand}`,
    },
  },
})

export const singleCommentContainerStyle = style({
  paddingBlock: vars.space.l,
  paddingInline: vars.space.l,
  ...colFlex,
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: vars.space.l,
  // borderRadius: '10px',
  position: 'relative',
  selectors: {
    '&.leaf': {
      marginLeft: calc.multiply(vars.space.l, 1.5),
      borderLeft: `1px solid ${vars.colors.greenLight}`,
    },
    '&.leaf::after': {
      content: '',
      position: 'absolute',
      top: '50%',
      left: vars.space.l,
      width: vars.space.l,
      borderLeft: `1px solid ${vars.colors.brand}`,
      display: 'block',
      zIndex: vars.zIndex.highest,
    },

    '&:not(:last-child)': {
      // borderBottom: `1px solid ${vars.colors.brand}`,
    },
  },
})

export const commentHeader = style({
  ...rowFlex,
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space.s,
  width: '100%',
  maxHeight: '10rem',
})

export const commentHeaderLeft = style({
  flex: '1 1 70%',
  ...colFlex,
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '100%',
  paddingBlock: vars.space.xs,
})

export const commentActions = style({
  flex: '1 1 30%',
  height: '100%',
  ...rowFlex,
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space.xs,
  width: '100%',
})

export const commentActionsLeft = style({
  ...rowFlex,
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.s,
})

export const commentActionsRight = style({
  ...rowFlex,
  flexDirection: 'row-reverse',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.s,
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
  fontSize: vars.fontSize.subHeading,
  color: vars.colors.text,
  fontWeight: 400,
  width: '100%',
})

export const commentHeaderDate = style({
  fontSize: vars.fontSize.subText,
  color: 'darkgray',
  fontWeight: 400,
  whiteSpace: 'nowrap',
})

export const repliesContainer = style({
  ...colFlex,
  gap: vars.space.s,
  position: 'relative',
  selectors: {
    /// comment hierarchy marker
    '&::after': {
      content: '',
      position: 'absolute',
      top: '0',
      left: vars.space.xl,
      height: '100%',
      borderLeft: `0px solid ${vars.colors.greenLight}`,
      display: 'block',
      zIndex: vars.zIndex.highest,
    },
  },
})
