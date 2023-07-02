import axios, { AxiosResponse } from 'axios'

import { Post, WpPageInfo } from '../types/wp-graphql.types'
import { logger } from '../utils/logger'
import { IWPGraphQL } from '../utils/types'
import { ICacheService } from './CacheService'
import { GEN_GET_POSTS_DETAIL_QUERY } from './gqlQueries'

interface PostResponse {
  posts: {
    pageInfo: WpPageInfo
    nodes: Array<Post>
  }
}

export default class PostService {
  host: string

  constructor(private cacheService?: ICacheService, private clean?: boolean) {
    this.host = process.env.MF_HOST as string

    this.cacheService = cacheService

    if (!this.host) {
      throw new Error(`Backed host is empty : ${this.host}`)
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

  getAllPosts = async (): Promise<Array<Post>> => {
    const ENTITY = 'POST'
    const recipeFromCache = this.getFromCache<Array<Post>>(ENTITY)
    if (recipeFromCache) {
      return recipeFromCache
    }

    let hasNextPage = true
    let endCursor = null
    let result: Array<Post> = []
    let pageCounter = 0
    while (hasNextPage) {
      const response: AxiosResponse<IWPGraphQL<PostResponse>> =
        await axios.post(
          `${this.host}/graphql`,
          JSON.stringify({
            query: GEN_GET_POSTS_DETAIL_QUERY(100, endCursor),
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

      const { nodes: postNodes, pageInfo } = response.data.data.posts
      logger.debug(`Found ${postNodes.length} posts on page : ${pageCounter}`)

      result = postNodes.map((node) => ({
        ...node,
        uri: `/blog${node.uri}`,
      }))
      hasNextPage = pageInfo.hasNextPage
      endCursor = pageInfo.endCursor
      pageCounter++
    }
    logger.info(`Found overall ${result.length} posts`)
    this.cacheService && this.cacheService.set(ENTITY, JSON.stringify(result))
    return result
  }
}
