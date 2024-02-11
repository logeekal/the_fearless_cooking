import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  Controller,
  ControllerProps,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsFillSendPlusFill } from 'react-icons/bs'
import { FaCircleExclamation } from 'react-icons/fa6'
import Turnstile, { useTurnstile } from 'react-turnstile'
import striptags from 'striptags'

import { vars } from '../../styles/themes.css'
import { Rating } from '../rating'
import { CommentEditor } from './comment_editor'
import { CommentEditorRef } from './comment_editor/editor'
import * as styles from './styles.css'

export type CommentFormInputs = {
  name: string
  email: string
  comment: string
  rating: number
  captcha: boolean
}

export const TURNSTILE_SITE_KEY = {
  NORMAL: '0x4AAAAAAANKStAZSqyBCdYE',
  TEST_ALWAYS_PASS: '1x00000000000000000000AA',
  TEST_ALWAYS_FAIL: '2x00000000000000000000AB',
}

export interface CommentFormProps {
  onSubmit?: (data: CommentFormInputs) => void | Promise<void>
}

export const CommentForm = (props: CommentFormProps) => {
  const { onSubmit: onFormSubmit } = props

  const [loading, setLoading] = useState(false)

  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CommentFormInputs>({
    defaultValues: {
      name: '',
      rating: 0,
      comment: '<p></p>',
    },
    mode: 'onSubmit',
  })

  const turnstile = useTurnstile()

  const nameInputClass = watch('name')?.length > 0 ? 'populated' : 'empty'
  const emailInputClass = watch('email')?.length > 0 ? 'populated' : 'empty'

  const commentEditorRef = useRef<CommentEditorRef>(null)
  const onSubmit: SubmitHandler<CommentFormInputs> = useCallback(
    (data: CommentFormInputs) => {
      if (Object.keys(errors).length > 0) {
        return
      }
      reset({
        name: '',
        rating: 0,
        email: '',
        comment: '<p></p>',
        captcha: false,
      })

      turnstile.reset()
      commentEditorRef?.current?.clearEditor()

      if (onFormSubmit) {
        setLoading(true)
        onFormSubmit?.(data)
          ?.then(() => setLoading(false))
          ?.catch(() => setLoading(false))
          ?.finally(() => setLoading(false))
      }
    },
    [reset, errors, turnstile, onFormSubmit]
  )

  const isSubmitButtonDisabled =
    (watch('name') ?? '').length === 0 ||
    striptags(watch('comment') ?? '').length === 0 ||
    watch('captcha') === false ||
    watch('rating') === 0 ||
    loading

  const submitButton = useMemo(() => {
    return (
      <button
        type="submit"
        className={`${styles.submitButton}`}
        disabled={isSubmitButtonDisabled}
      >
        <p> {'Submit'} </p>
        {loading ? (
          <AiOutlineLoading3Quarters
            className={styles.loadingIcon}
            color={vars.colors.card}
          />
        ) : (
          <BsFillSendPlusFill color={vars.colors.card} />
        )}
      </button>
    )
  }, [isSubmitButtonDisabled, loading])

  const [ratingLabel, setRatingLabel] = useState('Loved it! 👌')

  const handlerRatingChange = useCallback((newRating: number) => {
    switch (newRating) {
      case 1:
      case 2:
        setRatingLabel('Could be better 🤔')
        break
      case 3:
        setRatingLabel('It was okay 🙃')
        break
      case 4:
      case 5:
        setRatingLabel('Loved it! 👌🏽')
        break
    }
  }, [])

  const ratingRenderController: ControllerProps<
    CommentFormInputs,
    'rating'
  >['render'] = useCallback(
    ({ field }) => {
      const { onChange } = field

      const newOnChange = (...args: unknown[]) => {
        onChange(...args)
        handlerRatingChange(args[0] as number)
      }

      return (
        <Rating
          className={styles.ratingComponent}
          {...field}
          onChange={newOnChange}
        />
      )
    },
    [handlerRatingChange]
  )

  return (
    <>
      <form
        className={`${styles.form} comment-form`}
        onSubmit={(ev) => {
          void handleSubmit(onSubmit)(ev)
        }}
      >
        <div className={styles.fieldSet}>
          <div className={styles.field}>
            <input
              className={`${nameInputClass} ${styles.input}`}
              id="comment_name"
              type="text"
              required
              {...register('name', { required: true })}
            />
            <label className={styles.label} htmlFor="comment_name">
              Name*
            </label>
          </div>
          <div className={styles.field}>
            <input
              className={`${emailInputClass} ${styles.input}`}
              id="comment_email"
              type="email"
              {...register('email')}
            />
            <label className={styles.label} htmlFor="comment_email">
              Email
            </label>
          </div>
        </div>

        <div className={styles.fieldSet}>
          <div
            className={`rating-fields__container ${styles.ratingFieldsContainer}`}
          >
            {/* <div className="rating-fields__label">Ratings</div> */}
            <div
              className={`${styles.ratingFieldsWidgetContainer} rating-fields__widget-container`}
            >
              <div
                className={`rating-fields__widget ${styles.ratingFieldsWidget}`}
              >
                <Controller
                  control={control}
                  name="rating"
                  rules={{ required: true }}
                  render={ratingRenderController}
                />
              </div>
              {/* <div */}
              {/*   className={`${styles.ratingFieldsWidgetLabel} rating-fields__widget-label`} */}
              {/* > */}
              {/*   {ratingLabel} */}
              {/* </div> */}
            </div>
          </div>
          <Controller
            control={control}
            name="captcha"
            rules={{
              required: true,
              validate: () => {
                return getValues('captcha')
              },
            }}
            render={() => {
              return (
                <Turnstile
                  className="cf-turnstile"
                  onVerify={() => {
                    setValue('captcha', true)
                  }}
                  onError={() => {
                    setValue('captcha', false)
                  }}
                  sitekey={
                    process.env.NODE_ENV === 'production'
                      ? TURNSTILE_SITE_KEY.NORMAL
                      : TURNSTILE_SITE_KEY.TEST_ALWAYS_PASS
                  }
                />
              )
            }}
          />
        </div>

        {Object.keys(errors).map((field) => {
          const errorText =
            field === 'captcha'
              ? 'Verify that you are a human!'
              : `Invalid value : ${field}`
          return (
            <div className={`${styles.errorContainer}`} key={field}>
              <FaCircleExclamation />
              <p>{errorText}</p>
            </div>
          )
        })}
        <Controller
          control={control}
          name="comment"
          rules={{
            required: true,
            validate: () => {
              return striptags(getValues('comment')) !== ''
            },
          }}
          render={({ field }) => (
            <div
              className={`comment-editor__container ${
                'comment' in errors ? 'error' : ''
              } ${styles.commentEditorContainer}`}
            >
              <CommentEditor
                submitButton={submitButton}
                {...field}
                ref={commentEditorRef}
              />
            </div>
          )}
        />
      </form>
    </>
  )
}
