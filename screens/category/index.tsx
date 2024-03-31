import React from 'react'

import { SEO } from '../../components/SEO'
import {
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from '../../types/wp-graphql.types'
import { SiteMeta } from '../../utils/config'
import { LocalPageInfo } from '../../utils/types'
import Home from '../home'

type CategoryPageProps = LocalPageInfo & {
  category: RecipeCuisine | RecipeCourse
  isAI?: boolean
}

function Category(props: CategoryPageProps) {
  const tagLine = props.category.name
    ? `Latest ${props.category.name} Recipes`
    : 'Latest Recipes'

  const title =
    props.pageInfo.current === 1
      ? tagLine
      : `${tagLine} - Page ${props.pageInfo.current}`

  const AITitle =
    props.pageInfo.current === 1
      ? 'Best AI Generated Recipes'
      : `Best AI Generated Recipes - Page ${props.pageInfo.current}`

  return (
    <>
      <SEO
        title={
          props.isAI
            ? `${AITitle} | ${SiteMeta.title}`
            : `${title} | ${SiteMeta.title}`
        }
        isArticle={false}
      />
      <Home
        recipes={props.category.recipes?.nodes as Recipe[]}
        pageInfo={props.pageInfo}
        title={title}
      />
    </>
  )
}

export default Category
