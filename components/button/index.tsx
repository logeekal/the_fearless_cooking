import React, { FC, forwardRef, PropsWithChildren, Ref } from 'react'

import * as styles from './styles.css'

type CommonProps = {
  variant?: 'primary' | 'ghost' | 'text'
  loading?: boolean
  icon?: React.ReactNode
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
  icon,
  className,
  children,
  ...rest
}) => {
  const localClassName = `btn ${variant} ${loading ? 'loading' : ''} ${
    className ?? ''
  } ${styles.buttonVariants[variant]}`
  if (icon) {
    return (
      <button className={localClassName} {...rest}>
        <span>{icon}</span>
        {children}
      </button>
    )
  }
  return (
    <button className={localClassName} {...rest}>
      {children}
    </button>
  )
}

const CustomAnchor: FC<AnchorProps> = ({
  variant = 'primary',
  loading,
  className,
  href,
  children,
  icon,
  ...rest
}) => {
  const localClassName = `btn ${variant} ${loading ? 'loading' : ''} ${
    className ?? ''
  } ${styles.buttonVariants[variant]}`
  if (icon) {
    return (
      <a href={href} className={localClassName} {...rest}>
        <span>{icon}</span>
        {children}
      </a>
    )
  }
  return (
    <a href={href} className={localClassName} {...rest}>
      {children}
    </a>
  )
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
