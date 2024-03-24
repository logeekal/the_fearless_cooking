import { createTheme, createThemeContract } from '@vanilla-extract/css'

import { ThemeType } from '../types/common'

const baseTheme: ThemeType = {
  colors: {
    text: 'black',
    textSecondary: '#5B5B5B',
    bgPrimary: '#F8F8F4',
    brand: '#659B8A',
    card: 'white',
    greenLight: 'rgba(151, 186, 168, 0.15)',
    yellowLight: 'rgba(255, 212, 34, .28)',
    lightgray: 'rgba(0,0,0,0.3)',
  },
  font: {
    normal: 'inter',
    cursive: 'glass',
  },
  fontSize: {
    para: '1.6rem',
    heading: '3rem',
    subHeading: '1.2rem',
    cursiveHeading: '2.5rem',
    subText: '1rem',
    // source: https://ui.shadcn.com/docs/components/typography
    h1: '3rem',
    h2: '1.875rem',
    h3: '1.875rem',
    h4: '1.2rem',
  },
  lineHeights: {
    para: '2rem',
    heading: '3.5rem',
    cursiveHeading: '2rem',
    subHeading: '1.5rem',
    subText: '1.5rem',
    h1: '3.5rem',
    h2: '2.25rem',
    h3: '2rem',
    h4: '1.75rem',
  },
  space: {
    xs: '0.5rem',
    s: '1rem',
    normal: '1.25rem',
    l: '2rem',
    xl: '3rem',
    none: '0px',
  },
  border: {
    circular: '999999px',
    normal: '10px',
  },
  zIndex: {
    highest: '100',
    high: '10',
  },
}

export const vars = createThemeContract<ThemeType>({
  ...baseTheme,
})

export const light = createTheme<typeof vars>(
  vars,
  {
    ...baseTheme,
  },
  'light'
)

export const dark = createTheme<typeof vars>(
  vars,
  {
    ...baseTheme,
    /* Currently Keeping both dark and light themes as same
     *colors: {
     *  text: 'white',
     *  textSecondary: 'white',
     *  bgPrimary: 'blue',
     *  brand: 'blue',
     *  card: 'yellow',
     *  greenLight: 'rgba(151, 186, 168, 0.15)',
     *  yellowLight: 'rgba(255, 212, 34, .28)',
     *},
     */
  },
  'dark'
)
