import { GetStaticPaths, GetStaticProps } from 'next'

import { getLayout, LayoutProps } from '../components/layout'
import Category from '../screens/category'
import RecipePage from '../screens/recipe'
import DiskCacheService from '../services/diskCache'
import RecipeService from '../services/RecipeService'
import { Recipe, RecipeCourse, RecipeCuisine } from '../types/wp-graphql.types'
import { arrToObj } from '../utils'
import { PAGE_LENGTH } from '../utils/config'
import { logger } from '../utils/logger'
import { genCompleteRecipeObject } from '../utils/recipe'
import genRecipeSchema from '../utils/schema/recipe'
import { ICompleteRecipe, LocalPageInfo } from '../utils/types'
import { NextPageWithLayout } from './_app'

type CommonProps = LocalPageInfo & {
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
  //console.log({ props })
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
    return <Category category={props.cuisine} pageInfo={props.pageInfo} />
  }

  // default course
  return <Category category={props.course} pageInfo={props.pageInfo} />
}

CatchAll.getLayout = getLayout

export default CatchAll

export const getStaticPaths: GetStaticPaths<{
  uri: string[]
}> = async () => {
  logger.info('StaticPaths :  starting')
  const recipeService = new RecipeService(new DiskCacheService())

  const courseURIs = await getCoursePaths(recipeService)
  const cuisineURIs = await getCuisinePaths(recipeService)

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
  logger.info('StaticProps : starting')
  const recipeService = new RecipeService(new DiskCacheService())
  const allRecipes = await recipeService.getAllRecipePosts()
  const allRecipesObjByURI = arrToObj<Recipe>(allRecipes, 'uri')
  const allRecipesObjById = arrToObj<Recipe>(allRecipes, 'databaseId')
  const cuisines = await recipeService.getAllCuisines()
  const cuisinesObjByURI = arrToObj<RecipeCuisine>(cuisines, 'uri')
  const cuisinesSummary = await recipeService.getAllCuisines('SUMMARY')

  if (!params) throw Error('Invalid Params in Get static Props', params)
  const pageNo = Number(params.uri[params.uri.length - 1])
  let uri = `/${params.uri.join('/')}/`

  if (!isNaN(pageNo)) {
    // set URI without page number
    uri = `/${params.uri.slice(0, params.uri.length - 2).join('/')}/`
  }
  logger.info(`StaticProps : Generating  ${uri} and page no. : ${pageNo}`)

  // get courses
  const coursesParent = await recipeService.getAllCourses()
  const coursesObjByURI = arrToObj<RecipeCourse>(coursesParent, 'uri')
  const coursesSummary = await recipeService.getAllCourses('SUMMARY')

  const courseObj = coursesObjByURI[uri]
  if (uri in coursesObjByURI) {
    const startIdx = 0

    //// only needed if we want to display recipes from only that page.
    //if (!isNaN(pageNo)) {
    //startIdx = (pageNo - 1) * PAGE_LENGTH
    //}

    const endIdx = isNaN(pageNo)
      ? startIdx + PAGE_LENGTH
      : (startIdx + PAGE_LENGTH) * pageNo

    logger.info(`Generating ${uri} and pageNo. : ${pageNo ?? 0} `)
    logger.info(`startIdx : ${startIdx} & endIdx: ${endIdx}`)

    const courseSummary = await recipeService.getCourseSummaryById(
      courseObj.databaseId
    )
    if (!courseSummary || !courseSummary.recipes) {
      throw Error(
        `Error fetching summary for courseID : ${courseObj.databaseId}`
      )
    }

    logger.debug(
      `Total Recipes Course: ${courseSummary.name as string} : ${
        courseSummary.recipes.nodes?.length as number
      }`
    )
    const noOfPages = Math.ceil(
      (courseSummary?.recipes?.nodes?.length as number) / PAGE_LENGTH
    )

    const recipeDetailForCourse: Array<Recipe> = courseSummary?.recipes?.nodes
      ?.slice(startIdx, endIdx)
      .map((summary) => {
        return {
          ...allRecipesObjById[summary?.databaseId as number],
          content: '',
        }
      }) as Recipe[]

    courseSummary['recipes'] = {
      ...courseSummary.recipes,
      nodes: recipeDetailForCourse,
    }

    return {
      props: {
        pageType: 'COURSE',
        pageInfo: {
          total: noOfPages,
          current: isNaN(pageNo) ? 1 : pageNo,
          uri,
        },
        course: courseSummary,
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisinesSummary,
        },
      },
    }
  }
  /////////////////////////////
  ///////// CUISINES
  /////////////////////////////

  if (uri in cuisinesObjByURI) {
    const startIdx = 0

    //// only needed if we want to display recipes from only that page.
    //if (!isNaN(pageNo)) {
    //startIdx = (pageNo - 1) * PAGE_LENGTH
    //}

    const endIdx = isNaN(pageNo)
      ? startIdx + PAGE_LENGTH
      : (startIdx + PAGE_LENGTH) * pageNo

    logger.info(`Generating ${uri} and pageNo. : ${pageNo ?? 0} `)
    logger.info(`startIdx : ${startIdx} & endIdx: ${endIdx}`)

    const cuisineObj = cuisinesObjByURI[uri]
    const cuisineSummary = await recipeService.getCuisineSummaryById(
      cuisineObj.databaseId
    )

    const noOfPages = Math.ceil(
      (cuisineSummary?.recipes?.nodes?.length as number) / PAGE_LENGTH
    )

    if (!cuisineSummary || !cuisineSummary.recipes) {
      throw Error(
        `Error fetching summary for cuisineID : ${cuisineObj.databaseId}`
      )
    }
    logger.debug(
      `Total Recipes Course: ${cuisineSummary.name as string} : ${
        cuisineSummary.recipes.nodes?.length as number
      }`
    )

    const recipeDetailForCuisine: Array<Recipe> = cuisineSummary?.recipes?.nodes
      ?.slice(startIdx, endIdx)
      .map((summary) => {
        return {
          ...allRecipesObjById[summary?.databaseId as number],
          content: '',
        }
      }) as Recipe[]

    cuisineSummary['recipes'] = {
      ...cuisineSummary.recipes,
      nodes: recipeDetailForCuisine,
    }

    return {
      props: {
        pageType: 'CUISINE',
        pageInfo: {
          total: noOfPages,
          current: isNaN(pageNo) ? 1 : pageNo,
          uri,
        },
        cuisine: cuisineSummary,
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisinesSummary,
        },
      },
    }
  }

  ///////////////////////////
  /////    RECIPES
  ///////////////////////////

  if (uri in allRecipesObjByURI) {
    logger.debug(`Generating Recipe : ${uri}`)
    const completeRecipeObj = await genCompleteRecipeObject()
    const selectedRecipeId = String(allRecipesObjByURI[uri]['databaseId'])

    const almostCompleteRecipe = completeRecipeObj[selectedRecipeId]
    const selectedRecipePost = almostCompleteRecipe['post']
    const selectedRecipeContent = almostCompleteRecipe['content']
    const relatedYTId = almostCompleteRecipe['YTId']
    const FAQs = almostCompleteRecipe['faqs']

    logger.debug('Generating Schema')

    const selectedRecipeSchema = selectedRecipeContent
      ? genRecipeSchema(
          selectedRecipePost,
          selectedRecipeContent,
          relatedYTId ?? undefined
        )
      : null

    logger.debug('Generated Schema')

    logger.debug(`Succesfully Generated Recipe : ${uri}`)

    return {
      props: {
        pageType: 'RECIPE',
        pageInfo: {
          total: 1,
          current: 1,
          uri,
        },
        recipe: {
          post: selectedRecipePost,
          content: selectedRecipeContent,
          faqs: FAQs,
          YTId: relatedYTId ?? null,
          recipeSchema: selectedRecipeSchema,
        },
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisinesSummary,
        },
      },
    }
  } else {
    logger.error(`Recipe URI : ${uri} not found`)
  }

  return {
    notFound: true,
  }
}

