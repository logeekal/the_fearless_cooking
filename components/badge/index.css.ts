import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const badgeContainer = style({
  // react style attribute for badge component

  padding: '0.5rem 0.5rem',
  borderRadius: '0.5rem',
  fontSize: vars.fontSize.para,
  fontWeight: 300,
  display: 'inline-block',
  textAlign: 'center',
  minWidth: '1.5rem',
  minHeight: '1.5rem',
  lineHeight: '1.5rem',
  verticalAlign: 'middle',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
      transition: 'all 0.5s ease-in-out',
      boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
    },
  },
})
