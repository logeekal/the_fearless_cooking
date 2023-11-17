import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'

import { useGetCommentRepliesQuery } from '../../components/hooks/comments/use_get_comment_replies_query'
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

  const commentWithReplies = useGetCommentRepliesQuery(
    {},
    initialCommentData ?? undefined
  )

  const addReplyMutation = useMutation({
    mutationFn: apiService.addComment,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['commentReplies'],
      }),
  })

  const addReply = useCallback(() => {
    addReplyMutation.mutate({
      parent: commentWithReplies?.data?.commentId ?? 0,
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
  }, [addReplyMutation, commentWithReplies?.data?.commentId, newReply, postId])

  return (
    <div>
      <p>{commentWithReplies?.data?.content}</p>
      <p>
        {`Replies: ${commentWithReplies?.data?.replies?.edges?.length ?? 0}`}
      </p>
      <textarea
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
      ></textarea>
      <button onClick={addReply}>{'Submit'}</button>
    </div>
  )
}
