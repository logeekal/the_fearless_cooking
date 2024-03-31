import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

import * as styles from './styles.css'

interface RatingProps {
  value?: number
  readonly?: boolean
  onChange?: (value: number) => void
  className?: string
  size?: 'small' | 'normal'
}

const DEFAULT_RATING = 5

export const Rating = (props: RatingProps) => {
  const {
    value: initialValue,
    onChange,
    readonly = false,
    size = 'normal',
  } = props
  const [rating, setRating] = useState(initialValue ?? DEFAULT_RATING)

  useEffect(() => {
    setRating(initialValue ?? 0)
  }, [initialValue])

  const handleRatingChange = useCallback(
    (value: number) => {
      if (readonly) return
      const newRating = value + 1
      setRating(newRating)
      onChange?.(newRating)
    },
    [onChange, setRating, readonly]
  )

  return (
    <div className={`${props.className ?? ''}  star-rating-container`}>
      {[...(Array(5) as Array<ReactElement>)].map((_, i) => {
        return (
          <label
            className={`${styles.starLabel} ${String(initialValue)} ${
              readonly ? 'readonly' : ''
            } `}
            key={`label-${i}`}
          >
            <input
              className={`${styles.starInput}`}
              type="radio"
              name="rating"
              value={i + 1}
              checked={rating - 1 === i}
              onChange={handleRatingChange.bind(null, i)}
              onClick={handleRatingChange.bind(null, i)}
            />
            <FaStar
              className={`${styles.animatedStar} ${
                rating - 1 === i ? 'selected' : ''
              }`}
              color={i <= rating - 1 ? '#fec400' : 'gray'}
              size={size == 'normal' ? 25 : 15}
            />
            <FaStar
              color={i <= rating - 1 ? '#fec400' : 'gray'}
              size={size == 'normal' ? 25 : 15}
            />
          </label>
        )
      })}
    </div>
  )
}
