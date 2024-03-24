// create a badge react component

import React, { PropsWithChildren } from 'react'

import { vars } from '../../styles/themes.css'
import { badgeContainer, badgeContent, badgeIcon } from './index.css'

export interface BadgeProps {
  backgroundColor?: string
  color?: string
  icon?: React.ReactNode
  negative?: boolean
}

export const Badge: React.FC<PropsWithChildren<BadgeProps>> = (props) => {
  const {
    backgroundColor = vars.colors.brand,
    color = vars.colors.textSecondary,
    children,
    icon,
    negative = false,
  } = props
  return (
    <span
      style={{
        border: `1px solid ${backgroundColor}`,
        backgroundColor: !negative ? vars.colors.card : backgroundColor,
        color: !negative ? color : vars.colors.card,
      }}
      className={`badge ${badgeContainer}`}
    >
      {icon && (
        <span
          style={{
            borderRightColor: !negative ? backgroundColor : vars.colors.card,
          }}
          className={`icon ${badgeIcon}`}
        >
          {icon}
        </span>
      )}
      <span className={`content ${badgeContent}`}>{children}</span>
    </span>
  )
}
