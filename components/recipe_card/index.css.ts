import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints, sprinkles } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { checkboxInput } from '../checkbox/index.css'

export const recipeCard = style({
  color: vars.colors.text,
  width: '100%',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  backgroundColor: vars.colors.card,
  fontWeight: 400,
  padding: vars.space.normal,
  border: `1px solid ${vars.colors.brand}`,
  marginBottom: vars.space.l,
})

export const recipeCardHeader = style({
  background: 'transparent',
  //background:
  //'linear-gradient(80.54deg, rgba(51, 126, 255, 0.33) 0%, rgba(255, 50, 124, 0.33) 99.47%)',
  minHeight: '200px',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

export const recipeCardLabel = style([
  {
    position: 'absolute',
    backgroundColor: 'bgCard',
    fontWeight: 600,
    fontSize: [1, 3],
    left: '0px',
    top: '0px',
    width: '100%',
    display: 'block',
    margin: '0 auto',
    textAlign: 'center',
    transformOrigin: 'center',
    transform: 'translate(-40%, 50%) rotate(-45deg)',
    boxShadow: '1px 1px 10px 2px rgba(0,0,0,0.3) ',
  },
])

export const recipeCardContentHeader = style([
  {
    width: '100%',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: vars.space.normal,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
])

export const recipeCardTitle = style({
  width: '100%',
  textAlign: 'left',
  margin: '0 auto',
})

export const recipeCardSubTitle = style([
  {
    color: vars.colors.brand,
    width: '100%',
  },
])

export const recipeCardDetails = style({
  display: 'grid',
  gridTemplateColumns: '140px 140px',
  gap: '1px',
  borderRadius: vars.colors.brand,
  position: 'relative',
  marginBottom: '17px',
  '@media': {
    [breakPoints.desktop]: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
})

export const recipeCardLogo = style({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60px',
  height: '60px',
  borderRadius: vars.border.circular,
  backgroundColor: vars.colors.bgPrimary,
  padding: '6px',
  display: 'grid',
  placeItems: 'center',
})

export const recipeCardDetail = style({
  width: '140px',
  backgroundColor: vars.colors.brand,
  color: vars.colors.card,
  paddingInline: vars.space.normal,
  paddingBlock: vars.space.l,
  fontSize: vars.fontSize.heading,
  selectors: {
    '&:nth-child(1)': {
      borderTopLeftRadius: vars.border.normal,
      marginRight: '1px',
      marginBottom: '1px',
    },
    '&:nth-child(2)': {
      borderTopRightRadius: vars.border.normal,
      marginBottom: '1px',
      '@media': {
        [breakPoints.desktop]: {
          borderTopRightRadius: '0px',
        },
      },
    },

    '&:nth-child(3)': {
      borderBottomLeftRadius: vars.border.normal,
      marginRight: '1px',
      '@media': {
        [breakPoints.desktop]: {
          borderBottomLeftRadius: '0px',
          marginLeft: '1px',
        },
      },
    },
    '&:nth-child(4)': {
      borderBottomRightRadius: vars.border.normal,
    },
  },
})

export const recipeCardDetailValue = style({
  fontSize: vars.fontSize.heading,
  textAlign: 'center',
  fontWeight: 300,
  paddingBottom: vars.space.normal,
})

export const recipeCardDetailLabel = style({
  textAlign: 'center',
  fontWeight: 500,
})

export const recipeCategories = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

export const recipeCardCatDetails = style({
  display: 'flex',
  gap: vars.space.xs,
})

export const recipeCardBody = style({
  display: 'flex',
  flexDirection: 'row',
  flex: '1 1 auto',
  gap: vars.space.l,
  marginInline: vars.space.xs,
  paddingRight: vars.space.normal,
  '@media': {
    [breakPoints.tablet]: {
      flexDirection: 'column',
      gap: vars.space.l,
    },
  },
})

export const recipeCardIngredients = style([
  sprinkles({}),
  {
    flex: '1 1 30%',
    fontFeatureSettings: '"cv05" on, "cv06" on, "kern" off',
    minWidth: '300px',
    maxWidth: '350px',
  },
])

export const recipeIngredientSectionTitle = style({
  fontWeight: 600,
  marginBlockEnd: vars.space.normal,
})

export const recipeCardBodyTitle = style({
  fontFamily: vars.font.cursive,
  fontSize: calc.multiply(vars.fontSize.heading, 1.5),
  color: vars.colors.brand,
  fontWeight: 400,
  margin: '0px',
  marginBottom: vars.space.l,
})

export const recipeLists = style({
  listStyle: 'square',
  marginBlock: vars.space.normal,
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
})

export const recipeListDetail = style({
  display: 'inline-block',
})

export const recipeInstructionListItem = style({
  whiteSpace: 'normal',
})

export const recipeInstructionNotes = style({
  color: vars.colors.brand,
  selectors: {
    [`${checkboxInput}:checked + label &`]: {
      color: vars.colors.lightgray,
    },
  },
})
