import { globalFontFace, globalStyle } from '@vanilla-extract/css';

globalFontFace('quicksand', {
        src: 'url(/fonts/_quicksand/Quicksand-Bold.woff2) format("woff2")',
        fontStyle: 'normal',
        fontWeight: 700,
});

globalFontFace('quicksand', {
        src: 'url(/fonts/_quicksand/Quicksand-SemiBold.woff2) format("woff2")',
        fontStyle: 'normal',
        fontWeight: 600,
});

globalFontFace('quicksand', {
        src: 'url(/fonts/_quicksand/Quicksand-Medium.woff2) format("woff2")',
        fontStyle: 'normal',
        fontWeight: 500,
});

globalFontFace('quicksand', {
        src: 'url(/fonts/_quicksand/Quicksand-Regular.woff2) format("woff2")',
        fontStyle: 'normal',
        fontWeight: 400,
});

globalFontFace('quicksand', {
        src: 'url(/fonts/_quicksand/Quicksand-Light.woff2) format("woff2")',
        fontStyle: 'normal',
        fontWeight: 300,
});



globalFontFace('bilbo',{
    src: 'url(/fonts/bilbo-swash-caps/BilboSwashCaps-Regular.ttf)',
        fontStyle: 'normal',
        fontWeight: 300
})

globalStyle('html', {
        fontFamily: 'quicksand',
});

