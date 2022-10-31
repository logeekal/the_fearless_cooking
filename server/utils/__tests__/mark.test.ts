import { markText, markTextSegmentWithEl } from '../mark'

describe('Marking text - ', () => {
  describe('Text Length less than Segment Length : ', () => {
    test('Mark with single position', () => {
      const sampleText =
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'

      const result = markTextSegmentWithEl(sampleText, {
        positions: [[3, 6]],
      })

      const expected = `Lor${markText(
        'em ips'
      )}um dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.`

      expect(result).toBe(expected)
    })

    test('Mark with multiple positions', () => {
      const sampleText =
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'

      const result = markTextSegmentWithEl(sampleText, {
        positions: [
          [3, 6],
          [20, 5],
          [30, 7],
        ],
      })

      const expected = `Lor${markText('em ips')}um dolor si${markText(
        't ame'
      )}t, qu${markText(
        'i minim'
      )} labore adipisicing minim sint cillum sint consectetur cupidatat.`

      expect(result).toBe(expected)
    })

    test('Mark with edge case', () => {
      const sampleText =
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'

      const result = markTextSegmentWithEl(sampleText, {
        positions: [
          [0, 6],
          [100, 2],
        ],
      })

      const expected = `${markText(
        'Lorem '
      )}ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidata${markText(
        't.'
      )}`

      expect(result).toBe(expected)
    })
  })
})
