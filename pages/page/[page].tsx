import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { getLayout, LayoutProps } from '../../components/layout'
import { SEO } from '../../components/SEO'
import Home from '../../screens/home'
import DiskCacheService from '../../services/diskCache'
import RecipeService from '../../services/RecipeService'
import { styleClass } from '../../styles/home.css'
import { dark, light } from '../../styles/themes.css'
import { Recipe } from '../../types/wp-graphql.types'
import { LocalPageInfo } from '../../utils/types'
import { NextPageWithLayout } from '../_app'

type HomeProps = LocalPageInfo & {
  recipes: Recipe[]
}

const PAGE_LENGTH = 6

const PaginatedHomePage: NextPageWithLayout<HomeProps> = (props) => {
  const [currTheme, setCurrTheme] = useState(light)

  const toggleTheme = () => {
    //console.log('toggling currTheme')
    currTheme == light ? setCurrTheme(dark) : setCurrTheme(light)
  }

  return (
    <div className={`${currTheme} ${styleClass}`}>
      <SEO isArticle={false} />
      <Home recipes={props.recipes} pageInfo={props.pageInfo} />
      <button style={{ display: 'none' }} onClick={() => toggleTheme()}>
        Switch Theme
      </button>
    </div>
  )
}

PaginatedHomePage.displayName = 'Home'

PaginatedHomePage.getLayout = getLayout

export const getStaticPaths: GetStaticPaths<{
  page: string[]
}> = async () => {
  const recipeService = new RecipeService(new DiskCacheService())

  const allRecipes = await recipeService.getAllRecipePosts()

  const noOfPages = Math.ceil(allRecipes.length / PAGE_LENGTH)

  const allURIs = Array.from({ length: noOfPages }).map(
    (_, idx) => `/page/${idx + 1}`
  )

  return {
    paths: allURIs,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  HomeProps & { layoutProps: LayoutProps },
  {
    page: string
  }
> = async ({ params }) => {
  const page = Number(params?.page) || 1
  if (isNaN(page)) throw Error(`Invalid Page in homePage :${page} `)

  const recipeService = new RecipeService(new DiskCacheService())

  const allRecipes = await recipeService.getAllRecipePosts()

  const courseSummary = (await recipeService.getAllCourses('SUMMARY')).sort(
    (a, b) => (b.recipes?.nodes?.length ?? 0) - (a.recipes?.nodes?.length ?? 0)
  )
  const cuisineSummary = (await recipeService.getAllCuisines('SUMMARY')).sort(
    (a, b) => (b.recipes?.nodes?.length ?? 0) - (a.recipes?.nodes?.length ?? 0)
  )

  const noOfPages = Math.ceil(allRecipes.length / PAGE_LENGTH)

  const allRecipeSummary = allRecipes.map((recipe) => {
    delete recipe['content']
    return recipe
  })

  const startIdx = 0
  const endIdx = PAGE_LENGTH * page

  const result = {
    props: {
      recipes: allRecipeSummary.slice(startIdx, endIdx),
      pageInfo: {
        total: noOfPages,
        current: page,
        uri: '',
      },
      layoutProps: {
        courseSummary,
        cuisineSummary,
      },
    },
  }

  return result
}

export default PaginatedHomePage
