import fs from 'fs'
import path from 'path'
import { parse } from 'tinyduration'

import { safeName } from '../../common'
import { AIRecipe } from '../../types/open_ai'
import genRecipeSchema from '../schema/recipe'
import { ICompleteRecipe, ICompleteRecipeObj } from '../types'

export const convertAIRecipesToCompleteRecipes = (): ICompleteRecipeObj => {
  const aiRecipes = genAIRecipeObjects()

  const result: ICompleteRecipeObj = {}

  for (const recipeJson of aiRecipes) {
    const recipe: ICompleteRecipe['post'] = {
      id: String(recipeJson.id),
      recipeId: recipeJson.id,
      databaseId: recipeJson.id,
      title: recipeJson.recipeName,
      content: '',
      excerpt: recipeJson.excerpt ?? '',
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
      cookTime: recipeJson.cookTime,
      prepTime: recipeJson.prepTime,
      totalDuration: recipeJson.totalTime,
      calculatedDurations: {
        cookTimeInDurations: parse(recipeJson.cookTime),
        prepTimeInDurations: parse(recipeJson.prepTime),
        totalDuration: parse(recipeJson.totalTime),
      },
      recipeIngredients: [
        {
          sectionTitle: '',
          ingredients: recipeJson.ingredients.map((ing) => ({
            ingredient: ing.name,
            quantity: ing.quantity ?? '',
            notes: ing.notes ?? '',
            unit: ing.unit ?? '',
          })),
        },
      ],
      recipeInstructions: [
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
    }

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
