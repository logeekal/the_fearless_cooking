import Jimp from 'jimp'
import * as path from 'path'

import { ImageB64Format, RecipeObject, RecipeWithImage } from '../types/open_ai'
import { logger } from '../utils/logger'
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

  constructor(private openAIService: OpenAI) {}

  singleRecipe = async (
    recipeName: string,
    desiredRecipeId?: number,
    imageOutDir?: string
  ) => {
    // eslint-disable-next-line
    const prompt = `Please provide vegan version of ${recipeName} in RFC8529 JSON. Please include time in ISO 8601 duration format. All keys should be camel case and should be in below format. \n {\"recipeName\":\"...\",\"servings\":\"2\",\"prepTime\":\"PT10M\",\"cookTime\":\"PT10M\",\"totalTime\":\"PT10M\",\"ingredients\":[{\"name\":\"...\",\"quanity\":\"...\", \"notes\":\"...\"}],\"instructions\":[\"...\"],\"nutrition\":{\"calories\":\"...\",\"fat\":\"\",\"sugar\":\"\",\"protein\":\"\"}}`

    const recipeResponse = await this.openAIService.completion(prompt)

    let recipeObject

    try {
      recipeObject = JSON.parse(recipeResponse) as RecipeObject
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
      recipeName,
      recipeId,
      imageOutDir
    )

    const completeRecipe: RecipeWithImage = {
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
    const prompt = `A professional well-lit and beautiful photograph of a vegan version of ${recipeName}. Put recipe in center with white negative space around it`

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

  getRandomVeganRecipeName = async () => {
    const prompt =
      'Suggest me a random and popular vegan dish name in json with key "dish". Do not include the recipe '

    const dishResponse = await this.openAIService.completion(prompt)

    let dishObject: { dish: string }

    try {
      dishObject = JSON.parse(dishResponse) as { dish: string }
      return dishObject.dish
    } catch (jsonError) {
      logger.error(String(jsonError))
      logger.error(dishResponse)
      throw new Error(String(jsonError))
    }
  }
}
