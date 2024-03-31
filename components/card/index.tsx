import NextLink from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa'

import {
  Category,
  Post,
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from '../../types/wp-graphql.types'
import { Badge } from '../badge'
import {
  cardArticle,
  cardCategory,
  cardContainer,
  cardExcerpt,
  cardImage,
  cardImageContainer,
  cardTitle,
  footer,
  footerLeft,
  footerRight,
} from './card.css'

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  post: Post | Recipe
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { post, ...restProps } = props

  const categories: Array<RecipeCourse | RecipeCuisine | Category> = []
  if (
    'recipeCuisines' in post &&
    post.recipeCuisines?.nodes &&
    post.recipeCuisines.nodes.length > 0
  ) {
    categories.push(post.recipeCuisines.nodes[0] as RecipeCuisine)
  }

  if (
    'recipeCourses' in post &&
    post.recipeCourses?.nodes &&
    post.recipeCourses.nodes.length > 0
  ) {
    categories.push(post.recipeCourses.nodes[0] as RecipeCuisine)
  }

  if (
    'categories' in post &&
    post.categories?.nodes &&
    post.categories.nodes.length > 0
  ) {
    categories.push(post.categories.nodes[0] as Category)
  }

  const mediumThumbnailUrl =
    post.featuredImage?.node?.mediaDetails?.sizes?.filter(
      (size) => size?.name === 'medium'
    )[0]?.sourceUrl

  const largeThumbnailUrl =
    post.featuredImage?.node?.mediaDetails?.sizes?.filter(
      (size) => size?.name === 'large'
    )[0]?.sourceUrl

  if (!mediumThumbnailUrl) throw new Error('medium image not found')
  if (!largeThumbnailUrl) throw new Error('large image not found')
  return (
    <NextLink legacyBehavior prefetch={false} href={post.uri}>
      <div className={`link card ${cardContainer}`} {...restProps}>
        <div className={`${cardImageContainer}`}>
          <img
            className={`${cardImage} lazyload`}
            data-src={mediumThumbnailUrl}
            data-srcset={`${mediumThumbnailUrl} 200w, ${largeThumbnailUrl} 400w`}
            alt={`image of ${post.title as string}`}
          />
        </div>
        <div className={`card__article ${cardArticle}`}>
          <NextLink prefetch={false} href={post.uri}>
            <h2
              className={`${cardTitle}`}
              itemProp="name"
              dangerouslySetInnerHTML={{
                __html: post.title as string,
              }}
            />
          </NextLink>

          <div className={`${cardExcerpt}`} itemProp="description">
            <div
              dangerouslySetInnerHTML={{
                __html: post.excerpt as string,
              }}
            />
          </div>
          <div className={`card-footer ${footer}`}>
            <span className={`footer-left  ${footerLeft}`}>
              {categories.slice(0, 1).map((cat, idx) => {
                return (
                  <React.Fragment key={cat.slug}>
                    <span
                      className={`card__category ${cardCategory}`}
                      key={cat.uri}
                    >
                      <NextLink prefetch={false} href={cat.uri}>
                        <Badge compact negative>
                          <span style={{ lineHeight: '1.5rem' }}>
                            {cat.name}
                          </span>
                        </Badge>
                      </NextLink>
                    </span>
                  </React.Fragment>
                )
              })}
            </span>

            <span className={`footer-right ${footerRight}`}>
              <span className="rating">5</span>
              <span className="star">
                <FaStar style={{ transform: 'translateY(1px)' }} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </NextLink>
  )
}

export default Card
