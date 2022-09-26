import * as Cheerio from 'cheerio'

import { devLogger, logger } from './logger'
import { log } from './utils'

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

  devLogger.info('FAQ IDs ', finalFAQIds)

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
  log('Getting video id')

  const $ = Cheerio.load(htmlString)

  const ytIframe = $('iframe.youtube-player').toArray()

  devLogger.info(htmlString)
  if (!ytIframe) {
    return null
  }

  if (ytIframe[0] && ytIframe[0].type === 'tag') {
    const ytEmbedURL = new URL(ytIframe[0].attribs['src'])
    devLogger.info(`Found Video URL :  ${ytEmbedURL.toString()}`)
    const vidId = ytEmbedURL.pathname.split('/')[2]
    devLogger.info(`Found video ID: ${vidId}`)
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

export function makeVideoIframeLazy(htmlString: string) {
  const $ = Cheerio.load(htmlString)

  const ytIframe = $('iframe.youtube-player').toArray()

  if (ytIframe[0] && ytIframe[0].type === 'tag') {
    ytIframe[0].attribs['loading'] = 'lazy'
  }

  return $.html()
}
