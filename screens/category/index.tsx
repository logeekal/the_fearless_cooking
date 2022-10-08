import React from 'react'

import {
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from '../../types/wp-graphql.types'
import Home from '../home'

type CategoryPageProps = {
  category: RecipeCuisine | RecipeCourse
}

function Category(props: CategoryPageProps) {
  return <Home recipes={props.category.recipes?.nodes as Recipe[]} />
}

export default Category
