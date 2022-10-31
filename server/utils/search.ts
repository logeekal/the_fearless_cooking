import { IRecipeSearchObj } from '../../types/common'
import { SEARCH_FIELDS } from '../constants'
import {
  FieldPositionMetadata,
  FieldResultMetadata,
  Position,
  ResultMetadata,
} from '../types'
import { markTextSegmentWithEl } from './mark'

export const getHighlightSegments = (
  text: string,
  positions: Array<Position>,
  segmentLength = 200
) => {
  const textLength = text.length

  if (textLength <= segmentLength) {
    return [
      {
        positions: positions
          .filter((position) => position[0] < textLength)
          .sort((a, b) => a[0] - b[0]),
      },
    ]
  }

  if (positions.length === 1) {
    return [
      {
        positions: positions,
      },
    ]
  }
  // REST LOGIC TODO
}

//export const getMarkedTextSegment = (
//text: string,
//segment: Segment,
//segmentLength = 200
//) => {
//const arrangedPositions = segment.positions.sort((a, b) => a[0] - b[0])

//const minIdx = Math.max(highlightPosition - segmentLength / 2, 0)

//const maxIdx = Math.min(highlightPosition + segmentLength, text.length)

//const resultString = `${text.substring(minIdx, maxIdx)}`

//const prunedResultString = resultString.substring(0, segmentLength)

//if (prunedResultString.length === text.length) {
//return {
//minIdx,
//maxIdx,
//value: prunedResultString,
//}
//}

//return {
//minIdx,
//maxIdx,
//value: '...' + prunedResultString + '...',
//}
//}

export const pruneMetaData = (metadata: ResultMetadata) => {
  const modifiedResultMetadata: ResultMetadata = metadata

  Object.keys(metadata).forEach((term) => {
    Object.keys(metadata[term]).forEach((field) => {
      // pick only the first occurrence for each field
      modifiedResultMetadata[term][field]['position'] = [
        metadata[term][field]['position'][0],
      ]
    })
  })

  return modifiedResultMetadata
}

export const removeTermClassification = (
  metadata: ResultMetadata
): FieldPositionMetadata => {
  const fieldPositionMetadata: FieldPositionMetadata = {}

  Object.keys(metadata).map((term) => {
    Object.keys(metadata[term]).map((field) => {
      if (!SEARCH_FIELDS.includes(field)) return
      if (!(field in fieldPositionMetadata)) {
        fieldPositionMetadata[field] = {
          position: [],
        }
      }
      fieldPositionMetadata[field].position = [
        ...fieldPositionMetadata[field].position,
        ...metadata[term][field].position,
      ]
    })
  })

  return fieldPositionMetadata
}

export const convertToFieldResults = (
  doc: IRecipeSearchObj,
  fieldMetadata: FieldPositionMetadata
) => {
  const fieldResult: FieldResultMetadata = {}
  Object.keys(fieldMetadata).map((field: string) => {
    const segments = getHighlightSegments(
      doc[field as keyof IRecipeSearchObj] as string,
      fieldMetadata[field].position
    )

    if (!segments || segments.length === 0) {
      fieldResult[field] = 'Error'
      return
    }
    const markedText = markTextSegmentWithEl(
      doc[field as keyof IRecipeSearchObj] as string,
      segments[0]
    )
    fieldResult[field] = markedText
  })

  return fieldResult
}
