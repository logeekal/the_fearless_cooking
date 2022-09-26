import { Post, Recipe } from './wp-graphql.types'

export interface IDuration {
  hours: number
  minutes: number
}

export type PossiblePostType = Post | Recipe

export type ThemeType = {
  colors: {
    text: string
    textSecondary: string
    bgPrimary: string
    card: string
    brand: string
    greenLight: string
    yellowLight: string
  }

  font: {
    normal: string
    cursive: string
  }

  fontSize: {
    para: string
    heading: string
    cursiveHeading: string
    subHeading: string
    subText: string
  }
  space: {
    xs: string
    s: string
    normal: string
    l: string
    xl: string
    none: string
  }
  border: {
    circular: string
  }
  zIndex: {
    highest: string
    high: string
  }
}
export interface IDuration {
  hours: number
  minutes: number
}
