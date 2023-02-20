import { style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

const gridGapMobile = vars.space.s

export const cardContainer = style({
  maxWidth: calc.divide(calc.subtract('100%', gridGapMobile), 2),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  //boxShadow: '1px 2px 3px 5px rgba(0,0,0,0.1)',
  background: vars.colors.card,
  position: 'relative',
  paddingBottom: calc.multiply(vars.space.s, 2),
})

export const cardArticle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.s,
  padding: vars.space.s,
  marginBottom: vars.space.s,
})

export const cardImageContainer = style({
  backgroundColor: vars.colors.greenLight,
  position: 'relative',
  width: '100%',
  paddingBlockEnd: '66.67%',
})

export const cardImage = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '10px',
  opacity: 0,
  transition: 'opacity 0.5s ease-in-out',
  selectors: {
    '&.lazyloaded': {
      opacity: 1,
    },
  },
})

export const cardExcerpt = style({
  display: 'none',
  '@media': {
    [breakPoints.desktop]: {
      display: 'block',
    },
  },
})

export const footer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: calc.subtract('100%', calc.multiply(vars.space.s, 2)),
  fontSize: vars.fontSize.subText,
  color: vars.colors.brand,
  position: 'absolute',
  bottom: vars.space.s,
})

export const footerLeft = style({
  display: 'inline-flex',
  flexDirection: 'row',
  gap: calc.divide(vars.space.xs, 2),
})

export const footerRight = style({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
})

export const cardTitle = style({
  fontSize: vars.fontSize.subHeading,
  cursor: 'pointer',
  lineHeight: '1.65rem',
  '@media': {
    [breakPoints.tablet]: {
      fontSize: vars.fontSize.para,
      lineHeight: '2rem',
    },
    [breakPoints.desktop]: {
      fontSize: vars.fontSize.para,
      lineHeight: '2rem',
    },
  },
})

export const cardCategory = style({
  color: vars.colors.brand,
})
