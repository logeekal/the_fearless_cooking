import { useEffect, useRef, useState } from 'react'

export function useOutsideClickDetector<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isClickOnRef, setIsClickOnRef] = useState<boolean>(true)

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!ref.current) return
      const el = event.target as HTMLElement
      const testElement = ref.current as unknown as HTMLElement
      const selector = `${testElement.tagName}.${Array.from(
        testElement.classList
      ).join('.')}`

      const closest = el.closest(selector)

      if (closest === ref.current) {
        setIsClickOnRef(true)
      } else {
        setIsClickOnRef(false)
      }
    }

    window.addEventListener('click', clickHandler)

    return () => {
      window.removeEventListener('click', clickHandler)
    }
  }, [])

  return { ref, outSideClick: !isClickOnRef }
}
