import { globalFontFace } from '@vanilla-extract/css'

globalFontFace('inter', {
  src: 'url(/fonts/Inter/Inter-variable.ttf)',
  fontStyle: 'normal',
  fontWeight: '100 900',
  fontDisplay: 'swap',
})

globalFontFace('glass', {
  src: 'url(/fonts/Glass_Antiqua/GlassAntiqua-Regular.ttf)',
  fontStyle: 'normal',
  fontWeight: '400',
  fontDisplay: 'swap',
})
