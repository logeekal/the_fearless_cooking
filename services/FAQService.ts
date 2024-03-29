import axios from 'axios'

import { logger } from '../utils/logger'
import { IFAQRestContent } from '../utils/types'
import { ICacheService } from './CacheService'

const pagesHeaderName = 'x-wp-totalpages'

export default class FAQService {
  host: string

  constructor(
    private cacheService: ICacheService | undefined,
    private clean: boolean = false
  ) {
    this.host = process.env.MF_HOST as string
    if (!this.host) {
      throw new Error(`Backend host is empty : ${this.host}`)
    }
  }

  getFromCache = <T>(entity: string): T | undefined => {
    if (this.cacheService && !this.clean) {
      if (this.cacheService.get(entity)) {
        return JSON.parse(
          this.cacheService.get(entity)?.toString() as string
        ) as unknown as T
      }
    }
  }

  getAllFAQREST = async (): Promise<Array<IFAQRestContent>> => {
    const ENTITY = 'FAQ'

    const faqFromCache = this.getFromCache<Array<IFAQRestContent>>(ENTITY)

    if (faqFromCache) {
      return faqFromCache
    }

    const faqURL = `${this.host}/wp-json/wp/v2/helpie_faq?per_page=100`

    const res = await axios.get<Array<IFAQRestContent>>(faqURL)

    const faqs = res.data

    logger.info(`Got ${faqs.length} faqs in first iteration...`)

    if (pagesHeaderName in res.headers) {
      const totalPages = parseInt(res.headers[pagesHeaderName])
      if (totalPages == 1) {
        return faqs
      }
      let counter = 1
      while (counter != totalPages) {
        counter++
        const newPage = await axios.get<Array<IFAQRestContent>>(
          `${faqURL}&page=${counter}`
        )
        logger.info(`Got ${newPage.data.length} faqs in ${counter} iteration`)
        faqs.push(...newPage.data)
      }
    }

    this.cacheService && this.cacheService.set(ENTITY, JSON.stringify(faqs))

    return faqs
  }
}
