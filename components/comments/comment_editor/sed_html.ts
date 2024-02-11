// list all block tags of slate js below
import escapeHtml from 'escape-html'
import { Descendant, Element as SlateElement, Text } from 'slate'
import { jsx } from 'slate-hyperscript'

const BLOCK_TAGS = {
  A: (node: Element) => ({
    type: 'link',
    url: node.getAttribute('href'),
  }),
  BLOCKQUOTE: () => ({ type: 'block-quote' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  UL: () => ({ type: 'bulleted-list' }),
  P: () => ({ type: 'paragraph' }),
}

const MARK_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underlined: true }),
}

export const deserializeHtml = (
  el: Element | ChildNode
): SlateElement | Descendant[] => {
  if (el.nodeType === 3) {
    return [
      {
        text: el.textContent ?? '',
      },
    ]
  } else if (el.nodeType !== 1) {
    return [
      {
        text: el.textContent ?? '',
      },
    ]
  } else if (el.nodeName === 'BR') {
    return [
      {
        text: '\n',
      },
    ]
  }

  const { nodeName } = el
  let parent = el

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }
  let children = Array.from(parent.childNodes).map(deserializeHtml).flat()

  if (children.length === 0) {
    children = [{ text: '' }]
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  if (nodeName in BLOCK_TAGS) {
    const attrs = BLOCK_TAGS[nodeName as keyof typeof BLOCK_TAGS](el as Element)
    return jsx('element', attrs, children)
  }

  if (nodeName in MARK_TAGS) {
    const attrs = MARK_TAGS[nodeName as keyof typeof MARK_TAGS]()
    return children.map((child) => jsx('text', attrs, child))
  }

  return children
}

export const serializeHtml = (node: Descendant | Descendant[]): string => {
  if (Text.isText(node)) {
    let text = escapeHtml(node.text)
    if (node.bold) {
      text = `<strong>${text}</strong>`
    }
    if (node.italic) {
      text = `<em>${text}</em>`
    }
    if (node.underlined) {
      text = `<u>${text}</u>`
    }
    if (node.code) {
      text = `<code>${text}</code>`
    }
    return text
  }

  if (Array.isArray(node)) {
    return node.map((n) => serializeHtml(n)).join('')
  }

  let children = ''

  if ('children' in node) {
    children = node.children.map((n) => serializeHtml(n)).join('')
  }

  switch ('type' in node && node.type) {
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'numbered-list':
      return `<ol>${children}</ol>`
    case 'link':
      return 'url' in node
        ? `<a href="${escapeHtml(node.url)}">${children}</a>`
        : ''
    case 'paragraph':
      return `<p>${children}</p>`
    default:
      return children
  }
}
