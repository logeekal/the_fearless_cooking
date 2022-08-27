import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'
import { globalVars } from '../../styles/vars.css'

export const accordionBodyClass = style({
    height: 'auto',
    transition: '0.5s ease-in-out',
    overflow: 'hidden',
})

export const accordionTitleClass = style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const accordionActionIcon = style({
    transitionTimingFunction: globalVars.curve.easeOut,
    transitionDuration: '0.5s',
    fontSize: vars.fontSize.heading,
    selectors: {
        '&.expanded': {
            transform: 'rotate(135deg)',
        },
    },
})
