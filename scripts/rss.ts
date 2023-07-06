import dotenv from 'dotenv'
import { openSync, writeFileSync } from 'fs'
import path from 'path'
import striptags from 'striptags'

import { convertAIRecipesToCompleteRecipes } from '../utils/ai-recipe'
import { logger } from '../utils/logger'
import { genCompleteRecipeObject } from '../utils/recipe'
import { ICompleteRecipeObj } from '../utils/types'

dotenv.config({
  path: path.join(process.cwd(), '.env.local'),
})

type RSSChannel = {
  title: string
  link: string
  description: string
  pubDate: string
  lastBuildDate: string
}

type RSSChannelItem = {
  title: string
  link: string
  description: string
  pubDate: string
  author: string
  categories: Array<{
    name: string
    url: string
  }>
  guid: string
}

export class RSS {
  recipeObj: ICompleteRecipeObj | undefined
  version = '2.0'
  baseURL = 'https://thefearlesscooking.com'
  outDir = 'out'
  rssFileName = 'rss.xml'

  async getRecipeObject() {
    try {
      this.recipeObj = await genCompleteRecipeObject()
    } catch (err) {
      console.error(err)
    }
  }

  createRecipeRSS() {
    logger.info('Creating Recipe RSS')
    const destDir = path.join(process.cwd(), this.outDir)
    const fileName = 'recipe-' + this.rssFileName
    const filePath = path.join(destDir, fileName)
    const f = openSync(filePath, 'w')
    this.getRecipeObject()
      .then(() => {
        if (!this.recipeObj) {
          throw new Error('Recipe Object should not be empty')
        }
        const recipeChannelItems = this.genRecipeChannelItems(this.recipeObj)
        const recipeRSS = this.genRecipeChannel(recipeChannelItems)
        writeFileSync(f, this.withRSSVersion(recipeRSS))
        logger.info(`Recipe RSS created : ${filePath}`)
      })
      .catch(() => console.error)
  }

  createAIRecipeRSS() {
    logger.info('Creating AI Recipe RSS')
    const destDir = path.join(process.cwd(), this.outDir)
    const fileName = `ai-recipe-${this.rssFileName}`
    const filePath = path.join(destDir, fileName)

    const f = openSync(filePath, 'w')

    const aiRecipeObject = convertAIRecipesToCompleteRecipes()
    const aiRecipeChannelItems = this.genRecipeChannelItems(aiRecipeObject)
    const aiRecipeRSS = this.genRecipeChannel(aiRecipeChannelItems)
    writeFileSync(f, aiRecipeRSS)
    logger.info(`AI Recipe RSS generated : ${filePath}`)
  }

  private withRSSVersion(channel: string) {
    return `<rss version="${this.version}">
            ${channel}
            </rss>`
  }

  private getFullURL(relativeURL: string) {
    const baseURLCurrent = new URL(this.baseURL)
    baseURLCurrent.pathname = relativeURL
    return baseURLCurrent.toString()
  }

  private escapeCharsForXML(str: string) {
    const escapeData = [
      {
        old: '&',
        new: '&amp;',
      },
      {
        old: '"',
        new: '&quot;',
      },
      {
        // eslint-disable-next-line
        old: "'", 
        new: '&apos;',
      },
      {
        old: '&hellip;',
        new: '',
      },
    ]

    const newStr = striptags(str)
    return escapeData.reduce((str, escStr) => {
      return str.replace(escStr.old, escStr.new)
    }, newStr)
  }

  private genRecipeChannel(items: RSSChannelItem[]) {
    logger.info(`Generating Channel with ${items.length} items`)
    const description = 'This feed lists the recipes by The Fearless Cooking'

    return `
      <channel>
        <title>Recipes by The Fearless Cooking</title>
        <link> http://thefearlesscooking.com </link>
        <description>${description}</description>
        <pubDate>${new Date(2022, 10, 22).toUTCString()} </pubDate>
        <lastBuildDate>${Date.now().toString()}</lastBuildDate>
        ${items
          .map((i) => {
            return `
                <item>
                <title>${i.title}</title>
                <link>${i.link}</link>
                <description>${i.description}</description>
                <pubDate>${i.pubDate}</pubDate>
                <author>${i.author}</author>
                <guid>${i.guid}</guid>
                ${i.categories
                  .map((cat) => {
                    const domain = cat.url ? this.getFullURL(cat.url) : ''

                    return `<category domain="${domain}">${cat.name}</category>`
                  })
                  .join('\n')}
                </item>
        `
          })
          .join('\n')}
      </channel>
      `
  }

  private genRecipeChannelItems(recipeObj: ICompleteRecipeObj) {
    if (!recipeObj) throw Error('No Recipe Data while creating Items')
    return Object.values(recipeObj).map((recipe) => {
      const courses =
        recipe.post.recipeCourses?.nodes?.map((i) => ({
          name: this.escapeCharsForXML(i?.name ?? ''),
          url: i?.uri ?? '',
        })) ?? []

      const cuisines =
        recipe.post.recipeCuisines?.nodes?.map((i) => ({
          name: this.escapeCharsForXML(i?.name ?? ''),
          url: i?.uri ?? '',
        })) ?? []

      return {
        title: this.escapeCharsForXML(recipe.post.title as string),
        link: this.getFullURL(recipe.post.uri),
        description: this.escapeCharsForXML(recipe.post.excerpt as string),
        pubDate: new Date(recipe.post.dateGmt ?? '').toUTCString(),
        author: 'Richa Gupta',
        guid: String(recipe.post.databaseId),
        categories: [...courses, ...cuisines],
      } as RSSChannelItem
    })
  }
}
