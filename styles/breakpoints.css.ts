import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import { vars } from './themes.css'

export const breakPoints = {
    tablet: 'screen and (max-width: 1024px)',
    desktop: 'screen and (min-width: 1024px)',
}

/* eslint-disable-next-line */
const responsiveProperties = defineProperties({
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
        placeItems: ['justifyContent', 'alignItems'],
    },
})

export const sprinkles = createSprinkles(responsiveProperties)

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0]
