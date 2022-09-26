import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const recipeCategories = style({
  marginBottom: vars.space.normal,
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space.xs,
  color: vars.colors.brand,
})
