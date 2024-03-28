import React, { useCallback, useRef } from 'react'

import {
  CommentForm,
  CommentFormInputs,
  CommentFormProps,
} from '../../components/comments/comment_form'
import { useAddReply, useGetComments } from '../../components/hooks/comments'
import { useFingerprint } from '../../components/safe_fingerprint/context'
import { withIntersection } from '../../components/with-intersection'
import { Comment, Maybe } from '../../types/wp-graphql.types'
import { singleCommentContainer } from './index.css'
import { SingleComment } from './single_comment'

type CommentSectionProps = {
  rootComments: Maybe<Array<Maybe<Comment>>>
  postId: number
}

const CommentSectionComp = ({ postId, rootComments }: CommentSectionProps) => {
  const { addReply, addReplyMutation } = useAddReply()

  const { ip, compiled_ua } = useFingerprint()

  const postComments = useGetComments({
    postId,
    initialData: rootComments ?? [],
  })

  const addCommentsRef = useRef<HTMLDivElement>(null)

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
      if (addReplyMutation.isError) {
        throw new Error(addReplyMutation.error.message)
      }
    },
    [addReply, postId, ip, compiled_ua, addReplyMutation]
  )

  return (
    <div className="comment-section">
      {postComments?.map((comment) => {
        return (
          <div
            key={comment?.databaseId}
            className={`single__comment-container ${singleCommentContainer}`}
          >
            <SingleComment initialCommentData={comment} postId={postId} />
          </div>
        )
      })}
      <div id="add-comment" ref={addCommentsRef}>
        <CommentForm onSubmit={onCommentSubmit} />
      </div>
    </div>
  )
}

export const CommentSection = withIntersection<CommentSectionProps>(
  CommentSectionComp,
  {
    rootMargin: '1200px',
  }
)
