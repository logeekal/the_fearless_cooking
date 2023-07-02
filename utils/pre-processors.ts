import * as Cheerio from 'cheerio'

import { devLogger, logger } from './logger'

export function getFAQs(htmlString: string): number[] {
  const $ = Cheerio.load(htmlString)

  const faqSection = $('section.helpie-faq')

  const questions = faqSection.find('div.accordion__header').toArray()

  if (!questions || questions.length === 0) {
    return []
  }

  const faqIds: Array<number | undefined> = questions.map((ques) => {
    if (ques.type === 'tag') {
      return parseInt(ques.attribs['data-id'].split('-')[1])
    }
  })

  const finalFAQIds = faqIds.filter(
    (item) => typeof item !== 'undefined'
  ) as number[]

  return finalFAQIds
}

export function stripFAQSection(htmlString: string) {
  const $ = Cheerio.load(htmlString)

  $('section.helpie-faq').remove()

  return $.html()
}

export function replaceYTwithLiteTY(htmlString: string, title: string) {
  const videoId = getYoutubeVideoId(htmlString)
  if (!videoId) {
    //  is no iframe and video in the article
    return htmlString
  }

  const $ = Cheerio.load(htmlString)

  $('iframe.youtube-player').remove()

  $('span.embed-youtube').append(
    `<lite-youtube 
                autoload 
                videoid=${videoId} 
                title="${title}" 
                videoTitle="${title}"
                posterquality="maxresdefault"
                />`
  )

  return $.html()
}

export function getYoutubeVideoId(htmlString: string) {
  if (!htmlString) return null
  devLogger.trace('Getting video id')

  const $ = Cheerio.load(htmlString)

  const ytIframe = $('iframe.youtube-player').toArray()

  if (!ytIframe) {
    return null
  }

  if (ytIframe[0] && ytIframe[0].type === 'tag') {
    const ytEmbedURL = new URL(ytIframe[0].attribs['src'])
    devLogger.trace(`Found Video URL :  ${ytEmbedURL.toString()}`)
    const vidId = ytEmbedURL.pathname.split('/')[2]
    devLogger.trace(`Found video ID: ${vidId}`)
    if (vidId === 'videoseries') {
      throw new Error('Found Playlist. Insert video link for post. ')
    }

    return vidId
  }
}

export function replaceYTWithNoCookie(htmlString: string) {
  return htmlString.replace(
    /((http(s)?):\/\/)?youtube.com/g,
    'youtube-nocookie.com/'
  )
}

export function makeIframeLazy(html: string) {
  logger.debug('Making IFrame Lazy')

  return makeElLazyLoad(html, 'iframe.youtube-player', ['src'])
  const $ = Cheerio.load(html)

  //$('iframe.youtube-player').addClass('lazyload')
  //const src = $('iframe.youtube-player.lazyload').attr('src')
  //$('iframe.youtube-player.lazyload').removeAttr('src')
  //$('iframe.youtube-player.lazyload').attr('data-src', src)
  //return $.html()
}

function makeElLazyLoad(
  html: string,
  selector: string,
  attrs: string[]
): string {
  const $ = Cheerio.load(html)
  $(selector).each(function () {
    $(this).addClass('lazyload')
    attrs.forEach((attrName) => {
      const val = $(this).attr(attrName)
      $(this).removeAttr(attrName)
      $(this).attr(`data-${attrName}`, val)
    })
  })

  return $.html()
}

export function makeImagesLazy(html: string) {
  logger.debug('Making Images Lazy')
  return makeElLazyLoad(html, 'img', ['src', 'srcset'])
  //const $ = Cheerio.load(html)
  //$('img').each(function () {
  //$(this).addClass('lazyload')
  //const src = $(this).attr('src')
  //const srcSet = $(this).attr('srcset')
  //$(this).removeAttr('src')
  //$(this).removeAttr('srcset')
  //$(this).attr('data-src', src)
  //$(this).attr('data-srcset', srcSet)
  //})

  //return $.html()
}

// @deprecate
export function makeVideoIframeLazy(htmlString: string) {
  const $ = Cheerio.load(htmlString)

  const ytIframe = $('iframe.youtube-player').toArray()

  if (ytIframe[0] && ytIframe[0].type === 'tag') {
    ytIframe[0].attribs['loading'] = 'lazy'
  }

  return $.html()
}
