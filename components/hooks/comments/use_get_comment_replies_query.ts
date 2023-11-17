import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ApiService } from '../../../services/ApiService'
import { Comment } from '../../../types/wp-graphql.types'

export const useGetCommentRepliesQuery = (
  options: Omit<
    UseQueryOptions<Comment | undefined>,
    'queryKey' | 'queryFn' | 'initialData'
  >,
  initialCommentData?: Comment
) => {
  const apiService = new ApiService()
  const commentQuery = useQuery({
    queryKey: ['commentReplies', initialCommentData?.id],
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
