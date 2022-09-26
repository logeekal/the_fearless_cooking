import * as dotenv from 'dotenv'
import * as path from 'path'

import FAQService from '../services/FAQService'
import RecipeService from '../services/RecipeService'
import { logger } from '../utils/logger'

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
})

export async function downloadData() {
  logger.info('Downloading Data for first time')

  const recipeService = new RecipeService()
  const faqService = new FAQService()

  await recipeService.getAllRecipesData()
  await recipeService.getAllCourses()
  await recipeService.getAllCuisines()
  await recipeService.getAllRecipePosts()

  await faqService.getAllFAQREST()

  logger.info('Downloading Data Complete')
}

downloadData()
  .then(() => logger.info('Success'))
  .catch(console.error)
