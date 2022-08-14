import axios, { AxiosResponse } from 'axios'

import {
    Recipe,
    RecipeCourse,
    RecipeCuisine,
    WpPageInfo,
} from '../types/wp-graphql.types'
import { devLogger, logger } from '../utils/logger'
import { IRecipeContent, IWPGraphQL } from '../utils/types'
import DiskCacheService, { ICacheService } from './CacheService'
import {
    GEN_GET_RECIPE_POSTS_DETAIL_QUERY,
    GET_COURSES,
    GET_COURSES_SUMMARY,
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
    cacheService: ICacheService | undefined

    constructor(
        private clean: boolean = false,
        cacheService: ICacheService = new DiskCacheService()
    ) {
        this.host = process.env.MF_HOST as string

        this.cacheService = cacheService || new DiskCacheService()

        if (!this.host) {
            throw new Error(`Backend host is empty : ${this.host}`)
        }
    }

    getFromCache = <T>(entity: string): T | undefined => {
        if (this.cacheService && !this.clean) {
            if (this.cacheService.get(entity)) {
                devLogger.info(`Returning ${entity} from cache`)
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
                        query: GEN_GET_RECIPE_POSTS_DETAIL_QUERY(
                            100,
                            endCursor
                        ),
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

            logger.debug(response.data)
            const { nodes: recipeNodes, pageInfo } = response.data.data.recipes
            logger.info(
                `Found ${recipeNodes.length} recipes on page : ${pageCounter}`
            )
            result.push(...recipeNodes)
            hasNextPage = pageInfo.hasNextPage
            endCursor = pageInfo.endCursor
            pageCounter++
        }
        logger.info(`Found overall ${result.length} recipes`)
        this.cacheService?.set(ENTITY, JSON.stringify(result))
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

            this.cacheService?.set(ENTITY, JSON.stringify(recipeContent))

            return recipeContent
        } catch (err) {
            throw Error(
                'Error Occured in getRecipeContent : ' + String(response)
            )
        }
    }

    getAllCuisines = async (
        mode: 'DETAIL' | 'SUMMARY' = 'DETAIL'
    ): Promise<Array<RecipeCuisine>> => {
        const ENTITY = 'CUISINE'
        const cuisinesFromCache =
            this.getFromCache<Array<RecipeCuisine>>(ENTITY)

        if (cuisinesFromCache) {
            return cuisinesFromCache
        }

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
                        mode === 'DETAIL' ? GET_CUISINES : GET_CUISINES_SUMMARY,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            const result = response.data.data.recipeCuisines.nodes

            this.cacheService?.set(ENTITY, JSON.stringify(result))

            return result
        } catch (err) {
            logger.error(`Error Fetching cuisines:  ${(err as Error).message}`)
            throw Error()
        }
    }

    getAllCourses = async (
        mode: 'SUMMARY' | 'DETAIL' = 'DETAIL'
    ): Promise<Array<RecipeCourse>> => {
        const ENTITY = `COURSE-${mode}`
        const coursesFromCache = this.getFromCache<Array<RecipeCourse>>(ENTITY)
        if (coursesFromCache) {
            return coursesFromCache
        }

        const response: AxiosResponse<
            IWPGraphQL<{
                recipeCourses: {
                    nodes: Array<RecipeCourse>
                }
            }>
        > = await axios.post(
            `${this.host}/graphql`,
            JSON.stringify({
                query: mode === 'DETAIL' ? GET_COURSES : GET_COURSES_SUMMARY,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        if (!response.data.data.recipeCourses) {
            console.error('No Course found')
            return []
        }

        const result = response.data.data.recipeCourses.nodes

        this.cacheService?.set(ENTITY, JSON.stringify(result))

        return result
    }
}
