import fs from 'fs'
import Jimp from 'jimp'
import path from 'path'

import { safeName } from '../common'
import {
  AIRecipeObject,
  AIRecipeWithImage,
  ImageB64Format,
} from '../types/open_ai'
import { validateAIRecipe } from '../utils/ai-recipe'
import { dishes } from '../utils/all_recipes'
import { logger } from '../utils/logger'
import { EmailService } from './email/EmailService'
import { OpenAI } from './OpenAI'

const imageSizes = {
  large: {
    name: 'large',
    width: 1024,
    fontSize: Jimp.FONT_SANS_32_WHITE,
  },
  medium: {
    name: 'medium',
    width: 512,
    fontSize: Jimp.FONT_SANS_16_WHITE,
  },
  small: {
    name: 'small',
    width: 300,
    fontSize: Jimp.FONT_SANS_8_WHITE,
  },
}

export class AIRecipes {
  OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'ai-recipes')

  constructor(
    private openAIService: OpenAI,
    private emailService?: EmailService
  ) {}

  singleRecipe = async (
    dishName: string,
    desiredRecipeId?: number,
    imageOutDir?: string
  ) => {
    // eslint-disable-next-line
    const prompt = `Provide detailed recipe of ${dishName} in valid JSON format provided. You should divide recipe ingredients and instructions in logical groups keeping the order same. All units must be metric with imperial in bracket. Here is JSON format:  {\n  \"recipeName\": \"...\",\n  \"excerpt\": \"...\",\n  \"servings\": \"2\",\n  \"prepTime\": \"PT10M\",\n  \"cookTime\": \"PT10M\",\n  \"totalTime\": \"PT10M\",\n  \"ingredients\": [\n    {\n      \"name\": \"ingredient section name\",\n      \"ingredients\": [\n        {\n          \"name\": \"...\",\n          \"quantity\": \"1 cup\",\n          \"notes\": \"...\"\n        }\n      ]\n    }\n  ],\n  \"instructions\": [\n    {\n      \"name\": \"sub-recipe\",\n      \"instructions\": [\n        \"...\"\n      ]\n    }\n  ],\n  \"nutrition\": {\n    \"calories\": \"...\",\n    \"fat\": \"\",\n    \"sugar\": \"\",\n    \"protein\": \"\"\n  }\n}`

    const recipeResponse = await this.openAIService.completion(prompt)

    let recipeObject: AIRecipeObject
    try {
      recipeObject = JSON.parse(recipeResponse) as AIRecipeObject
      const validatorResult = validateAIRecipe(recipeObject)
      if (!validatorResult.isValid && validatorResult.error) {
        const msg = 'Invalid JSON Schema - Errors in Body'
        if (process.env.NODE_ENV !== 'development')
          await this.emailService?.send({
            subject: msg,
            text: validatorResult.error,
          })
        logger.error(msg)
        logger.error(validatorResult.error)
        throw Error('Recipe does not confirm to the schema')
      }
    } catch (jsonError) {
      logger.error(String(jsonError))
      logger.error(recipeResponse)
      throw new Error(String(jsonError))
    }

    const recipeId =
      desiredRecipeId ??
      parseInt(
        new Intl.DateTimeFormat('de-DE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
          .format(new Date()) //dd.mm.yyyy
          .replaceAll('.', '')
      ) //ddmmyyyy

    logger.info(`Generating recipeId : ${recipeId}`)

    const recipeObjWithId = {
      id: recipeId,
      ...recipeObject,
    }

    const recipeImages = await this.getRecipeImages(
      dishName,
      recipeId,
      imageOutDir
    )

    const completeRecipe: AIRecipeWithImage = {
      ...recipeObjWithId,
      image: recipeImages,
    }

    return completeRecipe
  }

  getRecipeImages = async (
    recipeName: string,
    recipeId: number,
    imageOutDir?: string
  ) => {
    logger.info(`Getting images for recipe ${recipeName}`)

    // eslint-disable-next-line
    const prompt = `${recipeName} in nature on a white plate, ultra realistic, close - up, appetite food, highly detailed, smooth, sharp focus, professional detailed photo.`

    const base64ImageResponse = await this.openAIService.image(prompt)

    const b64String = `${
      (base64ImageResponse.data as ImageB64Format[])[0].b64_json
    }`

    const outDir = imageOutDir ?? this.OUT_DIR

    const originalImage = await Jimp.read(Buffer.from(b64String, 'base64url'))
    originalImage.resize(1024, Jimp.AUTO).quality(80)

    for (const size of Object.values(imageSizes)) {
      logger.info(`Resizing image to ${size.width}`)
      //eslint-disable-next-line
      await originalImage.resize(size.width, Jimp.AUTO)
      logger.info('water marking image')
      const waterMarkedImage = await this.watermarkImage(
        originalImage.clone(),
        size.fontSize
      )
      logger.info(`Writing image to ${outDir}`)
      await waterMarkedImage.writeAsync(
        path.join(outDir, `${recipeId}_${size.name}.jpg`)
      )
    }

    return {
      large: `/images/ai-recipes/${recipeId}_large.jpg`,
      medium: `/images/ai-recipes/${recipeId}_medium.jpg`,
      small: `/images/ai-recipes/${recipeId}_small.jpg`,
    }
  }

  watermarkImage = async (image: Jimp, fontSize: string) => {
    const font = await Jimp.loadFont(fontSize)

    return image.print(
      font,
      0,
      image.getHeight() - 30,
      {
        text: 'Disclaimer: Image created by AI. May be inaccurate.',
        alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
      },
      image.getWidth(),
      20
    )
  }

  getAIRecipesGeneratedFileNames = () => {
    const AI_RECIPE_DIR = path.join('content', 'ai-recipes')
    const results: string[] = []
    const dateDirs = fs.readdirSync(AI_RECIPE_DIR)
    dateDirs.forEach((dir) => {
      results.push(
        ...fs.readdirSync(path.join(AI_RECIPE_DIR, dir)).filter((file) => {
          return file.endsWith('json')
        })
      )
    })

    return results
  }

  getRandomVeganRecipeNameLocal = () => {
    const generatedRecipes = this.getAIRecipesGeneratedFileNames()

    return dishes.find((dish, idx) => {
      if (generatedRecipes.includes(`${safeName(dish)}.json`)) {
        logger.debug(`Skipping ${dish}. Already generated...`)
        return false
      }
      if (idx >= 90) {
        const emailService = new EmailService()
        emailService
          .send({
            /* eslint-disable-next-line */
            subject: `[AI recipes] On index ${idx}. Add new dishes for AI Recipes`,
            html: '',
          })
          .then(() => 'Recipe Name list Almost over warning sent.')
          .catch((err) => {
            throw new Error('Cannot Send Notification on email.' + String(err))
          })
      }
      return true
    })
  }

  getRandomVeganRecipeName = async () => {
    const prompt =
      /* eslint-disable-next-line */
      'Suggest me a random and popular vegan dish name in json with key "dish". Do not include the recipe '

    const dishResponse = await this.openAIService.completion(prompt, 'full')

    let dishObject: { dish: string }

    try {
      dishObject = JSON.parse(dishResponse.replace('\n', '')) as {
        dish: string
      }
      return dishObject.dish
    } catch (jsonError) {
      logger.error(String(jsonError))
      logger.error(dishResponse)
      throw new Error(String(jsonError))
    }
  }
}
