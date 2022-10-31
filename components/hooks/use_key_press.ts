import { useEffect, useState } from 'react'
import { getWindow } from 'ssr-window'

const window = getWindow()

export default function useKeyPress(
  key: string
): [boolean, (value: boolean) => void] {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)

  useEffect(() => {
    if (keyPressed) setKeyPressed(false)
  }, [keyPressed])

  useEffect(() => {
    const cleanup = () => {
      window.removeEventListener('keydown', keyCodeListener)
    }

    const keyCodeListener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault()
        setKeyPressed(true)
      } else if (key.toLowerCase() === 'ctrl' && e.ctrlKey) {
        e.preventDefault()
        setKeyPressed(true)
      }
    }

    window.addEventListener('keydown', keyCodeListener)

    return cleanup
  }, [key])

  return [keyPressed, setKeyPressed]
}
