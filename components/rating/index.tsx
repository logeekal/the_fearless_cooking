import { useLocalStorage } from '@react-hooks-library/core'
import React, { ReactElement, useCallback } from 'react'
import { FaStar } from 'react-icons/fa'

import * as styles from './styles.css'

interface RatingProps {
  value?: number
  onChange?: (value: number) => void
  className?: string
}

const DEFAULT_RATING = 5

export const Rating = (props: RatingProps) => {
  const { value: initialValue, onChange } = props
  const [rating, setRating] = useLocalStorage(
    'current.comment.rating',
    initialValue ?? DEFAULT_RATING,
    {
      serialize: String,
      deserialize: parseInt,
    }
  )

  const handleRatingChange = useCallback(
    (value: number) => {
      const newRating = value + 1
      setRating(newRating)
      onChange?.(newRating)
    },
    [onChange, setRating]
  )

  return (
    <div className={`${props.className ?? ''}  star-rating-container`}>
      {[...(Array(5) as Array<ReactElement>)].map((_, i) => {
        return (
          <label
            className={styles.starLabel}
            key={`label-${i}`}
            onMouseOver={handleRatingChange.bind(null, i)}
          >
            <input
              className={styles.starInput}
              type="radio"
              name="rating"
              value={i + 1}
              onClick={handleRatingChange.bind(null, i)}
            />
            <FaStar
              className={`${styles.animatedStar} ${
                rating - 1 === i ? 'selected' : ''
              }`}
              color={i <= rating - 1 ? '#fec400' : 'gray'}
              size={25}
            />
            <FaStar color={i <= rating - 1 ? '#fec400' : 'gray'} size={25} />
          </label>
        )
      })}
    </div>
  )
}
