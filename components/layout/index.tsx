import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getWindow } from 'ssr-window'

import { dark, light } from '../../styles/themes.css'
import { RecipeCourse, RecipeCuisine } from '../../types/wp-graphql.types'
import CategoryBar from '../category_bar'
import Modal from '../modal'
import Search from '../search'
import Sidebar from '../sidebar'
import Footer from './footer'
import { footerBy, layoutClass, mainContent } from './layout.css'
import Navbar from './navbar'
import { LayoutContext, LayoutContextType } from './use_layout'

const window = getWindow()

export type LayoutProps = {
  cuisineSummary: Array<RecipeCuisine>
  courseSummary: Array<RecipeCourse>
}

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  const [currTheme, setCurrTheme] = useState(light)
  const router = useRouter()

  const toggleTheme = () => {
    //console.log('toggling currTheme')
    currTheme == light ? setCurrTheme(dark) : setCurrTheme(light)
  }

  const queryInURLExists = useMemo(() => {
    if (router.isReady) {
      return 'q' in router.query
    }
    return false
  }, [router])

  const [isSearchOpen, setIsSearchOpen] = useState(queryInURLExists)

  useEffect(() => {
    setIsSearchOpen(queryInURLExists)
  }, [queryInURLExists])

  const openSearch = useCallback(() => {
    if (isSearchOpen) return
    if (router.isReady) {
      const currentSearchParams = new URLSearchParams(window.location.search)
      const searchParams: Record<string, string[] | string> = {}
      for (const key of currentSearchParams.keys()) {
        searchParams[key] = currentSearchParams.getAll(key)
      }

      router
        .push(
          {
            pathname: window.location.pathname,
            query: {
              ...searchParams,
              q: '',
            },
          },
          undefined,
          { shallow: true }
        )
        .then(() => {
          setIsSearchOpen(true)
        })
        .catch((err) => console.error(err))
    } else {
      setIsSearchOpen(false)
    }
  }, [router, isSearchOpen])

  const closeSearch = useCallback(() => {
    if (!isSearchOpen) return

    const currentURL = new URL(window.location.href)
    const currentSearchParams = new URLSearchParams(window.location.search)
    const searchParams: Record<string, string[] | string> = {}
    for (const key of currentSearchParams.keys()) {
      searchParams[key] = currentSearchParams.getAll(key)
    }
    delete searchParams['q']
    if (router.isReady) {
      router
        .push(
          {
            pathname: currentURL.pathname,
            query: {
              ...searchParams,
            },
          },
          undefined,
          { shallow: true }
        )
        .then(() => {
          setIsSearchOpen(false)
        })
        .catch((err) => console.error(err))
    }
  }, [router, isSearchOpen])

  const contextValue: LayoutContextType = {
    openSearch,
    closeSearch,
  }

  return (
    <LayoutContext.Provider value={contextValue}>
      <Head>
        <script src="/lib/lazysizes.min.js" async />
      </Head>
      <div className={`${currTheme} ${layoutClass}`}>
        <header className="body-width">
          <Navbar
            courseSummary={props.courseSummary}
            cuisineSummary={props.cuisineSummary}
          />
        </header>

        {queryInURLExists && (
          <Modal show={queryInURLExists}>
            <Search />
          </Modal>
        )}

        <CategoryBar
          categories={[...props.courseSummary, ...props.cuisineSummary]}
        />
        <main className={`${mainContent}`}>
          {props.children}
          <Sidebar />
        </main>
        <footer>
          <Footer />
          <div className={`footer__by text_center ${footerBy}`}>
            <i> Happy Cooking </i>👩🏽‍🍳
          </div>
        </footer>
      </div>
    </LayoutContext.Provider>
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
