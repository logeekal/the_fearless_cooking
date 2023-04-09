import { useEffect } from 'react'
import striptags from 'striptags'

import BottomBar from '../../components/bottom_bar'
import { SEO } from '../../components/SEO'
import { Post } from '../../types/wp-graphql.types'
import { SiteMeta } from '../../utils/config'
import { featuredImageContainer, postContainer, postContent } from './post.css'

type PostProps = {
  post: {
    post: Post
    schema: Record<string, unknown>
  }
}

export default function PostPage(props: PostProps) {
  const { post } = props

  return (
    <div id={`post ${postContainer}`}>
      <SEO
        title={`${post.post.title as string} | ${SiteMeta.titleSuffix}`}
        description={striptags(post.post.excerpt as string)}
        image={post.post.featuredImage?.node?.mediaItemUrl as string}
        isArticle={true}
        url=""
        schemas={[
          {
            type: 'article',
            schema: JSON.stringify(post.schema),
          },
        ]}
      />
      <div id="post" className={`post ${postContent}`}>
        <div className="postHeader">
          <h1
            style={{ lineHeight: '3rem' }}
            dangerouslySetInnerHTML={{
              __html: post.post.title as string,
            }}
          ></h1>
        </div>
        <div className={`${featuredImageContainer}`}>
          <img
            alt={`${
              post.post.featuredImage?.node?.altText ?? post.post.title ?? ''
            }`}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            sizes={post.post.featuredImage?.node?.sizes as string}
            src={post.post.featuredImage?.node?.sourceUrl as string}
            srcSet={post.post.featuredImage?.node?.srcSet as string}
          />
        </div>
        <article
          id="article"
          dangerouslySetInnerHTML={{
            __html: post.post.content as string,
          }}
        ></article>
      </div>
      <BottomBar recipe={false} faq={false} />
    </div>
  )
}
