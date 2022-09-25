import { style } from '@vanilla-extract/css'

import { breakPoints } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'

export const categoryAvatar = style({
    width: '50px',
    height: '50px',
    display: 'grid',
    placeItems: 'center',
    borderRadius: vars.border.circular,
    background: vars.colors.greenLight,
    outlineColor: vars.colors.brand,
    boxShadow: '1px 3px 8px 1px rgba(0,0,0,0.2)',
    /*
     *outlineOffset: '2px',
     *outlineWidth: 'thin',
     *outlineStyle: 'dashed',
     */
})

export const categoryContainer = style({
    overflow: 'scroll',
    scrollBehavior: 'smooth',
    paddingBlock: vars.space.s,
    '@media': {
        [breakPoints.desktop]: {
            display: 'none',
        },
    },
})

export const categories = style({
    display: 'inline-flex',
    flexDirection: 'row',
    gap: vars.space.normal,
    paddingInline: '4px',
})
