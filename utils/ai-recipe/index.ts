import fs from 'fs'
import { Validator } from 'jsonschema'
import path from 'path'
import { parse } from 'tinyduration'

import { safeName } from '../../common'
import DiskCacheService from '../../services/diskCache'
import { AIRecipe, RecipeIngredient } from '../../types/open_ai'
import { logger } from '../logger'
import genRecipeSchema from '../schema/recipe'
import { ICompleteRecipe, ICompleteRecipeObj } from '../types'
import { aiRecipeSchema } from './ai_recipe_schema'

export const validateAIRecipe = (
  jsonToValidate: unknown
): {
  isValid: boolean
  error?: string
} => {
  const validator = new Validator()
  const result = validator.validate(jsonToValidate, aiRecipeSchema)

  return {
    isValid: result.valid,
    error: result.errors
      ? JSON.stringify(result.errors, undefined, 2)
      : undefined,
  }
}

export const convertAIRecipesToCompleteRecipes = (): ICompleteRecipeObj => {
  const ENTITY = 'AI_RECIPES_COMPLETE'

  const cacheService = new DiskCacheService()

  const resultStringFromCache = cacheService.get(ENTITY)?.toString()

  if (resultStringFromCache) {
    const completeRecipeJSON = JSON.parse(
      resultStringFromCache
    ) as unknown as ICompleteRecipeObj
    return completeRecipeJSON
  }

  const aiRecipes = genAIRecipeObjects()

  logger.info(`Found ${aiRecipes.length} AI Recipes`)

  const result: ICompleteRecipeObj = {}

  for (const recipeJson of aiRecipes) {
    const dateRegex =
      /^([0-9]{2})([0-9]{1,2})([0-9]{4})(([0-9]{2})([0-9]{2}))?$/
    /*
     * Above regex was tested on
        150620231653
        23042023
        22620230531
        20720231635
        240620231241
       * */
    const dateSegments = String(recipeJson.creationDate ?? recipeJson.id).match(
      dateRegex
    )
    logger.error({ dateSegments })
    if (!dateSegments) {
      logger.error(
        `Failed Regex : ${String(dateRegex)} on recipeId :${
          recipeJson.id
        }. Got result : ${JSON.stringify(dateSegments, undefined, 2)} `
      )
      throw Error(`Creation date undefined for recipeId : ${recipeJson.id}`)
    }
    const [, dd, mm, yyyy, , hh, mi] = dateSegments as string[]
    const creationDate = new Date(
      `${yyyy}-${mm}-${dd} ${hh ?? '00'}:${mi ?? '00'}`
    )
    if (!creationDate || !dateSegments) {
      logger.error(
        `Failed Regex : ${String(dateRegex)} on recipeId :${
          recipeJson.id
        }. Got result : ${JSON.stringify(dateSegments, undefined, 2)} `
      )
      throw Error(`Creation date undefined for recipeId : ${recipeJson.id}`)
    }
    const recipe: ICompleteRecipe['post'] = {
      id: String(recipeJson.id),
      recipeId: recipeJson.id,
      databaseId: recipeJson.id,
      title: recipeJson.recipeName,
      content: '',
      excerpt: recipeJson.excerpt ?? '',
      dateGmt: creationDate.toUTCString(),
      modified: creationDate.toUTCString(),
      uri: `/ai-recipes/${safeName(recipeJson.recipeName)}/`,
      recipeCuisines: {
        nodes: [
          {
            id: '12345',
            databaseId: 495,
            name: 'Vegan',
            uri: '/recipe-cuisine/vegan',
          },
        ],
      },
      featuredImage: {
        node: {
          mediaItemUrl: recipeJson.image.large,
          mediaItemId: recipeJson.id,
          id: 'ai-recipe-image',
          databaseId: 1,
          uri: '',
          sourceUrl: recipeJson.image.large,
          sizes: '',
          srcSet: '',
          mediaDetails: {
            sizes: Object.keys(recipeJson.image).map((key) => ({
              name: key,
              sourceUrl: recipeJson.image[key as keyof typeof recipeJson.image],
            })),
          },
        },
      },
    }

    const recipeContent: ICompleteRecipe['content'] = {
      noOfServings: recipeJson.servings,
      recipeSubtitle: '',
      recipeDescription: recipeJson.excerpt ?? '',
      cookTime: recipeJson.cookTime || 'PT0M',
      prepTime: recipeJson.prepTime || 'PT0M',
      totalDuration: recipeJson.totalTime,
      calculatedDurations: {
        cookTimeInDurations: parse(recipeJson.cookTime || 'PT0M'),
        prepTimeInDurations: parse(recipeJson.prepTime || 'PT0M'),
        totalDuration: parse(recipeJson.totalTime || 'PT0M'),
      },
      recipeIngredients: !('quantity' in recipeJson.ingredients[0])
        ? // new AI Recipe format
          recipeJson.ingredients.map((ing) => {
            return {
              sectionTitle: ing.name,
              ingredients: ing.ingredients.map((ing) => ({
                ingredient: ing.name,
                quantity: ing.quantity ?? '',
                notes: ing.notes ?? '',
                unit: ing.unit ?? '',
              })),
            }
          })
        : // old recipe format
          [
            {
              sectionTitle: '',
              ingredients: recipeJson.ingredients.map(
                // @ts-expect-error "This is the old recipe format
                // for which type does not exist"
                (ing: RecipeIngredient) => ({
                  ingredient: ing.name,
                  notes: ing.notes ?? '',
                  unit: ing.unit ?? '',
                  quantity: ing.quantity ?? '',
                })
              ),
            },
          ],
      recipeInstructions:
        typeof recipeJson.instructions[0] !== 'string'
          ? recipeJson.instructions.map((ins) => ({
              sectionTitle: ins.name,
              instruction: ins.instructions.map((inst) => ({
                instruction: inst,
                image: '',
                image_preview: '',
                videoURL: '',
                instructionNotes: '',
                instructionTitle: '',
              })),
            }))
          : [
              {
                sectionTitle: '',
                instruction: recipeJson.instructions.map((inst) => ({
                  instruction: inst,
                  image: '',
                  image_preview: '',
                  videoURL: '',
                  instructionNotes: '',
                  instructionTitle: '',
                })),
              },
            ],
    } as ICompleteRecipe['content']

    const recipeSchema = genRecipeSchema(
      recipe,
      recipeContent,
      undefined,
      false
    )

    result[recipeJson.id] = {
      post: recipe,
      content: recipeContent,
      recipeSchema,
      faqs: [],
      YTId: null,
    }
  }

  cacheService.set(ENTITY, JSON.stringify(result))

  return result
}

export function getAIRecipesFiles() {
  const AI_RECIPE_DIR = path.join('content', 'ai-recipes')
  const results: string[] = []
  const dateDirs = fs.readdirSync(AI_RECIPE_DIR)
  dateDirs.forEach((dir) => {
    results.push(
      ...fs
        .readdirSync(path.join(AI_RECIPE_DIR, dir))
        .filter((file) => {
          return file.endsWith('json')
        })
        .map((f) => path.join(AI_RECIPE_DIR, dir, f))
    )
  })

  return results
}

export const genAIRecipeObjects = (): AIRecipe[] => {
  const aiRecipeFiles = getAIRecipesFiles()

  const aiRecipes: AIRecipe[] = aiRecipeFiles.map((recipeFile) => {
    const recipeJSONStr = fs.readFileSync(recipeFile, {
      encoding: 'utf-8',
      flag: 'r',
    })
    const recipeJSON = JSON.parse(recipeJSONStr) as AIRecipe

    return recipeJSON
  })

  return aiRecipes
}
