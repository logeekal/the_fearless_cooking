// write a top sticky banner component here

import React, { PropsWithChildren } from 'react'

import * as styles from './top.css'

export function TopBanner(props: PropsWithChildren<object>) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 5000)
  }, [])

  return (
    <div className={`${styles.topBannerContainer} ${isOpen ? 'open' : ''}`}>
      {props.children}
    </div>
  )
}
