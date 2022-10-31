import * as fs from 'fs'
import lunr from 'lunr'
import * as path from 'path'
import striptags from 'striptags'

import { IndexableRecipeObj, IRecipeSearchObj } from '../types/common'
import { logger } from '../utils/logger'
import { genCompleteRecipeObject } from '../utils/recipe'
import { ICompleteRecipeObj } from '../utils/types'

const recipeIndexFileName = 'recipe_index.json'
const recipeDetails = 'recipes.json'

export async function genIndexableRecipes() {
  const completeRecipeObj = await genCompleteRecipeObject()

  const indexableRecipeObj: IndexableRecipeObj = {}

  Object.keys(completeRecipeObj).forEach((id: string) => {
    const recipe = completeRecipeObj[id]
    const indexableRecipe: IRecipeSearchObj = {} as IRecipeSearchObj
    const recipeId = recipe.post.databaseId.toString()
    indexableRecipe['id'] = recipeId
    indexableRecipe['title'] = recipe.post.title as string
    //indexableRecipe['excerpt'] = recipe.post.excerpt as string
    //indexableRecipe['content'] = sanitizeTextsForSearch(
    //recipe.post.content as string
    //)
    //indexableRecipe['instructions'] = combineInstruction(
    //recipe.content.recipeInstructions
    //)
    //indexableRecipe['ingredients'] = combineIngredient(
    //recipe.content.recipeIngredients
    //)
    indexableRecipe['uri'] = recipe.post.uri

    indexableRecipeObj[recipeId] = indexableRecipe
  })

  return indexableRecipeObj
}

export function genSearchIdx(indexableRecipes: IRecipeSearchObj[]) {
  return lunr(function () {
    this.ref('id')
    this.field('title', { boost: 5 })
    this.field('content', { boost: 1 })
    this.metadataWhitelist = ['position']
    this.field('instructions')
    this.field('ingredients')
    indexableRecipes.forEach((indexableRecipe) => {
      this.add(indexableRecipe)
    })
  })
}

function sanitizeTextsForSearch(text: string): string {
  return striptags(text)
}

function combineInstruction(
  instruction: ICompleteRecipeObj['k']['content']['recipeInstructions']
) {
  return instruction.reduce<string>((prev, current) => {
    let result = ''
    current.instruction.forEach((item) => {
      result = result + sanitizeTextsForSearch(item.instruction) + '\n'
    })

    return prev + result
  }, '')
}

function combineIngredient(
  ingredients: ICompleteRecipeObj['k']['content']['recipeIngredients']
) {
  return ingredients.reduce<string>((prev, current) => {
    let result = ''
    current.ingredients.forEach((item) => {
      result =
        result +
        ' ' +
        (item.quantity || '') +
        ' ' +
        (item.unit || '') +
        ' ' +
        item.ingredient +
        '\n'
    })

    return prev + result
  }, '')
}

function writeJSON(dirPath: string, contents: unknown, fileName: string) {
  fs.mkdirSync(dirPath, { recursive: true })

  const strIdx = JSON.stringify(contents)

  fs.writeFileSync(path.join(dirPath, fileName), strIdx, { flag: 'w' })
}

export const genIndex = async () => {
  logger.info('Generating Index')
  const indexableRecipes = await genIndexableRecipes()

  const searchIndex = genSearchIdx(Object.values(indexableRecipes))

  const serverAssetsDir = path.join('server', 'assets')

  // store index
  writeJSON(serverAssetsDir, searchIndex, recipeIndexFileName)

  // store recipeObj
  writeJSON(serverAssetsDir, indexableRecipes, recipeDetails)

  logger.info('Index generation success')
}
