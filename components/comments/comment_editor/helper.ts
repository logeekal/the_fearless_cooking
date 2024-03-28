import escapeHtml from 'escape-html'
import { Editor, Element as SlateElement, Transforms } from 'slate'
import { Node, Text } from 'slate'

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const serialize = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n')
}

export const serializeHTML = (nodes: Node[] | Node): string => {
  if (Array.isArray(nodes)) {
    return nodes.map((n) => serializeHTML(n)).join('\n')
  }
  if (Text.isText(nodes)) {
    let str = escapeHtml(nodes.text)
    if (nodes.bold) {
      str = `<strong>${str}</strong>`
    }
    return str
  }

  const children =
    nodes.children?.map((n: Node) => serializeHTML(n)).join('') ?? ''

  return children
}

export const deserialize = (value: string) => {
  return value.split('\n').map((line) => ({
    children: [{ text: line }],
  }))
}

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as Omit<Text, 'text'>
  // @ts-expect-error notsure of the error
  return marks ? marks[format as keyof Text] === true : false
}

export const isBlockActive = (
  editor: Editor,
  format: string,
  blockType = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // @ts-expect-error notsure of the error
        n[blockType] === format,
    })
  )

  return !!match
}

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const toggleBlock = (editor: Editor, format: SlateElement['type']) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }

    // @ts-expect-error notsure of the error
    Transforms.wrapNodes(editor, block)
  }
}
