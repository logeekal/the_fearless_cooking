/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

import { Post, Recipe } from '../../types/wp-graphql.types'
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
  recipes: Recipe[] | Post[]
  title?: string
}

const ArticleGrid: React.FC<ArticleGridProps> = (props) => {
  const { recipes: posts, pageInfo, title } = props

  const [currentURL, setCurrentURL] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const thisPagePath = window.location.pathname
      if (thisPagePath.includes('page')) {
        const paths = thisPagePath.split('/')
        const newPaths = paths.slice(0, paths.length - 2)
        setCurrentURL(newPaths.join('/'))
        return
      }
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
      <h1
        style={{ margin: 0 }}
        className={`grid__header ${gridHeading} cursive heading`}
      >
        {title ? title : 'Latest'}
      </h1>
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

export default React.memo(ArticleGrid)
