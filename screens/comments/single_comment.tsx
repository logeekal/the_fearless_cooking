import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { IoIosChatbubbles } from 'react-icons/io'

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
import { convertWPtimeToReadabletime } from '../../utils/time_utils'
import {
  commentHeader,
  commentHeaderBody,
  commentHeaderDate,
  commentHeaderLeft,
  commentHeaderName,
  commentHeaderReplies,
  commentHeaderRight,
  commentRepliesContainer,
  repliesContainer,
  singleCommentContainerStyle,
} from './single_comment.css'

type Props = {
  initialCommentData: Maybe<Comment>
  postId: number
  isLeaf?: boolean
}

export const SingleComment = (props: Props) => {
  const apiService = new ApiService()
  const [showReplies, setShowReplies] = React.useState(false)
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

  const handleToggleReplies = useCallback(() => {
    setShowReplies((prev) => !prev)
  }, [])

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
    <div className={`commentReply__container ${commentRepliesContainer}`}>
      <div className={`comment__container ${singleCommentContainerStyle}`}>
        <div className={`comment__header ${commentHeader}`}>
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
          <div className={`comment__header-left ${commentHeaderLeft}`}>
            <span
              style={{ lineHeight: '1.5rem' }}
              className={`comment__header-name ${commentHeaderName}`}
            >
              {commentWithReplies.data?.author?.node?.name}
            </span>
            <span
              style={{ lineHeight: '2rem' }}
              className={`${commentHeaderDate}`}
            >
              {convertWPtimeToReadabletime(
                `${commentWithReplies.data?.dateGmt ?? Date.now()}Z`
              )}
            </span>
          </div>
          <div className={`comment__header-right ${commentHeaderRight}`}>
            <div>
              <Rating
                className={ratingComponent}
                value={commentWithReplies.data?.rating ?? 5}
                readonly
                size="small"
              />
            </div>
            <div
              className={`comment__header-replies ${commentHeaderReplies}`}
              onClick={handleToggleReplies}
            >
              <div style={{ display: 'flex', margin: 'auto' }}>
                <IoIosChatbubbles size={15} />
              </div>
              <div>{commentWithReplies?.data?.replies?.nodes?.length ?? 0}</div>
            </div>
          </div>
        </div>
        <div className={`comment__body ${commentHeaderBody}`}>
          <span
            dangerouslySetInnerHTML={{
              __html: commentWithReplies?.data?.content ?? '',
            }}
          ></span>
        </div>
      </div>
      {showReplies && (
        <div className={`comment__replies ${repliesContainer}`}>
          {commentWithReplies?.data?.replies?.nodes?.map((comment) => (
            <SingleComment
              key={comment?.commentId}
              initialCommentData={comment}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
