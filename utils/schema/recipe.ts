import striptags from 'striptags'
import { Duration } from 'tinyduration'

import { Maybe, Recipe } from '../../types/wp-graphql.types'
import { devLogger } from '../logger'
import { ICompleteRecipe, RecipeContent } from '../types'

const genBreadcrumbSchemaBasedOnCuisinesAndCourses = (
  cuisineOrCourseObject: Array<{
    name: Maybe<string>
    uri: Maybe<string>
  }>,
  post: Recipe
) => {
  return cuisineOrCourseObject
    ?.filter((cuisine) => !!cuisine.uri)
    .map((cuisine) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://thefearlesscooking.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: cuisine?.name ?? '',
          item: `https://thefearlesscooking.com${cuisine?.uri ?? ''}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
        },
      ],
    }))
}

const genRecipeBreadcrumbSchema = (post: Recipe) => {
  if (post.uri === undefined) throw Error('Recipe URI is undefined')
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thefearlesscooking.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Recipes',
        item: 'https://thefearlesscooking.com/recipes',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
      },
    ],
  }
}

const genRecipeSchema = (
  post: Recipe,
  recipe: ICompleteRecipe['content'],
  recipeVideoId: string | undefined,
  convertTime = true
) => {
  if (!recipe) return null
  devLogger.debug(`Generating Recipe Schema for  : ${post.title || '???????'} `)
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
    prepTime: convertTime
      ? convertDurationToISO8601(recipe.calculatedDurations.prepTimeInDurations)
      : recipe.prepTime,
    cookTime: convertTime
      ? convertDurationToISO8601(recipe.calculatedDurations.cookTimeInDurations)
      : recipe.cookTime,
    totalTime: convertTime
      ? convertDurationToISO8601(recipe.calculatedDurations.totalDuration)
      : recipe.totalDuration,
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
  return resultSchema
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

export const convertDurationToISO8601 = (duration: Duration): string => {
  let result = 'PT'

  if (duration.hours && duration.hours > 0) {
    result += `${duration.hours}H`
  }

  if (duration.minutes && duration.minutes > 0) {
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

export const genCombinedRecipeSchema = (
  post: Recipe,
  recipe: ICompleteRecipe['content'],
  recipeVideoId: string | undefined,
  convertTime = true
) => {
  const cuisines = [
    ...(post.recipeCuisines?.nodes
      ?.filter((cuisine) => !!cuisine?.name && !!cuisine?.uri)
      .map((cuisine) => ({
        name: String(cuisine?.name),
        uri: String(cuisine?.uri),
      })) ?? []),
  ]
  const courses = [
    ...(post.recipeCourses?.nodes?.map((course) => ({
      name: String(course?.name),
      uri: String(course?.uri),
    })) ?? []),
  ]

  return JSON.stringify([
    genRecipeSchema(post, recipe, recipeVideoId, convertTime) ?? {},
    genRecipeBreadcrumbSchema(post) ?? {},
    ...genBreadcrumbSchemaBasedOnCuisinesAndCourses(
      [...cuisines, ...courses],
      post
    ),
  ])
}
