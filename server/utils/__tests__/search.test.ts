import { Position, ResultMetadata } from '../../types'
import { getRandomString } from '../func_utils'
import { getHighlightSegments, removeTermClassification } from '../search'

describe('Test removeTermClassification', () => {
  test('Basic', () => {
    const inputMetaData: ResultMetadata = {
      lasagna: {
        title: {
          position: [[4, 7]],
        },
        content: {
          position: [[24, 7]],
        },
        instructions: {
          position: [[5, 7]],
        },
        ingredients: {
          position: [[309, 7]],
        },
      },
      veg: {
        title: {
          position: [[0, 3]],
        },
        content: {
          position: [[2836, 3]],
        },
      },
    }

    const expectedResult = {
      title: {
        position: [
          [4, 7],
          [0, 3],
        ],
      },
    }

    const fieldMetaData = removeTermClassification(inputMetaData)

    expect(fieldMetaData).toStrictEqual(expectedResult)
  })
})

const randomString = getRandomString(10000)
describe('Test getHighlightSegments', () => {
  test('Single position - single segment', () => {
    const positions: Array<Position> = [[120, 6]]
    const segments = getHighlightSegments(randomString, positions, 200)

    const expectedSegment = [
      {
        positions: [[120, 6]],
      },
    ]

    expect(segments).toStrictEqual(expectedSegment)
  })

  test('Multiple Positions - Single Segment: text length < max_segment_length', () => {
    const testString = randomString.substring(0, 150)
    const positions: Array<Position> = [
      [10, 6],
      [100, 6],
    ]
    const segments = getHighlightSegments(testString, positions, 200)

    const expectedSegment = [
      {
        positions: [
          [10, 6],
          [100, 6],
        ],
      },
    ]

    expect(segments).toStrictEqual(expectedSegment)
  })

  //test('Multiple positions - multiple segments with single position per segment', () => {})

  //test('Multiple positions - multiple segments with multiple positions per segment', () => {})
})
