import React from 'react'

import {
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from '../../types/wp-graphql.types'
import { LocalPageInfo } from '../../utils/types'
import Home from '../home'

type CategoryPageProps = LocalPageInfo & {
  category: RecipeCuisine | RecipeCourse
}

function Category(props: CategoryPageProps) {
  //console.log(
  //`Category ${props.category.name as string} : `,
  //props.category.recipes?.nodes?.length
  //)
  return (
    <>
      <Home
        recipes={props.category.recipes?.nodes as Recipe[]}
        pageInfo={props.pageInfo}
      />
    </>
  )
}

export default Category
