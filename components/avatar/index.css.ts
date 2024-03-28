import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const avatarContainer = style({
  width: '30px',
  height: '30px',
  border: `1px solid ${vars.colors.brand}`,
  borderRadius: vars.border.circular,
  boxShadow: '1px 3px 8px 1px rgba(0,0,0,0.2)',
  selectors: {
    '&.small': {
      width: '50px',
      height: '50px',
    },
  },
})

export const avatarImage = style({})
