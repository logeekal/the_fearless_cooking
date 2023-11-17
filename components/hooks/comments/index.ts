import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useCallback } from 'react'

import { ApiService } from '../../../services/ApiService'
import { AddCommentArgs, CommentCreatedResponse } from '../../../services/types'
import { Comment } from '../../../types/wp-graphql.types'
import { queryKey } from './constants'

export const useAddReply = (parentComment: Comment) => {
  const apiService = new ApiService()
  const queryClient = useQueryClient()
  const addReplyMutation = useMutation({
    mutationFn: apiService.addComment,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [queryKey.COMMENT_REPLIES, parentComment.id],
      }),
  })

  const addReply = useCallback(
    (args: AddCommentArgs) => {
      addReplyMutation.mutate(args)
    },
    [addReplyMutation]
  )

  return addReply
}

export const useGetComments = (
  postId: number,
  page: number,
  initialData?: CommentCreatedResponse[],
  options?: UseQueryOptions<CommentCreatedResponse[]>
) => {
  const apiService = new ApiService()

  const comments = useQuery({
    queryKey: [queryKey.ALL_COMMENTS_PER_POST, postId, page],
    queryFn: () =>
      apiService.getAllCommentsPerPost({
        postId,
      }),
    initialData,
    ...options,
  })

  return comments
}
