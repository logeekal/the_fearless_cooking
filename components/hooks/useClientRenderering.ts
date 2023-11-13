import { useEffect, useState } from 'react'

export const useClientRendering = () => {
  const [isWindowAvailable, setIsWindowAvailable] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') setIsWindowAvailable(false)
    setIsWindowAvailable(true)
  }, [])

  return isWindowAvailable
}
