import { GetStaticPaths, GetStaticProps } from 'next'

import { getLayout, LayoutProps } from '../components/layout'
import Category from '../screens/category'
import RecipePage from '../screens/recipe'
import FAQService from '../services/FAQService'
import RecipeService from '../services/RecipeService'
import { Recipe, RecipeCourse, RecipeCuisine } from '../types/wp-graphql.types'
import { arrToObj } from '../utils'
import { devLogger, logger } from '../utils/logger'
import {
  getFAQs,
  getYoutubeVideoId,
  makeVideoIframeLazy,
  replaceYTWithNoCookie,
  stripFAQSection,
} from '../utils/pre-processors'
import genRecipeSchema from '../utils/schema/recipe'
import { calculateTotalDuration } from '../utils/time_utils'
import {
  ICompleteRecipe,
  IFAQRestContent,
  IRecipeContent,
} from '../utils/types'
import { NextPageWithLayout } from './_app'

type CommonProps = {
  pageType: 'COURSE' | 'CUISINE' | 'RECIPE'
}

type CoursePageProps = CommonProps & {
  pageType: 'COURSE'
  course: RecipeCourse
}

type CuisinePageProps = CommonProps & {
  pageType: 'CUISINE'
  cuisine: RecipeCuisine
}

type RecipePageProps = CommonProps & {
  pageType: 'RECIPE'
  recipe: ICompleteRecipe
}

type CatchAllPageProps = CoursePageProps | CuisinePageProps | RecipePageProps

const CatchAll: NextPageWithLayout<CatchAllPageProps> = (props) => {
  /* eslint-disable-next-line */
  /*
   *
   * Article Page - 2nd Release
   * Recipe Page
   *  - Full Recipe  Object ( Recipe Article + Instruction )
   *  - FaQ Object
   *  - FAQIds
   * Category Page
   *   - Category Object with post references
   *   - recipe Object
   *   - Article Object
   * Home Page
   *
   * */

  /* eslint-disable-next-line */
  if (props.pageType === 'RECIPE') {
    return <RecipePage recipe={props.recipe} />
  }

  if (props.pageType === 'CUISINE') {
    return <Category category={props.cuisine} />
  }

  // default course
  return <Category category={props.course} />
}

CatchAll.getLayout = getLayout

export default CatchAll

export const getStaticPaths: GetStaticPaths<{
  uri: Array<string>
}> = async () => {
  const recipeService = new RecipeService()

  const courses = await recipeService.getAllCourses()

  const courseURIs = courses.map((course) => ({
    params: {
      uri: course.uri.split('/').filter((part) => part !== ''),
    },
  }))

  const cuisines = await recipeService.getAllCuisines()
  const cuisineURIs = cuisines.map((cuisine) => ({
    params: {
      uri: cuisine.uri.split('/').filter((part) => part !== ''),
    },
  }))

  const recipes = await recipeService.getAllRecipePosts()
  const recipeURIs = recipes.map((recipe) => ({
    params: {
      uri: recipe.uri.split('/').filter((part) => part !== ''),
    },
  }))

  return {
    paths: [...courseURIs, ...cuisineURIs, ...recipeURIs],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  CatchAllPageProps & {
    layoutProps: LayoutProps
  },
  { uri: Array<string> }
> = async ({ params }) => {
  const recipeService = new RecipeService()

  if (!params) throw Error('Invalid Params in Get static Props', params)
  const uri = `/${params.uri.join('/')}/`

  // get courses
  const courses = await recipeService.getAllCourses()
  const coursesObjByURI = arrToObj<RecipeCourse>(courses, 'uri')
  const coursesSummary = await recipeService.getAllCourses('SUMMARY')

  const cuisines = await recipeService.getAllCuisines()
  const cuisineObjByURI = arrToObj<RecipeCuisine>(cuisines, 'uri')
  const cuisineSummary = await recipeService.getAllCuisines('SUMMARY')

  if (uri in coursesObjByURI) {
    return {
      props: {
        pageType: 'COURSE',
        course: coursesObjByURI[uri],
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisineSummary,
        },
      },
    }
  }

  /////////////////////////////
  ///////// CUISINES
  /////////////////////////////

  if (uri in cuisineObjByURI) {
    return {
      props: {
        pageType: 'CUISINE',
        cuisine: cuisineObjByURI[uri],
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisineSummary,
        },
      },
    }
  }

  ///////////////////////////
  /////    RECIPES
  ///////////////////////////

  const allRecipes = await recipeService.getAllRecipePosts()
  const allRecipesObjByURI = arrToObj<Recipe>(allRecipes, 'uri')

  if (uri in allRecipesObjByURI) {
    devLogger.info(`Genenrating Recipe : ${uri}`)
    const allRecipesObjById = arrToObj<Recipe>(allRecipes, 'databaseId')

    const allRecipeContent = await recipeService.getAllRecipesData()
    const allRecipeContentById = arrToObj<IRecipeContent['data'][0]>(
      allRecipeContent.data,
      'id'
    )

    const faqService = new FAQService()
    const allFAQs = await faqService.getAllFAQREST()
    const allFAQsById = arrToObj<IFAQRestContent>(allFAQs, 'id')

    const selectedRecipeId = allRecipesObjByURI[uri]['databaseId']

    const selectedRecipePost = allRecipesObjById[selectedRecipeId]
    if (!(selectedRecipeId in allRecipeContentById)) {
      logger.warn(
        `Not generating ${uri} because corresponding recipe \
                content not found for id: ${selectedRecipeId} `
      )
      return {
        notFound: true,
      }
    }
    const selectedRecipeContent = allRecipeContentById[selectedRecipeId]

    const recipeRelatedFAQIds = getFAQs(selectedRecipePost.content as string)

    const recipeRelatedFAQs = recipeRelatedFAQIds.map(
      (faqId) => allFAQsById[faqId]
    )
    let relatedYoutubeVideoID = null
    try {
      relatedYoutubeVideoID = getYoutubeVideoId(
        selectedRecipePost.content as string
      )
    } catch (error) {
      logger.error(
        `Error white processing - ${
          selectedRecipePost.title ?? '<Empty Title>'
        }`
      )
    }

    selectedRecipePost.content = makeVideoIframeLazy(
      stripFAQSection(
        replaceYTWithNoCookie(selectedRecipePost.content as string)
      )
    )

    devLogger.info('Calculating durations')
    selectedRecipeContent.recipe_metas['calculatedDurations'] =
      calculateTotalDuration(selectedRecipeContent.recipe_metas)
    devLogger.info('Succesfully calculated duration')

    devLogger.info('Generating Schema')

    const selectedRecipeSchema = genRecipeSchema(
      selectedRecipePost,
      selectedRecipeContent['recipe_metas'],
      relatedYoutubeVideoID ?? undefined
    )

    devLogger.info('Generated Schema')

    devLogger.info(`Succesfully Generated Recipe : ${uri}`)

    return {
      props: {
        pageType: 'RECIPE',
        recipe: {
          post: selectedRecipePost,
          content: selectedRecipeContent['recipe_metas'],
          faqs: recipeRelatedFAQs,
          YTId: relatedYoutubeVideoID ?? null,
          recipeSchema: selectedRecipeSchema,
        },
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisineSummary,
        },
      },
    }
  }

  return {
    notFound: true,
  }
}
