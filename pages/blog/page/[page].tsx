import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { getLayout, LayoutProps } from '../../../components/layout'
import { SEO } from '../../../components/SEO'
import { Home2 } from '../../../screens/home'
import DiskCacheService from '../../../services/diskCache'
import PostService from '../../../services/PostService'
import RecipeService from '../../../services/RecipeService'
import { styleClass } from '../../../styles/home.css'
import { dark, light } from '../../../styles/themes.css'
import { Post } from '../../../types/wp-graphql.types'
import { LocalPageInfo } from '../../../utils/types'
import { NextPageWithLayout } from '../../_app'

type PostPageProps = LocalPageInfo & {
  posts: Post[]
}

export const POST_PAGE_LENGTH = 4

const PaginatedPostPage: NextPageWithLayout<PostPageProps> = (props) => {
  const [currTheme, setCurrTheme] = useState(light)

  const toggleTheme = () => {
    currTheme == light ? setCurrTheme(dark) : setCurrTheme(light)
  }
  return (
    <div className={`${currTheme} ${styleClass}`}>
      <SEO isArticle={false} title="Blogs | The Fearless cooking" />
      <Home2 recipes={props.posts} pageInfo={props.pageInfo} />
      <button style={{ display: 'none' }} onClick={() => toggleTheme()}>
        Switch Theme
      </button>
    </div>
  )
}
//PaginatedPostPage =React.memo(PaginatedPostPage, (prevProps, nextProps) => {
//console.log('PaginatedPostPage', {prevProps,nextProps})
//return prevProps === nextProps
//})
PaginatedPostPage.displayName = 'Posts'
PaginatedPostPage.getLayout = getLayout

export const getStaticPaths: GetStaticPaths<{
  page: string[]
}> = async () => {
  const postService = new PostService(new DiskCacheService())

  const allPosts = await postService.getAllPosts()

  const noOfPages = Math.ceil(allPosts.length / POST_PAGE_LENGTH)

  const allURIs = Array.from({ length: noOfPages }).map(
    (_, idx) => `/blog/page/${idx + 1}`
  )

  return {
    paths: allURIs,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  PostPageProps & { layoutProps: LayoutProps }
> = async ({ params }) => {
  const page = Number(params?.page) || 1

  if (isNaN(page)) throw Error(`Invalid Page in homePage :${page} `)
  const recipeService = new RecipeService(new DiskCacheService())

  const courseSummary = (await recipeService.getAllCourses('SUMMARY')).sort(
    (a, b) => (b.recipes?.nodes?.length ?? 0) - (a.recipes?.nodes?.length ?? 0)
  )
  const cuisineSummary = (await recipeService.getAllCuisines('SUMMARY')).sort(
    (a, b) => (b.recipes?.nodes?.length ?? 0) - (a.recipes?.nodes?.length ?? 0)
  )

  const postService = new PostService(new DiskCacheService())

  const allPosts = await postService.getAllPosts()

  const noOfPages = Math.ceil(allPosts.length / POST_PAGE_LENGTH)

  const allPostSummary = allPosts.map((post) => {
    delete post['content']
    return post
  })

  const startIdx = 0
  const endIdx = POST_PAGE_LENGTH * page

  const result = {
    props: {
      posts: allPostSummary.slice(startIdx, endIdx + 1),
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

export default PaginatedPostPage
