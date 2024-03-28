import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const singleCommentContainer = style({
  marginBottom: vars.space.l,
  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
})
