import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import { vars } from './themes.css'
import { BREAKPOINTS } from './vars.css'

export const breakPoints = {
  tablet: `screen and (max-width: ${BREAKPOINTS.tablet.max}px)`,
  desktop: `screen and (min-width: ${BREAKPOINTS.desktop.min}px)`,
  large: `screen and (min-width: ${BREAKPOINTS.large.min}px)`,
}

const responsiveProperties = defineProperties({
  /* eslint-disable-next-line */
  /* @ts-ignore */
  conditions: {
    mobile: {},
    tablet: { '@media': breakPoints.tablet },
    desktop: { '@media': breakPoints.desktop },
  },
  defaultCondition: 'mobile',
  responsiveArray: ['mobile', 'tablet', 'desktop'],
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    background: { ...vars.colors, transparent: 'transparent' },
    position: ['sticky', 'relative', 'absolute', 'fixed'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBotton'],
    placeItems: ['justifyContent', 'alignItems'],
  },
})

export const sprinkles = createSprinkles(responsiveProperties)

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0]
