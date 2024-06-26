import NextHead from 'next/head'
import React from 'react'

import { SiteMeta as siteMetadata } from '../../utils/config'
//import genRecipeSchema from './utils/genRecipeSchema'

export interface SEOQueryProps {
  title?: string
  description?: string
  image?: string
  url?: string
  isArticle: boolean
  schemas?: Array<{
    type: 'recipe' | 'articles' | 'list' | 'FAQ' | 'article'
    schema: object
  }>
}

type SEOProps = SEOQueryProps

export function SEO({
  title,
  description,
  image,
  isArticle,
  url,
  schemas,
}: SEOProps) {
  return (
    <>
      <NextHead>
        {/* General Tags */}
        <title>{title || siteMetadata.title}</title>
        <meta
          name="description"
          content={description || siteMetadata.description}
        ></meta>
        <meta name="image" content={image || siteMetadata.image} />
        <link
          rel="icon"
          type="image/svg"
          href={siteMetadata.favicon}
          sizes="16x16"
        />

        {/* Open Graph Tags */}
        <meta property="og:url" content={url || siteMetadata.canonicalUrl} />
        {isArticle ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title || siteMetadata.title} />
        <meta
          property="og:description"
          content={description || siteMetadata.description}
        />
        <meta property="og:image" content={image || siteMetadata.image} />
        <meta property="og:image:alt" content={title || siteMetadata.title} />
        <meta property="fb:app_id" content={siteMetadata.social.fb} />

        {/* Twitter Card Tags  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={siteMetadata.social.twitter} />
        <meta name="twitter:title" content={title || siteMetadata.title} />
        <meta
          name="twitter:description"
          content={description || siteMetadata.description}
        />
        <meta name="twitter:image" content={image || siteMetadata.image} />
        {schemas &&
          schemas.map((schemaObj, index) => {
            if (Array.isArray(schemaObj.schema)) {
              return schemaObj.schema.map((schema, index) => {
                return (
                  <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(schema),
                    }}
                    async
                  ></script>
                )
              })
            } else
              return (
                <script
                  key={index}
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schemaObj.schema),
                  }}
                  async
                ></script>
              )
          })}
      </NextHead>
    </>
  )
}
