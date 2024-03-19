import { Post } from '../../types/wp-graphql.types'
import { SiteMeta } from '../config'

export const genPostSchema = (post: Post) => {
  if (!post) return {}

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: `${post.dateGmt ?? Date.now()}+00:00`,
    dateModified: `${post.modifiedGmt ?? Date.now()}+00:00`,
    author: {
      '@type': 'Person',
      name: SiteMeta.author.name,
    },
    image: post.featuredImage?.node?.sourceUrl,
  }
}
