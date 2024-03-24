import './fonts/inter'

import { globalFontFace, globalStyle } from '@vanilla-extract/css'

import { breakPoints } from './breakpoints.css'
import { vars } from './themes.css'
import { bodyWidthRule } from './vars.css'

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/quicksand_bold.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 700,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/quicksand_semibold.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 600,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/quicksand_medium.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 500,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/quicksand_regular.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 400,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/quicksand_light.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 300,
  fontDisplay: 'swap',
})

globalFontFace('bilbo', {
  src: 'url(/fonts/bilbo-swash-caps/bilbo_swash_caps_regular.ttf)',
  fontStyle: 'normal',
  fontWeight: 300,
  fontDisplay: 'swap',
})

globalStyle('html', {
  fontFamily: 'inter',
})

// css RESET
globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  border: 0,
  outline: 0,
  background: 'transparent',
  lineHeight: '2.5rem',
  scrollBehavior: 'smooth',
  scrollMarginTop: '100px',
})

globalStyle(':root', {
  fontSize: '62.5%',
})

globalStyle('body', {
  color: vars.colors.text,
  fontSize: '1.6rem',
  lineHeight: '3rem',
})

globalStyle('li', {
  listStyle: 'none',
})

globalStyle('h1', {
  '@media': {
    [breakPoints.tablet]: {
      marginTop: vars.space.l,
    },
  },
  marginBottom: vars.space.xl,
  fontWeight: 600,
  fontSize: vars.fontSize.h1,
  lineHeight: vars.lineHeights.h1,
})

globalStyle('h2', {
  marginBlock: vars.space.xl,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  fontSize: vars.fontSize.h2,
  lineHeight: vars.lineHeights.h2,
})

globalStyle('h3', {
  marginBlock: vars.space.normal,
  fontWeight: 600,
  fontSize: vars.fontSize.h3,
  lineHeight: vars.lineHeights.h3,
  letterSpacing: '-0.02em',
})

globalStyle('h4', {
  marginBlockStart: vars.space.normal,
  fontSize: vars.fontSize.para,
})

globalStyle('.upper', {
  textTransform: 'uppercase',
})

globalStyle('a', {
  textDecoration: 'none',
  color: vars.colors.brand,
  fontWeight: 600,
})

globalStyle('.btn', {
  cursor: 'pointer',
})

globalStyle('p', {
  fontSize: vars.fontSize.para,
})

globalStyle('p.subtext', {
  fontSize: vars.fontSize.subText,
})

globalStyle('p.heading', {
  fontSize: vars.fontSize.heading,
})

globalStyle('p.subheading', {
  fontSize: vars.fontSize.subHeading,
})

globalStyle('.bold', {
  fontWeight: 500,
})

globalStyle('.heavy-bold', {
  fontWeight: 700,
})

globalStyle('.brand', {
  color: vars.colors.brand,
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

globalStyle('hr.saperator', {
  width: '100%',
  border: `0.2px solid ${vars.colors.brand}`,
  marginBlock: vars.space.l,
})

globalStyle('blockquote', {
  marginBlock: vars.space.s,
  border: `1px solid ${vars.colors.brand}`,
  padding: vars.space.s,
  borderRadius: '5px',
  position: 'relative',
  color: vars.colors.textSecondary,
})

globalStyle('blockquote:after', {
  content: '',
  position: 'absolute',
  display: 'block',
  height: '100%',
  top: 0,
  left: 0,
  width: '5px',
  background: vars.colors.brand,
  borderTopLeftRadius: '2px',
  borderBottomLeftRadius: '2px',
})

globalStyle('.link', {
  cursor: 'pointer',
})

globalStyle('.body-width', bodyWidthRule)

globalStyle('.sidebar-content-width', {
  maxWidth: '500px',
  margin: '0 auto',
})

globalStyle('.full-width', {
  width: '100%',
})

globalStyle('p em.marked', {
  backgroundColor: vars.colors.brand,
  color: vars.colors.bgPrimary,
  textDecoration: 'none',
  textTransform: 'none',
  fontStyle: 'normal',
})

globalStyle('*::selection', {
  color: vars.colors.card,
  backgroundColor: vars.colors.brand,
})

globalStyle('.disabled-feat', {
  display: 'none !important',
})

//////////////////////
// Figure
//////////////////////
globalStyle('figure', {
  display: 'flex',
  flexDirection: 'column',
})

globalStyle('figcaption', {
  fontSize: '1.3rem',
  marginBlockStart: '0px',
  paddingBlockStart: '2px',
  backgroundColor: vars.colors.brand,
  color: vars.colors.card,
  lineHeight: '2.3rem',
  paddingInline: '5px',
  fontStyle: 'italic',
  borderBottomLeftRadius: '5px',
  borderBottomRightRadius: '5px',
  display: 'inline-flex',
  flexDirection: 'row-reverse',
})

globalStyle('figcaption a', {
  color: vars.colors.card,
})
//////////////////////
//////////////////////

globalStyle('ol', {
  marginBlock: vars.space.s,
})
