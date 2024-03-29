import { Duration } from 'tinyduration'

import { Post, Recipe } from './wp-graphql.types'

export type IDuration = Partial<Duration> & {
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

export interface IPostSearchObj {
  id: string
  title: string
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
    h1: string
    h2: string
    h3: string
    h4: string
  }
  lineHeights: {
    para: string
    heading: string
    cursiveHeading: string
    subHeading: string
    subText: string
    h1: string
    h2: string
    h3: string
    h4: string
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

export type GraphQLNextPageHandler<T> = (after: string) => T

export type SearchResultType = {
  id: string
  score: number
  title: string
  uri: string
}

export type AnalyticsEvents = {
  BottomTab: { id: string }
  Search: { uri: string; keyword: string }
}

export type As<P = any> = React.ElementType<P>

export type PropsWithAs<P> = P & {
  as: As
}
