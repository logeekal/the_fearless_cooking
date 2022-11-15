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

  //const [maxCardHeight, setMaxCardHeight] = React.useState(0)
  //const [articleHeights, setArticleHeights] = React.useState<Array<number>>(
  //[]
  //)
  //const [heights, setHeight] = React.useState<Array<number>>([])
  //const [gridHeight, setGridHeight] = React.useState(0)
  //const gridRef = useGridRef;
  //
  //const gridRef = React.useRef<HTMLDivElement | any>({
  //current: { clientHeight: 0 },
  //})

  //const onThumbnailLoad = () => {
  //if (gridRef.current) {
  //setGridHeight(gridRef.current.clientHeight)
  //}
  //}

  //React.useEffect(() => {
  ////update original article heights
  //const minorCards: NodeList =
  //gridRef.current.querySelectorAll('.card-minor')
  //const originalArticleHeigts = Array.from(minorCards).map((card) => {
  //const article =
  //card.firstChild.parentElement.querySelector('article')
  //return article.clientHeight
  //})

  //setArticleHeights(originalArticleHeigts)
  //}, [gridRef])

  //React.useEffect(() => {
  //console.log('***', gridRef.current.clientHeight)
  //if (articleHeights.length === 0) return
  //const minorCards: NodeList =
  //gridRef.current.querySelectorAll('.card-minor')
  //console.log('===minorcard : ', minorCards)
  //const maxHeight = Array.from(minorCards).reduce(
  //(prevValue, currentElement) => {
  //prevValue = Math.max(prevValue, currentElement.clientHeight)
  //return prevValue
  //},
  //0
  //)

  //console.log('===Max Height is : ', maxHeight)
  //const cardHeights = Array.from(minorCards).map((card) => {
  ////console.log("===", card, card.firstChild.parentElement.clientHeight);
  //return card.firstChild.parentElement.clientHeight
  //})

  //const localArticleHeights = Array.from(minorCards).map(
  //(card, index) => {
  //const article =
  //card.firstChild.parentElement.querySelector('article')
  //const height =
  //articleHeights && articleHeights.length > 0
  //? articleHeights[index]
  //: article.clientHeight
  //const diff = maxHeight - cardHeights[index]
  ////console.log("===New Height articles : ", height, diff, height + diff);
  //if (diff > 0) {
  //article.style.paddingBottom = `${diff}px`
  //}
  //return diff
  //}
  //)
  //}, [articleHeights, gridHeight])
  //
  //
  //
  const isNextAvailable = useMemo(() => {
    return pageInfo.current < pageInfo.total
  }, [pageInfo])

  const nextPageTarget = useMemo(
    () =>
      isNextAvailable
        ? `${currentURL === '/' ? '' : currentURL}?page=${pageInfo.current + 1}`
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
