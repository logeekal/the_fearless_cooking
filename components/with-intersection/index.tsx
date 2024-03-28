import {
  IntersectionObserverOptions,
  useIntersectionObserver,
} from '@react-hooks-library/core'
import { FC, useEffect, useRef } from 'react'

export const withIntersection = <P extends object>(
  Component: React.ComponentType<P>,
  options?: IntersectionObserverOptions
) => {
  // return component with useIntersectionObserver hook

  const ComponentWithIntersection: FC<P> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { inView, stop } = useIntersectionObserver(containerRef, options)

    useEffect(() => {
      if (inView) {
        stop()
      }
    }, [inView, stop])

    return (
      <div ref={containerRef}>{inView ? <Component {...props} /> : null}</div>
    )
  }

  ComponentWithIntersection.displayName = `WithIntersection(${
    Component.displayName ?? 'WrappedComp'
  })`

  return ComponentWithIntersection
}
