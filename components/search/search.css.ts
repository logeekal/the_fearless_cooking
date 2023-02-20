import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { colFlex, rowFlex } from '../../styles/vars.css'

export const searchContainer = style({
  width: '100%',
  borderTopLeftRadius: vars.border.normal,
  borderTopRightRadius: vars.border.normal,
  background: vars.colors.card,
  height: '85vh',
  maxWidth: '500px',
  position: 'absolute',
  bottom: 0,
  left: '50%',
  paddingInline: vars.space.normal,
  transform: 'translate(-50%,0%)',
  '@media': {
    [breakPoints.desktop]: {
      borderRadius: vars.border.normal,
      top: '25%',
      left: '50%',
      bottom: 'auto',
      width: '600px',
      height: 'auto',
      minHeight: '400px',
      maxHeight: '500px',
      transform: 'translate(-50%,0%)',
    },
  },
})

export const searchInputLabel = style({
  transform: 'rotateY(180deg)',
})

export const searchInputContainer = style({
  marginBlock: vars.space.normal,
  height: '6rem',
  ...rowFlex,
  alignItems: 'center',
  gap: vars.space.normal,
  position: 'relative',
  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      left: 0,
      display: 'block',
      borderBottom: `1px solid ${vars.colors.brand}`,
    },
  },
})

export const searchInput = style({
  fontWeight: 400,
  fontSize: vars.fontSize.heading,
  color: vars.colors.textSecondary,
  width: '100%',
  selectors: {
    '&::placeholder': {
      color: vars.colors.lightgray,
    },
  },
})

export const comboboxOptionList = style({
  ...colFlex,
  gap: vars.space.s,
})

export const comboboxOption = style({
  transition: '0.2s ease-in-out',
  fontWeight: '600',
  paddingBlock: vars.space.normal,
  paddingInline: vars.space.normal,
  borderRadius: vars.border.normal,
  background: vars.colors.greenLight,
  border: '0px',
  ...rowFlex,
  alignItems: 'center',
  gap: vars.space.normal,
  color: vars.colors.textSecondary,
  cursor: 'pointer',
  selectors: {
    '&:last-child': {
      marginBottom: vars.space.normal,
    },
    '&.selected': {
      background: vars.colors.brand,
      color: vars.colors.text,
      filter: 'brightness(120%)',
    },
  },
})

export const searchResultImage = style({
  margin: '0 auto',
  display: 'block',
  width: '100%',
  maxWidth: '300px',
})

export const searchStartCTA = style({
  fontFamily: vars.font.cursive,
  fontSize: vars.fontSize.cursiveHeading,
  color: vars.colors.brand,
  margin: '0 auto',
  textAlign: 'center',
  padding: vars.space.s,
})

export const searchLoader = style({
  height: '50px',
  width: '100%',
  padding: vars.space.normal,
})

export const searchResultContainer = style({
  overflow: 'clip',
})
