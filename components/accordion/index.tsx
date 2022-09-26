import React, {
  forwardRef,
  HTMLProps,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import {
  accordionActionIcon,
  accordionBodyClass,
  accordionTitleClass,
} from './accordion.css'

export type AccordionProps = {
  title: ReactElement
  isInitiallyExpanded: boolean
} & HTMLProps<HTMLDivElement>

const Accordion = forwardRef<HTMLDivElement, PropsWithChildren<AccordionProps>>(
  (props, ref) => {
    const {
      className = '',
      isInitiallyExpanded = false,
      children,
      title: Title,
    } = props
    const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded)
    const [contentHeight, setContentHeight] = useState(0)

    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!contentRef.current) return
      setContentHeight(contentRef.current.scrollHeight)
    }, [children])

    const toggleState = () => {
      setIsExpanded((prev) => !prev)
    }

    useLayoutEffect(() => {
      if (!contentRef.current) return
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentHeight}px`
        : '0px'
    }, [isExpanded, contentHeight])

    return (
      <div
        className={`accordion ${className} ${
          isExpanded ? 'expanded' : 'collapsed'
        }`}
        ref={ref}
      >
        <div
          className={`btn accordion__title ${accordionTitleClass}`}
          onClick={toggleState}
        >
          {Title}
          <div
            className={`accordion__action ${accordionActionIcon} ${
              isExpanded ? 'expanded' : 'collapsed'
            }`}
          >
            +
          </div>
        </div>
        <hr />
        <div
          className={`accordion__body ${accordionBodyClass}`}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'

export default Accordion
