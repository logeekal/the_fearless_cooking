import React from 'react'
import { useForm } from 'react-hook-form'

import { Captcha } from '../captcha'
import { CommentEditor } from './comment_editor'
import * as styles from './styles.css'

type CommentFormInputs = { name: string; email: string; comment: string }

export const CommentForm = () => {
  const { register, watch } = useForm<CommentFormInputs>()

  const nameInputClass = watch('name')?.length > 0 ? 'populated' : 'empty'
  const emailInputClass = watch('email')?.length > 0 ? 'populated' : 'empty'

  return (
    <>
      <Captcha />
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className={styles.fieldSet}>
          <div className={styles.field}>
            <input
              className={`${nameInputClass} ${styles.input}`}
              id="comment_name"
              type="text"
              {...register('name', { required: true })}
            />
            <label className={styles.label} htmlFor="comment_name">
              Name*
            </label>
          </div>
          <div className={styles.field}>
            <input
              className={`${emailInputClass} ${styles.input}`}
              id="email"
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
            id="turnstile-container"
            className="cf-turnstile"
            data-sitekey="0x4AAAAAAANKStAZSqyBCdYE"
          ></div>
        </div>
        <CommentEditor />
      </form>
    </>
  )
}
