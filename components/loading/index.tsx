import React from 'react'

import { loader, loaderContainer } from './loader.css'

type LoaderProps = {
  full?: boolean
  size?: string
  status: 'loading' | 'success' | 'error'
}

const Loader = (props: LoaderProps) => {
  const { full = false, size = '30px', status } = props
  return (
    <div
      className={`loader__container ${full ? 'full' : ''} ${loaderContainer}`}
    >
      <div style={{ width: size, height: size }}>
        <div className={`loader ${loader} ${status}`}></div>
      </div>
    </div>
  )
}

export default Loader
