import { FC, forwardRef, PropsWithChildren, useCallback, useMemo } from 'react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { PiQuotes } from 'react-icons/pi'
import { useSlate } from 'slate-react'

import { toggleBlock, toggleMark } from './helper'
import { toolbarControlClass, toolbarIconClass } from './styles.css'

interface ToolbarIconProps {
  type?:
    | 'bold'
    | 'italic'
    | 'underlined'
    | 'block-quote'
    | 'numbered-list'
    | 'bulleted-list'
  onClick?: () => void
}

export const ToolBarControl: FC<PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  return (
    <div className={`toolbar-control ${toolbarControlClass}`}>{children}</div>
  )
}

export const ToolbarControlLeft = forwardRef<
  HTMLDivElement,
  PropsWithChildren<Record<string, unknown>>
>((props, ref) => {
  return (
    <div className="toolbar-control-left" ref={ref}>
      {props.children}
    </div>
  )
})

ToolbarControlLeft.displayName = 'ToolbarControlLeft'

export const ToolbarControlRight = forwardRef<
  HTMLDivElement,
  PropsWithChildren<Record<string, unknown>>
>((props, ref) => {
  return (
    <div className="toolbar-control-right" ref={ref}>
      {props.children}
    </div>
  )
})

ToolbarControlRight.displayName = 'ToolbarControlRight'

export const ToolBarIcon = (props: PropsWithChildren<ToolbarIconProps>) => {
  const { type, children } = props
  const editor = useSlate()

  const icon = useMemo(() => {
    switch (type) {
      case 'bold':
        return <AiOutlineBold />
      case 'italic':
        return <AiOutlineItalic />
      case 'underlined':
        return <AiOutlineUnderline />
      case 'block-quote':
        return <PiQuotes />
      case 'numbered-list':
        return <AiOutlineOrderedList />
      case 'bulleted-list':
        return <AiOutlineUnorderedList />
      default:
        return null
    }
  }, [type])

  const handleMouseDown = useCallback(() => {
    if (!type) return
    if (['bold', 'italic', 'underlined'].includes(type)) {
      toggleMark(editor, type)
    } else if (
      ['block-quote', 'numbered-list', 'bulleted-list'].includes(type)
    ) {
      // @ts-expect-error not sure of the error
      toggleBlock(editor, type)
    }
  }, [type, editor])

  if (icon && type)
    return (
      <div className={`${toolbarIconClass}`}>
        <button onMouseDown={handleMouseDown}>{icon}</button>
      </div>
    )

  return <div>{children}</div>
}
