import { CommentService } from '../../../services/Comments'
import {
  AddCommentArgs,
  CommentCreatedResponse,
  GetCommentsInputs,
} from '../../../services/types'
import { Comment } from '../../../types/wp-graphql.types'
import { RouteController } from '../types'

export const addCommentController: RouteController<
  AddCommentArgs,
  CommentCreatedResponse
> = async (body) => {
  const commentService = new CommentService()

  return await commentService.addComment(body)
}

export type GetRepliesControllerInput = {
  commentInternalId: string
}

export type GetRepliesControllerOutput = Comment

export const getRepliesController: RouteController<
  GetRepliesControllerInput,
  GetRepliesControllerOutput
> = async (body) => {
  const commentService = new CommentService()
  return await commentService.getReplies(body.commentInternalId)
}

export const getAllCommentsController: RouteController<
  GetCommentsInputs,
  Comment[]
> = async (args) => {
  const commentService = new CommentService()
  const result = await commentService.getAllCommentsPerPost(args)
  return result
}
