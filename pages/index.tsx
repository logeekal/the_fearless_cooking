import { GetStaticPropsResult, NextPageContext } from 'next'
import NextLink from 'next/link'
import { FC, useMemo, useState } from 'react'

import { getLayout, LayoutProps } from '../components/layout'
import FAQService from '../services/FAQService'
import RecipeService from '../services/RecipeService'
import { styleClass } from '../styles/home.css'
import { dark, light } from '../styles/themes.css'
import { Recipe, RecipeCourse, RecipeCuisine } from '../types/wp-graphql.types'
import { devLogger } from '../utils/logger'
import { getTheme, themes } from '../utils/themes'
import { NextPageWithLayout } from './_app'

type HomeProps = {
    courses: RecipeCourse[]
    cuisines: RecipeCuisine[]
    recipes: Recipe[]
}

const Home: NextPageWithLayout<HomeProps> = (props) => {
    const [currTheme, setCurrTheme] = useState(light)

    //console.log({ props })
    const { courses, cuisines, recipes } = props

    const toggleTheme = () => {
        //console.log('toggling currTheme')
        currTheme == light ? setCurrTheme(dark) : setCurrTheme(light)
    }

    return (
        <div className={`${currTheme} ${styleClass}`}>
            <button onClick={() => toggleTheme()}> Switch Theme</button>
            <h1> Courses </h1>
            {courses.map((course) => {
                return (
                    <>
                        <NextLink key={course.databaseId} href={course.uri}>
                            {course.name}
                        </NextLink>

                        <br />
                    </>
                )
            })}
            <br />
            <h1> Cuisines </h1>
            {cuisines.map((cuisine) => {
                return (
                    <>
                        <NextLink key={cuisine.databaseId} href={cuisine.uri}>
                            {cuisine.name}
                        </NextLink>

                        <br />
                    </>
                )
            })}

            <br />
            <h1> Recipes </h1>
            {recipes.map((recipe) => {
                return (
                    <>
                        <NextLink key={recipe.databaseId} href={recipe.uri}>
                            {recipe.title}
                        </NextLink>

                        <br />
                    </>
                )
            })}
        </div>
    )
}
Home.getLayout = getLayout

export async function getStaticProps(
    context: NextPageContext
): Promise<GetStaticPropsResult<HomeProps & LayoutProps>> {
    const recipeService = new RecipeService()

    const allFAQs = await new FAQService().getAllFAQREST()
    const allRecipes = await recipeService.getAllRecipePosts()
    const allCourses = await recipeService.getAllCourses()
    const allCuisines = await recipeService.getAllCuisines()

    const courseSummary = await recipeService.getAllCourses('SUMMARY')
    const cuisineSummary = await recipeService.getAllCuisines('SUMMARY')

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

export default Home
