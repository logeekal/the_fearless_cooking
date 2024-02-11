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

export const FAQSection = style({
  '@media': {
    'screen and (max-width: 1000px)': {
      ...bodyWidthRule,
    },
  },
})

export const commentSection = style({
  '@media': {
    'screen and (max-width: 1000px)': {
      ...bodyWidthRule,
    },
  },
})

export const recipeCategories = style({
  marginBottom: vars.space.normal,
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
