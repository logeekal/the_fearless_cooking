import DiskCacheService from '../../services/diskCache'
import FAQService from '../../services/FAQService'
import RecipeService from '../../services/RecipeService'
import { arrToObj } from '..'
import { logger } from '../logger'
import {
  getFAQs,
  getYoutubeVideoId,
  makeVideoIframeLazy,
  replaceYTWithNoCookie,
  stripFAQSection,
} from '../pre-processors'
import { calculateTotalDuration } from '../time_utils'
import { ICompleteRecipeObj, IFAQRestContent, IRecipeContent } from '../types'

export const genCompleteRecipeObject = async () => {
  const cacheService = new DiskCacheService()
  const recipeService = new RecipeService(cacheService)
  const ENTITY = 'ALL_COMPLETED_RECIPES'

  const resultFromCache = recipeService.getFromCache<ICompleteRecipeObj>(ENTITY)
  if (resultFromCache) return resultFromCache

  const allRecipes = await recipeService.getAllRecipePosts()
  const allRecipeContent = await recipeService.getAllRecipesData()

  const allRecipeContentById = arrToObj<IRecipeContent['data'][0]>(
    allRecipeContent.data,
    'id'
  )

  const faqService = new FAQService(new DiskCacheService())
  const allFAQs = await faqService.getAllFAQREST()
  const allFAQsById = arrToObj<IFAQRestContent>(allFAQs, 'id')

  const result: ICompleteRecipeObj = {}

  allRecipes.forEach((recipe) => {
    logger.info(`Processing ${recipe.databaseId} - ${recipe.title as string}`)
    const recipeId = String(recipe.databaseId)
    if (!(recipeId in result)) {
      result[recipeId] = {} as ICompleteRecipeObj['k']
    }
    result[`${recipeId}`]['post'] = recipe

    if (!(recipeId in allRecipeContentById)) {
      logger.info(
        `Skipping recipe with Id: ${recipeId} because there is not content`
      )
      delete result[recipeId]
      return
    }

    const selectedRecipeContent =
      recipeId in allRecipeContentById &&
      allRecipeContentById[recipeId].recipe_metas.recipeInstructions.length > 0
        ? allRecipeContentById[recipeId]
        : null

    result[recipeId]['content'] = selectedRecipeContent
      ? selectedRecipeContent['recipe_metas']
      : null

    const recipeRelatedFAQIds = getFAQs(recipe.content as string)

    const recipeRelatedFAQs = recipeRelatedFAQIds.map(
      (faqId) => allFAQsById[faqId]
    )
    let relatedYoutubeVideoID = null
    try {
      relatedYoutubeVideoID = getYoutubeVideoId(recipe.content as string)
    } catch (error) {
      logger.error(
        `Error white processing - ${recipe.title ?? '<Empty Title>'}`
      )
    }

    recipe.content = makeVideoIframeLazy(
      stripFAQSection(replaceYTWithNoCookie(recipe.content as string))
    )

    logger.info('Calculating durations')
    if (selectedRecipeContent)
      selectedRecipeContent.recipe_metas['calculatedDurations'] =
        calculateTotalDuration(selectedRecipeContent.recipe_metas)
    logger.info('Succesfully calculated duration')

    logger.info('Generating Schema')

    logger.info('Generated Schema')

    logger.info(`Succesfully Generated Recipe : ${recipe.title as string}`)

    result[recipeId]['faqs'] = recipeRelatedFAQs
    result[recipeId]['YTId'] = relatedYoutubeVideoID
  })

  cacheService.set(ENTITY, JSON.stringify(result))

  return result
}
