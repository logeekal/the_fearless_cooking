import { keyframes, style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { colFlex, rowFlex } from '../../styles/vars.css'

export const form = style({
  ...colFlex,
  gap: vars.space.s,
  marginBottom: vars.space.normal,
  marginTop: vars.space.l,
})

export const fieldSet = style({
  ...colFlex,
  gap: vars.space.s,
  '@media': {
    [breakPoints.desktop]: {
      ...rowFlex,
      justifyContent: 'space-between',
      gap: vars.space.s,
      flexGrow: 1,
      alignItems: 'center',
    },
  },
})

export const field = style({
  position: 'relative',
  width: '100%',
  '@media': {
    [breakPoints.desktop]: {
      width: '50%',
    },
  },
})

export const input = style({
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.s,
  width: '100%',
  // border: `1px solid ${vars.colors.brand}`,
  backgroundColor: vars.colors.greenLight,
})

export const label = style({
  position: 'absolute',
  transition: 'all .2s ease-out',
  top: '50%',
  left: vars.space.s,
  transform: 'translateY(-50%)',
  selectors: {
    'input:focus+&,input.populated+&': {
      opacity: 0,
      visibility: 'hidden',
      transform: 'translateY(-50%)',
    },
  },
})

export const submitButton = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.s,
  backgroundColor: vars.colors.brand,
  width: '100%',
  color: vars.colors.card,
  paddingBlock: vars.space.s,
  paddingInline: vars.space.normal,
  height: '40px',
  '@media': {
    [breakPoints.mobile]: {
      height: '35px',
    },
  },
  minWidth: '100px',
  cursor: 'pointer',
  transition: 'transform .2s ease-out',
  selectors: {
    '&:focus:not([disabled])': {
      transform: 'scale(1.1)',
    },
    '&:hover:not([disabled])': {
      transform: 'scale(1.1)',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: vars.colors.lightgray,
    },
  },
})

export const ratingFieldsContainer = style({
  ...colFlex,
  gap: vars.space.s,
  width: '100%',
  paddingInline: vars.space.s,
})

export const ratingFieldsWidgetContainer = style({
  ...colFlex,
  width: '100%',
  gap: vars.space.xs,
  justifyContent: 'center',
})

export const ratingFieldsWidget = style({
  width: '100%',
})

export const ratingFieldsWidgetLabel = style({
  width: '100%',
  display: 'grid',
  justifyContent: 'center',
  '@media': {
    [breakPoints.desktop]: {
      display: 'none',
    },
  },
})

export const ratingComponent = style({
  ...rowFlex,
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

export const commentEditorContainer = style({
  selectors: {
    '&.error': {
      border: '1px solid red',
    },
  },
})

export const errorContainer = style({
  backgroundColor: vars.colors.yellowLight,
  // backgroundColor: '#970d02',
  ...rowFlex,
  gap: vars.space.s,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingBlock: vars.space.s,
  paddingInline: vars.space.normal,
  color: 'red',
})

const loadingAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})
export const loadingIcon = style({
  animationName: loadingAnimation,
  animationDuration: '1s',
  animationIterationCount: 'infinite',
})
