import * as dotenv from 'dotenv'
import * as path from 'path'

import DiskCacheService from '../services/diskCache'
import FAQService from '../services/FAQService'
import PostService from '../services/PostService'
import RecipeService from '../services/RecipeService'
import { logger } from '../utils/logger'

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
})

export async function downloadData() {
  logger.info('Downloading Data for first time')

  const diskService = new DiskCacheService()
  const recipeService = new RecipeService(diskService)
  const faqService = new FAQService(diskService)
  const postService = new PostService(diskService)

  //===== Recipe Service
  await recipeService.getAllRecipesData()
  await recipeService.getAllCourses()
  await recipeService.getAllCuisines()
  await recipeService.getAllRecipePosts()

  //======= FAQ Service
  await faqService.getAllFAQREST()

  //======= Post Service
  await postService.getAllPosts()

  logger.info('Downloading Data Complete')
}
