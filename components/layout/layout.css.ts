import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const layoutClass = style({
    padding: vars.space.normal,
    background: vars.colors.bgPrimary,
})

export const footerBy = style({
    background: vars.colors.brand,
    color: vars.colors.card,
    width: '100%',
    paddingBlock: vars.space.s,
})
