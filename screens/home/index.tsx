import React from 'react'

import ArticleGrid from '../../components/card_grid'
import { Recipe } from '../../types/wp-graphql.types'
import { homeContainerClass } from './home.css'

type Props = {
  recipes: Recipe[]
}

const Home = (props: Props) => {
  const { recipes } = props
  return (
    <div className={`${homeContainerClass}`}>
      <div>
        <ArticleGrid posts={recipes} />
      </div>
    </div>
  )
}

export default Home
