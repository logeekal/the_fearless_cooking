import { style } from '@vanilla-extract/css'

import { sprinkles } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

export const recipeCard = style({
  width: '100%',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  backgroundColor: vars.colors.card,
  fontWeight: 400,
})

export const recipeCardHeader = style({
  background:
    'linear-gradient(80.54deg, rgba(51, 126, 255, 0.33) 0%, rgba(255, 50, 124, 0.33) 99.47%)',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
])

export const recipeCardTitle = style({
  width: '60%',
  textAlign: 'center',
  margin: '0 auto',
})

export const recipeCardSubTitle = style([
  {
    color: 'secondary',
    fontStyle: 'italic',
    margin: '0 auto',
    width: '60%',
    textAlign: 'center',
  },
])

export const recipeCardDetails = style([
  sprinkles({
    paddingY: [0, 0, 1],
    paddingX: [0, 0, 1],
  }),
  {
    display: 'flex',
    flexWrap: 'wrap',
  },
])

export const recipeCardBody = style([
  sprinkles({}),
  {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    marginInline: vars.space.xs,
    paddingRight: vars.space.normal,
  },
])

export const recipeCardIngredients = style([
  sprinkles({}),
  {
    flex: '1 1 30%',
    marginBlock: vars.space.normal,
    fontFeatureSettings: '"cv05" on, "cv06" on, "kern" off',
    minWidth: '200px',
  },
])

export const recipeCardIngredientsTitle = style({
  fontFamily: vars.font.cursive,
  fontSize: vars.fontSize.heading,
  color: vars.colors.brand,
  fontWeight: 400,
  margin: '0px',
})
