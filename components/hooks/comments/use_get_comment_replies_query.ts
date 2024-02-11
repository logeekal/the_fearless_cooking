import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ApiService } from '../../../services/ApiService'
import { Comment } from '../../../types/wp-graphql.types'
import { queryKey } from './constants'

export const useGetCommentRepliesQuery = (
  options: Omit<
    UseQueryOptions<Comment | undefined>,
    'queryKey' | 'queryFn' | 'initialData'
  >,
  initialCommentData?: Comment
) => {
  const apiService = new ApiService()
  const commentQuery = useQuery({
    queryKey: [queryKey.COMMENT_REPLIES, initialCommentData?.id],
    queryFn: () =>
      initialCommentData?.id
        ? apiService.getReplies({
            commentInternalId: initialCommentData?.id,
          })
        : Promise.resolve(undefined),
    initialData: initialCommentData,
    ...options,
  })

  return commentQuery
}
