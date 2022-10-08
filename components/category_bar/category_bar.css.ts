import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

export const avatarContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.s,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: vars.fontSize.subText,
  scrollBehavior: 'smooth',
  color: vars.colors.text,
  [breakPoints.desktop]: {
    justifyContent: 'space-evenly',
    backgroundColor: vars.colors.card,
  },
})

export const categoryAvatar = style({
  width: '50px',
  height: '50px',
  display: 'grid',
  placeItems: 'center',
  borderRadius: vars.border.circular,
  background: vars.colors.greenLight,
  outlineColor: vars.colors.brand,
  boxShadow: '1px 3px 8px 1px rgba(0,0,0,0.2)',
  '@media': {
    [breakPoints.tablet]: {
      width: '80px',
      height: '80px',
    },
    [breakPoints.desktop]: {
      width: '80px',
      height: '80px',
    },
  },
  /*
   *outlineOffset: '2px',
   *outlineWidth: 'thin',
   *outlineStyle: 'dashed',
   */
})

export const categoryAvatarImg = style({
  width: '30px',
  aspectRatio: '1/1',
  '@media': {
    [breakPoints.tablet]: {
      width: '50px',
    },
    [breakPoints.desktop]: {
      width: '50px',
    },
  },
})

export const categoryContainer = style({
  paddingBlock: vars.space.s,
  //backgroundColor: vars.colors.card,
  //boxShadow:
  //'inset 3px 3px 20px 1px rgba(0,0,0,0.2),\
  //inset 3px -3px 20px 1px rgba(0,0,0,0.2)',
})

export const categoryText = style({
  fontSize: vars.fontSize.subText,
  '@media': {
    [breakPoints.desktop]: {
      fontSize: vars.fontSize.para,
    },
  },
})

export const categories = style({
  overflow: 'scroll',
  display: 'inline-flex',
  flexDirection: 'row',
  width: '100%',
  scrollbarWidth: 'none',
  paddingTop: vars.space.s,
  //justifyContent: 'space-between',
  gap: vars.space.l,
  paddingInline: vars.space.normal,
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '@media': {
    [breakPoints.tablet]: {
      justifyContent: 'space-between',
    },
    [breakPoints.desktop]: {
      justifyContent: 'space-evenly',
    },
  },
})
