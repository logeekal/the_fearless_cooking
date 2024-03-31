import { useIntersectionObserver } from '@react-hooks-library/core'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  createEditor,
  Descendant,
  Editor as SlateEditor,
  Transforms,
} from 'slate'
import { withHistory as withSlateHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'

import { vars } from '../../../styles/themes.css'
import { deserializeHtml, serializeHtml } from './sed_html'
import * as classes from './styles.css'
import {
  ToolBarControl,
  ToolbarControlLeft,
  ToolbarControlRight,
  ToolBarIcon,
} from './toolbar'

interface CommentEditorProps {
  submitButton?: React.ReactNode
  onChange?: (value: string) => void
  value?: string
}
import './types'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export interface CommentEditorRef {
  clearEditor: () => void
}

export const CommentEditor = forwardRef<
  CommentEditorRef | null,
  CommentEditorProps
>(function CommentEditor(props, ref) {
  const { submitButton, value, onChange } = props

  const [commentValue, setCommentValue] = useState<string>(
    value ?? serializeHtml(initialValue)
  )
  const commentsContainerRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<SlateEditor>()

  const clearEditor = useCallback(() => {
    if (!editor) return

    Transforms.select(editor, [])

    Transforms.removeNodes(editor, { mode: 'highest', hanging: true })
    // insert an empty paragraph
    if (editor.children.length === 0) {
      Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
      })
    }
    return
  }, [editor])

  useImperativeHandle(
    ref,
    () => {
      return {
        clearEditor: clearEditor,
      }
    },
    [clearEditor]
  )

  const slateInitialValue = useMemo(() => {
    if (typeof window === 'undefined' || !commentValue) return initialValue
    const val = new window.DOMParser().parseFromString(
      commentValue,
      'text/html'
    )
    const result = deserializeHtml(val.body)
    return result
  }, [commentValue])

  const { inView, stop } = useIntersectionObserver(commentsContainerRef)

  useEffect(() => {
    if (editor || !inView) return
    setEditor(withReact(withSlateHistory(createEditor())))
    stop()
  }, [editor, inView, stop])

  const handleValueChange = useCallback(
    (value: Descendant[]) => {
      const serializedValue = serializeHtml(value)
      if (onChange) onChange(serializedValue)
      setCommentValue(serializedValue)
    },
    [setCommentValue, onChange]
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

  const onEditableFocused = useCallback(() => {
    if (!editor) return
    ReactEditor.focus(editor)
  }, [editor])

  return (
    <div ref={commentsContainerRef}>
      <input
        style={{ display: 'none' }}
        type="text"
        onFocus={onEditableFocused}
      />
      {inView && editor ? (
        <Slate
          editor={editor}
          initialValue={slateInitialValue as Descendant[]}
          onChange={handleValueChange}
        >
          <div className={`comment-editor ${classes.commentEditorClass}`}>
            <ToolBarControl>
              <ToolbarControlLeft>
                <ToolBarIcon type="bold" />
                <ToolBarIcon type="italic" />
                <ToolBarIcon type="underlined" />
              </ToolbarControlLeft>
              <ToolbarControlRight>
                <ToolBarIcon>{submitButton}</ToolBarIcon>
              </ToolbarControlRight>
            </ToolBarControl>
            <Editable
              value={commentValue}
              onMouseDown={onEditableFocused}
              onFocus={onEditableFocused}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Add your comment here 🎉"
            />
          </div>
        </Slate>
      ) : null}
    </div>
  )
})
