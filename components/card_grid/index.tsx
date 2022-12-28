/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

import { Recipe } from '../../types/wp-graphql.types'
import { LocalPageInfo } from '../../utils/types'
import Card from '../card'
import {
  footerImg,
  grid,
  gridContainer,
  gridFooter,
  gridHeading,
} from './grid.css'

export interface ArticleGridProps extends LocalPageInfo {
  recipes: Recipe[]
}

const ArticleGrid: React.FC<ArticleGridProps> = (props) => {
  const { recipes: posts, pageInfo } = props

  const [currentURL, setCurrentURL] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      setCurrentURL(window.location.pathname)
    }
  }, [router])

  const relevantArticles = posts

  const isNextAvailable = useMemo(() => {
    return pageInfo.current < pageInfo.total
  }, [pageInfo])

  const nextPageTarget = useMemo(
    () =>
      isNextAvailable
        ? `${currentURL === '/' ? '' : currentURL}/page/${pageInfo.current + 1}`
        : currentURL,
    [isNextAvailable, currentURL, pageInfo]
  )

  const shouldLoadMore = useMemo(
    () => pageInfo.current < pageInfo.total,
    [pageInfo]
  )

  return (
    <div className={`article-grid-container ${gridContainer}`}>
      <div className={`grid__header ${gridHeading} cursive heading`}>
        The Latest
      </div>
      <div className={`grid ${grid}`}>
        {relevantArticles?.map((article, index) => {
          return <Card key={index} post={article} itemProp="itemListElement" />
        })}
      </div>
      <div
        style={{
          display: shouldLoadMore ? 'block' : 'none',
        }}
      >
        <Link
          scroll={false}
          replace={true}
          className={`grid__footer ${gridFooter}`}
          href={nextPageTarget}
        >
          <img
            alt={'Load more posts'}
            className={`btn ${footerImg}`}
            src="/images/chevron-down-double.svg"
            width="50px"
            height={'50px'}
          />
        </Link>
      </div>
    </div>
  )
}

export default ArticleGrid
