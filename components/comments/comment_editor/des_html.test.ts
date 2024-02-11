/**
 * @jest-environment jest-environment-jsdom
 * @eslint-enable
 */

import { deserializeHtml } from './sed_html'
describe('Test Deserialization', () => {
  // write 5 test to test html deserialization
  describe('Block Tags test', () => {
    it('should deserialize html when paragraph is passed', () => {
      const candidateHTML = '<p>test</p>'
      const expectedResult = [
        { type: 'paragraph', children: [{ text: 'test' }] },
      ]

      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize blockquote when heading is passed', () => {
      const candidateHTML = '<blockquote>test</blockquote>'
      const expectedResult = [
        { type: 'block-quote', children: [{ text: 'test' }] },
      ]
      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when ordered list is passed', () => {
      const candidateHTML = '<ol><li>test</li><li>Test2</li></ol>'
      const expectedResult = [
        {
          type: 'numbered-list',
          children: [
            { type: 'list-item', children: [{ text: 'test' }] },
            { type: 'list-item', children: [{ text: 'Test2' }] },
          ],
        },
      ]
      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when unordered list is passed', () => {
      const candidateHTML = '<ul><li>test</li><li>Test2</li></ul>'
      const expectedResult = [
        {
          type: 'bulleted-list',
          children: [
            { type: 'list-item', children: [{ text: 'test' }] },
            { type: 'list-item', children: [{ text: 'Test2' }] },
          ],
        },
      ]
      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when a link is passed', () => {
      const candidateHTML = '<a href="https://www.google.com">test</a>'
      const expectedResult = [
        {
          type: 'link',
          url: 'https://www.google.com',
          children: [{ text: 'test' }],
        },
      ]
      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })
  })

  describe('Mark Tags test', () => {
    it('should deserialize html when bold is passed', () => {
      const candidateHTML = '<strong>test</strong>'
      const expectedResult = [{ text: 'test', bold: true }]
      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })

    it('should deserialize html when italic is passed', () => {
      const candidateHTML = '<em>test</em>'
      const expectedResult = [{ text: 'test', italic: true }]
      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })
    it('should deserialize html when underlined is passed', () => {
      const candidateHTML = '<u>test</u>'
      const expectedResult = [{ text: 'test', underlined: true }]
      const actualResult = deserializeHtml(
        new window.DOMParser().parseFromString(candidateHTML, 'text/html').body
      )
      expect(actualResult).toEqual(expectedResult)
    })
  })
})
