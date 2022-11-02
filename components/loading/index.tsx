import React from 'react'

import { loader, loaderContainer } from './loader.css'

type LoaderProps = {
  full?: boolean
}

const Loader = (props: LoaderProps) => {
  const { full = false } = props
  return (
    <div
      className={`loader__container ${full ? 'full' : ''} ${loaderContainer}`}
    >
      <div className={`loader ${loader}`}></div>
    </div>
  )
}

export default Loader
