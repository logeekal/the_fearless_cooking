import axios, { AxiosResponse } from 'axios'

import {
  Recipe,
  RecipeCourse,
  RecipeCourseToAncestorsRecipeCourseConnection,
  RecipeCuisine,
  WpPageInfo,
} from '../types/wp-graphql.types'
import { devLogger, logger } from '../utils/logger'
import { IRecipeContent, IWPGraphQL } from '../utils/types'
import { ICacheService } from './CacheService'
import {
  GEN_GET_RECIPE_POSTS_DETAIL_QUERY,
  GET_COURSE,
  GET_COURSES,
  GET_COURSES_SUMMARY,
  GET_CUISINE,
  GET_CUISINES,
  GET_CUISINES_SUMMARY,
} from './gqlQueries'

const pagesHeaderName = 'x-wp-totalpages'

interface RecipeResponse {
  recipes: {
    pageInfo: WpPageInfo
    nodes: Array<Recipe>
  }
}

export default class RecipeService {
  host: string

  constructor(
    private cacheService?: ICacheService | undefined,
    private clean: boolean = false
  ) {
    this.host = process.env.MF_HOST as string

    this.cacheService = cacheService

    if (!this.host) {
      throw new Error(`Backend host is empty : ${this.host}`)
    }
  }

  getFromCache = <T>(entity: string): T | undefined => {
    if (this.cacheService && !this.clean) {
      if (this.cacheService.get(entity)) {
        return JSON.parse(
          this.cacheService.get(entity)?.toString() as string
        ) as unknown as T
      }
    }
  }

