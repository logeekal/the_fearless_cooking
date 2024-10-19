import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { ImPencil2 } from 'react-icons/im'
import striptags from 'striptags'

import { Badge } from '../../components/badge'
import BottomBar from '../../components/bottom_bar'
import { SEO } from '../../components/SEO'
import { Post } from '../../types/wp-graphql.types'
import { SiteMeta } from '../../utils/config'
import { CommentSection } from '../comments'
import { commentSection } from '../recipe/recipe.css'
import {
  featuredImageContainer,
  postContainer,
  postContent,
  postHeader,
  postMeta,
} from './post.css'

type PostProps = {
  post: {
    post: Post
    schema: object
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
            schema: post.schema,
          },
        ]}
      />
      <div id="post" className={`post ${postContent}`}>
        <div className={`postHeader ${postHeader}`}>
          <h1
            dangerouslySetInnerHTML={{
              __html: post.post.title as string,
            }}
          ></h1>

          <div className={`postMeta ${postMeta}`}>
            {/* Badge with author name*/}
            <a
              href={'https://instagram.com/thefearlesscooking'}
              target="_blank"
              rel="noreferrer"
            >
              <Badge icon={<ImPencil2 size={'1.2rem'} />} negative>
                {post.post.author?.node?.name ?? 'Richa Gupta'}
              </Badge>
            </a>
            {/* Badge with date */}
            <Badge icon={<BsFillCalendar2DateFill size={'1.2rem'} />} negative>
              {new Date(post.post.dateGmt ?? Date.now()).toDateString()}
            </Badge>
          </div>
        </div>
        <div className={`featuredImage ${featuredImageContainer}`}>
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
        <section
          id="comments"
          className={`comment-section-container ${commentSection}`}
        >
          <p className={'cursive heading'} style={{ marginBottom: '2rem' }}>
            Tell us what you think
          </p>
          <CommentSection
            rootComments={post.post.comments?.nodes ?? []}
            postId={post.post.databaseId}
          />
        </section>
      </div>
      <BottomBar recipe={false} faq={false} />
    </div>
  )
}
