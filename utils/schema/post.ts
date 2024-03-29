import { Post } from '../../types/wp-graphql.types'
import { SiteMeta } from '../config'

const genPostBreadcrumbSchema = (post: Post) => {
  if (post.uri === undefined) throw Error('Post URI is undefined')
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thefearlesscooking.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: 'https://thefearlesscooking.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://thefearlesscooking.com${post.uri}`,
      },
    ],
  }
}

const genPostSchema = (post: Post) => {
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

export const genCombinedPostSchema = (post: Post) => {
  return [genPostSchema(post), genPostBreadcrumbSchema(post)]
}
