import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const footer = style({
    background: 'transparent',
    paddingInline: '12.5%',
    paddingBlock: vars.space.normal,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space.normal,
})
