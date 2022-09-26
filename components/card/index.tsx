import NextLink from 'next/link'
import React from 'react'

import {
  Category,
  Post,
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from '../../types/wp-graphql.types'
import {
  cardArticle,
  cardCategory,
  cardContainer,
  cardExcerpt,
  cardImage,
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

  return (
    <NextLink prefetch={false} href={post.uri}>
      <div className={`card ${cardContainer}`} {...restProps}>
        <div>
          <img
            className={`${cardImage}`}
            srcSet={post?.featuredImage?.node?.srcSet as string}
            src={post?.featuredImage?.node?.sourceUrl as string}
            sizes="(max-width : 800px) 400px, 20vw"
            alt={`image of ${post.title as string}`}
            loading="lazy"
          />
        </div>
        <div className={`card__article ${cardArticle}`}>
          <NextLink href={post.uri}>
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
              {categories.map((cat, idx) => {
                return (
                  <>
                    {idx > 0 ? (
                      <span className="card__category--saperator">/</span>
                    ) : null}
                    <span
                      className={`card__category ${cardCategory}`}
                      key={cat.uri}
                    >
                      <NextLink href={cat.uri}>{cat.name}</NextLink>
                    </span>
                  </>
                )
              })}
            </span>

            <span className={`footer-right ${footerRight}`}>
              <span className="rating">5</span>
              <span className="star">★</span>
            </span>
          </div>
        </div>
      </div>
    </NextLink>
  )
}

export default Card
