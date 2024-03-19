import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback } from 'react'

import { Avatar } from '../../components/avatar'
import {
  CommentFormInputs,
  CommentFormProps,
} from '../../components/comments/comment_form'
import { ratingComponent } from '../../components/comments/styles.css'
import { useGetCommentRepliesQuery } from '../../components/hooks/comments/use_get_comment_replies_query'
import { Rating } from '../../components/rating'
import { ApiService } from '../../services/ApiService'
import { Comment, Maybe } from '../../types/wp-graphql.types'
import { singleCommentContainerStyle } from './single_comment.css'

type Props = {
  initialCommentData: Maybe<Comment>
  postId: number
}

export const SingleComment = (props: Props) => {
  const apiService = new ApiService()
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

  const addReply: CommentFormProps['onSubmit'] = useCallback(
    (data: CommentFormInputs) => {
      addReplyMutation.mutate({
        parent: commentWithReplies?.data?.commentId ?? 0,
        content: data.comment,
        status: 'approve',
        meta: {
          rating: data.rating,
        },
        author_name: process.env.NODE_ENV !== 'production' ? 'dev' : data.name,
        author_email:
          process.env.NODE_ENV !== 'production' ? 'dev@dev.com' : data.email,
        author_ip: '88.217.152.15',
        author_user_agent: 'chrome',
        post: postId,
      })
    },
    [addReplyMutation, commentWithReplies?.data?.commentId, postId]
  )

  return (
    <div className={`comment__container ${singleCommentContainerStyle}`}>
      <div className="comment__header">
        <div className="comment__header--avatar">
          <Avatar
            src={`https://robohash.org/${
              commentWithReplies.data?.author?.node?.email ?? 'Dev'
            }`}
            alt={
              commentWithReplies.data?.author?.node?.name
                ? `Avatar of ${commentWithReplies?.data?.author?.node?.name}`
                : undefined
            }
          />
        </div>
        <div className="comment__header-left">
          <p className={'comment__header-name'}>
            {commentWithReplies.data?.author?.node?.name}
          </p>
          <p className="heading">{commentWithReplies.data?.dateGmt}</p>
        </div>
        <div className="comment__header-right">
          <div>
            <Rating
              className={ratingComponent}
              value={commentWithReplies.data?.rating ?? 5}
              readonly
            />
          </div>
        </div>
      </div>
      <span
        dangerouslySetInnerHTML={{
          __html: commentWithReplies?.data?.content ?? '',
        }}
      ></span>
    </div>
  )
}
