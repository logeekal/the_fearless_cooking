import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

import { AIRecipes } from '../services/AIRecipes'
import { OpenAI } from '../services/OpenAI'
import { logger } from '../utils/logger'

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
})

const aiRecipeDir = path.join(__dirname, '..', 'content', 'ai-recipes')

async function downloadAIRecipe(outDirectory?: string) {
  logger.info('Download recipe for the day')
  const outDir = outDirectory ?? aiRecipeDir

  // create directory if does not exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const newAIRecipeId = parseInt(
    new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(new Date()) //dd.mm.yyyy
      .replaceAll('.', '')
  ) //ddmmyyyy

  const recipeDirName = path.join(outDir, `${newAIRecipeId}`)
  // santize the name for the folder

  if (fs.existsSync(recipeDirName)) {
    logger.info(`Recipe ${recipeDirName} already exists. skipping download`)
    return
  }

  const openAIService = new OpenAI()
  const aiRecipeService = new AIRecipes(openAIService)

  const randomRecipeName = await aiRecipeService.getRandomVeganRecipeName()

  logger.info(`Recipe of the day is ${randomRecipeName}. Downloading now...`)

  const recipe = await aiRecipeService.singleRecipe(
    randomRecipeName,
    newAIRecipeId
  )

  const saveRecipeName = randomRecipeName
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()

  const recipeFile = path.join(recipeDirName, `${saveRecipeName}.json`)

  fs.mkdirSync(recipeDirName)
  fs.writeFileSync(recipeFile, JSON.stringify(recipe))
}

downloadAIRecipe()
  .then(() => logger.info('Done!'))
  .catch((err) => logger.error(String(err)))
