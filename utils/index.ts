import DiskCacheService from '../services/diskCache'
import FAQService from '../services/FAQService'
import RecipeService from '../services/RecipeService'
import { logger } from './logger'
import {
  getFAQs,
  getYoutubeVideoId,
  replaceYTwithLiteTY,
  stripFAQSection,
} from './pre-processors'
import { ICompleteRecipeObj, IFAQObj, IRecipeObject } from './types'
import { log } from './utils'

export const getAllRecipeObj = async (
  objIndex: 'recipeId' | 'uri' = 'recipeId'
) => {
  const recipeService = new RecipeService()
  const allRecipesPosts = await recipeService.getAllRecipePosts()
  const allRecipeObj: IRecipeObject = {}
  allRecipesPosts.forEach((recipe) => {
    allRecipeObj[recipe[objIndex]] = recipe
  })
  return allRecipeObj
}

export const arrToObj = <T extends Record<string, unknown>>(
  arr: Array<T>,
  key: string
): Record<string | number, T> => {
  const result: Record<string | number, T> = {}
  arr.forEach((item) => {
    if (!(key in item)) {
      throw Error(`Invalid key : ${key}`)
    }
    const newKey: string = item[key] as string
    result[newKey] = item
  })
  return result
}

export const getAllFAQObj = async () => {
  log('Getting all FAQs')
  const faqService = new FAQService(new DiskCacheService())
  const allFAQs = await faqService.getAllFAQREST()
  const allFAQObject: IFAQObj = {}
  allFAQs.forEach((faq) => {
    allFAQObject[faq.id] = faq
  })
  logger.info(`Found ${allFAQs.length} FAQs`)
  return allFAQObject
}
export const processRecipeData = async (
  allFAQs: IFAQObj
): Promise<ICompleteRecipeObj> => {
  log('Creating Recipe Pages')
  const recipeService = new RecipeService()

  const allRecipesPosts = await recipeService.getAllRecipePosts()

  const completeRecipeObj: ICompleteRecipeObj = {}
  logger.info(`Found ${allRecipesPosts.length} recipe post`)

  if (allRecipesPosts.length === 0) {
    throw Error('No Recipes found')
  }

  allRecipesPosts.forEach((recipe) => {
    const id = recipe.recipeId

    const recipeFAQIds = getFAQs(recipe.content as string)
    const recipeFAQs = recipeFAQIds.map((faqId) => allFAQs[faqId])

    const recipeVideoId = getYoutubeVideoId(recipe.content as string)

    completeRecipeObj[id] = {
      post: recipe,
      faqs: recipeFAQs,
      YTId: recipeVideoId || null,
    } as ICompleteRecipeObj[number]
  })

  const allRecipesData = await recipeService.getAllRecipesData()

  logger.info(`Found ${allRecipesData.data.length} recipe data`)

  allRecipesData.data.forEach((recipeData) => {
    if (recipeData.id in completeRecipeObj) {
      completeRecipeObj[recipeData.id].content = recipeData.recipe_metas
    }
  })

  for (const key in completeRecipeObj) {
    const recipeContent = completeRecipeObj[key]

    if (!('content' in recipeContent)) {
      // if any of the recipe does not have recipeData,
      // remove do not create corresponding page.
      logger.info(`No Recipe Data found for recipe Id : ${key}`)
    }

    completeRecipeObj[key].post.content = preProcessRecipeContent(
      recipeContent.post
    )
  }

  return completeRecipeObj
}

export const preProcessRecipeContent = (
  post: ICompleteRecipeObj[0]['post']
) => {
  const newPostContent = replaceYTwithLiteTY(
    stripFAQSection(post.content as string),
    post.title as string
  )
  return newPostContent
}

export const getMandatoryProp = <T extends object, K extends keyof T>(
  obj: T,
  key: Extract<K, string>
): T[K] => {
  if (key in obj) {
    if (obj[key] ?? -1 === -1) {
      throw new Error(`Mandatory Prop ${key} missing in obj - ${String(obj)}`)
    }

    return obj[key]
  } else {
    throw new Error(`Mandatory Prop ${key} missing in obj - ${String(obj)}`)
  }
}
