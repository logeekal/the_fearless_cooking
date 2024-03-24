// create a badge react component

import React, { PropsWithChildren } from 'react'

import { vars } from '../../styles/themes.css'
import { badgeContainer } from './index.css'

export interface BadgeProps {
  backgroundColor?: string
  color?: string
}

export const Badge: React.FC<PropsWithChildren<BadgeProps>> = (props) => {
  const {
    backgroundColor = vars.colors.brand,
    color = vars.colors.textSecondary,
    children,
  } = props
  return (
    <span
      style={{ color, border: `1px solid ${backgroundColor}` }}
      className={`badge ${badgeContainer}`}
    >
      {children}
    </span>
  )
}
