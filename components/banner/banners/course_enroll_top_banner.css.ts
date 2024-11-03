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
  gap: vars.space.normal,
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: vars.space.xl,
})
