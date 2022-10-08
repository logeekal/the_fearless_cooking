import Link from 'next/link'
import React, { ForwardedRef, forwardRef } from 'react'

import { RecipeCourse, RecipeCuisine } from '../../types/wp-graphql.types'
import {
  avatarContainer,
  categories as categoriesStyle,
  categoryAvatar,
  categoryAvatarImg,
  categoryContainer,
} from './category_bar.css'

type Props = {
  categories: Array<RecipeCuisine | RecipeCourse>
}

const CategoryBar = forwardRef<HTMLDivElement, Props>(
  (props: Props, catRef: ForwardedRef<HTMLDivElement>) => {
    const { categories } = props
    return (
      <div className={`category__container ${categoryContainer}`} ref={catRef}>
        <div className={`categories ${categoriesStyle} `}>
          {categories
            .filter((cat) => cat.thumbnail !== '')
            .map((cat) => {
              return (
                <div
                  className={`avatar__container ${avatarContainer}`}
                  key={cat.slug}
                >
                  <div
                    className={`link category__avatar ${categoryAvatar}`}
                    key={cat.uri}
                  >
                    <Link prefetch={false} href={cat.uri}>
                      <img
                        className={`${categoryAvatarImg}`}
                        src={
                          cat.thumbnail !== ''
                            ? (cat.thumbnail as string)
                            : ('/images/shop.svg' as string)
                        }
                        alt={`Image of ${cat.name as string}`}
                      />
                    </Link>
                  </div>
                  <p>{cat.name}</p>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
)

CategoryBar.displayName = 'CategoryBar'

export default CategoryBar
