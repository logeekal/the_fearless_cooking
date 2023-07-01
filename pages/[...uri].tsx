import { GetStaticPaths, GetStaticProps } from 'next'

import { getLayout, LayoutProps } from '../components/layout'
import Category from '../screens/category'
import PostPage from '../screens/post'
import RecipePage from '../screens/recipe'
import DiskCacheService from '../services/diskCache'
import PostService from '../services/PostService'
import RecipeService from '../services/RecipeService'
import {
  Post,
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from '../types/wp-graphql.types'
import { arrToObj } from '../utils'
import { convertAIRecipesToCompleteRecipes } from '../utils/ai-recipe'
import { PAGE_LENGTH } from '../utils/config'
import { logger } from '../utils/logger'
import { genCompleteRecipeObject } from '../utils/recipe'
import { genFAQSchema } from '../utils/schema/faqSchema'
import { genPostSchema } from '../utils/schema/post'
import genRecipeSchema from '../utils/schema/recipe'
import { ICompletePost, ICompleteRecipe, LocalPageInfo } from '../utils/types'
import { NextPageWithLayout } from './_app'
import { POST_PAGE_LENGTH } from './blog/page/[page]'

type CommonProps = LocalPageInfo & {
  pageType: 'COURSE' | 'CUISINE' | 'RECIPE' | 'AIRECIPE' | 'AICUISINE' | 'POST'
}

type CoursePageProps = CommonProps & {
  pageType: 'COURSE'
  course: RecipeCourse
}

type CuisinePageProps = CommonProps & {
  pageType: 'CUISINE' | 'AICUISINE'
  cuisine: RecipeCuisine
}

type RecipePageProps = CommonProps & {
  pageType: 'RECIPE' | 'AIRECIPE'
  recipe: ICompleteRecipe
}

type PostPageProps = CommonProps & {
  pageType: 'POST'
  completePost: ICompletePost
}

type CatchAllPageProps =
  | CoursePageProps
  | CuisinePageProps
  | RecipePageProps
  | PostPageProps

const CatchAll: NextPageWithLayout<CatchAllPageProps> = (props) => {
  if (props.pageType === 'POST') {
    return <PostPage post={props.completePost ?? {}} />
  }

  if (props.pageType === 'RECIPE' || props.pageType === 'AIRECIPE') {
    return (
      <RecipePage recipe={props.recipe} isAI={props.pageType === 'AIRECIPE'} />
    )
  }

  if (props.pageType === 'CUISINE' || props.pageType === 'AICUISINE') {
    return (
      <Category
        category={props.cuisine}
        pageInfo={props.pageInfo}
        isAI={props.pageType === 'AICUISINE'}
      />
    )
  }

  // default course
  return (
    <Category
      category={(props as CoursePageProps).course}
      pageInfo={props.pageInfo}
    />
  )
}

CatchAll.getLayout = getLayout

export default CatchAll

export const getStaticPaths: GetStaticPaths<{
  uri: string[]
}> = async () => {
  logger.info('StaticPaths :  starting')
  const diskCacheService = new DiskCacheService()

  const recipeService = new RecipeService(diskCacheService)

  const postService = new PostService(diskCacheService)

  const courseURIs = await getCoursePaths(recipeService)
  const cuisineURIs = await getCuisinePaths(recipeService)

  const recipes = await recipeService.getAllRecipePosts()
  const posts = await postService.getAllPosts()
  const recipeURIs = recipes.map((recipe) => ({
    params: {
      uri: recipe.uri.split('/').filter((part) => part !== ''),
    },
  }))

  const postURIs = posts.map((post) => ({
    params: {
      uri: post.uri.split('/').filter((part) => part !== ''),
    },
  }))

  const aiRecipeURIs = Object.values(convertAIRecipesToCompleteRecipes()).map(
    (aiRecipe) => aiRecipe.post.uri
  )

  const aiRecipeCategoryPageURIs = getAiRecipeCategoryPagePath()

  return {
    paths: [
      ...courseURIs,
      ...cuisineURIs,
      ...recipeURIs,
      ...aiRecipeURIs,
      ...aiRecipeCategoryPageURIs,
      ...postURIs,
    ],
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
  const diskCacheService = new DiskCacheService()

  const recipeService = new RecipeService(diskCacheService)

  const postService = new PostService(diskCacheService)

  const allRecipes = await recipeService.getAllRecipePosts()
  const allRecipesObjByURI = arrToObj<Recipe>(allRecipes, 'uri')
  const allRecipesObjById = arrToObj<Recipe>(allRecipes, 'databaseId')
  const cuisines = await recipeService.getAllCuisines()
  const cuisinesObjByURI = arrToObj<RecipeCuisine>(cuisines, 'uri')
  const cuisinesSummary = await recipeService.getAllCuisines('SUMMARY')

  const allPosts = await postService.getAllPosts()
  const allPostsObjByURI = arrToObj<Post>(allPosts, 'uri')
  const allPostsObjById = arrToObj<Post>(allPosts, 'databaseId')
  const allAIRecipeObject = convertAIRecipesToCompleteRecipes()
  const allAIRecipes = Object.values(allAIRecipeObject).map((item) => item.post)
  const allAIRecipeByURI = arrToObj<Recipe>(allAIRecipes, 'uri')

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

    const faqSchema = FAQs && FAQs.length > 0 ? genFAQSchema(FAQs) : null

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
          faqSchema: faqSchema,
        },
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisinesSummary,
        },
      },
    }
  }

  /////////////////////////////
  ///////// POSTS
  /////////////////////////////
  //

  if (uri in allPostsObjByURI) {
    logger.info(`Post Found ${uri}`)
    const selectedPost = allPostsObjByURI[uri]
    const startIdx = 0
    const endIdx = isNaN(pageNo)
      ? startIdx + POST_PAGE_LENGTH
      : (startIdx + POST_PAGE_LENGTH) * pageNo

    const noOfPages = allPosts.length / POST_PAGE_LENGTH

    return {
      props: {
        pageType: 'POST',
        pageInfo: {
          total: noOfPages,
          current: isNaN(pageNo) ? 1 : pageNo,
          uri,
        },
        completePost: {
          post: selectedPost,
          schema: genPostSchema(selectedPost),
        },
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisinesSummary,
        },
      },
    }
  }
  if (uri in allAIRecipeByURI) {
    logger.debug(`Generating AI Recipe : ${uri}`)
    const recipeId = allAIRecipeByURI[uri].databaseId
    const selectedRecipe = allAIRecipeObject[recipeId]
    return {
      props: {
        pageType: 'AIRECIPE',
        pageInfo: {
          total: 1,
          current: 1,
          uri,
        },
        recipe: selectedRecipe,
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisinesSummary,
        },
      },
    }
  }

  if (uri.startsWith('/ai-recipes')) {
    logger.debug('Generating AI Recipe category Page')
    const startIdx = 0

    //// only needed if we want to display recipes from only that page.
    //if (!isNaN(pageNo)) {
    //startIdx = (pageNo - 1) * PAGE_LENGTH
    //}

    const endIdx = isNaN(pageNo)
      ? startIdx + PAGE_LENGTH
      : (startIdx + PAGE_LENGTH) * pageNo

    const aiRecipeCuisineSummary = getAIRecipeAsCuisine()
    const noOfPages = Math.ceil(
      aiRecipeCuisineSummary?.recipes?.nodes?.length / PAGE_LENGTH
    )

    const recipeDetailForCuisine: Array<Recipe> =
      aiRecipeCuisineSummary?.recipes?.nodes?.slice(startIdx, endIdx)

    aiRecipeCuisineSummary['recipes'] = {
      ...aiRecipeCuisineSummary['recipes'],
      nodes: recipeDetailForCuisine,
    }

    return {
      props: {
        pageType: 'AICUISINE',
        pageInfo: {
          total: noOfPages,
          current: isNaN(pageNo) ? 1 : pageNo,
          uri,
        },
        cuisine: aiRecipeCuisineSummary,
        layoutProps: {
          courseSummary: coursesSummary,
          cuisineSummary: cuisinesSummary,
        },
      },
    }
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

const getAiRecipeCategoryPagePath = () => {
  // ai recipe being used as a psuedo cuisine
  const aiRecipeCuisineSummary: RecipeCuisine = getAIRecipeAsCuisine()

  const noOfRecipes =
    (aiRecipeCuisineSummary?.recipes?.nodes?.length as number) ?? 0

  const noOfPages = Math.ceil(noOfRecipes / PAGE_LENGTH)

  const aiRecipesCuisinePageURIs =
    noOfPages === 1
      ? [aiRecipeCuisineSummary.uri]
      : Array.from({ length: noOfPages - 1 })
          .map((_, page) => `${aiRecipeCuisineSummary.uri}page/${page + 2}`)
          .concat(aiRecipeCuisineSummary.uri)

  const allURIsWithPage = aiRecipesCuisinePageURIs.map((uri) => {
    return {
      params: {
        uri: uri.split('/').filter((part) => part !== ''),
      },
    }
  })

  return allURIsWithPage
}

const getAIRecipeAsCuisine = () => {
  return {
    id: 'ai-recipes',
    databaseId: 9999999,
    uri: '/ai-recipes/',
    name: 'AI Recipes',
    recipes: {
      nodes: Object.values(convertAIRecipesToCompleteRecipes()).map(
        (completeRecipe) => completeRecipe.post
      ),
    },
  }
}
