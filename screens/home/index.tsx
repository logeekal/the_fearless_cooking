import React from 'react'

import ArticleGrid from '../../components/card_grid'
import { Recipe } from '../../types/wp-graphql.types'
import { LocalPageInfo } from '../../utils/types'
import { homeContainerClass } from './home.css'

type Props = LocalPageInfo & {
  recipes: Recipe[]
}

const Home = (props: Props) => {
  const { recipes } = props

  return (
    <div className={`${homeContainerClass}`}>
      <div>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <ArticleGrid recipes={recipes} pageInfo={props.pageInfo} />
      </div>
    </div>
  )
}

export default Home
