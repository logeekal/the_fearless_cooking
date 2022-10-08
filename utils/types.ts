import { FAQ_REST_DATA } from '../tests/faqRestSample.data'
import { RECIPE_SAMPLE_CONTENT } from '../tests/recipeContent.data'
import { Post, Recipe } from '../types/wp-graphql.types'

export type IRecipeContent = typeof RECIPE_SAMPLE_CONTENT
export type IFAQRestContent = typeof FAQ_REST_DATA

export interface IWPGraphQL<T> {
  data: T
}

export interface ICompleteRecipeObj {
  [k: number]: {
    post: Recipe
    content: IRecipeContent['data'][number]['recipe_metas']
    faqs: IFAQRestContent[]
    YTId: string | null | undefined
  }
}

export interface ICompleteRecipe {
  post: Recipe
  content: IRecipeContent['data'][number]['recipe_metas']
  faqs: IFAQRestContent[]
  YTId: string | null | undefined
  recipeSchema?: string
  faqSchema?: string
}

export interface IFAQObj {
  [k: number]: IFAQRestContent
}

export interface IRecipeObject {
  [k: number | string]: Recipe
}

export interface IPostObject {
  [k: number]: Post
}
