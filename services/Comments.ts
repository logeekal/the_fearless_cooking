import axios, { AxiosResponse } from 'axios'

import { Comment, Post, Recipe } from '../types/wp-graphql.types'
import { logger } from '../utils/logger'
import { IWPGraphQL } from '../utils/types'
import {
  GET_ALL_COMMENTS_PER_POST,
  GET_ALL_COMMENTS_PER_RECIPE,
  GET_COMMENT_DETAILS,
} from './gqlQueries'
import {
  AddCommentArgs,
  CommentCreatedResponse,
  GetCommentsInputs,
} from './types'

const responseIsPost = (
  response: AxiosResponse<IWPGraphQL<{ post: Post } | { recipe: Recipe }>>
): response is AxiosResponse<IWPGraphQL<{ post: Post }>> => {
  return 'post' in response.data.data
}

const responseIsRecipe = (
  response: AxiosResponse<IWPGraphQL<{ post: Post } | { recipe: Recipe }>>
): response is AxiosResponse<IWPGraphQL<{ recipe: Recipe }>> => {
  return 'recipe' in response.data.data
}

export class CommentService {
  host: string

  constructor() {
    this.host = process.env.MF_HOST as string
  }

  async addComment(comment: AddCommentArgs) {
    // logger.info('Adding Comment')
    const path = 'wp-json/wp/v2/comments'
    const url = `${this.host}/${path}`

    try {
      const response = await axios.post<CommentCreatedResponse>(
        url,
        JSON.stringify(comment),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username: process.env.USERNAME as string,
            password: process.env.TOKEN as string,
          },
        }
      )

      return response.data
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getAllCommentsPerPost(
    args: GetCommentsInputs,
    postType: 'post' | 'recipe' = 'recipe'
  ) {
    logger.info('Getting comments for the post type : ', postType)
    const url = `${this.host}/graphql`

    const query =
      postType === 'post'
        ? GET_ALL_COMMENTS_PER_POST(args.postId, args.first, args.after)
        : GET_ALL_COMMENTS_PER_RECIPE(args.postId, args.first, args.after)

    try {
      const response = await axios.post<
        IWPGraphQL<
          | {
              post: Post
            }
          | { recipe: Recipe }
        >
      >(
        url,
        JSON.stringify({
          query,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username: process.env.USERNAME as string,
            password: process.env.TOKEN as string,
          },
        }
      )

      if (response.data.errors) {
        logger.error(response.data.errors)
        throw new Error(String(response.data.errors))
      }

      logger.trace({ res: response.data })

      if (responseIsPost(response)) {
        const comments = response.data.data.post.comments?.nodes

        return comments && Array.isArray(comments) && comments[0] !== null
          ? (comments as Comment[])
          : ([] as Comment[])
      } else if (responseIsRecipe(response)) {
        const comments = response.data.data.recipe.comments?.nodes

        return comments && Array.isArray(comments) && comments[0] !== null
          ? (comments as Comment[])
          : ([] as Comment[])
      } else {
        throw `Neither post nor recipe is found in response : ${JSON.stringify(
          response.data,
          undefined,
          2
        )}`
      }
    } catch (e) {
      logger.error(e)
      throw e
    }
  }

  async getReplies(commentInternalId: string) {
    logger.info('Getting comment details')
    try {
      const response = await axios.post<IWPGraphQL<{ comment: Comment }>>(
        `${this.host}/graphql`,
        JSON.stringify({
          query: GET_COMMENT_DETAILS(commentInternalId),
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.data.errors)
        throw Error(JSON.stringify(response.data.errors))

      const result = response.data.data.comment
      // logger.info('Fetched comment details')
      return result
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
