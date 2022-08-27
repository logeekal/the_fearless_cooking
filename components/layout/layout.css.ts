import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const layoutClass = style({
    padding: vars.space.normal,
    background: vars.colors.bgPrimary,
})
