import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'

export const menuClass = style({
    display: 'flex',
    flexDirection: 'column',
    '@media': {
        [breakPoints.desktop]: {
            selectors: {
                '&.type-responsive': {
                    flexDirection: 'row',
                },
            },
        },
    },
})

export const menuTitleClass = style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const menuCloseIcon = style({
    display: 'grid',
    placeItems: 'center',
    '@media': {
        [breakPoints.desktop]: {
            display: 'none',
        },
    },
})
