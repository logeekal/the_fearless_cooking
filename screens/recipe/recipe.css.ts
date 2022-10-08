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

export const recipeCategories = style({
  marginBottom: vars.space.normal,
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space.xs,
  color: vars.colors.brand,
})
