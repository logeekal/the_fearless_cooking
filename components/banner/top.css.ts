import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const topBannerContainer = style({
  position: 'sticky',
  top: 0,
  height: '0px',
  opacity: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'transparent',
  transition: 'all 0.5s ease-in-out',
  transform: 'translateY(-100%)',
  boxShadow: '1px 1px 20px rgba(0,0,0,0.5)',
  border: `1px solid ${vars.colors.brand}`,
  selectors: {
    '&.open': {
      transform: 'translateY(0)',
      opacity: 1,
      height: 'auto',
    },
  },
})
