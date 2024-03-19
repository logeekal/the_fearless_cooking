import { keyframes, style } from '@vanilla-extract/css'

const animateSelectedStar = keyframes({
  '0%': { transform: 'scale(1)', opacity: 1 },
  '90%': { transform: 'scale(2.9)', opacity: 0.2 },
  '100%': { transform: 'scale(3)', opacity: 0 },
})

const animateSelectedStarRevese = keyframes({
  '100%': { transform: 'scale(3)', opacity: 0 },
  '0%': { transform: 'scale(1)', opacity: 0 },
})

export const starInput = style({ display: 'none' })

export const starLabel = style({
  position: 'relative',
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  selectors: {
    '&.readonly': {
      cursor: 'initial',
    },
  },
})

export const animatedStar = style({
  position: 'absolute',
  left: 0,
  animationDuration: '0s',
  animationName: animateSelectedStarRevese,
  selectors: {
    '&.selected': {
      transform: 'scale(3)',
      opacity: 0,
      animation: `${animateSelectedStar} 0.1s ease-in-out`,
      animationDirection: 'normal',
    },
  },
})
