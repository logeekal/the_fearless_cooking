import axios from 'axios'

import {
  GetRepliesControllerInput,
  GetRepliesControllerOutput,
} from '../server/routes/controllers/comments'
import { SearchResultType } from '../types/common'
import { Comment } from '../types/wp-graphql.types'
import {
  AddCommentArgs,
  CommentCreatedResponse,
  GetCommentsInputs,
} from './types'

export class ApiService {
  BASE_URL: string

  constructor() {
    this.BASE_URL = '/.netlify/functions'
  }

  async search(term: string): Promise<Array<SearchResultType>> {
    const searchURI = `${this.BASE_URL}/search?term=${term}`

    try {
      const result = await axios.get<Array<SearchResultType>>(searchURI)

      return result.data
    } catch (err) {
      throw new Error(String(err))
    }
  }

  addComment = async (
    args: AddCommentArgs
  ): Promise<CommentCreatedResponse> => {
    const addCommentURI = `${this.BASE_URL}/comments_add`
    try {
      const result = await axios.post<CommentCreatedResponse>(
        addCommentURI,
        args
      )

      return result.data
    } catch (err) {
      throw new Error(String(err))
    }
  }

  getAllCommentsPerPost = async (
    args: GetCommentsInputs
  ): Promise<Comment[]> => {
    const getAllCommentsPerPostUri = `${this.BASE_URL}/comments_all`
    try {
      const result = await axios.post<Comment[]>(getAllCommentsPerPostUri, args)

      return result.data
    } catch (err) {
      throw new Error(String(err))
    }
  }

  getReplies = async (args: GetRepliesControllerInput) => {
    const getReplies = `${this.BASE_URL}/comments/replies`
    try {
      const result = await axios.post<GetRepliesControllerOutput>(
        getReplies,
        args
      )
      return result.data
    } catch (err) {
      throw new Error(String(err))
    }
  }
}
