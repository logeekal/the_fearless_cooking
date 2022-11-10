import striptags from 'striptags'

import { IDuration } from '../../types/common'
import { Recipe } from '../../types/wp-graphql.types'
import { devLogger } from '../logger'
import { ICompleteRecipe, RecipeContent } from '../types'

const genRecipeSchema = (
  post: Recipe,
  recipe: ICompleteRecipe['content'],
  recipeVideoId: string | undefined
) => {
  if (!recipe) return null
  devLogger.info(`Generating Recipe Schema for  : ${post.title || '???????'} `)
  let videoId = null
  videoId = recipeVideoId

  const recipeImage = post.featuredImage?.node?.mediaDetails?.sizes?.map(
    (size) => size?.sourceUrl
  )

  const recipeCourses =
    post.recipeCourses?.nodes && post.recipeCourses?.nodes?.length > 0
      ? post.recipeCourses?.nodes[0]?.name
      : ''

  const recipeCuisine =
    post.recipeCuisines?.nodes && post.recipeCuisines?.nodes?.length > 0
      ? post.recipeCuisines?.nodes[0]?.name
      : ''

  const resultSchema: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: post.title,
    image: recipeImage,
    author: {
      '@type': 'Person',
      name: 'The Fearless Cooking',
    },
    datePublished: post.dateGmt,
    description: recipe.recipeSubtitle,
    prepTime: convertDurationToISO8601(
      recipe.calculatedDurations.prepTimeInDurations
    ),
    cookTime: convertDurationToISO8601(
      recipe.calculatedDurations.cookTimeInDurations
    ),
    totalTime: convertDurationToISO8601(
      recipe.calculatedDurations.totalDuration
    ),
    keywords: recipe.recipeKeywords,
    recipeYield: recipe.noOfServings,
    recipeCategory: recipeCourses,
    recipeCuisine: recipeCuisine,
    recipeIngredient: getRecipeIngredients(recipe.recipeIngredients),
    recipeInstructions: getRecipeInstructions(recipe, post),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  }

  if (videoId)
    resultSchema['video'] = {
      ...getVideoSegment(videoId, post, recipe),
    }
  return JSON.stringify(resultSchema)
}

function getVideoSegment(videoId: string, post: Recipe, recipe: RecipeContent) {
  if (!videoId) {
    return {}
  }

  const vidUrl = `https://youtube.com/v/${videoId}`
  const thumbURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return {
    '@type': 'VideoObject',
    name: post.title,
    description: striptags(recipe.recipeDescription) || recipe.recipeSubtitle,
    contentUrl: vidUrl,
    thumbnailUrl: [thumbURL],
    uploadDate: post.date,
  }
}

const getRecipeIngredients = (
  recipeIng: RecipeContent['recipeIngredients']
): string[] => {
  const totalIngredients: string[] = []
  //devLogger.info(recipeIng)
  recipeIng.forEach((ingredientSection) => {
    const subIngredients = ingredientSection.ingredients.map((ingredient) => {
      return `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}, ${ingredient.notes}`
    })
    totalIngredients.push(...subIngredients)
  })

  return totalIngredients
}

const getRecipeInstructions = (recipe: RecipeContent, post: Recipe) => {
  const instructions = recipe.recipeInstructions
  const result = []
  const recipeImage = post.featuredImage?.node?.mediaDetails?.sizes?.map(
    (size) => size?.sourceUrl
  )
  for (const instruction of instructions) {
    const sectionInstructions = instruction.instruction
      .filter((step) => step.instruction.trim().length > 0)
      .map((step, index) => {
        const stepURLID = getStepURL(
          instruction.sectionTitle,
          step.instructionTitle,
          index + 1
        )
        const completeURL = `https://thefearlesscooking.com${post.uri.slice(
          0,
          -1
        )}#${stepURLID}`
        return {
          '@type': 'HowToStep',
          text: step.instruction,
          name:
            step.instructionTitle ||
            (instruction.sectionTitle &&
              `${instruction.sectionTitle}-step-${index + 1}`),
          image: step.image || recipeImage,
          //video: getVideoSegment(videoId, post, recipe),
          url: completeURL,
        }
      })
    result.push(...sectionInstructions)
  }

  return result
}

export const convertDurationToISO8601 = (duration: IDuration): string => {
  let result = 'PT'

  if (duration.hours > 0) {
    result += `${duration.hours}H`
  }

  if (duration.minutes > 0) {
    result += `${duration.minutes}M`
  }

  return result
}

export const getStepURL = (
  sectionTitle: string,
  stepTitle: string,
  stepCounter: number
) => {
  let stepURL = ''
  if (sectionTitle) {
    stepURL = stepURL + sectionTitle.toLowerCase().replace(' ', '-')
    stepURL += '-'
  } else {
    stepURL += ''
  }

  if (stepTitle) {
    stepURL += stepTitle.toLowerCase().replace(' ', '-')
    stepURL += '-'
  } else {
    stepURL += ''
  }

  stepURL += `step-${stepCounter}`

  return stepURL
}

export default genRecipeSchema
