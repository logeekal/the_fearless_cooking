import { globalFontFace, globalStyle } from '@vanilla-extract/css'

import { vars } from './themes.css'
import { bodyWidthRule } from './vars.css'

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Bold.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 700,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-SemiBold.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 600,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Medium.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 500,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Regular.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 400,
  fontDisplay: 'swap',
})

globalFontFace('quicksand', {
  src: 'url(/fonts/_quicksand/Quicksand-Light.woff2) format("woff2")',
  fontStyle: 'normal',
  fontWeight: 300,
  fontDisplay: 'swap',
})

globalFontFace('bilbo', {
  src: 'url(/fonts/bilbo-swash-caps/BilboSwashCaps-Regular.ttf)',
  fontStyle: 'normal',
  fontWeight: 300,
  fontDisplay: 'swap',
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
  marginBlock: vars.space.l,
})

globalStyle('h2', {
  marginBlockStart: vars.space.normal,
  fontSize: vars.fontSize.heading,
})

globalStyle('h3', {
  marginBlockStart: vars.space.normal,
  fontSize: vars.fontSize.heading,
  fontStyle: 'italic',
})

globalStyle('h4', {
  marginBlockStart: vars.space.normal,
  fontSize: vars.fontSize.para,
  fontStyle: 'italic',
})

globalStyle('.upper', {
  textTransform: 'uppercase',
})

globalStyle('a', {
  textDecoration: 'none',
  color: vars.colors.brand,
})

globalStyle('.btn', {
  cursor: 'pointer',
})

globalStyle('p', {
  fontSize: vars.fontSize.para,
  lineHeight: '2rem',
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
