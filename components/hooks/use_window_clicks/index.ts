import { useEffect, useState } from 'react'

const useWindowClick = () => {
  const [clickTargetRef, setClickTargetRef] = useState<null | Element>(null)

  useEffect(() => {
    window.addEventListener('click', clickHandler)

    return () => window.removeEventListener('click', clickHandler)
  }, [])
  const clickHandler = (ev: MouseEvent) => {
    setClickTargetRef(ev.target as Element)
  }

  return clickTargetRef
}

export default useWindowClick
