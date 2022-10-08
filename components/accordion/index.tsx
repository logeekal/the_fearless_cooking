import React, {
  forwardRef,
  HTMLProps,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  accordionActionIcon,
  accordionBodyClass,
  accordionTitleClass,
} from './accordion.css'

export type AccordionProps = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  title: any
  isInitiallyExpanded?: boolean
  showSaperator?: boolean
} & HTMLProps<HTMLDivElement>

const Accordion = forwardRef<HTMLDivElement, PropsWithChildren<AccordionProps>>(
  (props, ref) => {
    const {
      className = '',
      isInitiallyExpanded = false,
      children,
      showSaperator = false,
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

    useEffect(() => {
      if (!contentRef.current) return
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentHeight + 25}px`
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
          {props.title}
          <div
            className={`accordion__action ${accordionActionIcon} ${
              isExpanded ? 'expanded' : 'collapsed'
            }`}
          >
            +
          </div>
        </div>
        <div
          className={`accordion__body ${accordionBodyClass}`}
          style={{
            paddingBottom: isExpanded ? '1rem' : '0',
          }}
          ref={contentRef}
        >
          {children}
        </div>
        {showSaperator ? (
          <hr
            className={`${showSaperator ? 'saperator' : ''}`}
            style={{
              marginBlock: '1rem',
            }}
          />
        ) : null}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'

export default Accordion
