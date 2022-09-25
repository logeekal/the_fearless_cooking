import { keyframes, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { breakPoints, sprinkles } from '../../styles/breakpoints.css'
import { vars } from '../../styles/themes.css'
import { globalVars } from '../../styles/vars.css'

export const navMenuCloseAnimation = keyframes({
    '0%': {
        transform: 'translate(0,0)',
    },
    '100%': {
        transform: 'translate(-100%,0)',
    },
})

export const navClass = style({
    height: globalVars.height.header,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    //position: 'sticky',
    background: vars.colors.bgPrimary,
})

export const navMenuIconContainer = style([
    sprinkles({
        display: ['flex', 'flex', 'none'],
    }),
    {
        width: '3rem',
        zIndex: vars.zIndex.highest,
        height: '4rem',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transitionDuration: '0.5s',
        transitionTimingFunction: globalVars.curve.easeOut,
        selectors: {
            '&::before': {
                content: '',
                display: 'block',
                position: 'absolute',
                top: '1rem',
                width: '100%',
                transitionDuration: '0.5s',
                transitionTimingFunction: globalVars.curve.easeOut,
                borderTop: ` 2px solid ${vars.colors.brand}`,
                color: vars.colors.brand,
            },
            '&::after': {
                content: '',
                position: 'absolute',
                bottom: '1rem',
                width: '100%',
                transitionDuration: '0.5s',
                transitionTimingFunction: globalVars.curve.easeOut,
                borderBottom: `2px solid ${vars.colors.brand}`,
            },
            '&.open::before': {
                transform: 'translate(8px,3px) rotate(45deg)',
                borderColor: vars.colors.bgPrimary,
                width: '60%',
            },
            '&.open::after': {
                transform: 'translate(8px,-3px) rotate(-45deg)',
                borderColor: vars.colors.bgPrimary,
                width: '60%',
            },
            '&.open': {
                transform: 'rotate(180deg)',
            },
        },
    },
])
export const navMenuIconClass = style([
    {
        borderBottom: `2px solid ${vars.colors.brand}`,
        width: '100%',
        height: '0px',
        selectors: {
            '&.open': {
                borderBottom: ` 1px solid ${vars.colors.bgPrimary}`,
                color: vars.colors.bgPrimary,
            },
        },
    },
])

export const navAddendumClass = style({
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
})

export const navLeft = style({
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
})

export const navMenuList = style([
    sprinkles({
        flexDirection: ['column', 'column', 'row'],
        position: ['fixed', 'fixed', 'relative'],
        background: ['brand', 'brand', 'transparent'],
    }),
    {
        display: 'flex',
        position: 'relative',
        gap: '1.5rem',
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
        selectors: {
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
    },
])

export const navMenu = style([
    sprinkles({
        flexDirection: ['column', 'column', 'row'],
        position: ['fixed', 'fixed', 'relative'],
        background: ['brand', 'brand', 'transparent'],
    }),
    {
        paddingTop: calc.multiply(globalVars.height.header, 2),
        paddingInline: vars.space.l,
        paddingBottom: vars.space.l,
        maxWidth: '30rem',
        display: 'flex',
        gap: '15px',
        zIndex: vars.zIndex.high,
        transition: '0.5s ease-in-out',
        transform: 'translate(0,0)',
        selectors: {
            '&.closed': {
                transform: 'translate(-100%,0)',
            },
        },
        height: '100vh',
        overflow: 'auto',
        top: '0px',
        left: '0px',
        width: '80%',
        '@media': {
            [breakPoints.desktop]: {
                height: 'auto',
                padding: 0,
                fontWeight: 300,
                maxWidth: 'fit-content',
                selectors: {
                    '&.closed': {
                        display: 'flex',

                        transform: 'translate(0%,0)',
                    },
                },
            },
        },
    },
])

export const navMenuItem = style({
    cursor: 'pointer',
    color: vars.colors.card,
    selectors: {
        '&.desktop': {
            display: 'none',
        },
        '&.disabled': {
            display: 'none',
        },
    },
    '@media': {
        [breakPoints.desktop]: {
            color: vars.colors.text,
            selectors: {
                '&.mobile': {
                    display: 'none',
                },
                '&.desktop': {
                    display: 'block',
                },
            },
        },
    },
})

export const navMenuItemTitle = style({
    color: vars.colors.card,
})
