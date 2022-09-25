/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'

import { Post, Recipe } from '../../types/wp-graphql.types'
import Card from '../card'
import {
    footerImg,
    grid,
    gridContainer,
    gridFooter,
    gridHeading,
} from './grid.css'

interface ArticleGridProps {
    posts: Post[] | Recipe[]
}

const ArticleGrid: React.FC<ArticleGridProps> = (props) => {
    const { posts } = props

    const relevantArticles: Post[] | Recipe[] = posts

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

    return (
        <div className={`article-grid-container ${gridContainer}`}>
            <div className={`grid__header ${gridHeading} cursive heading`}>
                The Latest
            </div>
            <div className={`grid ${grid}`}>
                {relevantArticles.map((article, index) => {
                    return (
                        <Card
                            key={index}
                            post={article}
                            itemProp="itemListElement"
                        />
                    )
                })}
            </div>
            <div className={`grid__footer ${gridFooter}`}>
                <Image
                    alt={'Load more posts'}
                    className={`${footerImg}`}
                    src="/images/chevron-down-double.svg"
                    width="50px"
                    height={'50px'}
                />
            </div>
        </div>
    )
}

export default ArticleGrid
