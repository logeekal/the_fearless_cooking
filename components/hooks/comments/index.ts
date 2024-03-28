import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { ApiService } from '../../../services/ApiService'
import { AddCommentArgs } from '../../../services/types'
import { Comment, Maybe } from '../../../types/wp-graphql.types'
import { queryKey } from './constants'

export const useAddReply = (parentComment?: Comment) => {
  const apiService = new ApiService()
  const queryClient = useQueryClient()
  const addReplyMutation = useMutation({
    mutationFn: apiService.addComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKey.COMMENT_REPLIES, parentComment?.id],
      })

      await queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_COMMENTS_PER_POST],
      })
    },
  })

  const addReply = useCallback(
    async (args: AddCommentArgs) => {
      await addReplyMutation.mutateAsync(args)
    },
    [addReplyMutation]
  )

  return { addReply, addReplyMutation } as const
}

interface UseGetCommentsArgs {
  postId: number
  page?: number
  initialData?: Maybe<Array<Maybe<Comment>>>
}

export const useGetComments = ({
  postId,
  page,
  initialData,
}: UseGetCommentsArgs) => {
  const apiService = new ApiService()

  const comments = useQuery({
    queryKey: [queryKey.ALL_COMMENTS_PER_POST, postId, page],
    queryFn: () =>
      apiService.getAllCommentsPerPost({
        postId,
      }),
    initialData,
  })

  return comments.data
}
