import React, { forwardRef, HTMLProps } from 'react'

import { avatarContainer } from './index.css'

type AvatarProps = {
  size?: 's' | 'm'
  alt?: string
} & HTMLProps<HTMLImageElement>

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  props,
  ref
) {
  const { size = 's', className = '', alt = 'Avatar', ...rest } = props
  return (
    <div
      className={`avatar__container ${
        size === 's' ? 'small' : 'large'
      } ${avatarContainer}`}
    >
      <img
        className={`${className} avatar__img`}
        alt={alt}
        ref={ref}
        width={'100%'}
        height={'100%'}
        {...rest}
      />
    </div>
  )
})
