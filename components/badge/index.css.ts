import { style } from '@vanilla-extract/css'

export const badgeContainer = style({
  // react style attribute for badge component
  borderRadius: '0.5rem',
  fontWeight: 300,
  display: 'inline-flex',
  textAlign: 'center',
  minWidth: '1.5rem',
  verticalAlign: 'middle',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
      transition: 'all 0.5s ease-in-out',
      boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
    },
  },
})

export const badgeContent = style({
  paddingInline: '0.5rem',
  lineHeight: 'inherit',
})

export const badgeIcon = style({
  display: 'grid',
  placeItems: 'center',
  paddingInline: '0.5rem',
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
})
