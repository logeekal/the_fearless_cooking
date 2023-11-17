import {
  useIntersectionObserver,
  useLocalStorage,
} from '@react-hooks-library/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsFillSendPlusFill } from 'react-icons/bs'
import { BaseEditor, createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'

import { vars } from '../../../styles/themes.css'
import * as classes from './styles.css'
import {
  ToolBarControl,
  ToolbarControlLeft,
  ToolbarControlRight,
  ToolBarIcon,
} from './toolbar'

interface CommentEditorProps {
  onSubmit?: (text: string) => void
}
import './types'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export const CommentEditor = (props: CommentEditorProps) => {
  const { onSubmit } = props

  const [commentValue, setCommentValue] = useLocalStorage<Descendant[]>(
    'current.comment.value',
    initialValue,
    {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
  )

  const commentsContainerRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<BaseEditor & ReactEditor>()

  const { inView, stop } = useIntersectionObserver(commentsContainerRef)

  useEffect(() => {
    if (editor || !inView) return

    setEditor(withReact(withHistory(createEditor())))
    stop()
  }, [editor, inView, stop])

  const handleValueChange = useCallback(
    (value: Descendant[]) => {
      setCommentValue(value)
    },
    [setCommentValue]
  )

  const renderElement = useCallback(
    ({ children, attributes, element }: RenderElementProps) => {
      if (element.type === 'block-quote') {
        return (
          <blockquote
            style={{
              borderWidth: '0px',
              backgroundColor: 'transparent',
              borderLeft: '4px solid lightgray',
              marginLeft: '10px',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              color: vars.colors.textSecondary,
              paddingBlock: vars.space.xs,
            }}
            {...attributes}
          >
            {children}
          </blockquote>
        )
      } else if (element.type === 'bulleted-list') {
        return <ul {...attributes}>{children}</ul>
      } else if (element.type === 'numbered-list') {
        return <ol {...attributes}>{children}</ol>
      } else if (element.type === 'list-item') {
        return (
          <li style={{ marginLeft: vars.space.l }} {...attributes}>
            {children}
          </li>
        )
      } else {
        return <p {...attributes}>{children}</p>
      }
    },
    []
  )

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      return (
        <span
          {...attributes}
          style={{
            fontWeight: leaf.bold ? 'bold' : 'normal',
            fontStyle: leaf.italic ? 'italic' : 'normal',
            textDecoration: leaf.underlined ? 'underline' : undefined,
          }}
        >
          {children}
        </span>
      )
    },
    []
  )

  return (
    <div ref={commentsContainerRef}>
      {inView && editor ? (
        <Slate
          editor={editor}
          initialValue={commentValue}
          onChange={handleValueChange}
        >
          <div className={`comment-editor ${classes.commentEditorClass}`}>
            <ToolBarControl>
              <ToolbarControlLeft>
                <ToolBarIcon type="bold" />
                <ToolBarIcon type="italic" />
                <ToolBarIcon type="underlined" />
                <ToolBarIcon type="block-quote" />
                <ToolBarIcon type="numbered-list" />
                <ToolBarIcon type="bulleted-list" />
              </ToolbarControlLeft>
              <ToolbarControlRight>
                <ToolBarIcon>
                  <button className={`${classes.submitButton}`}>
                    <p> {'Submit'} </p>
                    <BsFillSendPlusFill color={vars.colors.card} />
                  </button>
                </ToolBarIcon>
              </ToolbarControlRight>
            </ToolBarControl>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Add your comment here 🎉"
            />
          </div>
        </Slate>
      ) : null}
    </div>
  )
}
