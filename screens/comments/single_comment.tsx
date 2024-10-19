import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect } from 'react'
import { IoIosChatbubbles } from 'react-icons/io'
import { MdReply } from 'react-icons/md'

import { Avatar } from '../../components/avatar'
import { Button } from '../../components/button'
import {
  CommentForm,
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
  commentActions,
  commentActionsLeft,
  commentActionsRight,
  commentHeader,
  commentHeaderBody,
  commentHeaderDate,
  commentHeaderLeft,
  commentHeaderName,
  commentHeaderReplies,
  commentRepliesContainer,
  repliesContainer,
  singleCommentContainerStyle,
} from './single_comment.css'

type Props = {
  initialCommentData: Maybe<Comment>
  postId: number
  isLeaf?: boolean
  showReplies?: boolean
}

export const SingleComment = (props: Props) => {
  const { showReplies = true } = props
  const apiService = new ApiService()
  const [shouldShowReplies, setShouldShowReplies] = React.useState(showReplies)
  const queryClient = useQueryClient()
  const { initialCommentData, postId } = props
  const [isReplying, setIsReplying] = React.useState(false)

  useEffect(() => {
    setShouldShowReplies(showReplies)
  }, [showReplies])

  const commentWithReplies = useGetCommentRepliesQuery(
    {},
    initialCommentData ?? undefined,
    props.isLeaf
  )

  const addReplyMutation = useMutation({
    mutationFn: apiService.addComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['commentReplies'],
      })
      toggleReplying()
      setShouldShowReplies(true)
    },
  })

  const handleToggleReplies = useCallback(() => {
    setShouldShowReplies((prev) => !prev)
  }, [])

  const toggleReplying = useCallback(() => {
    setIsReplying((prev) => !prev)
  }, [])

  const addReply: CommentFormProps['onSubmit'] = useCallback(
    async (data: CommentFormInputs) => {
      await addReplyMutation.mutateAsync({
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
      if (addReplyMutation.isError) {
        throw new Error(addReplyMutation.error.message)
      }
      if (addReplyMutation.isSuccess) {
        toggleReplying()
      }
    },
    [
      addReplyMutation,
      commentWithReplies?.data?.commentId,
      postId,
      toggleReplying,
    ]
  )

  const [commentPostedDate, setCommentPostedDate] = React.useState<
    string | null
  >(null)

  const getCommentPostedDate = useCallback(() => {
    if (commentWithReplies.data?.dateGmt) {
      return convertWPtimeToReadabletime(`${commentWithReplies.data?.dateGmt}Z`)
    }
    return null
  }, [commentWithReplies])

  useEffect(() => {
    setCommentPostedDate(getCommentPostedDate())
    const intervalId = setInterval(() => {
      setCommentPostedDate(getCommentPostedDate())
    }, 1000 * 60)

    return () => clearInterval(intervalId)
  }, [getCommentPostedDate])

  const commentContent = commentWithReplies.data?.content
    ? `${commentWithReplies?.data?.content}`
    : null

  if (!commentContent) {
    return null
  }

  return (
    <div className={`commentReply__container ${commentRepliesContainer}`}>
      <div
        className={`comment__container ${
          props.isLeaf ? 'leaf' : ''
        } ${singleCommentContainerStyle}`}
      >
        <div className={`comment__header ${commentHeader}`}>
          <div className="comment__header--avatar">
            <Avatar
              src={`https://robohash.org/${
                commentWithReplies.data?.author?.node?.name ?? 'Dev'
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
          </div>
          <div className="comment__header-right">
            <span
              style={{ lineHeight: '2rem' }}
              className={`${commentHeaderDate}`}
            >
              {commentPostedDate}
            </span>
          </div>
        </div>
        <div className={`comment__body ${commentHeaderBody}`}>
          <span
            id="comment-body"
            dangerouslySetInnerHTML={{
              __html: commentContent,
            }}
          />
        </div>

        {!props.isLeaf ? (
          <div className={`comment__actions ${commentActions}`}>
            <div className={`comment__actions-left ${commentActionsLeft}`}>
              <div className="comment__actions-reply">
                <Button
                  variant="text"
                  icon={<MdReply />}
                  onClick={toggleReplying}
                >
                  Reply
                </Button>
              </div>
            </div>
            <div className={`comment__actions-right ${commentActionsRight}`}>
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
                <div>
                  {commentWithReplies?.data?.replies?.nodes?.length ?? 0}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {isReplying ? <CommentForm onSubmit={addReply} isReply /> : null}
      </div>
      {shouldShowReplies &&
      (commentWithReplies?.data?.replies?.nodes?.length ?? -1 > 0) ? (
        <div className={`comment__replies ${repliesContainer}`}>
          {commentWithReplies?.data?.replies?.nodes?.map((comment) => (
            <SingleComment
              key={comment?.commentId}
              initialCommentData={comment}
              postId={postId}
              isLeaf
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
