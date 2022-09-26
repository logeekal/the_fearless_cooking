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
  },
  font: {
    normal: 'quickSand',
    cursive: 'bilbo',
  },
  fontSize: {
    para: '1.6rem',
    heading: '2rem',
    subHeading: '1.2rem',
    cursiveHeading: '2.5rem',
    subText: '10px',
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
    colors: {
      text: 'white',
      textSecondary: 'white',
      bgPrimary: 'blue',
      brand: 'blue',
      card: 'yellow',
      greenLight: 'rgba(151, 186, 168, 0.15)',
      yellowLight: 'rgba(255, 212, 34, .28)',
    },
  },
  'dark'
)
