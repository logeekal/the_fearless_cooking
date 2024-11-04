import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../../styles/breakpoints.css'
import { vars } from '../../../styles/themes.css'

export const courseEnrollTopBannerContainer = style({
  width: '100%',
  paddingBlock: vars.space.normal,
  paddingInline: vars.space.xl,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'column',
  backgroundColor: vars.colors.bgPrimary,
  gap: vars.space.s,
  '@media': {
    [breakPoints.desktop]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: vars.space.xl,
    },
  },
})

export const recipePageCourseEnrollContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: vars.space.xl,
})

export const recipePageFreeProductContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: vars.space.xl,
})

export const recipePageCourseFreeProductBannerTextContainer = style({
  border: '1px solid #7c6b59',
  padding: vars.space.normal,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
  borderBottomLeftRadius: vars.border.normal,
  borderBottomRightRadius: vars.border.normal,
  backgroundColor: vars.colors.card,
  justifyContent: 'center',
  alignItems: 'center',
})

export const recipePageCourseEnrollBannerTextContainer = style({
  border: `1px solid ${vars.colors.brand}`,
  padding: vars.space.normal,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.normal,
  borderBottomLeftRadius: vars.border.normal,
  borderBottomRightRadius: vars.border.normal,
  backgroundColor: vars.colors.bgPrimary,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopWidth: '0px',
})

export const recipePageCourseEnrollBannerImg = style({
  border: `1px solid ${vars.colors.brand}`,
  borderBottom: '0px',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: 'white',
})
