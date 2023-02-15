import { Post, Recipe } from './wp-graphql.types'

export interface IDuration {
  hours: number
  minutes: number
}

export interface IRecipeSearchObj {
  id: string
  title: string
  content?: string
  instructions?: string
  ingredients?: string
  excerpt?: string
  uri: string
}

export type IndexableRecipeObj = Record<string, IRecipeSearchObj>

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
    lightgray: string
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
    normal: string
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

export type GraphQLNextPageHandler<T> = (after: string) => T

export type SearchResultType = {
  id: string
  score: number
  title: string
  uri: string
}

export type AnalyticsEvents = {
  BottomTab: { id: string }
}
