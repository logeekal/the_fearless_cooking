import { dark, light } from '../styles/themes.css'

export const themes = {
  light: {
    name: light,
  },

  dark: {
    name: dark,
  },
}

export const getTheme = (themeName: keyof typeof themes) => {
  return themes[themeName].name
}
