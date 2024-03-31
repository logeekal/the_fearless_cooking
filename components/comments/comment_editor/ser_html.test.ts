/**
 * @jest-environment jest-environment-jsdom
 * @eslint-enable
 */

import { Element as SlateElement } from 'slate'

import { serializeHtml } from './sed_html'

describe('Test Serialization to HTML', () => {
  // write 5 test to test html deserialization
  describe('Block Tags test', () => {
    it('should deserialize html when paragraph is passed', () => {
      const candidateInput = '<p>test</p>'
      const candidateElement = [
        { type: 'paragraph', children: [{ text: 'test' }] },
      ] as SlateElement[]

      const actualResult = serializeHtml(candidateElement)
      expect(actualResult).toEqual(candidateInput)
    })

    it('should deserialize blockquote when heading is passed', () => {
      const expectedResult = '<blockquote>test</blockquote>'
      const candidateInput = [
        { type: 'block-quote', children: [{ text: 'test' }] },
      ] as SlateElement[]
      const actualResult = serializeHtml(candidateInput)
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when ordered list is passed', () => {
      const expectedResult = '<ol><li>test</li><li>Test2</li></ol>'
      const candidateInput = [
        {
          type: 'numbered-list',
          children: [
            { type: 'list-item', children: [{ text: 'test' }] },
            { type: 'list-item', children: [{ text: 'Test2' }] },
          ],
        },
      ] as SlateElement[]
      const actualResult = serializeHtml(candidateInput)
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when unordered list is passed', () => {
      const expectedResult = '<ul><li>test</li><li>Test2</li></ul>'
      const candidateInput = [
        {
          type: 'bulleted-list',
          children: [
            { type: 'list-item', children: [{ text: 'test' }] },
            { type: 'list-item', children: [{ text: 'Test2' }] },
          ],
        },
      ] as SlateElement[]
      const actualResult = serializeHtml(candidateInput)
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when a link is passed', () => {
      const expectedResult = '<a href="https://www.google.com">test</a>'
      const candidateInput = [
        {
          type: 'link',
          url: 'https://www.google.com',
          children: [{ text: 'test' }],
        },
      ] as SlateElement[]
      const actualResult = serializeHtml(candidateInput)
      expect(actualResult).toEqual(expectedResult)
    })
  })

  describe('Mark Tags test', () => {
    it('should deserialize html when bold is passed', () => {
      const expectedResult = '<strong>test</strong>'
      const candidateInput = [{ text: 'test', bold: true }]
      const actualResult = serializeHtml(candidateInput)
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when italic is passed', () => {
      const expectedResult = '<em>test</em>'
      const candidateInput = [{ text: 'test', italic: true }]
      const actualResult = serializeHtml(candidateInput)
      expect(actualResult).toEqual(expectedResult)
    })
    it('should deserialize html when underlined is passed', () => {
      const expectedResult = '<u>test</u>'
      const candidateInput = [{ text: 'test', underlined: true }]
      const actualResult = serializeHtml(candidateInput)
      expect(actualResult).toEqual(expectedResult)
    })
  })
})
