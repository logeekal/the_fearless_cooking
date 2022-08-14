export function log(msg: string) {
    /* eslint-disable-next-line */
    console.log('*******************************')
    /* eslint-disable-next-line */
    console.log(`************ ${msg} ***********`)
    /* eslint-disable-next-line */
    console.log('*******************************')
}

export function cleanContentURLS(content: string) {
    if (!content) {
        return
    }
    return content.replace(/((http(s)?):\/\/)?marriedfriends.in\/blog/g, '')
}
