export interface IDuration {
    hours: number
    minutes: number
}

export type ThemeType = {
    colors: {
        text: string | null
        bgPrimary: string | null
        card: string
        brand: string
        greenLight: string
        yellowLight: string
    }

    font: {
        normal: string
        cursive: string
    }

    fontSize: {
        para: string
        heading: string
        subHeading: string
        subText: string
    }
    space: {
        xs: string
        s: string
        normal: string
        l: string
        xl: string
        none: string
    }
    border: {
        circular: string
    }
    zIndex: {
        highest: string
        high: string
    }
}
