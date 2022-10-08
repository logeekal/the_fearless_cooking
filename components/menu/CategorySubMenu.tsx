import NextLink from 'next/link'
import React, { Fragment, ReactElement } from 'react'

import {
  categoryContainer,
  categoryMenuItems,
  categoryMenuText,
  categoryTitle,
} from './CategorySubMenu.css'

interface CategorySubMenuProps {
  title: string
  items: Array<{
    name: string
    img?: ReactElement
    uri: string
    onClick?: () => void
  }>
}

function CategorySubMenu(props: CategorySubMenuProps) {
  const { title, items } = props
  return (
    <ul className={`category__submenu category__${title} ${categoryContainer}`}>
      <h2 className={`upper ${categoryTitle}`}> {title} </h2>
      {items.map((item) => {
        return (
          <li
            className={`${categoryMenuItems}`}
            key={item.uri}
            onClick={item.onClick}
          >
            {item.img ? (
              <div
                className={`icon category__item--img \
                            category__item--${item.name}`}
              >
                {item.img}
              </div>
            ) : (
              <></>
            )}
            <NextLink
              soft={true}
              prefetch={false}
              className="category__item--link"
              href={item.uri}
            >
              <p className={`link ${categoryMenuText}`}>{item.name}</p>
            </NextLink>
          </li>
        )
      })}
    </ul>
  )
}

export default CategorySubMenu
