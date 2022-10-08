import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [dim, setDim] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handler = () => {
      setDim({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handler)

    setDim({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return dim
}
