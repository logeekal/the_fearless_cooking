import {
    createTheme,
    createThemeContract,
    fontFace,
} from '@vanilla-extract/css'

import { ThemeType } from '../types/common'

export const vars = createThemeContract<ThemeType>({
    colors: {
        text: 'blue',
        bgPrimary: null,
        brand: 'blue',
        bgSecondary: 'yellow',
        accent: 'yellow',
    },
    font: {
        normal: 'quickSand',
        cursive: 'bilbo',
    },
    fontSize: {},
})

export const light = createTheme<typeof vars>(
    vars,
    {
        colors: {
            text: 'blue',
            bgPrimary: 'white',
            brand: 'blue',
            bgSecondary: 'yellow',
            accent: 'yellow',
        },
        font: {
            normal: 'quickSand',
            cursive: 'bilbo',
        },

        fontSize: {},
    },
    'light'
)

export const dark = createTheme<typeof vars>(
    vars,
    {
        colors: {
            text: 'white',
            bgPrimary: 'blue',
            brand: 'blue',
            bgSecondary: 'yellow',
            accent: 'yellow',
        },
        font: {
            normal: 'quickSand',
            cursive: 'bilbo',
        },

        fontSize: {},
    },
    'dark'
)
