import Image from 'next/image'
import { FC, PropsWithChildren, ReactElement, useState } from 'react'

import { dark, light } from '../../styles/themes.css'
import { RecipeCourse, RecipeCuisine } from '../../types/wp-graphql.types'
import CategoryBar from '../category_bar'
import Footer from './footer'
import { footerBy, layoutClass } from './layout.css'
import Navbar from './navbar'

export type LayoutProps = {
    cuisineSummary: Array<RecipeCuisine>
    courseSummary: Array<RecipeCourse>
}

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
    const [currTheme, setCurrTheme] = useState(light)

    const toggleTheme = () => {
        //console.log('toggling currTheme')
        currTheme == light ? setCurrTheme(dark) : setCurrTheme(light)
    }
    return (
        <div className={`${currTheme} ${layoutClass}`}>
            <Navbar
                courseSummary={props.courseSummary}
                cuisineSummary={props.cuisineSummary}
            />
            <CategoryBar
                categories={[...props.courseSummary, ...props.cuisineSummary]}
            />
            {props.children}
            <Footer />
            <div className={`footer__by text_center ${footerBy}`}>
                <i> Happy Cooking </i>👩🏽‍🍳
            </div>
        </div>
    )
}

export const getLayout = (page: ReactElement, layoutProps: LayoutProps) => {
    return (
        <>
            <Layout {...layoutProps}>{page}</Layout>
        </>
    )
}

export default Layout
