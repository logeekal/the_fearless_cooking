import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'
import { bodyWidthRule } from '../../styles/vars.css'

export const recipeContainer = style({
  color: vars.colors.text,
})

export const recipePost = style({
  color: vars.colors.text,
  '@media': {
    'screen and (max-width: 1000px)': {
      ...bodyWidthRule,
    },
  },
})

export const recipePostHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
  alignItems: 'flex-start',
  justifyContent: 'center',
})

export const recipeMeta = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.xs,
})

export const FAQSection = style({
  '@media': {
    'screen and (max-width: 1000px)': {
      ...bodyWidthRule,
    },
  },
})

export const recipeCategories = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space.xs,
  color: vars.colors.brand,
  flexWrap: 'wrap',
})

export const featuredImageContainer = style({
  position: 'relative',
  width: '100%',
  paddingBottom: '56.25%', // 9/16 of width
  backgroundColor: vars.colors.greenLight,
})

export const featuredImageSquareContainer = style({
  position: 'relative',
  width: '100%',
  paddingBottom: '100%', // 9/16 of width
  backgroundColor: vars.colors.greenLight,
})

export const pageFreeCookbookContainer = style({
  paddingBlock: vars.space.normal,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
