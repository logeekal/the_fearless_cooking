import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

import { safeName } from '../common'
import { AIRecipes } from '../services/AIRecipes'
import { OpenAI } from '../services/OpenAI'
import { logger } from '../utils/logger'
import { checkEnvs } from './env-checker'

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
      hour: '2-digit',
      minute: '2-digit',
    })
      .format(new Date()) //dd.mm.yyyy
      .replace(/[^0-9]/g, '')
  ) //ddmmyyyy

  const recipeDirName = path.join(outDir, `${newAIRecipeId}`)
  // santize the name for the folder

  if (fs.existsSync(recipeDirName)) {
    logger.warn(`Recipe ${recipeDirName} already exists. skipping download`)
    return
  }

  const openAIService = new OpenAI()
  const aiRecipeService = new AIRecipes(openAIService)

  const randomRecipeName = aiRecipeService.getRandomVeganRecipeNameLocal()
  if (!randomRecipeName) {
    throw new Error(`Invalid Random Recipe Name: ${String(randomRecipeName)}`)
  }

  logger.info(`Recipe of the day is ${randomRecipeName}. Downloading now...`)

  const recipe = await aiRecipeService.singleRecipe(
    randomRecipeName,
    newAIRecipeId
  )

  const saveRecipeName = safeName(randomRecipeName)
  const recipeFile = path.join(recipeDirName, `${saveRecipeName}.json`)

  fs.mkdirSync(recipeDirName)
  fs.writeFileSync(recipeFile, JSON.stringify(recipe))
}

checkEnvs({
  mandatory_envs: [
    'OPEN_AI_KEY',
    'SMTP_HOST',
    'SMT_PORT',
    'SMTP_USERNAME',
    'SMTP_PASSWORD',
    'EMAIL_SENDER',
    'EMAIL_RECIPIENTS',
    'FROM_NAME',
  ],
})

downloadAIRecipe()
  .then(() => logger.info('Done!'))
  .catch((err) => logger.error(String(err)))
