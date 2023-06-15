import fs from 'fs'
import path from 'path'
import { URL } from 'url'

import { logger } from '../utils/logger'

type Sitemap = {
  exclude: Array<string>
  nextExportDir: Array<string>
  format: string
  baseUrl: string
}

const defaultConfig: Sitemap = {
  exclude: ['_next', 'fonts', 'images', '404.html'],
  nextExportDir: ['out'],
  format: 'txt',
  baseUrl: 'http://thefearlesscooking.com',
}

export const collectSSGURLs = (config: Sitemap) => {
  const ROOT_DIR = path.join(path.basename(__dirname), '..')

  logger.info(`ROOT_DIR : ${ROOT_DIR}`)
  const OUT_DIR = path.join(ROOT_DIR, ...config.nextExportDir)

  logger.info(`OUT_DIR: ${OUT_DIR}`)
  const EXCLUDED_DIRS = config.exclude
  const rootRelativeURLs = walkDir(OUT_DIR, EXCLUDED_DIRS)
  const relativeURLs = rootRelativeURLs.map((url) =>
    url.replace(`${OUT_DIR}/`, '')
  )
  return relativeURLs
}

const walkDir = function (dir: string, ignore_dir: string[], level = 0) {
  let results: Array<string> = []

  const contents = fs.readdirSync(dir)

  contents.forEach((file) => {
    const completeFilePath = path.join(dir, file)
    const relativePath = level === 0 ? file : completeFilePath
    if (!ignore_dir.includes(file)) {
      const stat = fs.statSync(completeFilePath)
      if (stat && stat.isDirectory()) {
        results = results.concat(
          walkDir(completeFilePath, ignore_dir, level + 1)
        )
      } else {
        results.push(relativePath.replace('.html', ''))
      }
    } else {
      logger.info(`Ignoring ${file}`)
    }
  })

  return results
}

export const combineConfig = (config: Sitemap): Sitemap => {
  if (!('base_url' in config)) {
    logger.warn('Missing base_url in config. Using localhost with port: 3000')
  }
  if (!('outDir' in config)) {
    logger.warn('Missing outDir in config. using public as default')
  }
  const baseUrl = 'baseUrl' in config ? config.baseUrl : defaultConfig.baseUrl
  return {
    exclude:
      'exclude' in config
        ? Array.from(
            new Set([...defaultConfig.exclude, ...(config.exclude ?? [])])
          )
        : defaultConfig.exclude,
    nextExportDir:
      'exportDir' in config
        ? config['nextExportDir']
        : defaultConfig.nextExportDir,
    format: 'format' in config ? config.format : defaultConfig.format,
    baseUrl,
  }
}

export const genSiteMapwithRelativeURLs = (
  config: Sitemap,
  relativeURLs: string[]
) => {
  const base_url = new URL(config.baseUrl)
  const completeURLs = relativeURLs.map((url) => {
    base_url.pathname = url
    return base_url.toString()
  })

  return completeURLs
}

const convertURLsToTextSitemap = (urls: string[]) => {
  return urls.reduce<string>((res, url, idx) => {
    res = idx === 0 ? url : res + '\n' + url
    return res
  }, '')
}

const writeSiteMap = (
  outDir: string,
  format: 'txt' | 'xml' = 'txt',
  content: string
) => {
  if (fs.existsSync(outDir)) {
    const fileName = `sitemap.${format}`
    const filePath = path.join(outDir, fileName)
    const f = fs.openSync(filePath, 'w')
    fs.writeFileSync(f, content)
    logger.info(`Sitemap written successfuly at ${filePath}`)
  } else {
    throw Error(
      `Cannot find outDir : ${outDir}. Please make sure it is already created`
    )
  }
}

export const run = () => {
  const config = combineConfig({} as Sitemap)
  const relativeURLs = collectSSGURLs(config)
  const urls = genSiteMapwithRelativeURLs(config, relativeURLs)
  if (config.format === 'txt') {
    const siteMapText = convertURLsToTextSitemap(urls)
    const outDir = path.join(...config.nextExportDir)
    writeSiteMap(outDir, config.format, siteMapText)
  }
}
