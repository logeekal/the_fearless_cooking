import axios from 'axios'

import { Comment, Post } from '../types/wp-graphql.types'
import { logger } from '../utils/logger'
import { IWPGraphQL } from '../utils/types'
import { GET_ALL_COMMENTS_PER_POST, GET_COMMENT_DETAILS } from './gqlQueries'
import {
  AddCommentArgs,
  CommentCreatedResponse,
  GetCommentsInputs,
} from './types'

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

  async getAllCommentsPerPost(args: GetCommentsInputs) {
    logger.info('Getting comments for the post')
    const url = `${this.host}/graphql`

    try {
      const response = await axios.post<IWPGraphQL<Post>>(
        url,
        JSON.stringify({
          query: GET_ALL_COMMENTS_PER_POST(args.postId, args.first, args.after),
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
        throw new Error(JSON.stringify(response.data.errors))
      }

      const comments = response.data.data.comments?.nodes

      return comments && Array.isArray(comments) && comments[0] !== null
        ? (comments as Comment[])
        : ([] as Comment[])
    } catch (e) {
      console.error(e)
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
