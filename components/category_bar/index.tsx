import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { RecipeCourse, RecipeCuisine } from '../../types/wp-graphql.types'
import Styles, {
  categories as categoriesStyle,
  categoryAvatar,
  categoryContainer,
} from './category_bar.css'

type Props = {
  categories: Array<RecipeCuisine | RecipeCourse>
}

function CategoryBar(props: Props) {
  const { categories } = props
  return (
    <div className={`category__container ${categoryContainer}`}>
      <div className={`categories ${categoriesStyle} `}>
        {categories.map((cat) => {
          return (
            <div className={`category__avatar ${categoryAvatar}`} key={cat.uri}>
              <Link href={cat.uri}>
                <img
                  src={
                    cat.thumbnail !== ''
                      ? (cat.thumbnail as string)
                      : ('/images/shop.svg' as string)
                  }
                  width={20}
                  height={20}
                  alt={`Image of ${cat.name as string}`}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryBar
