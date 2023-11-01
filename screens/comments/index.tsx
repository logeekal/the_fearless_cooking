import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'

import { ApiService } from '../../services/ApiService'
import { Comment, Maybe } from '../../types/wp-graphql.types'

type Props = {
  initialCommentData: Maybe<Comment>
  postId: number
}

export const CommentComponent = (props: Props) => {
  const apiService = new ApiService()
  const [newReply, setNewReply] = useState('')
  const queryClient = useQueryClient()
  const { initialCommentData, postId } = props

  const commentQuery = useQuery({
    queryKey: ['commentReplies', initialCommentData?.id],
    queryFn: () =>
      initialCommentData?.id
        ? apiService.getReplies({ commentInternalId: initialCommentData?.id })
        : [],
    initialData: initialCommentData,
  })

  const addReplyMutation = useMutation({
    mutationFn: apiService.addComment,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['commentReplies'],
      }),
  })

  const addReply = useCallback(() => {
    addReplyMutation.mutate({
      parent: commentQuery.data?.commentId ?? 0,
      content: newReply,
      status: 'approve',
      meta: {
        rating: 4,
      },
      author_name: 'abc',
      author_ip: '88.217.152.15',
      author_user_agent: 'chrome',
      post: postId,
    })
  }, [addReplyMutation, commentQuery.data?.commentId, newReply, postId])

  return (
    <div>
      <p>{commentQuery.data?.content}</p>
      <p> {`Replies: ${commentQuery.data?.replies?.edges?.length ?? 0}`}</p>
      <textarea
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
      ></textarea>
      <button onClick={addReply}>{'Submit'}</button>
    </div>
  )
}