  getAllRecipePosts = async (): Promise<Array<Recipe>> => {
    const ENTITY = 'RECIPE'
    const recipeFromCache = this.getFromCache<Array<Recipe>>(ENTITY)
    if (recipeFromCache) {
      return recipeFromCache
    }

    let hasNextPage = true
    let endCursor = null
    const result: Array<Recipe> = []
    let pageCounter = 0
    while (hasNextPage) {
      const response: AxiosResponse<IWPGraphQL<RecipeResponse>> =
        await axios.post(
          `${this.host}/graphql`,
          JSON.stringify({
            query: GEN_GET_RECIPE_POSTS_DETAIL_QUERY(100, endCursor),
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

      const { nodes: recipeNodes, pageInfo } = response.data.data.recipes
      logger.debug(
        `Found ${recipeNodes.length} recipes on page : ${pageCounter}`
      )
      result.push(...recipeNodes)
      hasNextPage = pageInfo.hasNextPage
      endCursor = pageInfo.endCursor
      pageCounter++
    }
    logger.info(`Found overall ${result.length} recipes`)
    this.cacheService && this.cacheService.set(ENTITY, JSON.stringify(result))
    return result
  }

  getAllRecipesData = async (): Promise<IRecipeContent> => {
    const ENTITY = 'RECIPE_DATA'
    const recipeDataFromCache = this.getFromCache<IRecipeContent>(ENTITY)
    if (recipeDataFromCache) {
      return recipeDataFromCache
    }

    const recipeURL = `${this.host}/wp-json/deliciousrecipe/v1/recipe?per_page=100`

    const getRecipePage = async (url: string) => {
      return await axios.get<IRecipeContent>(url, {
        auth: {
          username: process.env.USERNAME as string,
          password: process.env?.TOKEN as string,
        },
      })
    }

    const response = await getRecipePage(recipeURL)

    try {
      const recipeContent = response.data

      if (pagesHeaderName in response.headers) {
        // fetch further pages
        const totalPages = parseInt(response.headers[pagesHeaderName])
        if (totalPages == 1) {
          return recipeContent
        }
        let counter = 1
        while (counter != totalPages) {
          counter++
          const newRecipePage = await getRecipePage(
            `${recipeURL}&page=${counter}`
          )
          recipeContent.data.push(...newRecipePage.data.data)
        }
      }

      this.cacheService &&
        this.cacheService.set(ENTITY, JSON.stringify(recipeContent))

      return recipeContent
    } catch (err) {
      throw Error('Error Occured in getRecipeContent : ' + String(response))
    }
  }

  getAllCuisines = async (
    mode: 'DETAIL' | 'SUMMARY' = 'DETAIL',
    count = 10,
    after: string | null = null
  ): Promise<Array<RecipeCuisine>> => {
    const ENTITY = `CUISINE-${mode}`
    const cuisinesFromCache = this.getFromCache<Array<RecipeCuisine>>(ENTITY)

    if (cuisinesFromCache) {
      return cuisinesFromCache
    }

    devLogger.info('Nothing found in Cache: Fetching...')

    try {
      const response: AxiosResponse<
        IWPGraphQL<{
          recipeCuisines: {
            nodes: Array<RecipeCuisine>
          }
        }>
      > = await axios.post(
        `${this.host}/graphql`,
        JSON.stringify({
          query:
            mode === 'DETAIL'
              ? GET_CUISINES(count, after)
              : GET_CUISINES_SUMMARY(count, after),
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const result = response.data.data.recipeCuisines.nodes

      this.cacheService && this.cacheService.set(ENTITY, JSON.stringify(result))

      return result
    } catch (err) {
      logger.error(`Error Fetching cuisines:  ${(err as Error).message}`)
      throw Error()
    }
  }

  getAllCourses = async (
    mode: 'SUMMARY' | 'DETAIL' = 'DETAIL',
    count = 10,
    after: string | null = null
  ): Promise<RecipeCourse[]> => {
    const ENTITY = `COURSE-${mode}`
    const coursesFromCache = this.getFromCache<RecipeCourse[]>(ENTITY)
    if (coursesFromCache) {
      return coursesFromCache
    }
    devLogger.info('Nothing found in Cache: Fetching...')

    const response: AxiosResponse<
      IWPGraphQL<{
        recipeCourses: RecipeCourseToAncestorsRecipeCourseConnection
      }>
    > = await axios.post(
      `${this.host}/graphql`,
      JSON.stringify({
        query:
          mode === 'DETAIL'
            ? GET_COURSES(count, after)
            : GET_COURSES_SUMMARY(count, after),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.data.data.recipeCourses) {
      logger.error('No Course found')
      return []
    }
    const result = response.data.data.recipeCourses.nodes
    if (!result) {
      throw Error('No Course found')
    }

    this.cacheService && this.cacheService.set(ENTITY, JSON.stringify(result))

    return result as RecipeCourse[]
  }

  getCourseSummaryById = async (
    id: number,
    count = 100
  ): Promise<RecipeCourse | undefined> => {
    logger.debug(`Fetching course with id : ${id}`)
    const ENTITY = `COURSE-${id}`
    let hasNextPage = true
    let afterCursor: string | null | undefined = null

    const coursesFromCache = this.getFromCache<RecipeCourse>(ENTITY)
    if (coursesFromCache) {
      return coursesFromCache
    }

    let result: RecipeCourse | undefined
    let pageNo = 0

    while (hasNextPage) {
      logger.debug(`Fetching ${pageNo++}`)
      const response: AxiosResponse<
        IWPGraphQL<{
          recipeCourse: RecipeCourse
        }>
      > = await axios.post(
        `${this.host}/graphql`,
        JSON.stringify({
          query: GET_COURSE(id, afterCursor ?? null, count),
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.data.data?.recipeCourse) {
        logger.error(`No Course found for id : ${id}`)
        return undefined
      }

      const currRecipeCourse = response.data.data.recipeCourse

      hasNextPage = currRecipeCourse.recipes?.pageInfo?.hasNextPage as boolean

      afterCursor = currRecipeCourse.recipes?.pageInfo?.endCursor
      if (!result) {
        result = currRecipeCourse
      } else {
        if (result.recipes) {
          result.recipes.nodes = [
            ...(result.recipes.nodes ?? []),
            ...(currRecipeCourse.recipes?.nodes ?? []),
          ]
        }
      }
    }

    if (!result || !result.recipes || !result.recipes.nodes) {
      logger.error('Some Error Occured')
      return undefined
    }

    /* eslint-disable-next-line max-len*/
    logger.debug(
      `Fetched course with id: ${id} - ${result.recipes.nodes.length} recipes`
    )

    this.cacheService && this.cacheService.set(ENTITY, JSON.stringify(result))

    return result
  }

  getCuisineSummaryById = async (
    id: number,
    count = 100
  ): Promise<RecipeCuisine | undefined> => {
    logger.debug(`Fetching cuisine with id : ${id}`)
    const ENTITY = `CUISINE${id}`
    let hasNextPage = true
    let afterCursor: string | null | undefined = null

    const cuisinesFromCache = this.getFromCache<RecipeCuisine>(ENTITY)
    if (cuisinesFromCache) {
      return cuisinesFromCache
    }

    let result: RecipeCuisine | undefined
    let pageNo = 0

    while (hasNextPage) {
      logger.debug(`Fetching ${pageNo++}`)
      const query = GET_CUISINE(id, afterCursor ?? null, count)
      const response: AxiosResponse<
        IWPGraphQL<{
          recipeCuisine: RecipeCuisine
          errors?: unknown
        }> & { errors?: unknown }
      > = await axios.post(
        `${this.host}/graphql`,
        JSON.stringify({
          query,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.data.data?.recipeCuisine) {
        logger.error(`No Cuisine found for id : ${id}`)
        if ('errors' in response.data) {
          // eslint-disable-next-line
          logger.error(response.data.errors)
        }
        return undefined
      }

      const currRecipeCuisine = response.data.data.recipeCuisine

      hasNextPage =
        (currRecipeCuisine.recipes?.pageInfo?.hasNextPage as boolean) ?? false

      afterCursor = currRecipeCuisine.recipes?.pageInfo?.endCursor
      if (!result) {
        result = currRecipeCuisine
      } else {
        if (result.recipes) {
          result.recipes.nodes = [
            ...(result.recipes.nodes ?? []),
            ...(currRecipeCuisine.recipes?.nodes ?? []),
          ]
        }
      }
    }

    if (!result || !result.recipes || !result.recipes.nodes) {
      logger.error('Some Error Occured')
      return undefined
    }

    /* eslint-disable-next-line max-len*/
    logger.debug(
      `Fetched cuisine with id: ${id} - ${result.recipes.nodes.length} recipes`
    )

    this.cacheService && this.cacheService.set(ENTITY, JSON.stringify(result))

    return result
  }
}
