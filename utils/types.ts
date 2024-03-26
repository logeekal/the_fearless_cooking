import { FAQ_REST_DATA } from '../tests/faqRestSample.data'
import { RECIPE_SAMPLE_CONTENT } from '../tests/recipeContent.data'
import { Post, Recipe } from '../types/wp-graphql.types'

export type IRecipeContent = typeof RECIPE_SAMPLE_CONTENT
export type IFAQRestContent = typeof FAQ_REST_DATA

export type IWPGraphQL<T> = {
  data: T
  errors?: Array<unknown>
}

export type RecipeContent = IRecipeContent['data'][0]['recipe_metas']

export interface ICompleteRecipeObj {
  [k: string]: {
    post: Recipe
    content: IRecipeContent['data'][number]['recipe_metas'] | null
    recipeSchema?: object | null
    faqs: IFAQRestContent[]
    YTId: string | null | undefined
  }
}

export interface ICompleteRecipe {
  post: Recipe
  content: IRecipeContent['data'][number]['recipe_metas'] | null
  faqs: IFAQRestContent[]
  YTId: string | null | undefined
  recipeSchema?: object | null
  faqSchema?: object | null
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

export type LocalPageInfo = {
  pageInfo: {
    total: number
    current: number
    uri: string
  }
}

export type ICompletePost = {
  post: Post
  schema: object
}

export type ICompletePostObj = {
  [k: string]: ICompletePost
}
