import { style } from '@vanilla-extract/css'

import { vars } from '../../styles/themes.css'

export const sectionLoader = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space.normal,
  flexDirection: 'column',
  padding: vars.space.xl,
})
