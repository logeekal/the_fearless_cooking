import { globalFontFace, globalStyle } from '@vanilla-extract/css'

import { vars } from './themes.css'

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Bold.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 700,
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-SemiBold.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 600,
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Medium.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 500,
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Regular.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 400,
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Light.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 300,
})

globalFontFace('bilbo', {
  src: 'url(/fonts/bilbo-swash-caps/BilboSwashCaps-Regular.ttf)',
  fontStyle: 'normal',
  fontWeight: 300,
})

globalStyle('html', {
  fontFamily: 'quicksand',
})

// css RESET
globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  border: 0,
  outline: 0,
  background: 'transparent',
})

globalStyle(':root', {
  fontSize: '62.5%',
})

globalStyle('body', {
  fontSize: '1.6rem',
})

globalStyle('li', {
  listStyle: 'none',
})

globalStyle('h1', {
  marginBlock: vars.space.l,
})

globalStyle('h2', {
  fontSize: vars.fontSize.heading,
})

globalStyle('.upper', {
  textTransform: 'uppercase',
})

globalStyle('a', {
  textDecoration: 'none',
  color: vars.colors.brand,
})

globalStyle('btn', {
  cursor: 'pointer',
})

globalStyle('p', {
  fontSize: vars.fontSize.para,
})

globalStyle('.cursive', {
  fontFamily: vars.font.cursive,
})

globalStyle('.cursive.heading', {
  fontFamily: vars.font.cursive,
  fontSize: vars.fontSize.cursiveHeading,
  color: vars.colors.textSecondary,
})

globalStyle('.text_center', {
  textAlign: 'center',
})

globalStyle('.grid_center', {
  display: 'grid',
  placeItems: 'center',
})

globalStyle('section', {
  paddingBlock: vars.space.l,
})