const getCoursePaths = async (recipeService: RecipeService) => {
  const courses = await recipeService.getAllCourses()
  const courseURIPromises = courses.map(async (course) => {
    const courseSummary = await recipeService.getCourseSummaryById(
      course.databaseId
    )

    const numberofRecipes = courseSummary?.recipes?.nodes?.length as number

    const noOfPages = Math.ceil(numberofRecipes / PAGE_LENGTH)
    const listOfURIs =
      noOfPages === 1
        ? [course.uri]
        : Array.from({
            length: noOfPages - 1,
          })
            .map((_, page) => `${course.uri}page/${page + 2}`)
            .concat(course.uri)

    return listOfURIs
  })

  const cuisineURIs = await Promise.all(courseURIPromises)

  return cuisineURIs.flat().map((uri) => {
    return {
      params: {
        uri: uri.split('/').filter((part) => part !== ''),
      },
    }
  })
}

const getCuisinePaths = async (recipeService: RecipeService) => {
  const cuisines = await recipeService.getAllCuisines()
  const cuisineURIPromises = cuisines.map(async (cuisine) => {
    const cuisineSummary = await recipeService.getCuisineSummaryById(
      cuisine.databaseId
    )

    const noOfRecipes = (cuisineSummary?.recipes?.nodes?.length as number) ?? 0

    const noOfPages = Math.ceil(noOfRecipes / PAGE_LENGTH)

    const cuisineURIs =
      noOfPages === 1
        ? [cuisine.uri]
        : Array.from({ length: noOfPages - 1 })
            .map((_, page) => `${cuisine.uri}page/${page + 2}`)
            .concat(cuisine.uri)

    return cuisineURIs
  })

  const cuisineURIs = await Promise.all(cuisineURIPromises)

  const allURIsWithPage = cuisineURIs.flat().map((cuisineURI) => {
    return {
      params: {
        uri: cuisineURI.split('/').filter((part) => part !== ''),
      },
    }
  })

  return allURIsWithPage
}
