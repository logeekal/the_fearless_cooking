import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const socialShareTooltip = style({
  background: vars.colors.card,
  zIndex: vars.zIndex.highest,
  boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.2)',
  border: '0px solid black',
  borderRadius: '5px',
  paddingInline: vars.space.s,
  paddingBlock: vars.space.s,
})

export const socialListContainer = style({
  listStyleType: 'none',
  padding: '0px',
})

export const socialListEl = style({
  marginBottom: 1,
  padding: '0px',
  selectors: {
    '&:hover': {
      color: vars.colors.brand,
    },
  },
})

export const socialElLink = style({
  color: vars.colors.text,
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:hover': {
      color: vars.colors.brand,
    },
  },
})

export const socialSharePopup = style({
  background: vars.colors.brand,
  visibility: 'hidden',
  position: 'absolute',
  width: '8px',
  height: '8px',
  selectors: {
    '&::after': {
      position: 'absolute',
      width: '8px',
      height: '8px',
      background: 'inherit',
      boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.2)',
      border: '0px solid black',
      visibility: 'visible',
      zIndex: vars.zIndex.highest,
      content: '""',
      transform: 'rotate(45deg)',
    },
  },
})
