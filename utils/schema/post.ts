import { Post } from '../../types/wp-graphql.types'
import { SiteMeta } from '../config'
import { logger } from '../logger'

export const genPostSchema = (post: Post) => {
  logger.warn({ dateGmt: post.dateGmt, modifiedGmt: post.modifiedGmt })
  if (!post) return {}

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: `${post.dateGmt ?? Date.now()}Z`,
    dateModified: `${post.modifiedGmt ?? Date.now()}Z`,
    author: {
      '@type': 'Person',
      name: SiteMeta.author.name,
      url: SiteMeta.author.aboutLink,
    },
    image: post.featuredImage?.node?.sourceUrl,
    publisher: {
      '@type': 'Organization',
      name: SiteMeta.name,
      logo: {
        '@type': 'ImageObject',
        url: SiteMeta.logo,
      },
    },
  }
}
