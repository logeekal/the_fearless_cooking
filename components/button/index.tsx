import React, { FC, forwardRef, PropsWithChildren, Ref } from 'react'

import * as styles from './styles.css'

type CommonProps = {
  variant?: 'primary' | 'ghost'
  loading?: boolean
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref: Ref<HTMLButtonElement>
  }

type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    ref: Ref<HTMLAnchorElement>
  }

const CustomButton: FC<ButtonProps> = ({
  variant = 'primary',
  loading,
  className,
  ...rest
}) => {
  const localClassName = `btn ${variant} ${loading ? 'loading' : ''} ${
    className ?? ''
  } ${styles.button}`
  return <button className={localClassName} {...rest} />
}

const CustomAnchor: FC<AnchorProps> = ({
  variant = 'primary',
  loading,
  className,
  href,
  ...rest
}) => {
  const localClassName = `btn ${variant} ${loading ? 'loading' : ''} ${
    className ?? ''
  } ${styles.button}`
  return <a href={href} className={localClassName} {...rest} />
}

const isAnchor = (props: AnchorProps | ButtonProps): props is AnchorProps =>
  'href' in props

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PropsWithChildren<ButtonProps | AnchorProps>
>((props, ref) => {
  if (isAnchor(props)) {
    return <CustomAnchor {...props} ref={ref as Ref<HTMLAnchorElement>} />
  }
  return <CustomButton {...props} ref={ref as Ref<HTMLButtonElement>} />
})

Button.displayName = 'CustomButton'
