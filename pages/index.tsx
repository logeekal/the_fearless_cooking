import { GetStaticPropsResult, NextPageContext } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { useState } from 'react'

import { getLayout, LayoutProps } from '../components/layout'
import { SEO } from '../components/SEO'
import Home from '../screens/home'
import FAQService from '../services/FAQService'
import RecipeService from '../services/RecipeService'
import { styleClass } from '../styles/home.css'
import { dark, light } from '../styles/themes.css'
import { Recipe, RecipeCourse, RecipeCuisine } from '../types/wp-graphql.types'
import { NextPageWithLayout } from './_app'

type HomeProps = {
    courses: RecipeCourse[]
    cuisines: RecipeCuisine[]
    recipes: Recipe[]
}

const Root: NextPageWithLayout<HomeProps> = (props) => {
    const [currTheme, setCurrTheme] = useState(light)

    const toggleTheme = () => {
        //console.log('toggling currTheme')
        currTheme == light ? setCurrTheme(dark) : setCurrTheme(light)
    }

    return (
        <div className={`${currTheme} ${styleClass}`}>
            <SEO isArticle={false} />
            <Home {...props} />
            <button style={{ display: 'none' }} onClick={() => toggleTheme()}>
                Switch Theme
            </button>
        </div>
    )
}

Root.displayName = 'Home'

Root.getLayout = getLayout

export async function getStaticProps(
    context: NextPageContext
): Promise<GetStaticPropsResult<HomeProps & LayoutProps>> {
    const recipeService = new RecipeService()

    //const allFAQs = await new FAQService().getAllFAQREST()
    const allRecipes = (await recipeService.getAllRecipePosts()).slice(0, 10)
    const allCourses = await recipeService.getAllCourses()
    const allCuisines = await recipeService.getAllCuisines()

    const courseSummary = (await recipeService.getAllCourses('SUMMARY')).sort(
        (a, b) =>
            (b.recipes?.nodes?.length ?? 0) - (a.recipes?.nodes?.length ?? 0)
    )
    const cuisineSummary = (await recipeService.getAllCuisines('SUMMARY')).sort(
        (a, b) =>
            (b.recipes?.nodes?.length ?? 0) - (a.recipes?.nodes?.length ?? 0)
    )

    return {
        props: {
            courses: allCourses,
            recipes: allRecipes,
            cuisines: allCuisines,
            layoutProps: {
                courseSummary,
                cuisineSummary,
            },
        },
    }
}

export default Root
