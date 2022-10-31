import { MAX_SEGMENT_LENGTH, TEXT_MARK_CONFIG } from '../constants'
import { Segment } from '../types'

export const markTextSegmentWithEl = (
  /*
   * unmodified original text since position is also unmodified
   * */
  originalText: string,
  segment: Segment
) => {
  const positions = segment.positions
  // maxPositon = last member position + its length
  const lastPosition = positions[positions.length - 1]
  const maxPosition = lastPosition[0] + lastPosition[1]
  const minPosition = positions[0][0]

  const diffMinMax = maxPosition - minPosition

  // -------------200----------------
  // -------####-------####----------
  // |-----|              |---------| remainingLength
  const remainingLength = MAX_SEGMENT_LENGTH - diffMinMax

  let minSegmentIdx = Math.max(0, minPosition - remainingLength / 2)
  let maxSegmentIdx = Math.min(
    originalText.length,
    maxPosition + remainingLength / 2
  )
  if (originalText.length <= MAX_SEGMENT_LENGTH) {
    minSegmentIdx = 0
    maxSegmentIdx = originalText.length
  }

  let result = ''
  positions.forEach((pos, idx) => {
    if (idx === 0) {
      result = result + originalText.substring(minSegmentIdx, pos[0])
    } else {
      const previousMember = positions[idx - 1]
      result =
        result +
        originalText.substring(previousMember[0] + previousMember[1], pos[0])
    }
    const currentMarkedText = markText(
      originalText.substring(pos[0], pos[0] + pos[1])
    )

    result = result + currentMarkedText
    if (idx === positions.length - 1) {
      result = result + originalText.substring(pos[0] + pos[1], maxSegmentIdx)
    }
  })

  return result
}

export const markText = (text: string) => {
  return `<${TEXT_MARK_CONFIG.EL} class="${TEXT_MARK_CONFIG.CLASS}">${text}</${TEXT_MARK_CONFIG.EL}>`
}
