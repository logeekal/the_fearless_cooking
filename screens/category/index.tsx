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
  return (
    <>
      <SEO
        title={
          props.isAI
            ? `Best AI Generated Recipes | ${SiteMeta.title}`
            : `${String(props.category.name)} recipes | ${SiteMeta.title}`
        }
        isArticle={false}
      />
      <Home
        recipes={props.category.recipes?.nodes as Recipe[]}
        pageInfo={props.pageInfo}
        title={tagLine}
      />
    </>
  )
}

export default Category
