import React, { useCallback } from 'react'

import {
  CommentForm,
  CommentFormInputs,
  CommentFormProps,
} from '../../components/comments/comment_form'
import { useAddReply, useGetComments } from '../../components/hooks/comments'
import { useFingerprint } from '../../components/safe_fingerprint/context'
import { Comment, Maybe } from '../../types/wp-graphql.types'
import { SingleComment } from './single_comment'

type CommentSectionProps = {
  rootComments: Maybe<Array<Maybe<Comment>>>
  postId: number
}

export const CommentSection = ({
  postId,
  rootComments,
}: CommentSectionProps) => {
  const addReply = useAddReply()

  const { ip, compiled_ua } = useFingerprint()

  const postComments = useGetComments({
    postId,
    initialData: rootComments ?? [],
  })

  const onCommentSubmit: CommentFormProps['onSubmit'] = useCallback(
    async (data: CommentFormInputs) => {
      await addReply({
        parent: 0,
        content: data.comment,
        status: 'approve',
        meta: {
          rating: data.rating,
        },
        author_name: process.env.NODE_ENV !== 'production' ? 'dev' : data.name,
        author_email:
          process.env.NODE_ENV !== 'production' ? 'dev@dev.com' : data.email,
        author_ip: ip,
        author_user_agent: compiled_ua,
        post: postId,
      })
    },
    [addReply, postId, ip, compiled_ua]
  )

  return (
    <div className="comment-section">
      {postComments?.map((comment) => {
        return (
          <SingleComment
            key={comment?.databaseId}
            initialCommentData={comment}
            postId={postId}
          />
        )
      })}
      <CommentForm onSubmit={onCommentSubmit} />
    </div>
  )
}
